package com.driveease.dto.response;

import com.driveease.entity.enums.CarCategory;
import com.driveease.entity.enums.FuelType;
import com.driveease.entity.enums.Transmission;

import java.math.BigDecimal;

public class CarSummaryResponse {
    private Long id;
    private String brand;
    private String model;
    private Integer year;
    private CarCategory category;
    private BigDecimal pricePerDay;
    private Integer seats;
    private Integer doors;
    private Transmission transmission;
    private FuelType fuelType;
    private Boolean airConditioned;
    private BigDecimal ratingAvg;
    private Integer reviewCount;
    private String thumbnailUrl;
    private String locationCity;
    private Long locationId;
    private Boolean isWishlisted;

    public CarSummaryResponse() {
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public CarCategory getCategory() { return category; }
    public void setCategory(CarCategory category) { this.category = category; }

    public BigDecimal getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; }

    public Integer getSeats() { return seats; }
    public void setSeats(Integer seats) { this.seats = seats; }

    public Integer getDoors() { return doors; }
    public void setDoors(Integer doors) { this.doors = doors; }

    public Transmission getTransmission() { return transmission; }
    public void setTransmission(Transmission transmission) { this.transmission = transmission; }

    public FuelType getFuelType() { return fuelType; }
    public void setFuelType(FuelType fuelType) { this.fuelType = fuelType; }

    public Boolean getAirConditioned() { return airConditioned; }
    public void setAirConditioned(Boolean airConditioned) { this.airConditioned = airConditioned; }

    public BigDecimal getRatingAvg() { return ratingAvg; }
    public void setRatingAvg(BigDecimal ratingAvg) { this.ratingAvg = ratingAvg; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getLocationCity() { return locationCity; }
    public void setLocationCity(String locationCity) { this.locationCity = locationCity; }

    public Long getLocationId() { return locationId; }
    public void setLocationId(Long locationId) { this.locationId = locationId; }

    public Boolean getIsWishlisted() { return isWishlisted; }
    public void setIsWishlisted(Boolean isWishlisted) { this.isWishlisted = isWishlisted; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String brand;
        private String model;
        private Integer year;
        private CarCategory category;
        private BigDecimal pricePerDay;
        private Integer seats;
        private Integer doors;
        private Transmission transmission;
        private FuelType fuelType;
        private Boolean airConditioned;
        private BigDecimal ratingAvg;
        private Integer reviewCount;
        private String thumbnailUrl;
        private String locationCity;
        private Long locationId;
        private Boolean isWishlisted;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder model(String model) { this.model = model; return this; }
        public Builder year(Integer year) { this.year = year; return this; }
        public Builder category(CarCategory category) { this.category = category; return this; }
        public Builder pricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; return this; }
        public Builder seats(Integer seats) { this.seats = seats; return this; }
        public Builder doors(Integer doors) { this.doors = doors; return this; }
        public Builder transmission(Transmission transmission) { this.transmission = transmission; return this; }
        public Builder fuelType(FuelType fuelType) { this.fuelType = fuelType; return this; }
        public Builder airConditioned(Boolean airConditioned) { this.airConditioned = airConditioned; return this; }
        public Builder ratingAvg(BigDecimal ratingAvg) { this.ratingAvg = ratingAvg; return this; }
        public Builder reviewCount(Integer reviewCount) { this.reviewCount = reviewCount; return this; }
        public Builder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public Builder locationCity(String locationCity) { this.locationCity = locationCity; return this; }
        public Builder locationId(Long locationId) { this.locationId = locationId; return this; }
        public Builder isWishlisted(Boolean isWishlisted) { this.isWishlisted = isWishlisted; return this; }

        public CarSummaryResponse build() {
            CarSummaryResponse r = new CarSummaryResponse();
            r.id = this.id; r.brand = this.brand; r.model = this.model; r.year = this.year;
            r.category = this.category; r.pricePerDay = this.pricePerDay; r.seats = this.seats;
            r.doors = this.doors; r.transmission = this.transmission; r.fuelType = this.fuelType;
            r.airConditioned = this.airConditioned; r.ratingAvg = this.ratingAvg;
            r.reviewCount = this.reviewCount; r.thumbnailUrl = this.thumbnailUrl;
            r.locationCity = this.locationCity; r.locationId = this.locationId;
            r.isWishlisted = this.isWishlisted;
            return r;
        }
    }
}
