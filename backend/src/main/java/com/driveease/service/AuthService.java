package com.driveease.service;

import com.driveease.dto.request.LoginRequest;
import com.driveease.dto.request.RefreshTokenRequest;
import com.driveease.dto.request.RegisterRequest;
import com.driveease.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse refreshToken(RefreshTokenRequest request);

    void logout(String refreshToken);
}
