package com.driveease.dto.response;

import java.time.ZonedDateTime;

public class WishlistResponse {
    private Long id;
    private CarSummaryResponse car;
    private ZonedDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public CarSummaryResponse getCar() { return car; }
    public void setCar(CarSummaryResponse car) { this.car = car; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
