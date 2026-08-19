package com.driveease.repository;

import com.driveease.entity.BookingAddon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingAddonRepository extends JpaRepository<BookingAddon, Long> {

    List<BookingAddon> findByBookingId(Long bookingId);
}
