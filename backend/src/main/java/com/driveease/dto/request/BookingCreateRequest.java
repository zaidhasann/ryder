package com.driveease.dto.request;

import com.driveease.entity.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

public class BookingCreateRequest {
    @NotNull
    private Long carId;
    @NotNull
    private Long pickupLocationId;
    @NotNull
    private Long dropoffLocationId;
    @NotNull
    private Instant startTime;
    @NotNull
    private Instant endTime;
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

    public Instant getStartTime() { return startTime; }
    public void setStartTime(Instant startTime) { this.startTime = startTime; }

    public Instant getEndTime() { return endTime; }
    public void setEndTime(Instant endTime) { this.endTime = endTime; }

    public List<Long> getAddonIds() { return addonIds; }
    public void setAddonIds(List<Long> addonIds) { this.addonIds = addonIds; }

    public String getCustomerNotes() { return customerNotes; }
    public void setCustomerNotes(String customerNotes) { this.customerNotes = customerNotes; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
}
