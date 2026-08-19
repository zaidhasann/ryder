package com.driveease.dto.response;

public class AddonResponse {
    private Long id;
    private String name;
    private String description;
    private java.math.BigDecimal pricePerDay;
    private String iconName;
    private Boolean isActive;

    public AddonResponse() {
    }

    public AddonResponse(Long id, String name, String description, java.math.BigDecimal pricePerDay, String iconName, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.iconName = iconName;
        this.isActive = isActive;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public java.math.BigDecimal getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(java.math.BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private java.math.BigDecimal pricePerDay;
        private String iconName;
        private Boolean isActive;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder pricePerDay(java.math.BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; return this; }
        public Builder iconName(String iconName) { this.iconName = iconName; return this; }
        public Builder isActive(Boolean isActive) { this.isActive = isActive; return this; }

        public AddonResponse build() {
            return new AddonResponse(id, name, description, pricePerDay, iconName, isActive);
        }
    }
}
