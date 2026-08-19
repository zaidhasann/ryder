import apiClient from './api';
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  User,
} from '../types';

export const authService = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', {
      refreshToken,
    });
    return response.data.data;
  },

  async logout(refreshToken?: string): Promise<void> {
    try {
      await apiClient.post('/auth/logout', { refreshToken });
    } catch {
      // Ignore network errors on logout
    }
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    return response.data.data;
  },

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>('/users/me', data);
    return response.data.data;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.put('/users/me/password', { currentPassword, newPassword });
  },
};

export default authService;
