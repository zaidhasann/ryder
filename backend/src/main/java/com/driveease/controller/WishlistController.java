package com.driveease.controller;

import com.driveease.dto.response.ApiResponse;
import com.driveease.dto.response.CarSummaryResponse;
import com.driveease.security.UserPrincipal;
import com.driveease.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@Tag(name = "Wishlist Management")
@SecurityRequirement(name = "BearerAuth")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    @Operation(summary = "Get current user's saved wishlist cars")
    public ApiResponse<List<CarSummaryResponse>> getWishlist(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ApiResponse.success(wishlistService.getUserWishlist(currentUser.getId()));
    }

    @PostMapping("/{carId}")
    @Operation(summary = "Add car to user wishlist")
    public ApiResponse<Void> addToWishlist(@AuthenticationPrincipal UserPrincipal currentUser, @PathVariable Long carId) {
        wishlistService.addToWishlist(currentUser.getId(), carId);
        return ApiResponse.success(null, "Added to wishlist");
    }

    @DeleteMapping("/{carId}")
    @Operation(summary = "Remove car from user wishlist")
    public ApiResponse<Void> removeFromWishlist(@AuthenticationPrincipal UserPrincipal currentUser, @PathVariable Long carId) {
        wishlistService.removeFromWishlist(currentUser.getId(), carId);
        return ApiResponse.success(null, "Removed from wishlist");
    }

    @GetMapping("/{carId}/check")
    @Operation(summary = "Check if car is saved in user wishlist")
    public ApiResponse<Boolean> checkWishlist(@AuthenticationPrincipal UserPrincipal currentUser, @PathVariable Long carId) {
        return ApiResponse.success(wishlistService.isCarWishlisted(currentUser.getId(), carId));
    }
}
