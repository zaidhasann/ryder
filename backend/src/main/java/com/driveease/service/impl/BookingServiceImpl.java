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
import java.math.RoundingMode;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;
    private final AddonRepository addonRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;
    private final BookingAddonRepository bookingAddonRepository;
    private final PaymentRepository paymentRepository;
    private final BookingMapper bookingMapper;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              CarRepository carRepository,
                              AddonRepository addonRepository,
                              LocationRepository locationRepository,
                              UserRepository userRepository,
                              BookingAddonRepository bookingAddonRepository,
                              PaymentRepository paymentRepository,
                              BookingMapper bookingMapper) {
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
                request.getStartTime().atZone(ZoneOffset.UTC).toLocalDate(),
                request.getEndTime().atZone(ZoneOffset.UTC).toLocalDate()
        );
        if (rentalDays < 1) {
            rentalDays = 1;
        }

        BigDecimal baseAmount = car.getPricePerDay().multiply(BigDecimal.valueOf(rentalDays));
        BigDecimal addonAmount = BigDecimal.ZERO;

        List<PriceBreakdownResponse.BreakdownItem> items = new ArrayList<>();
        items.add(new PriceBreakdownResponse.BreakdownItem(
                "Base Rental (" + rentalDays + " days × ₹" + car.getPricePerDay() + "/day)",
                baseAmount
        ));

        if (request.getAddonIds() != null && !request.getAddonIds().isEmpty()) {
            for (Long addonId : request.getAddonIds()) {
                Addon addon = addonRepository.findById(addonId)
                        .orElseThrow(() -> new ResourceNotFoundException("Addon", "id", addonId));
                BigDecimal aAmount = addon.getPricePerDay().multiply(BigDecimal.valueOf(rentalDays));
                addonAmount = addonAmount.add(aAmount);
                items.add(new PriceBreakdownResponse.BreakdownItem(
                        addon.getName() + " (" + rentalDays + " days × ₹" + addon.getPricePerDay() + "/day)",
                        aAmount
                ));
            }
        }

        BigDecimal subtotal = baseAmount.add(addonAmount);
        BigDecimal taxAmount = subtotal.multiply(BigDecimal.valueOf(0.18)).setScale(2, RoundingMode.HALF_UP);
        items.add(new PriceBreakdownResponse.BreakdownItem("GST (18%)", taxAmount));

        BigDecimal totalAmount = subtotal.add(taxAmount).setScale(2, RoundingMode.HALF_UP);

        PriceBreakdownResponse res = new PriceBreakdownResponse();
        res.setRentalDays((int) rentalDays);
        res.setBasePricePerDay(car.getPricePerDay());
        res.setBaseAmount(baseAmount);
        res.setAddonAmount(addonAmount);
        res.setTaxAmount(taxAmount);
        res.setTotalAmount(totalAmount);
        res.setBreakdownItems(items);
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
        if (!Boolean.TRUE.equals(car.getIsActive())) {
            throw new BadRequestException("Car is currently unavailable");
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

        Location pickupLocation = locationRepository.findById(request.getPickupLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Pickup Location", "id", request.getPickupLocationId()));

        Location dropoffLocation = locationRepository.findById(request.getDropoffLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Dropoff Location", "id", request.getDropoffLocationId()));

        PriceCalculationRequest calcReq = new PriceCalculationRequest();
        calcReq.setCarId(car.getId());
        calcReq.setStartTime(request.getStartTime());
        calcReq.setEndTime(request.getEndTime());
        calcReq.setAddonIds(request.getAddonIds());
        PriceBreakdownResponse price = calculatePrice(calcReq);

        String bookingNumber = "BK-" + System.currentTimeMillis() + "-" + (int) (Math.random() * 900 + 100);

        Booking booking = new Booking();
        booking.setBookingNumber(bookingNumber);
        booking.setUser(user);
        booking.setCar(car);
        booking.setPickupLocation(pickupLocation);
        booking.setDropoffLocation(dropoffLocation);
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setRentalDays(price.getRentalDays());
        booking.setBasePricePerDay(price.getBasePricePerDay());
        booking.setBaseAmount(price.getBaseAmount());
        booking.setAddonAmount(price.getAddonAmount());
        booking.setTaxAmount(price.getTaxAmount());
        booking.setTotalAmount(price.getTotalAmount());
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setCustomerNotes(request.getCustomerNotes());

        booking = bookingRepository.save(booking);

        if (request.getAddonIds() != null && !request.getAddonIds().isEmpty()) {
            for (Long addonId : request.getAddonIds()) {
                Addon addon = addonRepository.findById(addonId).orElseThrow();
                BookingAddon ba = new BookingAddon();
                ba.setBooking(booking);
                ba.setAddon(addon);
                ba.setPriceAtBooking(addon.getPricePerDay());
                ba.setQuantity(1);
                bookingAddonRepository.save(ba);
                booking.getBookingAddons().add(ba);
            }
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(price.getTotalAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.COMPLETED);
        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 18).toUpperCase());
        payment.setPaymentDate(Instant.now());
        paymentRepository.save(payment);

        booking.setPayment(payment);
        booking = bookingRepository.save(booking);

        return bookingMapper.toBookingResponse(booking);
    }

    @Override
    public PageResponse<BookingResponse> getUserBookings(Long userId, int page, int size, BookingStatus status) {
        Page<Booking> bookings;
        if (status != null) {
            bookings = bookingRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, status, PageRequest.of(page, size));
        } else {
            bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(userId, PageRequest.of(page, size));
        }
        List<BookingResponse> content = bookings.stream().map(bookingMapper::toBookingResponse).collect(Collectors.toList());
        return PageResponse.from(bookings, content);
    }

    @Override
    public BookingResponse getBookingById(Long userId, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));
        if (!booking.getUser().getId().equals(userId)) {
            throw new BadRequestException("Unauthorized access to booking");
        }
        return bookingMapper.toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse cancelBooking(Long userId, Long bookingId, String reason) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));
        if (!booking.getUser().getId().equals(userId)) {
            throw new BadRequestException("Unauthorized access to booking");
        }
        if (booking.getStatus() != BookingStatus.PENDING && booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new BadRequestException("Only pending or confirmed bookings can be cancelled");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancellationReason(reason != null ? reason : "Cancelled by customer");
        booking = bookingRepository.save(booking);
        return bookingMapper.toBookingResponse(booking);
    }
}
