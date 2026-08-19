import { User } from './auth.types';

export interface Review {
  id: number;
  carId: number;
  user: User;
  bookingId: number;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface CreateReviewRequest {
  bookingId: number;
  rating: number;
  comment: string;
}
