package com.driveease.dto.request;

import jakarta.validation.constraints.*;

public class ReviewCreateRequest {
    @NotNull
    private Long bookingId;
    @NotNull
    @Min(1) @Max(5)
    private Integer rating;
    @NotBlank
    @Size(min = 10, max = 1000)
    private String comment;

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
