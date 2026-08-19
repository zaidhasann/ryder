package com.driveease.dto.request;

import jakarta.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.List;

public class PriceCalculationRequest {
    @NotNull
    private Long carId;
    @NotNull
    private ZonedDateTime startTime;
    @NotNull
    private ZonedDateTime endTime;
    private List<Long> addonIds;

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }
    public ZonedDateTime getStartTime() { return startTime; }
    public void setStartTime(ZonedDateTime startTime) { this.startTime = startTime; }
    public ZonedDateTime getEndTime() { return endTime; }
    public void setEndTime(ZonedDateTime endTime) { this.endTime = endTime; }
    public List<Long> getAddonIds() { return addonIds; }
    public void setAddonIds(List<Long> addonIds) { this.addonIds = addonIds; }
}
