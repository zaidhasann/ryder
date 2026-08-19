package com.driveease.dto.request;

import com.driveease.entity.enums.CarCategory;
import com.driveease.entity.enums.FuelType;
import com.driveease.entity.enums.Transmission;

import java.math.BigDecimal;
import java.time.Instant;

public class CarSearchCriteria {

    private String keyword;
    private CarCategory category;
    private FuelType fuelType;
    private Transmission transmission;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Integer minSeats;
    private Long locationId;
    private Boolean airConditioned;
    private String brand;
    private Instant startTime;
    private Instant endTime;
    private String sortBy = "pricePerDay";
    private String sortDir = "asc";
    private int page = 0;
    private int size = 12;

    public CarSearchCriteria() {
    }

    public String getKeyword() { return keyword; }
    public void setKeyword(String keyword) { this.keyword = keyword; }

    public CarCategory getCategory() { return category; }
    public void setCategory(CarCategory category) { this.category = category; }

    public FuelType getFuelType() { return fuelType; }
    public void setFuelType(FuelType fuelType) { this.fuelType = fuelType; }

    public Transmission getTransmission() { return transmission; }
    public void setTransmission(Transmission transmission) { this.transmission = transmission; }

    public BigDecimal getMinPrice() { return minPrice; }
    public void setMinPrice(BigDecimal minPrice) { this.minPrice = minPrice; }

    public BigDecimal getMaxPrice() { return maxPrice; }
    public void setMaxPrice(BigDecimal maxPrice) { this.maxPrice = maxPrice; }

    public Integer getMinSeats() { return minSeats; }
    public void setMinSeats(Integer minSeats) { this.minSeats = minSeats; }

    public Long getLocationId() { return locationId; }
    public void setLocationId(Long locationId) { this.locationId = locationId; }

    public Boolean getAirConditioned() { return airConditioned; }
    public void setAirConditioned(Boolean airConditioned) { this.airConditioned = airConditioned; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public Instant getStartTime() { return startTime; }
    public void setStartTime(Instant startTime) { this.startTime = startTime; }

    public Instant getEndTime() { return endTime; }
    public void setEndTime(Instant endTime) { this.endTime = endTime; }

    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }

    public String getSortDir() { return sortDir; }
    public void setSortDir(String sortDir) { this.sortDir = sortDir; }

    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }
}
