package com.driveease.dto.response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PriceBreakdownResponse {
    private Integer rentalDays;
    private BigDecimal basePricePerDay;
    private BigDecimal baseAmount;
    private BigDecimal addonAmount;
    private BigDecimal taxAmount;
    private BigDecimal totalAmount;
    private List<BreakdownItem> breakdownItems = new ArrayList<>();

    public static class BreakdownItem {
        private String label;
        private BigDecimal amount;

        public BreakdownItem() {
        }

        public BreakdownItem(String label, BigDecimal amount) {
            this.label = label;
            this.amount = amount;
        }

        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }
        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
    }

    public Integer getRentalDays() { return rentalDays; }
    public void setRentalDays(Integer rentalDays) { this.rentalDays = rentalDays; }

    public BigDecimal getBasePricePerDay() { return basePricePerDay; }
    public void setBasePricePerDay(BigDecimal basePricePerDay) { this.basePricePerDay = basePricePerDay; }

    public BigDecimal getBaseAmount() { return baseAmount; }
    public void setBaseAmount(BigDecimal baseAmount) { this.baseAmount = baseAmount; }

    public BigDecimal getAddonAmount() { return addonAmount; }
    public void setAddonAmount(BigDecimal addonAmount) { this.addonAmount = addonAmount; }

    public BigDecimal getTaxAmount() { return taxAmount; }
    public void setTaxAmount(BigDecimal taxAmount) { this.taxAmount = taxAmount; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public List<BreakdownItem> getBreakdownItems() { return breakdownItems; }
    public void setBreakdownItems(List<BreakdownItem> breakdownItems) { this.breakdownItems = breakdownItems; }

    public List<BreakdownItem> getItems() { return breakdownItems; }
    public void setItems(List<BreakdownItem> items) { this.breakdownItems = items; }
}
