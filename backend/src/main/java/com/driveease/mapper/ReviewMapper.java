package com.driveease.mapper;

import com.driveease.dto.response.ReviewResponse;
import com.driveease.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public ReviewResponse toReviewResponse(Review review) {
        if (review == null) return null;
        ReviewResponse res = new ReviewResponse();
        res.setId(review.getId());
        res.setRating(review.getRating());
        res.setComment(review.getComment());
        res.setIsApproved(review.getIsApproved());
        res.setCreatedAt(review.getCreatedAt());
        
        if (review.getCar() != null) {
            res.setCarId(review.getCar().getId());
        }
        if (review.getUser() != null) {
            res.setUserId(review.getUser().getId());
            res.setUserName(review.getUser().getFirstName() + " " + review.getUser().getLastName());
        }
        if (review.getBooking() != null) {
            res.setBookingId(review.getBooking().getId());
        }
        
        return res;
    }
}
