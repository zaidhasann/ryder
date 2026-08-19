import { Location } from './location.types';

export type CarCategory = 'SEDAN' | 'SUV' | 'LUXURY' | 'EV' | 'HATCHBACK';
export type FuelType = 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID';
export type Transmission = 'MANUAL' | 'AUTOMATIC';

export interface CarImage {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  description: string;
  pricePerDay: number;
  seats: number;
  doors: number;
  transmission: Transmission;
  fuelType: FuelType;
  mileage: string;
  engine: string;
  airConditioned: boolean;
  luggageCapacity: number;
  ratingAvg: number;
  reviewCount: number;
  isActive: boolean;
  location: Location;
  images: CarImage[];
  primaryImageUrl?: string;
}

export interface CarFilterParams {
  search?: string;
  category?: CarCategory;
  brand?: string;
  fuelType?: FuelType;
  transmission?: Transmission;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  locationId?: number;
  minRating?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'ASC' | 'DESC';
}
