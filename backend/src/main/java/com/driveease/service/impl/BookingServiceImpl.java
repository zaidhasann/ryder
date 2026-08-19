package com.driveease.service.impl;

import com.driveease.dto.request.BookingCreateRequest;
import com.driveease.dto.request.PriceCalculationRequest;
import com.driveease.dto.response.BookingResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.PriceBreakdownResponse;
import com.driveease.entity.*;
import com.driveease.entity.enums.BookingStatus;
import com.driveease.entity.enums.PaymentStatus;
import com.driveease.exception.BadRequestException;
import com.driveease.exception.ResourceNotFoundException;
import com.driveease.mapper.BookingMapper;
import com.driveease.repository.*;
import com.driveease.service.BookingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;
    private final AddonRepository addonRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;
    private final BookingAddonRepository bookingAddonRepository;
    private final PaymentRepository paymentRepository;
    private final BookingMapper bookingMapper;

    public BookingServiceImpl(BookingRepository bookingRepository, CarRepository carRepository, AddonRepository addonRepository, LocationRepository locationRepository, UserRepository userRepository, BookingAddonRepository bookingAddonRepository, PaymentRepository paymentRepository, BookingMapper bookingMapper) {
        this.bookingRepository = bookingRepository;
        this.carRepository = carRepository;
        this.addonRepository = addonRepository;
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
        this.bookingAddonRepository = bookingAddonRepository;
        this.paymentRepository = paymentRepository;
        this.bookingMapper = bookingMapper;
    }

    @Override
    public PriceBreakdownResponse calculatePrice(PriceCalculationRequest request) {
        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new ResourceNotFoundException("Car", "id", request.getCarId()));
        
        long rentalDays = ChronoUnit.DAYS.between(
                request.getStartTime().atZone(ZoneId.systemDefault()).toLocalDate(),
                request.getEndTime().atZone(ZoneId.systemDefault()).toLocalDate()
        );
        if (rentalDays < 1) rentalDays = 1;

        BigDecimal baseAmount = car.getPricePerDay().multiply(BigDecimal.valueOf(rentalDays));
        BigDecimal addonAmount = BigDecimal.ZERO;
        
        List<PriceBreakdownResponse.BreakdownItem> items = new ArrayList<>();
        items.add(new PriceBreakdownResponse.BreakdownItem("Base Rental (" + rentalDays + " days × ₹" + car.getPricePerDay() + "/day)", baseAmount));

        if (request.getAddonIds() != null) {
            for (Long addonId : request.getAddonIds()) {
                Addon addon = addonRepository.findById(addonId)
                        .orElseThrow(() -> new ResourceNotFoundException("Addon", "id", addonId));
                BigDecimal aAmount = addon.getPricePerDay().multiply(BigDecimal.valueOf(rentalDays));
                addonAmount = addonAmount.add(aAmount);
                items.add(new PriceBreakdownResponse.BreakdownItem(addon.getName() + " (" + rentalDays + " days × ₹" + addon.getPricePerDay() + "/day)", aAmount));
            }
        }

        BigDecimal taxAmount = baseAmount.add(addonAmount).multiply(BigDecimal.valueOf(0.18));
        items.add(new PriceBreakdownResponse.BreakdownItem("GST (18%)", taxAmount));
        
        BigDecimal totalAmount = baseAmount.add(addonAmount).add(taxAmount);

        PriceBreakdownResponse res = new PriceBreakdownResponse();
        res.setBaseAmount(baseAmount);
        res.setAddonAmount(addonAmount);
        res.setTaxAmount(taxAmount);
        res.setTotalAmount(totalAmount);
        res.setItems(items);
        return res;
    }

    @Override
    @Transactional
    public BookingResponse createBooking(Long userId, BookingCreateRequest request) {
        if (!request.getEndTime().isAfter(request.getStartTime())) {
            throw new BadRequestException("End time must be after start time");
        }

        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new ResourceNotFoundException("Car", "id", request.getCarId()));
        if (!car.getIsActive()) {
            throw new BadRequestException("Car is not active");
        }

        long overlapCount = bookingRepository.countOverlappingBookings(
                car.getId(),
                request.getStartTime(),
                request.getEndTime(),
                List.of(BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.ACTIVE),
                null
        );
        if (overlapCount > 0) {
            throw new BadRequestException("Car is not available for the selected dates");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        PriceCalculationRequest calcReq = new PriceCalculationRequest();
        calcReq.setCarId(car.getId());
        calcReq.setStartTime(request.getStartTime());
        calcReq.setEndTime(request.getEndTime());
        calcReq.setAddonIds(request.getAddonIds());
        PriceBreakdownResponse price = calculatePrice(calcReq);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setBasePrice(price.getBaseAmount());
        booking.setAddonPrice(price.getAddonAmount());
        booking.setTaxAmount(price.getTaxAmount());
        booking.setTotalPrice(price.getTotalAmount());
        booking.setStatus(BookingStatus.PENDING);
        booking.setPickupLocation(request.getPickupLocationId() != null ? locationRepository.findById(request.getPickupLocationId()).map(Location::getAddress).orElse(null) : null);
        booking.setReturnLocation(request.getDropoffLocationId() != null ? locationRepository.findById(request.getDropoffLocationId()).map(Location::getAddress).orElse(null) : null);
        
        booking = bookingRepository.save(booking);

        if (request.getAddonIds() != null) {
            for (Long addonId : request.getAddonIds()) {
                Addon addon = addonRepository.findById(addonId).orElseThrow();
                BookingAddon ba = new BookingAddon();
                ba.setBooking(booking);
                ba.setAddon(addon);
                ba.setPriceAtBooking(addon.getPricePerDay());
                bookingAddonRepository.save(ba);
                booking.getBookingAddons().add(ba);
            }
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(price.getTotalAmount());
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setPaidAt(Instant.now());
        paymentRepository.save(payment);
        
        booking.setPayment(payment);
        booking.setStatus(BookingStatus.CONFIRMED);
        booking = bookingRepository.save(booking);

        return bookingMapper.toBookingResponse(booking);
    }

    @Override
    public PageResponse<BookingResponse> getUserBookings(Long userId, int page, int size) {
        Page<Booking> bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(userId, PageRequest.of(page, size));
        List<BookingResponse> content = bookings.stream().map(bookingMapper::toBookingResponse).collect(Collectors.toList());
        return PageResponse.from(bookings, content);
    }

    @Override
    public BookingResponse getBookingById(Long userId, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));
        if (!booking.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        return bookingMapper.toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse cancelBooking(Long userId, Long bookingId, String reason) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));
        if (!booking.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        if (booking.getStatus() != BookingStatus.PENDING && booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new BadRequestException("Only pending or confirmed bookings can be cancelled");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancellationReason(reason);
        booking.setCancelledAt(Instant.now());
        booking = bookingRepository.save(booking);
        return bookingMapper.toBookingResponse(booking);
    }
}
