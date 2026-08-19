package com.driveease.dto.response;

import com.driveease.entity.enums.CarCategory;
import com.driveease.entity.enums.FuelType;
import com.driveease.entity.enums.Transmission;

import java.math.BigDecimal;
import java.util.List;

public class CarDetailResponse {
    private Long id;
    private String brand;
    private String model;
    private Integer year;
    private CarCategory category;
    private String description;
    private BigDecimal pricePerDay;
    private Integer seats;
    private Integer doors;
    private Transmission transmission;
    private FuelType fuelType;
    private String mileage;
    private String engine;
    private Boolean airConditioned;
    private Integer luggageCapacity;
    private BigDecimal ratingAvg;
    private Integer reviewCount;
    private Boolean isActive;
    private List<String> imageUrls;
    private String thumbnailUrl;
    private LocationResponse location;
    private Boolean isWishlisted;

    public CarDetailResponse() {
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

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

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

    public String getMileage() { return mileage; }
    public void setMileage(String mileage) { this.mileage = mileage; }

    public String getEngine() { return engine; }
    public void setEngine(String engine) { this.engine = engine; }

    public Boolean getAirConditioned() { return airConditioned; }
    public void setAirConditioned(Boolean airConditioned) { this.airConditioned = airConditioned; }

    public Integer getLuggageCapacity() { return luggageCapacity; }
    public void setLuggageCapacity(Integer luggageCapacity) { this.luggageCapacity = luggageCapacity; }

    public BigDecimal getRatingAvg() { return ratingAvg; }
    public void setRatingAvg(BigDecimal ratingAvg) { this.ratingAvg = ratingAvg; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public LocationResponse getLocation() { return location; }
    public void setLocation(LocationResponse location) { this.location = location; }

    public Boolean getIsWishlisted() { return isWishlisted; }
    public void setIsWishlisted(Boolean isWishlisted) { this.isWishlisted = isWishlisted; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id; private String brand; private String model; private Integer year;
        private CarCategory category; private String description; private BigDecimal pricePerDay;
        private Integer seats; private Integer doors; private Transmission transmission;
        private FuelType fuelType; private String mileage; private String engine;
        private Boolean airConditioned; private Integer luggageCapacity;
        private BigDecimal ratingAvg; private Integer reviewCount;
        private Boolean isActive; private List<String> imageUrls; private String thumbnailUrl;
        private LocationResponse location; private Boolean isWishlisted;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder brand(String brand) { this.brand = brand; return this; }
        public Builder model(String model) { this.model = model; return this; }
        public Builder year(Integer year) { this.year = year; return this; }
        public Builder category(CarCategory category) { this.category = category; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder pricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; return this; }
        public Builder seats(Integer seats) { this.seats = seats; return this; }
        public Builder doors(Integer doors) { this.doors = doors; return this; }
        public Builder transmission(Transmission transmission) { this.transmission = transmission; return this; }
        public Builder fuelType(FuelType fuelType) { this.fuelType = fuelType; return this; }
        public Builder mileage(String mileage) { this.mileage = mileage; return this; }
        public Builder engine(String engine) { this.engine = engine; return this; }
        public Builder airConditioned(Boolean airConditioned) { this.airConditioned = airConditioned; return this; }
        public Builder luggageCapacity(Integer luggageCapacity) { this.luggageCapacity = luggageCapacity; return this; }
        public Builder ratingAvg(BigDecimal ratingAvg) { this.ratingAvg = ratingAvg; return this; }
        public Builder reviewCount(Integer reviewCount) { this.reviewCount = reviewCount; return this; }
        public Builder isActive(Boolean isActive) { this.isActive = isActive; return this; }
        public Builder imageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; return this; }
        public Builder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public Builder location(LocationResponse location) { this.location = location; return this; }
        public Builder isWishlisted(Boolean isWishlisted) { this.isWishlisted = isWishlisted; return this; }

        public CarDetailResponse build() {
            CarDetailResponse r = new CarDetailResponse();
            r.id = this.id; r.brand = this.brand; r.model = this.model; r.year = this.year;
            r.category = this.category; r.description = this.description; r.pricePerDay = this.pricePerDay;
            r.seats = this.seats; r.doors = this.doors; r.transmission = this.transmission;
            r.fuelType = this.fuelType; r.mileage = this.mileage; r.engine = this.engine;
            r.airConditioned = this.airConditioned; r.luggageCapacity = this.luggageCapacity;
            r.ratingAvg = this.ratingAvg; r.reviewCount = this.reviewCount; r.isActive = this.isActive;
            r.imageUrls = this.imageUrls; r.thumbnailUrl = this.thumbnailUrl;
            r.location = this.location; r.isWishlisted = this.isWishlisted;
            return r;
        }
    }
}
