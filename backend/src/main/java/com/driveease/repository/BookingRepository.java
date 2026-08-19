package com.driveease.repository;

import com.driveease.entity.Booking;
import com.driveease.entity.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByBookingNumber(String bookingNumber);

    Page<Booking> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    Page<Booking> findByUserIdAndStatusOrderByCreatedAtDesc(Long userId, BookingStatus status, Pageable pageable);

    Page<Booking> findByStatusOrderByCreatedAtDesc(BookingStatus status, Pageable pageable);

    Page<Booking> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // Overlap Query for Availability Verification
    @Query("""
        SELECT COUNT(b) FROM Booking b
        WHERE b.car.id = :carId
          AND b.status IN (:activeStatuses)
          AND b.startTime < :endTime
          AND b.endTime > :startTime
          AND (:excludeBookingId IS NULL OR b.id <> :excludeBookingId)
    """)
    long countOverlappingBookings(
            @Param("carId") Long carId,
            @Param("startTime") Instant startTime,
            @Param("endTime") Instant endTime,
            @Param("activeStatuses") List<BookingStatus> activeStatuses,
            @Param("excludeBookingId") Long excludeBookingId
    );

    // Verified Completed Booking check for Reviews
    @Query("""
        SELECT COUNT(b) FROM Booking b
        WHERE b.user.id = :userId
          AND b.car.id = :carId
          AND b.status = com.driveease.entity.enums.BookingStatus.COMPLETED
    """)
    long countCompletedBookingsForUserAndCar(@Param("userId") Long userId, @Param("carId") Long carId);

    // Admin Metrics
    long countByStatus(BookingStatus status);

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b WHERE b.status IN (com.driveease.entity.enums.BookingStatus.CONFIRMED, com.driveease.entity.enums.BookingStatus.ACTIVE, com.driveease.entity.enums.BookingStatus.COMPLETED)")
    BigDecimal sumTotalGrossRevenue();

    @Query("""
        SELECT b FROM Booking b
        WHERE b.user.id = :userId
          AND b.status = :status
        ORDER BY b.startTime ASC
    """)
    List<Booking> findUpcomingByUser(@Param("userId") Long userId, @Param("status") BookingStatus status);
}
