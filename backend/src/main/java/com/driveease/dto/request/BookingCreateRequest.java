package com.driveease.dto.request;

import com.driveease.entity.enums.PaymentMethod;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import java.util.List;

public class BookingCreateRequest {
    @NotNull
    private Long carId;
    @NotNull
    private Long pickupLocationId;
    @NotNull
    private Long dropoffLocationId;
    @NotNull
    @Future
    private ZonedDateTime startTime;
    @NotNull
    private ZonedDateTime endTime;
    private List<Long> addonIds;
    private String customerNotes;
    @NotNull
    private PaymentMethod paymentMethod;

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }
    public Long getPickupLocationId() { return pickupLocationId; }
    public void setPickupLocationId(Long pickupLocationId) { this.pickupLocationId = pickupLocationId; }
    public Long getDropoffLocationId() { return dropoffLocationId; }
    public void setDropoffLocationId(Long dropoffLocationId) { this.dropoffLocationId = dropoffLocationId; }
    public ZonedDateTime getStartTime() { return startTime; }
    public void setStartTime(ZonedDateTime startTime) { this.startTime = startTime; }
    public ZonedDateTime getEndTime() { return endTime; }
    public void setEndTime(ZonedDateTime endTime) { this.endTime = endTime; }
    public List<Long> getAddonIds() { return addonIds; }
    public void setAddonIds(List<Long> addonIds) { this.addonIds = addonIds; }
    public String getCustomerNotes() { return customerNotes; }
    public void setCustomerNotes(String customerNotes) { this.customerNotes = customerNotes; }
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
}
