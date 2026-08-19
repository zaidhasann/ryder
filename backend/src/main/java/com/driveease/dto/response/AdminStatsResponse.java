package com.driveease.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class AdminStatsResponse {
    private Long totalCars;
    private Long availableCars;
    private Long activeRentals;
    private Long totalBookings;
    private Long totalUsers;
    private BigDecimal grossRevenue;
    private Long cancelledBookings;

    public Long getTotalCars() { return totalCars; }
    public void setTotalCars(Long totalCars) { this.totalCars = totalCars; }
    public Long getAvailableCars() { return availableCars; }
    public void setAvailableCars(Long availableCars) { this.availableCars = availableCars; }
    public Long getActiveRentals() { return activeRentals; }
    public void setActiveRentals(Long activeRentals) { this.activeRentals = activeRentals; }
    public Long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(Long totalBookings) { this.totalBookings = totalBookings; }
    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
    public BigDecimal getGrossRevenue() { return grossRevenue; }
    public void setGrossRevenue(BigDecimal grossRevenue) { this.grossRevenue = grossRevenue; }
    public Long getCancelledBookings() { return cancelledBookings; }
    public void setCancelledBookings(Long cancelledBookings) { this.cancelledBookings = cancelledBookings; }
}
