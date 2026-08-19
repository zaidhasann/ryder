package com.driveease.service;

import com.driveease.dto.request.ChangePasswordRequest;
import com.driveease.dto.request.UpdateProfileRequest;
import com.driveease.dto.response.UserResponse;

public interface UserService {

    UserResponse getCurrentUserProfile(Long userId);

    UserResponse updateProfile(Long userId, UpdateProfileRequest request);

    void changePassword(Long userId, ChangePasswordRequest request);
}
