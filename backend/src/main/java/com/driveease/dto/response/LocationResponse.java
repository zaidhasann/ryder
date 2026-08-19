package com.driveease.dto.response;

public class LocationResponse {
    private Long id;
    private String name;
    private String city;
    private String state;
    private String address;
    private String phone;
    private Boolean isActive;
    private int totalCars;

    public LocationResponse() {
    }

    public LocationResponse(Long id, String name, String city, String state, String address, String phone, Boolean isActive, int totalCars) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.state = state;
        this.address = address;
        this.phone = phone;
        this.isActive = isActive;
        this.totalCars = totalCars;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public int getTotalCars() { return totalCars; }
    public void setTotalCars(int totalCars) { this.totalCars = totalCars; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String city;
        private String state;
        private String address;
        private String phone;
        private Boolean isActive;
        private int totalCars;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder isActive(Boolean isActive) { this.isActive = isActive; return this; }
        public Builder totalCars(int totalCars) { this.totalCars = totalCars; return this; }

        public LocationResponse build() {
            return new LocationResponse(id, name, city, state, address, phone, isActive, totalCars);
        }
    }
}
