package com.driveease.service;

import com.driveease.dto.request.BookingStatusUpdateRequest;
import com.driveease.dto.response.AdminStatsResponse;
import com.driveease.dto.response.BookingResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.UserResponse;
import com.driveease.entity.enums.BookingStatus;

public interface AdminService {
    AdminStatsResponse getAdminStats();
    PageResponse<BookingResponse> getAllBookings(int page, int size, BookingStatus status, String sortBy, String sortDir);
    BookingResponse updateBookingStatus(Long bookingId, BookingStatusUpdateRequest request);
    PageResponse<UserResponse> getAllUsers(int page, int size);
}
