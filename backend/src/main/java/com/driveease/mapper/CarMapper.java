package com.driveease.mapper;

import com.driveease.dto.response.AddonResponse;
import com.driveease.dto.response.CarDetailResponse;
import com.driveease.dto.response.CarSummaryResponse;
import com.driveease.dto.response.LocationResponse;
import com.driveease.entity.Addon;
import com.driveease.entity.Car;
import com.driveease.entity.Location;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CarMapper {

    public CarSummaryResponse toSummary(Car car) {
        if (car == null) return null;
        CarSummaryResponse r = new CarSummaryResponse();
        r.setId(car.getId());
        r.setBrand(car.getBrand());
        r.setModel(car.getModel());
        r.setYear(car.getYear());
        r.setCategory(car.getCategory());
        r.setPricePerDay(car.getPricePerDay());
        r.setSeats(car.getSeats());
        r.setDoors(car.getDoors());
        r.setTransmission(car.getTransmission());
        r.setFuelType(car.getFuelType());
        r.setAirConditioned(car.getAirConditioned());
        r.setRatingAvg(car.getRatingAvg());
        r.setReviewCount(car.getReviewCount());
        
        if (car.getLocation() != null) {
            r.setLocationCity(car.getLocation().getCity());
            r.setLocationId(car.getLocation().getId());
        }
        
        // Primary image
        if (car.getImages() != null && !car.getImages().isEmpty()) {
            r.setImageUrls(car.getImages().stream().map(img -> img.getImageUrl()).collect(Collectors.toList()));
            car.getImages().stream()
                .filter(img -> Boolean.TRUE.equals(img.getIsPrimary()))
                .findFirst()
                .ifPresentOrElse(
                    img -> r.setThumbnailUrl(img.getImageUrl()),
                    () -> r.setThumbnailUrl(car.getImages().get(0).getImageUrl())
                );
        }
        return r;
    }

    public CarDetailResponse toDetail(Car car) {
        if (car == null) return null;
        CarDetailResponse r = new CarDetailResponse();
        r.setId(car.getId());
        r.setBrand(car.getBrand());
        r.setModel(car.getModel());
        r.setYear(car.getYear());
        r.setCategory(car.getCategory());
        r.setDescription(car.getDescription());
        r.setPricePerDay(car.getPricePerDay());
        r.setSeats(car.getSeats());
        r.setDoors(car.getDoors());
        r.setTransmission(car.getTransmission());
        r.setFuelType(car.getFuelType());
        r.setMileage(car.getMileage());
        r.setEngine(car.getEngine());
        r.setAirConditioned(car.getAirConditioned());
        r.setLuggageCapacity(car.getLuggageCapacity());
        r.setRatingAvg(car.getRatingAvg());
        r.setReviewCount(car.getReviewCount());
        r.setIsActive(car.getIsActive());
        
        if (car.getLocation() != null) {
            r.setLocation(toLocationResponse(car.getLocation()));
        }
        
        if (car.getImages() != null && !car.getImages().isEmpty()) {
            r.setImageUrls(car.getImages().stream()
                .map(img -> img.getImageUrl())
                .collect(Collectors.toList()));
            car.getImages().stream()
                .filter(img -> Boolean.TRUE.equals(img.getIsPrimary()))
                .findFirst()
                .ifPresentOrElse(
                    img -> r.setThumbnailUrl(img.getImageUrl()),
                    () -> r.setThumbnailUrl(car.getImages().get(0).getImageUrl())
                );
        }
        return r;
    }

    public LocationResponse toLocationResponse(Location loc) {
        if (loc == null) return null;
        LocationResponse r = new LocationResponse();
        r.setId(loc.getId());
        r.setName(loc.getName());
        r.setCity(loc.getCity());
        r.setState(loc.getState());
        r.setAddress(loc.getAddress());
        r.setPhone(loc.getPhone());
        r.setIsActive(loc.getIsActive());
        return r;
    }

    public AddonResponse toAddonResponse(Addon addon) {
        if (addon == null) return null;
        AddonResponse r = new AddonResponse();
        r.setId(addon.getId());
        r.setName(addon.getName());
        r.setDescription(addon.getDescription());
        r.setPricePerDay(addon.getPricePerDay());
        r.setIsActive(addon.getIsActive());
        return r;
    }
}
