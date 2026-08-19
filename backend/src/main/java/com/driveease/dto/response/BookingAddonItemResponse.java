package com.driveease.dto.response;

import java.math.BigDecimal;

public class BookingAddonItemResponse {
    private Long id;
    private AddonResponse addon;
    private Long addonId;
    private String addonName;
    private BigDecimal priceAtBooking;
    private Integer quantity;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public AddonResponse getAddon() { return addon; }
    public void setAddon(AddonResponse addon) { 
        this.addon = addon; 
        if (addon != null) {
            this.addonId = addon.getId();
            this.addonName = addon.getName();
        }
    }

    public Long getAddonId() { return addonId; }
    public void setAddonId(Long addonId) { this.addonId = addonId; }

    public String getName() { return addonName; }
    public void setName(String name) { this.addonName = name; }

    public String getAddonName() { return addonName; }
    public void setAddonName(String addonName) { this.addonName = addonName; }

    public BigDecimal getPriceAtBooking() { return priceAtBooking; }
    public void setPriceAtBooking(BigDecimal priceAtBooking) { this.priceAtBooking = priceAtBooking; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
