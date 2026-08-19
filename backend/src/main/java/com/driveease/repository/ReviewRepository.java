package com.driveease.repository;

import com.driveease.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByCarIdAndIsApprovedTrueOrderByCreatedAtDesc(Long carId, Pageable pageable);

    Optional<Review> findByBookingId(Long bookingId);

    boolean existsByBookingId(Long bookingId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.car.id = :carId AND r.isApproved = true")
    Double calculateAverageRatingForCar(@Param("carId") Long carId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.car.id = :carId AND r.isApproved = true")
    int countApprovedReviewsForCar(@Param("carId") Long carId);
}
