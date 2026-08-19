package com.driveease.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateProfileRequest {

    @NotBlank(message = "First name is required")
    @Size(min = 2, max = 60, message = "First name must be between 2 and 60 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 1, max = 60, message = "Last name must be between 1 and 60 characters")
    private String lastName;

    @Size(max = 20, message = "Phone number cannot exceed 20 characters")
    private String phone;

    @Size(max = 50, message = "Driving license cannot exceed 50 characters")
    private String drivingLicense;

    public UpdateProfileRequest() {
    }

    public UpdateProfileRequest(String firstName, String lastName, String phone, String drivingLicense) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.drivingLicense = drivingLicense;
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
}
