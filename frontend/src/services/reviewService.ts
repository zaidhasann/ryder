import apiClient from './api';
import { ApiResponse, PageResponse } from '../types/api.types';

export interface ReviewItem {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const reviewService = {
  async getCarReviews(carId: number, page = 0, size = 5): Promise<PageResponse<ReviewItem>> {
    const response = await apiClient.get<ApiResponse<PageResponse<ReviewItem>>>(`/cars/${carId}/reviews`, { params: { page, size } });
    return response.data.data;
  },
  async createReview(bookingId: number, rating: number, comment: string): Promise<ReviewItem> {
    const response = await apiClient.post<ApiResponse<ReviewItem>>('/reviews', { bookingId, rating, comment });
    return response.data.data;
  },
};

export default reviewService;
