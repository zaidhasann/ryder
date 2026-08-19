package com.driveease.mapper;

import com.driveease.dto.response.*;
import com.driveease.entity.*;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

@Component
public class BookingMapper {

    private final CarMapper carMapper;
    private final UserMapper userMapper;

    public BookingMapper(CarMapper carMapper, UserMapper userMapper) {
        this.carMapper = carMapper;
        this.userMapper = userMapper;
    }

    public BookingResponse toBookingResponse(Booking booking) {
        if (booking == null) return null;
        BookingResponse res = new BookingResponse();
        res.setId(booking.getId());
        res.setBookingNumber(booking.getBookingNumber());
        res.setStartTime(booking.getStartTime());
        res.setEndTime(booking.getEndTime());
        res.setRentalDays(booking.getRentalDays());
        res.setBasePricePerDay(booking.getBasePricePerDay());
        res.setBaseAmount(booking.getBaseAmount());
        res.setAddonAmount(booking.getAddonAmount());
        res.setTaxAmount(booking.getTaxAmount());
        res.setTotalAmount(booking.getTotalAmount());
        res.setStatus(booking.getStatus());
        res.setCustomerNotes(booking.getCustomerNotes());
        res.setCancellationReason(booking.getCancellationReason());
        res.setCreatedAt(booking.getCreatedAt());
        
        if (booking.getUser() != null) {
            res.setUserId(booking.getUser().getId());
            res.setUserFullName(booking.getUser().getFirstName() + " " + booking.getUser().getLastName());
            res.setUser(userMapper.toResponse(booking.getUser()));
        }
        
        if (booking.getCar() != null) {
            res.setCar(carMapper.toSummary(booking.getCar()));
        }
        
        if (booking.getPickupLocation() != null) {
            res.setPickupLocation(carMapper.toLocationResponse(booking.getPickupLocation()));
        }
        
        if (booking.getDropoffLocation() != null) {
            res.setDropoffLocation(carMapper.toLocationResponse(booking.getDropoffLocation()));
        }
        
        if (booking.getPayment() != null) {
            PaymentResponse p = new PaymentResponse();
            p.setId(booking.getPayment().getId());
            p.setTransactionId(booking.getPayment().getTransactionId());
            p.setAmount(booking.getPayment().getAmount());
            p.setPaymentMethod(booking.getPayment().getPaymentMethod());
            p.setPaymentStatus(booking.getPayment().getPaymentStatus());
            p.setPaymentDate(booking.getPayment().getPaymentDate());
            res.setPayment(p);
        }
        
        if (booking.getBookingAddons() != null) {
            res.setBookingAddons(booking.getBookingAddons().stream().map(a -> {
                BookingAddonItemResponse ba = new BookingAddonItemResponse();
                ba.setId(a.getId());
                if (a.getAddon() != null) {
                    ba.setAddon(carMapper.toAddonResponse(a.getAddon()));
                    ba.setAddonId(a.getAddon().getId());
                    ba.setName(a.getAddon().getName());
                }
                ba.setPriceAtBooking(a.getPriceAtBooking());
                ba.setQuantity(a.getQuantity());
                return ba;
            }).collect(Collectors.toList()));
        }
        
        return res;
    }
}
