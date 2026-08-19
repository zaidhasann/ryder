package com.driveease.service.impl;

import com.driveease.dto.request.ReviewCreateRequest;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.ReviewResponse;
import com.driveease.entity.Booking;
import com.driveease.entity.Car;
import com.driveease.entity.Review;
import com.driveease.entity.User;
import com.driveease.exception.BadRequestException;
import com.driveease.exception.ResourceNotFoundException;
import com.driveease.mapper.ReviewMapper;
import com.driveease.repository.BookingRepository;
import com.driveease.repository.CarRepository;
import com.driveease.repository.ReviewRepository;
import com.driveease.repository.UserRepository;
import com.driveease.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final ReviewMapper reviewMapper;

    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             BookingRepository bookingRepository,
                             UserRepository userRepository,
                             CarRepository carRepository,
                             ReviewMapper reviewMapper) {
        this.reviewRepository = reviewRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.reviewMapper = reviewMapper;
    }

    @Override
    public PageResponse<ReviewResponse> getCarReviews(Long carId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Review> reviews = reviewRepository.findByCarIdAndIsApprovedTrueOrderByCreatedAtDesc(carId, pageable);
        List<ReviewResponse> content = reviews.stream().map(reviewMapper::toReviewResponse).collect(Collectors.toList());
        return PageResponse.from(reviews, content);
    }

    @Override
    @Transactional
    public ReviewResponse createReview(Long userId, ReviewCreateRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", request.getBookingId()));

        if (!booking.getUser().getId().equals(userId)) {
            throw new BadRequestException("Unauthorized to review this booking");
        }

        if (reviewRepository.existsByBookingId(request.getBookingId())) {
            throw new BadRequestException("Review already submitted for this booking");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        Car car = booking.getCar();

        Review review = new Review();
        review.setUser(user);
        review.setCar(car);
        review.setBooking(booking);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setIsApproved(true);
        review.setCreatedAt(Instant.now());

        review = reviewRepository.save(review);

        // Update car rating avg and count
        Double avgRating = reviewRepository.calculateAverageRatingForCar(car.getId());
        int reviewCount = reviewRepository.countApprovedReviewsForCar(car.getId());

        if (avgRating != null) {
            car.setRatingAvg(BigDecimal.valueOf(avgRating).setScale(2, RoundingMode.HALF_UP));
        }
        car.setReviewCount(reviewCount);
        carRepository.save(car);

        return reviewMapper.toReviewResponse(review);
    }
}
