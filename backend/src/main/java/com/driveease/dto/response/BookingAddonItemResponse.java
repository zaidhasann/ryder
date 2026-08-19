package com.driveease.dto.response;

import java.math.BigDecimal;

public class BookingAddonItemResponse {
    private Long id;
    private AddonResponse addon;
    private BigDecimal priceAtBooking;
    private Integer quantity;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public AddonResponse getAddon() { return addon; }
    public void setAddon(AddonResponse addon) { this.addon = addon; }
    public BigDecimal getPriceAtBooking() { return priceAtBooking; }
    public void setPriceAtBooking(BigDecimal priceAtBooking) { this.priceAtBooking = priceAtBooking; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
