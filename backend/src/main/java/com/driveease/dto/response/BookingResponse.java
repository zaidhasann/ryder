package com.driveease.dto.response;

import com.driveease.entity.enums.BookingStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public class BookingResponse {
    private Long id;
    private String bookingNumber;
    private Long userId;
    private String userFullName;
    private UserResponse user;
    private CarSummaryResponse car;
    private LocationResponse pickupLocation;
    private LocationResponse dropoffLocation;
    private Instant startTime;
    private Instant endTime;
    private Integer rentalDays;
    private BigDecimal basePricePerDay;
    private BigDecimal baseAmount;
    private BigDecimal addonAmount;
    private BigDecimal taxAmount;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private String customerNotes;
    private String cancellationReason;
    private List<BookingAddonItemResponse> bookingAddons;
    private PaymentResponse payment;
    private Instant createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBookingNumber() { return bookingNumber; }
    public void setBookingNumber(String bookingNumber) { this.bookingNumber = bookingNumber; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserFullName() { return userFullName; }
    public void setUserFullName(String userFullName) { this.userFullName = userFullName; }

    public UserResponse getUser() { return user; }
    public void setUser(UserResponse user) { this.user = user; }

    public CarSummaryResponse getCar() { return car; }
    public void setCar(CarSummaryResponse car) { this.car = car; }

    public LocationResponse getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(LocationResponse pickupLocation) { this.pickupLocation = pickupLocation; }

    public LocationResponse getDropoffLocation() { return dropoffLocation; }
    public void setDropoffLocation(LocationResponse dropoffLocation) { this.dropoffLocation = dropoffLocation; }

    public Instant getStartTime() { return startTime; }
    public void setStartTime(Instant startTime) { this.startTime = startTime; }

    public Instant getEndTime() { return endTime; }
    public void setEndTime(Instant endTime) { this.endTime = endTime; }

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

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public String getCustomerNotes() { return customerNotes; }
    public void setCustomerNotes(String customerNotes) { this.customerNotes = customerNotes; }

    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }

    public List<BookingAddonItemResponse> getBookingAddons() { return bookingAddons; }
    public void setBookingAddons(List<BookingAddonItemResponse> bookingAddons) { this.bookingAddons = bookingAddons; }

    public PaymentResponse getPayment() { return payment; }
    public void setPayment(PaymentResponse payment) { this.payment = payment; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
