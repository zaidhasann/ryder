package com.driveease.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "addons")
public class Addon extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 80)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    @DecimalMin("0.0")
    @Column(name = "price_per_day", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerDay;

    @Column(name = "icon_name", length = 60)
    private String iconName;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "addon", cascade = CascadeType.ALL)
    private List<BookingAddon> bookingAddons = new ArrayList<>();

    public Addon() {
    }

    public Addon(Long id, String name, String description, BigDecimal pricePerDay, String iconName, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.iconName = iconName;
        this.isActive = isActive != null ? isActive : true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public List<BookingAddon> getBookingAddons() { return bookingAddons; }
    public void setBookingAddons(List<BookingAddon> bookingAddons) { this.bookingAddons = bookingAddons; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private BigDecimal pricePerDay;
        private String iconName;
        private Boolean isActive = true;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder pricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; return this; }
        public Builder iconName(String iconName) { this.iconName = iconName; return this; }
        public Builder isActive(Boolean isActive) { this.isActive = isActive; return this; }

        public Addon build() {
            return new Addon(id, name, description, pricePerDay, iconName, isActive);
        }
    }
}
