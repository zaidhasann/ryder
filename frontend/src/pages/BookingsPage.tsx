import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight, Check } from 'lucide-react';
import { reviewService } from '../services/reviewService';
import { Booking, BookingStatus } from '../types/booking.types';
import { PageResponse } from '../types/api.types';
import { Button } from '../components/common/Button';
import { Badge, BadgeVariant } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { RatingStars } from '../components/common/RatingStars';
import { useToast } from '../context/ToastContext';
import apiClient from '../services/api';

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

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchBookings = async (p = 0) => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<{data: PageResponse<Booking>}>('/bookings', { params: { page: p, size: 8 } });
      setBookings(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
      setPage(p);
    } catch (error) {
      toastError('Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openDetail = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await apiClient.put(`/bookings/${selectedBooking.id}/cancel`, null, { params: { reason: 'Customer requested cancellation' } });
      success('Booking Cancelled');
      setIsDetailModalOpen(false);
      fetchBookings(page);
    } catch (error: any) {
      toastError('Cancellation Failed', error?.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleReviewSubmit = async () => {
    if (!selectedBooking) return;
    if (!reviewComment.trim()) {
      toastError('Missing Comment', 'Please write a review comment');
      return;
    }
    
    setIsSubmittingReview(true);
    try {
      await reviewService.createReview(selectedBooking.id, reviewRating, reviewComment);
      success('Review Submitted', 'Thank you for your feedback!');
      setIsReviewModalOpen(false);
      setIsDetailModalOpen(false);
      fetchBookings(page);
    } catch (error: any) {
      toastError('Review Failed', error?.response?.data?.message || 'Could not submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const openReviewModal = () => {
    setReviewRating(5);
    setReviewComment('');
    setIsReviewModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Bookings</h1>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        <EmptyState 
          title="No bookings yet" 
          description="You haven't made any car rentals yet. Browse our fleet and start your journey."
          actionLabel="Browse Cars"
          onAction={() => navigate('/cars')}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {bookings.map(booking => (
              <div 
                key={booking.id} 
                className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row gap-5"
                onClick={() => openDetail(booking)}
              >
                <div className="w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-dark-800 shrink-0">
                  <img 
                    src={booking.car?.primaryImageUrl || (booking.car?.images && booking.car?.images[0]?.imageUrl) || '/placeholder-car.jpg'} 
                    alt={booking.car?.model || 'Car'} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Booking #{booking.bookingNumber}</div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                        {booking.car?.brand} {booking.car?.model}
                      </h3>
                    </div>
                    <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
                  </div>
                  
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-2 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                      {new Date(booking.startTime).toLocaleDateString()} - {new Date(booking.endTime).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      {booking.pickupLocation?.city || 'City Hub'}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="font-bold text-slate-900 dark:text-white">
                      ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-center text-brand-600 dark:text-brand-400 text-sm font-medium">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button 
                variant="outline" 
                onClick={() => fetchBookings(page - 1)} 
                disabled={page === 0}
              >
                Previous
              </Button>
              <div className="flex items-center px-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                Page {page + 1} of {totalPages}
              </div>
              <Button 
                variant="outline" 
                onClick={() => fetchBookings(page + 1)} 
                disabled={page >= totalPages - 1}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Booking Detail Modal */}
      <Modal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        title={`Booking #${selectedBooking?.bookingNumber}`}
        maxWidth="2xl"
      >
        {selectedBooking && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-dark-800">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedBooking.car?.primaryImageUrl || (selectedBooking.car?.images && selectedBooking.car?.images[0]?.imageUrl) || '/placeholder-car.jpg'} 
                  alt={selectedBooking.car?.model} 
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                />
                <div>
                  <div className="font-bold text-lg text-slate-900 dark:text-white">{selectedBooking.car?.brand} {selectedBooking.car?.model}</div>
                  <div className="text-sm text-slate-500">{selectedBooking.car?.year} • {selectedBooking.car?.category}</div>
                </div>
              </div>
              <Badge variant={getStatusVariant(selectedBooking.status)}>{selectedBooking.status}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Rental Period</h4>
                <div className="bg-slate-50 dark:bg-dark-800/50 p-4 rounded-xl space-y-3">
                  <div>
                    <div className="text-xs text-slate-500">Pickup</div>
                    <div className="font-medium text-slate-900 dark:text-white">{new Date(selectedBooking.startTime).toLocaleString()}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{selectedBooking.pickupLocation?.name}, {selectedBooking.pickupLocation?.city}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Drop-off</div>
                    <div className="font-medium text-slate-900 dark:text-white">{new Date(selectedBooking.endTime).toLocaleString()}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{selectedBooking.dropoffLocation?.name}, {selectedBooking.dropoffLocation?.city}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Price Breakdown</h4>
                <div className="bg-slate-50 dark:bg-dark-800/50 p-4 rounded-xl space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Base Price ({selectedBooking.rentalDays} days)</span>
                    <span className="font-medium text-slate-900 dark:text-white">₹{selectedBooking.baseAmount.toLocaleString('en-IN')}</span>
                  </div>
                  {selectedBooking.addonAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Add-ons</span>
                      <span className="font-medium text-slate-900 dark:text-white">₹{selectedBooking.addonAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Taxes (18%)</span>
                    <span className="font-medium text-slate-900 dark:text-white">₹{selectedBooking.taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-dark-700 pt-2 mt-2 flex justify-between font-bold text-base">
                    <span className="text-slate-900 dark:text-white">Total Amount</span>
                    <span className="text-brand-600 dark:text-brand-400">₹{selectedBooking.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedBooking.bookingAddons && selectedBooking.bookingAddons.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Included Add-ons</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBooking.bookingAddons.map(item => (
                    <Badge key={item.id} variant="neutral" className="flex items-center">
                      <Check className="w-3 h-3 mr-1" /> {item.addon?.name || 'Add-on'}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-dark-800">
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>Close</Button>
              {(selectedBooking.status === 'PENDING' || selectedBooking.status === 'CONFIRMED') && (
                <Button variant="danger" onClick={handleCancelBooking}>Cancel Booking</Button>
              )}
              {selectedBooking.status === 'COMPLETED' && (
                <Button variant="primary" onClick={openReviewModal}>Write a Review</Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Review Modal */}
      <Modal 
        isOpen={isReviewModalOpen} 
        onClose={() => !isSubmittingReview && setIsReviewModalOpen(false)} 
        title="Write a Review"
      >
        <div className="space-y-6">
          <div className="text-center py-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">How was your trip?</h3>
            <div className="flex justify-center">
              <RatingStars 
                rating={reviewRating} 
                size="lg" 
                interactive 
                onRatingChange={setReviewRating} 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Review</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              rows={4}
              placeholder="Tell us about your experience..."
              value={reviewComment}
              onChange={e => setReviewComment(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsReviewModalOpen(false)} disabled={isSubmittingReview}>Cancel</Button>
            <Button onClick={handleReviewSubmit} isLoading={isSubmittingReview}>Submit Review</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingsPage;
