package com.driveease.dto.request;

import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

public class PriceCalculationRequest {
    @NotNull
    private Long carId;
    @NotNull
    private Instant startTime;
    @NotNull
    private Instant endTime;
    private List<Long> addonIds;

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }

    public Instant getStartTime() { return startTime; }
    public void setStartTime(Instant startTime) { this.startTime = startTime; }

    public Instant getEndTime() { return endTime; }
    public void setEndTime(Instant endTime) { this.endTime = endTime; }

    public List<Long> getAddonIds() { return addonIds; }
    public void setAddonIds(List<Long> addonIds) { this.addonIds = addonIds; }
}
