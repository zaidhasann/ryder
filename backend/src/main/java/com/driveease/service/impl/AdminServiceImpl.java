package com.driveease.service.impl;

import com.driveease.dto.request.BookingStatusUpdateRequest;
import com.driveease.dto.response.AdminStatsResponse;
import com.driveease.dto.response.BookingResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.UserResponse;
import com.driveease.entity.Booking;
import com.driveease.entity.User;
import com.driveease.entity.enums.BookingStatus;
import com.driveease.exception.ResourceNotFoundException;
import com.driveease.mapper.BookingMapper;
import com.driveease.mapper.UserMapper;
import com.driveease.repository.BookingRepository;
import com.driveease.repository.CarRepository;
import com.driveease.repository.UserRepository;
import com.driveease.service.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final CarRepository carRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BookingMapper bookingMapper;
    private final UserMapper userMapper;

    public AdminServiceImpl(CarRepository carRepository,
                            BookingRepository bookingRepository,
                            UserRepository userRepository,
                            BookingMapper bookingMapper,
                            UserMapper userMapper) {
        this.carRepository = carRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.bookingMapper = bookingMapper;
        this.userMapper = userMapper;
    }

    @Override
    public AdminStatsResponse getAdminStats() {
        AdminStatsResponse stats = new AdminStatsResponse();
        stats.setTotalCars(carRepository.count());
        stats.setAvailableCars(carRepository.countActiveCars());
        stats.setActiveRentals(bookingRepository.countByStatus(BookingStatus.ACTIVE));
        stats.setTotalBookings(bookingRepository.count());
        stats.setTotalUsers(userRepository.count());
        stats.setGrossRevenue(bookingRepository.sumTotalGrossRevenue() != null ? bookingRepository.sumTotalGrossRevenue() : BigDecimal.ZERO);
        stats.setCancelledBookings(bookingRepository.countByStatus(BookingStatus.CANCELLED));
        return stats;
    }

    @Override
    public PageResponse<BookingResponse> getAllBookings(int page, int size, BookingStatus status, String sortBy, String sortDir) {
        Sort sort = "ASC".equalsIgnoreCase(sortDir) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Booking> bookings;

        if (status != null) {
            bookings = bookingRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        } else {
            bookings = bookingRepository.findAllByOrderByCreatedAtDesc(pageable);
        }

        List<BookingResponse> content = bookings.stream().map(bookingMapper::toBookingResponse).collect(Collectors.toList());
        return PageResponse.from(bookings, content);
    }

    @Override
    @Transactional
    public BookingResponse updateBookingStatus(Long bookingId, BookingStatusUpdateRequest request) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));

        booking.setStatus(request.getStatus());
        if (request.getReason() != null) {
            booking.setCancellationReason(request.getReason());
        }
        booking = bookingRepository.save(booking);
        return bookingMapper.toBookingResponse(booking);
    }

    @Override
    public PageResponse<UserResponse> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<User> users = userRepository.findAll(pageable);
        List<UserResponse> content = users.stream().map(userMapper::toUserResponse).collect(Collectors.toList());
        return PageResponse.from(users, content);
    }
}
