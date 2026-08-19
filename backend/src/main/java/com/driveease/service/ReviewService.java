package com.driveease.service;

import com.driveease.dto.request.ReviewCreateRequest;
import com.driveease.dto.response.PageResponse;
import com.driveease.dto.response.ReviewResponse;

public interface ReviewService {
    PageResponse<ReviewResponse> getCarReviews(Long carId, int page, int size);
    ReviewResponse createReview(Long userId, ReviewCreateRequest request);
}
