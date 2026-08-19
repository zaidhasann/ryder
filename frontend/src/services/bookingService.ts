import apiClient from './api';
import { ApiResponse, PageResponse, Booking, BookingCreateRequest, PriceCalculationRequest, PriceBreakdownResponse } from '../types';

export const bookingService = {
  async calculatePrice(data: PriceCalculationRequest): Promise<PriceBreakdownResponse> {
    const response = await apiClient.post<ApiResponse<PriceBreakdownResponse>>('/bookings/calculate-price', data);
    return response.data.data;
  },

  async createBooking(data: BookingCreateRequest): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>('/bookings', data);
    return response.data.data;
  },

  async getMyBookings(page = 0, size = 10): Promise<PageResponse<Booking>> {
    const response = await apiClient.get<ApiResponse<PageResponse<Booking>>>('/bookings', { params: { page, size } });
    return response.data.data;
  },

  async getBookingById(id: number): Promise<Booking> {
    const response = await apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`);
    return response.data.data;
  },

  async cancelBooking(id: number, reason?: string): Promise<Booking> {
    const response = await apiClient.put<ApiResponse<Booking>>(`/bookings/${id}/cancel`, null, { params: { reason } });
    return response.data.data;
  },
};

export default bookingService;
