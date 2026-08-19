package com.driveease.mapper;

import com.driveease.dto.response.*;
import com.driveease.entity.*;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

@Component
public class BookingMapper {

    public BookingResponse toBookingResponse(Booking booking) {
        if (booking == null) return null;
        BookingResponse res = new BookingResponse();
        res.setId(booking.getId());
        res.setStartTime(booking.getStartTime());
        res.setEndTime(booking.getEndTime());
        res.setBasePrice(booking.getBasePrice());
        res.setAddonPrice(booking.getAddonPrice());
        res.setTaxAmount(booking.getTaxAmount());
        res.setTotalPrice(booking.getTotalPrice());
        res.setStatus(booking.getStatus());
        res.setSpecialRequests(booking.getSpecialRequests());
        res.setCancelledAt(booking.getCancelledAt());
        res.setCancellationReason(booking.getCancellationReason());
        
        if (booking.getUser() != null) {
            res.setUserId(booking.getUser().getId());
            res.setUserFullName(booking.getUser().getFirstName() + " " + booking.getUser().getLastName());
        }
        
        if (booking.getCar() != null) {
            CarSummaryResponse carSummary = new CarSummaryResponse();
            carSummary.setId(booking.getCar().getId());
            carSummary.setBrand(booking.getCar().getBrand());
            carSummary.setModel(booking.getCar().getModel());
            carSummary.setYear(booking.getCar().getYear());
            carSummary.setPricePerDay(booking.getCar().getPricePerDay());
            if (booking.getCar().getImages() != null && !booking.getCar().getImages().isEmpty()) {
                carSummary.setPrimaryImageUrl(booking.getCar().getImages().get(0).getImageUrl());
            }
            res.setCar(carSummary);
        }
        
        LocationResponse pickup = new LocationResponse();
        pickup.setAddress(booking.getPickupLocation());
        res.setPickupLocation(pickup);
        
        LocationResponse dropoff = new LocationResponse();
        dropoff.setAddress(booking.getReturnLocation());
        res.setReturnLocation(dropoff);
        
        if (booking.getPayment() != null) {
            PaymentResponse p = new PaymentResponse();
            p.setId(booking.getPayment().getId());
            p.setAmount(booking.getPayment().getAmount());
            p.setStatus(booking.getPayment().getStatus());
            p.setPaymentMethod(booking.getPayment().getPaymentMethod());
            p.setTransactionId(booking.getPayment().getTransactionId());
            res.setPayment(p);
        }
        
        if (booking.getBookingAddons() != null) {
            res.setBookingAddons(booking.getBookingAddons().stream().map(a -> {
                BookingAddonItemResponse ba = new BookingAddonItemResponse();
                ba.setId(a.getId());
                if (a.getAddon() != null) {
                    ba.setAddonId(a.getAddon().getId());
                    ba.setName(a.getAddon().getName());
                }
                ba.setPriceAtBooking(a.getPriceAtBooking());
                return ba;
            }).collect(Collectors.toList()));
        }
        
        return res;
    }
}
