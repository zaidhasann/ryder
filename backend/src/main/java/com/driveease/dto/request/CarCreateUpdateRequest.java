package com.driveease.dto.request;

import com.driveease.entity.enums.CarCategory;
import com.driveease.entity.enums.FuelType;
import com.driveease.entity.enums.Transmission;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public class CarCreateUpdateRequest {

    @NotBlank(message = "Brand is required")
    @Size(max = 60)
    private String brand;

    @NotBlank(message = "Model is required")
    @Size(max = 60)
    private String model;

    @NotNull(message = "Year is required")
    @Min(value = 1990, message = "Year must be 1990 or later")
    @Max(value = 2030, message = "Year must be realistic")
    private Integer year;

    @NotNull(message = "Category is required")
    private CarCategory category;

    private String description;

    @NotNull(message = "Price per day is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than zero")
    private BigDecimal pricePerDay;

    @Min(value = 1, message = "Seats must be at least 1")
    @Max(value = 20, message = "Seats must be at most 20")
    private Integer seats = 5;

    @Min(value = 2, message = "Doors must be at least 2")
    @Max(value = 8)
    private Integer doors = 4;

    @NotNull(message = "Transmission is required")
    private Transmission transmission;

    @NotNull(message = "Fuel type is required")
    private FuelType fuelType;

    private String mileage;
    private String engine;
    private Boolean airConditioned = true;

    @Min(0)
    private Integer luggageCapacity = 2;

    @NotNull(message = "Location is required")
    private Long locationId;

    private List<String> imageUrls;

    public CarCreateUpdateRequest() {
    }

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

    public Long getLocationId() { return locationId; }
    public void setLocationId(Long locationId) { this.locationId = locationId; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
}
