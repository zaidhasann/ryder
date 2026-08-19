package com.driveease.dto.request;

import com.driveease.entity.enums.BookingStatus;
import jakarta.validation.constraints.NotNull;

public class BookingStatusUpdateRequest {
    @NotNull
    private BookingStatus status;
    private String reason;

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
