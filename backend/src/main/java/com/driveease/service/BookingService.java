package com.driveease.service;

import com.driveease.dto.request.BookingCreateRequest;
import com.driveease.dto.request.PriceCalculationRequest;
import com.driveease.dto.response.BookingResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.PriceBreakdownResponse;

public interface BookingService {
    PriceBreakdownResponse calculatePrice(PriceCalculationRequest request);
    BookingResponse createBooking(Long userId, BookingCreateRequest request);
    PageResponse<BookingResponse> getUserBookings(Long userId, int page, int size);
    BookingResponse getBookingById(Long userId, Long bookingId);
    BookingResponse cancelBooking(Long userId, Long bookingId, String reason);
}
