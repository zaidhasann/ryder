package com.driveease.service;

import com.driveease.dto.response.CarSummaryResponse;

import java.util.List;

public interface WishlistService {
    List<CarSummaryResponse> getUserWishlist(Long userId);
    void addToWishlist(Long userId, Long carId);
    void removeFromWishlist(Long userId, Long carId);
    boolean isCarWishlisted(Long userId, Long carId);
}
