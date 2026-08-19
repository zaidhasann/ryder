package com.driveease.dto.response;

import java.time.Instant;

public class WishlistResponse {
    private Long id;
    private CarSummaryResponse car;
    private Instant createdAt;

    public WishlistResponse() {
    }

    public WishlistResponse(Long id, CarSummaryResponse car, Instant createdAt) {
        this.id = id;
        this.car = car;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public CarSummaryResponse getCar() { return car; }
    public void setCar(CarSummaryResponse car) { this.car = car; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
