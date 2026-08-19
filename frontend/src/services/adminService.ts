import apiClient from './api';
import { ApiResponse, PageResponse, Booking, User, AdminStats } from '../types';

export const adminService = {
  async getStats(): Promise<AdminStats> {
    const response = await apiClient.get<ApiResponse<AdminStats>>('/admin/stats');
    return response.data.data;
  },

  async getAllBookings(page = 0, size = 10, status?: string): Promise<PageResponse<Booking>> {
    const response = await apiClient.get<ApiResponse<PageResponse<Booking>>>('/admin/bookings', {
      params: { page, size, ...(status ? { status } : {}) },
    });
    return response.data.data;
  },

  async updateBookingStatus(id: number, status: string, reason?: string): Promise<Booking> {
    const response = await apiClient.put<ApiResponse<Booking>>(`/admin/bookings/${id}/status`, { status, reason });
    return response.data.data;
  },

  async getAllUsers(page = 0, size = 10): Promise<PageResponse<User>> {
    const response = await apiClient.get<ApiResponse<PageResponse<User>>>('/admin/users', { params: { page, size } });
    return response.data.data;
  },
};

export default adminService;
