package com.driveease.entity;

import com.driveease.entity.enums.CarCategory;
import com.driveease.entity.enums.FuelType;
import com.driveease.entity.enums.Transmission;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
public class Car extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 60)
    private String brand;

    @NotBlank
    @Column(nullable = false, length = 60)
    private String model;

    @NotNull
    @Column(nullable = false)
    private Integer year;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private CarCategory category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    @DecimalMin("0.0")
    @Column(name = "price_per_day", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerDay;

    @NotNull
    @Min(1)
    @Column(nullable = false)
    private Integer seats = 5;

    @NotNull
    @Min(2)
    @Column(nullable = false)
    private Integer doors = 4;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Transmission transmission;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "fuel_type", nullable = false, length = 20)
    private FuelType fuelType;

    @Column(length = 30)
    private String mileage;

    @Column(length = 50)
    private String engine;

    @Column(name = "air_conditioned", nullable = false)
    private Boolean airConditioned = true;

    @Column(name = "luggage_capacity", nullable = false)
    private Integer luggageCapacity = 2;

    @Column(name = "rating_avg", precision = 3, scale = 2)
    private BigDecimal ratingAvg = BigDecimal.ZERO;

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("sortOrder ASC")
    private List<CarImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Booking> bookings = new ArrayList<>();

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    public Car() {
    }

    public Car(Long id, String brand, String model, Integer year, CarCategory category, String description, BigDecimal pricePerDay, Integer seats, Integer doors, Transmission transmission, FuelType fuelType, String mileage, String engine, Boolean airConditioned, Integer luggageCapacity, BigDecimal ratingAvg, Integer reviewCount, Boolean isActive, Location location) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.category = category;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.seats = seats != null ? seats : 5;
        this.doors = doors != null ? doors : 4;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.mileage = mileage;
        this.engine = engine;
        this.airConditioned = airConditioned != null ? airConditioned : true;
        this.luggageCapacity = luggageCapacity != null ? luggageCapacity : 2;
        this.ratingAvg = ratingAvg != null ? ratingAvg : BigDecimal.ZERO;
        this.reviewCount = reviewCount != null ? reviewCount : 0;
        this.isActive = isActive != null ? isActive : true;
        this.location = location;
    }

    public void addImage(CarImage image) {
        images.add(image);
        image.setCar(this);
    }

    public void removeImage(CarImage image) {
        images.remove(image);
        image.setCar(null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public CarCategory getCategory() {
        return category;
    }

    public void setCategory(CarCategory category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(BigDecimal pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public Integer getDoors() {
        return doors;
    }

    public void setDoors(Integer doors) {
        this.doors = doors;
    }

    public Transmission getTransmission() {
        return transmission;
    }

    public void setTransmission(Transmission transmission) {
        this.transmission = transmission;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }

    public String getMileage() {
        return mileage;
    }

    public void setMileage(String mileage) {
        this.mileage = mileage;
    }

    public String getEngine() {
        return engine;
    }

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public Boolean getAirConditioned() {
        return airConditioned;
    }

    public void setAirConditioned(Boolean airConditioned) {
        this.airConditioned = airConditioned;
    }

    public Integer getLuggageCapacity() {
        return luggageCapacity;
    }

    public void setLuggageCapacity(Integer luggageCapacity) {
        this.luggageCapacity = luggageCapacity;
    }

    public BigDecimal getRatingAvg() {
        return ratingAvg;
    }

    public void setRatingAvg(BigDecimal ratingAvg) {
        this.ratingAvg = ratingAvg;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<CarImage> getImages() {
        return images;
    }

    public void setImages(List<CarImage> images) {
        this.images = images;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String brand;
        private String model;
        private Integer year;
        private CarCategory category;
        private String description;
        private BigDecimal pricePerDay;
        private Integer seats = 5;
        private Integer doors = 4;
        private Transmission transmission;
        private FuelType fuelType;
        private String mileage;
        private String engine;
        private Boolean airConditioned = true;
        private Integer luggageCapacity = 2;
        private BigDecimal ratingAvg = BigDecimal.ZERO;
        private Integer reviewCount = 0;
        private Boolean isActive = true;
        private Location location;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder brand(String brand) {
            this.brand = brand;
            return this;
        }

        public Builder model(String model) {
            this.model = model;
            return this;
        }

        public Builder year(Integer year) {
            this.year = year;
            return this;
        }

        public Builder category(CarCategory category) {
            this.category = category;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder pricePerDay(BigDecimal pricePerDay) {
            this.pricePerDay = pricePerDay;
            return this;
        }

        public Builder seats(Integer seats) {
            this.seats = seats;
            return this;
        }

        public Builder doors(Integer doors) {
            this.doors = doors;
            return this;
        }

        public Builder transmission(Transmission transmission) {
            this.transmission = transmission;
            return this;
        }

        public Builder fuelType(FuelType fuelType) {
            this.fuelType = fuelType;
            return this;
        }

        public Builder mileage(String mileage) {
            this.mileage = mileage;
            return this;
        }

        public Builder engine(String engine) {
            this.engine = engine;
            return this;
        }

        public Builder airConditioned(Boolean airConditioned) {
            this.airConditioned = airConditioned;
            return this;
        }

        public Builder luggageCapacity(Integer luggageCapacity) {
            this.luggageCapacity = luggageCapacity;
            return this;
        }

        public Builder ratingAvg(BigDecimal ratingAvg) {
            this.ratingAvg = ratingAvg;
            return this;
        }

        public Builder reviewCount(Integer reviewCount) {
            this.reviewCount = reviewCount;
            return this;
        }

        public Builder isActive(Boolean isActive) {
            this.isActive = isActive;
            return this;
        }

        public Builder location(Location location) {
            this.location = location;
            return this;
        }

        public Car build() {
            return new Car(id, brand, model, year, category, description, pricePerDay, seats, doors, transmission, fuelType, mileage, engine, airConditioned, luggageCapacity, ratingAvg, reviewCount, isActive, location);
        }
    }
}
