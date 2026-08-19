import React, { useState, useEffect } from 'react';
import { 
  Car, Users, Book, DollarSign, Activity
} from 'lucide-react';
import apiClient from '../services/api';
import { AdminStats } from '../types/admin.types';
import { Booking, BookingStatus } from '../types/booking.types';
import { User } from '../types/auth.types';
import { PageResponse } from '../types/api.types';
import { Button } from '../components/common/Button';
import { Badge, BadgeVariant } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

const getStatusVariant = (status: BookingStatus): BadgeVariant => {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'CONFIRMED': return 'info';
    case 'ACTIVE': return 'success';
    case 'COMPLETED': return 'neutral';
    case 'CANCELLED':
    case 'REJECTED': return 'error';
    default: return 'neutral';
  }
};

const AdminPage: React.FC = () => {
  const { success, error: toastError } = useToast();
  
  const [activeTab, setActiveTab] = useState<'bookings' | 'users'>('bookings');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsPage, setBookingsPage] = useState(0);
  const [bookingsTotalPages, setBookingsTotalPages] = useState(0);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatus | 'ALL'>('ALL');

  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [usersPage, setUsersPage] = useState(0);
  const [usersTotalPages, setUsersTotalPages] = useState(0);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiClient.get('/admin/stats');
        setStats(res.data.data);
      } catch (error) {
        console.error('Failed to load admin stats', error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const fetchBookings = async (page = 0, statusFilter = bookingStatusFilter) => {
    setBookingsLoading(true);
    try {
      const params: any = { page, size: 10, sortBy: 'createdAt', sortDir: 'DESC' };
      if (statusFilter !== 'ALL') params.status = statusFilter;
      
      const res = await apiClient.get<{data: PageResponse<Booking>}>('/admin/bookings', { params });
      setBookings(res.data.data.content);
      setBookingsTotalPages(res.data.data.totalPages);
      setBookingsPage(page);
    } catch (error) {
      toastError('Failed to fetch bookings');
    } finally {
      setBookingsLoading(false);
    }
  };

  const fetchUsers = async (page = 0) => {
    setUsersLoading(true);
    try {
      const res = await apiClient.get<{data: PageResponse<User>}>('/admin/users', { params: { page, size: 10 } });
      setUsers(res.data.data.content);
      setUsersTotalPages(res.data.data.totalPages);
      setUsersPage(page);
    } catch (error) {
      toastError('Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings(0, bookingStatusFilter);
    } else {
      fetchUsers(0);
    }
  }, [activeTab, bookingStatusFilter]);

  const updateBookingStatus = async (bookingId: number, status: BookingStatus) => {
    let reason = undefined;
    if (status === 'CANCELLED') {
      const promptRes = window.prompt('Please enter a cancellation reason:');
      if (promptRes === null) return;
      reason = promptRes;
    }
    
    try {
      if (status === 'CANCELLED') {
        await apiClient.put(`/bookings/${bookingId}/cancel`, null, { params: { reason } });
      } else {
        await apiClient.put(`/admin/bookings/${bookingId}/status`, { status });
      }
      success(`Booking updated to ${status}`);
      fetchBookings(bookingsPage);
    } catch (error) {
      toastError('Failed to update booking status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>

      {/* Stats Row */}
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-100 dark:bg-dark-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard icon={<Car className="text-brand-500" />} label="Total Cars" value={stats.totalCars} />
          <StatCard icon={<Activity className="text-emerald-500" />} label="Active Rentals" value={stats.activeRentals} />
          <StatCard icon={<Book className="text-sky-500" />} label="Total Bookings" value={stats.totalBookings} />
          <StatCard icon={<Users className="text-purple-500" />} label="Total Users" value={stats.totalUsers} />
          <StatCard icon={<DollarSign className="text-amber-500" />} label="Gross Revenue" value={`₹${stats.grossRevenue.toLocaleString('en-IN')}`} />
        </div>
      ) : null}

      <div className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-dark-800">
          <button 
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'bookings' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Manage Bookings
          </button>
          <button 
            className={`px-6 py-4 font-semibold text-sm transition-colors ${activeTab === 'users' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {['ALL', 'PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'].map((status) => (
                  <button
                    key={status}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${bookingStatusFilter === status ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-dark-800 dark:text-slate-300 dark:hover:bg-dark-700'}`}
                    onClick={() => setBookingStatusFilter(status as any)}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-dark-800/50 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="p-4 font-medium rounded-l-xl">Booking No.</th>
                      <th className="p-4 font-medium">Customer</th>
                      <th className="p-4 font-medium">Car</th>
                      <th className="p-4 font-medium">Dates</th>
                      <th className="p-4 font-medium">Amount</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-dark-800/50">
                    {bookingsLoading ? (
                      <tr><td colSpan={7} className="text-center py-10">Loading...</td></tr>
                    ) : bookings.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-10 text-slate-500">No bookings found.</td></tr>
                    ) : bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-dark-800/20 transition-colors">
                        <td className="p-4 font-medium text-slate-900 dark:text-white">#{booking.bookingNumber}</td>
                        <td className="p-4">
                          <div className="text-slate-900 dark:text-white font-medium">{booking.user?.fullName || 'Customer'}</div>
                          <div className="text-xs text-slate-500">{booking.user?.email || ''}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-slate-900 dark:text-white">{booking.car?.brand} {booking.car?.model}</div>
                        </td>
                        <td className="p-4 text-xs text-slate-600 dark:text-slate-300">
                          <div>{new Date(booking.startTime).toLocaleDateString()}</div>
                          <div>to {new Date(booking.endTime).toLocaleDateString()}</div>
                        </td>
                        <td className="p-4 font-medium text-slate-900 dark:text-white">
                          ₹{booking.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-4">
                          <Badge variant={getStatusVariant(booking.status)} size="sm">{booking.status}</Badge>
                        </td>
                        <td className="p-4">
                          <select 
                            className="bg-transparent border border-slate-300 dark:border-dark-700 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-brand-500 outline-none text-slate-900 dark:text-white"
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value as BookingStatus)}
                          >
                            <option value="PENDING" disabled>PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {bookingsTotalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => fetchBookings(bookingsPage - 1)} disabled={bookingsPage === 0}>Prev</Button>
                  <span className="flex items-center px-2 text-sm text-slate-500">Page {bookingsPage + 1} of {bookingsTotalPages}</span>
                  <Button variant="outline" size="sm" onClick={() => fetchBookings(bookingsPage + 1)} disabled={bookingsPage >= bookingsTotalPages - 1}>Next</Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-dark-800/50 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="p-4 font-medium rounded-l-xl">Name</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Phone</th>
                      <th className="p-4 font-medium">Role</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium rounded-r-xl">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-dark-800/50">
                    {usersLoading ? (
                      <tr><td colSpan={6} className="text-center py-10">Loading...</td></tr>
                    ) : users.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-10 text-slate-500">No users found.</td></tr>
                    ) : users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-dark-800/20 transition-colors">
                        <td className="p-4 font-medium text-slate-900 dark:text-white">{u.fullName}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{u.email}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{u.phone || '-'}</td>
                        <td className="p-4">
                          <Badge variant={u.role === 'ROLE_ADMIN' ? 'accent' : 'neutral'} size="sm">
                            {u.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={u.status === 'ACTIVE' ? 'success' : 'error'} size="sm">{u.status}</Badge>
                        </td>
                        <td className="p-4 text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {usersTotalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => fetchUsers(usersPage - 1)} disabled={usersPage === 0}>Prev</Button>
                  <span className="flex items-center px-2 text-sm text-slate-500">Page {usersPage + 1} of {usersTotalPages}</span>
                  <Button variant="outline" size="sm" onClick={() => fetchUsers(usersPage + 1)} disabled={usersPage >= usersTotalPages - 1}>Next</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="bg-white dark:bg-dark-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800 flex items-center">
    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-dark-800/50 flex items-center justify-center mr-4 shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{label}</div>
      <div className="text-xl font-bold text-slate-900 dark:text-white">{value}</div>
    </div>
  </div>
);

export default AdminPage;
