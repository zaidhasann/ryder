package com.driveease.controller;

import com.driveease.dto.request.BookingCreateRequest;
import com.driveease.dto.request.PriceCalculationRequest;
import com.driveease.dto.response.ApiResponse;
import com.driveease.dto.response.BookingResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.PriceBreakdownResponse;
import com.driveease.entity.enums.BookingStatus;
import com.driveease.security.UserPrincipal;
import com.driveease.service.BookingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings")
@SecurityRequirement(name = "BearerAuth")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/calculate-price")
    public ApiResponse<PriceBreakdownResponse> calculatePrice(@Valid @RequestBody PriceCalculationRequest request) {
        return ApiResponse.success(bookingService.calculatePrice(request));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<BookingResponse> createBooking(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody BookingCreateRequest request) {
        return ApiResponse.success(bookingService.createBooking(principal.getId(), request));
    }

    @GetMapping
    public ApiResponse<PageResponse<BookingResponse>> getUserBookings(@AuthenticationPrincipal UserPrincipal principal,
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size,
                                                                      @RequestParam(required = false) BookingStatus status) {
        return ApiResponse.success(bookingService.getUserBookings(principal.getId(), page, size, status));
    }

    @GetMapping("/{id}")
    public ApiResponse<BookingResponse> getBookingById(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id) {
        return ApiResponse.success(bookingService.getBookingById(principal.getId(), id));
    }

    @PutMapping("/{id}/cancel")
    public ApiResponse<BookingResponse> cancelBooking(@AuthenticationPrincipal UserPrincipal principal,
                                                      @PathVariable Long id,
                                                      @RequestParam(required = false) String reason) {
        return ApiResponse.success(bookingService.cancelBooking(principal.getId(), id, reason));
    }
}
