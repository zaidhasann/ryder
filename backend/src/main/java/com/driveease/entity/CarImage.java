package com.driveease.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "car_images")
public class CarImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @NotBlank
    @Column(name = "image_url", nullable = false, columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "alt_text", length = 150)
    private String altText;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;

    @Column(name = "is_primary", nullable = false)
    private Boolean isPrimary = false;

    public CarImage() {
    }

    public CarImage(Long id, Car car, String imageUrl, String altText, Integer sortOrder, Boolean isPrimary) {
        this.id = id;
        this.car = car;
        this.imageUrl = imageUrl;
        this.altText = altText;
        this.sortOrder = sortOrder != null ? sortOrder : 0;
        this.isPrimary = isPrimary != null ? isPrimary : false;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getAltText() { return altText; }
    public void setAltText(String altText) { this.altText = altText; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Boolean getIsPrimary() { return isPrimary; }
    public void setIsPrimary(Boolean isPrimary) { this.isPrimary = isPrimary; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Car car;
        private String imageUrl;
        private String altText;
        private Integer sortOrder = 0;
        private Boolean isPrimary = false;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder car(Car car) { this.car = car; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder altText(String altText) { this.altText = altText; return this; }
        public Builder sortOrder(Integer sortOrder) { this.sortOrder = sortOrder; return this; }
        public Builder isPrimary(Boolean isPrimary) { this.isPrimary = isPrimary; return this; }

        public CarImage build() {
            return new CarImage(id, car, imageUrl, altText, sortOrder, isPrimary);
        }
    }
}
