package com.driveease.dto.response;

import com.driveease.entity.enums.Role;

import java.time.Instant;

public class UserResponse {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String fullName;
    private String phone;
    private String drivingLicense;
    private Role role;
    private String status;
    private Instant createdAt;
    private long totalBookings;

    public UserResponse() {
    }

    public UserResponse(Long id, String email, String firstName, String lastName, String fullName, String phone, String drivingLicense, Role role, String status, Instant createdAt, long totalBookings) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.phone = phone;
        this.drivingLicense = drivingLicense;
        this.role = role;
        this.status = status;
        this.createdAt = createdAt;
        this.totalBookings = totalBookings;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDrivingLicense() {
        return drivingLicense;
    }

    public void setDrivingLicense(String drivingLicense) {
        this.drivingLicense = drivingLicense;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String email;
        private String firstName;
        private String lastName;
        private String fullName;
        private String phone;
        private String drivingLicense;
        private Role role;
        private String status;
        private Instant createdAt;
        private long totalBookings;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder drivingLicense(String drivingLicense) {
            this.drivingLicense = drivingLicense;
            return this;
        }

        public Builder role(Role role) {
            this.role = role;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder createdAt(Instant createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder totalBookings(long totalBookings) {
            this.totalBookings = totalBookings;
            return this;
        }

        public UserResponse build() {
            return new UserResponse(id, email, firstName, lastName, fullName, phone, drivingLicense, role, status, createdAt, totalBookings);
        }
    }
}
