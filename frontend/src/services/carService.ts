import apiClient from './api';
import { ApiResponse, PageResponse, Car, CarFilterParams, Location, Addon } from '../types';

export const carService = {
  async getCars(params: CarFilterParams): Promise<PageResponse<Car>> {
    const response = await apiClient.get<ApiResponse<PageResponse<Car>>>('/cars', { params });
    return response.data.data;
  },

  async getCarById(id: number): Promise<Car> {
    const response = await apiClient.get<ApiResponse<Car>>(`/cars/${id}`);
    return response.data.data;
  },

  async getLocations(): Promise<Location[]> {
    const response = await apiClient.get<ApiResponse<Location[]>>('/locations');
    return response.data.data;
  },

  async getAddons(): Promise<Addon[]> {
    const response = await apiClient.get<ApiResponse<Addon[]>>('/addons');
    return response.data.data;
  },
};

export default carService;
