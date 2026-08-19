package com.driveease.controller;

import com.driveease.dto.request.BookingStatusUpdateRequest;
import com.driveease.dto.response.AdminStatsResponse;
import com.driveease.dto.response.ApiResponse;
import com.driveease.dto.response.BookingResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.UserResponse;
import com.driveease.entity.enums.BookingStatus;
import com.driveease.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Operations")
@SecurityRequirement(name = "BearerAuth")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/stats")
    @Operation(summary = "Get platform metrics and statistics")
    public ApiResponse<AdminStatsResponse> getStats() {
        return ApiResponse.success(adminService.getAdminStats());
    }

    @GetMapping("/bookings")
    @Operation(summary = "Get all customer bookings with optional filtering")
    public ApiResponse<PageResponse<BookingResponse>> getAllBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) BookingStatus status,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir
    ) {
        return ApiResponse.success(adminService.getAllBookings(page, size, status, sortBy, sortDir));
    }

    @PutMapping("/bookings/{id}/status")
    @Operation(summary = "Update booking status")
    public ApiResponse<BookingResponse> updateBookingStatus(
            @PathVariable Long id,
            @Valid @RequestBody BookingStatusUpdateRequest request
    ) {
        return ApiResponse.success(adminService.updateBookingStatus(id, request));
    }

    @GetMapping("/users")
    @Operation(summary = "Get all registered users")
    public ApiResponse<PageResponse<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.success(adminService.getAllUsers(page, size));
    }
}
