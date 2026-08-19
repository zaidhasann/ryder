package com.driveease.controller;

import com.driveease.dto.request.ReviewCreateRequest;
import com.driveease.dto.response.ApiResponse;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.ReviewResponse;
import com.driveease.security.UserPrincipal;
import com.driveease.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Reviews Management")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/api/cars/{carId}/reviews")
    @Operation(summary = "Get reviews for a specific car")
    public ApiResponse<PageResponse<ReviewResponse>> getCarReviews(
            @PathVariable Long carId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ApiResponse.success(reviewService.getCarReviews(carId, page, size));
    }

    @PostMapping("/api/reviews")
    @ResponseStatus(HttpStatus.CREATED)
    @SecurityRequirement(name = "BearerAuth")
    @Operation(summary = "Submit a verified review for a completed booking")
    public ApiResponse<ReviewResponse> createReview(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @Valid @RequestBody ReviewCreateRequest request
    ) {
        return ApiResponse.success(reviewService.createReview(currentUser.getId(), request));
    }
}
