import { Car } from './car.types';

export interface WishlistItem {
  id: number;
  car: Car;
  createdAt: string;
}
