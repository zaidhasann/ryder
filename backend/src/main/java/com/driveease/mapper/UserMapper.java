package com.driveease.mapper;

import com.driveease.dto.response.UserResponse;
import com.driveease.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toUserResponse(User user, long totalBookings) {
        if (user == null) {
            return null;
        }
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .drivingLicense(user.getDrivingLicense())
                .role(user.getRole())
                .status(user.getStatus())
                .createdAt(user.getCreatedAt())
                .totalBookings(totalBookings)
                .build();
    }

    public UserResponse toUserResponse(User user) {
        return toUserResponse(user, user.getBookings() != null ? user.getBookings().size() : 0);
    }
}
