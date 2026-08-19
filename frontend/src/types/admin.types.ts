export interface AdminStats {
  totalCars: number;
  availableCars: number;
  activeRentals: number;
  totalBookings: number;
  totalUsers: number;
  grossRevenue: number;
  cancelledBookings: number;
}

export interface RevenueTrendData {
  period: string; // e.g. "Jan", "Feb" or "Mon", "Tue"
  revenue: number;
  bookings: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
}

export interface TopVehicleStat {
  carId: number;
  carName: string;
  totalBookings: number;
  totalRevenue: number;
  ratingAvg: number;
}
