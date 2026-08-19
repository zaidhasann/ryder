import { Car } from './car.types';
import { Location } from './location.types';
import { Addon } from './addon.types';
import { User } from './auth.types';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING' | 'MOCK';

export interface BookingAddonItem {
  id: number;
  addon: Addon;
  priceAtBooking: number;
  quantity: number;
}

export interface PaymentDetails {
  id: number;
  transactionId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDate: string;
}

export interface Booking {
  id: number;
  bookingNumber: string;
  user: User;
  car: Car;
  pickupLocation: Location;
  dropoffLocation: Location;
  startTime: string;
  endTime: string;
  rentalDays: number;
  basePricePerDay: number;
  baseAmount: number;
  addonAmount: number;
  taxAmount: number;
  totalAmount: number;
  status: BookingStatus;
  customerNotes?: string;
  cancellationReason?: string;
  bookingAddons: BookingAddonItem[];
  payment?: PaymentDetails;
  createdAt: string;
}

export interface PriceCalculationRequest {
  carId: number;
  startTime: string;
  endTime: string;
  addonIds?: number[];
}

export interface PriceBreakdownResponse {
  rentalDays: number;
  basePricePerDay: number;
  baseAmount: number;
  addonAmount: number;
  taxAmount: number;
  totalAmount: number;
  breakdownItems: {
    label: string;
    amount: number;
  }[];
}

export interface BookingCreateRequest {
  carId: number;
  pickupLocationId: number;
  dropoffLocationId: number;
  startTime: string;
  endTime: string;
  addonIds?: number[];
  customerNotes?: string;
  paymentMethod: PaymentMethod;
}
