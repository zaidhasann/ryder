package com.driveease.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Table(name = "booking_addons")
public class BookingAddon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "addon_id", nullable = false)
    private Addon addon;

    @NotNull
    @DecimalMin("0.0")
    @Column(name = "price_at_booking", nullable = false, precision = 10, scale = 2)
    private BigDecimal priceAtBooking;

    public BookingAddon() {
    }

    public BookingAddon(Long id, Booking booking, Addon addon, BigDecimal priceAtBooking) {
        this.id = id;
        this.booking = booking;
        this.addon = addon;
        this.priceAtBooking = priceAtBooking;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public Addon getAddon() { return addon; }
    public void setAddon(Addon addon) { this.addon = addon; }

    public BigDecimal getPriceAtBooking() { return priceAtBooking; }
    public void setPriceAtBooking(BigDecimal priceAtBooking) { this.priceAtBooking = priceAtBooking; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Booking booking;
        private Addon addon;
        private BigDecimal priceAtBooking;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder booking(Booking booking) { this.booking = booking; return this; }
        public Builder addon(Addon addon) { this.addon = addon; return this; }
        public Builder priceAtBooking(BigDecimal priceAtBooking) { this.priceAtBooking = priceAtBooking; return this; }

        public BookingAddon build() {
            return new BookingAddon(id, booking, addon, priceAtBooking);
        }
    }
}
