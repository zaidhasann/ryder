import apiClient from './api';
import { ApiResponse } from '../types';
import { WishlistItem } from '../types/wishlist.types';

export const wishlistService = {
  async getWishlist(): Promise<WishlistItem[]> {
    const response = await apiClient.get<ApiResponse<WishlistItem[]>>('/wishlist');
    return response.data.data;
  },

  async addToWishlist(carId: number): Promise<WishlistItem> {
    const response = await apiClient.post<ApiResponse<WishlistItem>>(`/wishlist/${carId}`);
    return response.data.data;
  },

  async removeFromWishlist(carId: number): Promise<void> {
    await apiClient.delete(`/wishlist/${carId}`);
  },

  async checkWishlist(carId: number): Promise<boolean> {
    const response = await apiClient.get<ApiResponse<boolean>>(`/wishlist/${carId}/check`);
    return response.data.data;
  },
};

export default wishlistService;
