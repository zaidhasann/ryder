import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CreditCard, Check, Info } from 'lucide-react';
import { carService } from '../services/carService';
import { bookingService } from '../services/bookingService';
import apiClient from '../services/api';
import { Car } from '../types/car.types';
import { Location } from '../types/location.types';
import { Addon } from '../types/addon.types';
import { PriceBreakdownResponse, PaymentMethod, BookingCreateRequest } from '../types/booking.types';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showToast, error: toastError, success } = useToast();

  const [car, setCar] = useState<Car | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [addonsList, setAddonsList] = useState<Addon[]>([]);
  
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [pickupLocationId, setPickupLocationId] = useState('');
  const [dropoffLocationId, setDropoffLocationId] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MOCK');

  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdownResponse | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      showToast({ type: 'warning', title: 'Login Required', description: 'Please login to book a car' });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, showToast]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [carData, locRes, addRes] = await Promise.all([
          carService.getCarById(Number(id)),
          apiClient.get('/locations'),
          apiClient.get('/addons')
        ]);
        setCar(carData);
        setLocations(locRes.data.data);
        setAddonsList(addRes.data.data);
        
        // set default locations
        if (locRes.data.data.length > 0) {
          setPickupLocationId(locRes.data.data[0].id.toString());
          setDropoffLocationId(locRes.data.data[0].id.toString());
        }
      } catch (error) {
        toastError('Failed to load booking data');
      }
    };
    if (id) fetchInitialData();
  }, [id, toastError]);

  const calculatePrice = useCallback(async () => {
    if (!id || !pickupDate || !dropoffDate) return;
    
    // validate dates
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const now = new Date();
    
    if (start <= now || end <= start) {
      setPriceBreakdown(null);
      return;
    }

    setIsCalculating(true);
    try {
      const response = await apiClient.post('/bookings/calculate-price', {
        carId: Number(id),
        startTime: new Date(pickupDate).toISOString(),
        endTime: new Date(dropoffDate).toISOString(),
        addonIds: selectedAddons
      });
      setPriceBreakdown(response.data.data);
    } catch (error) {
      console.error('Price calculation failed', error);
      setPriceBreakdown(null);
    } finally {
      setIsCalculating(false);
    }
  }, [id, pickupDate, dropoffDate, selectedAddons]);

  useEffect(() => {
    const timer = setTimeout(() => {
      calculatePrice();
    }, 500);
    return () => clearTimeout(timer);
  }, [calculatePrice]);

  const toggleAddon = (addonId: number) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleBookingSubmit = async () => {
    if (!pickupDate || !dropoffDate || !pickupLocationId || !dropoffLocationId) {
      toastError('Missing fields', 'Please fill all required booking details');
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const now = new Date();

    if (start <= now) {
      toastError('Invalid Dates', 'Pickup date must be in the future');
      return;
    }
    if (end <= start) {
      toastError('Invalid Dates', 'Drop-off date must be after pickup date');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: BookingCreateRequest = {
        carId: Number(id),
        pickupLocationId: Number(pickupLocationId),
        dropoffLocationId: Number(dropoffLocationId),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        addonIds: selectedAddons.length > 0 ? selectedAddons : undefined,
        customerNotes: notes || undefined,
        paymentMethod
      };

      await bookingService.createBooking(payload);
      success('Booking Confirmed', 'Your car has been booked successfully');
      navigate('/dashboard/bookings');
    } catch (error: any) {
      toastError('Booking Failed', error?.response?.data?.message || 'Could not complete booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Complete Your Booking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Dates & Location */}
          <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-brand-500" /> Date & Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="datetime-local"
                label="Pickup Date & Time"
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
                required
              />
              <Input
                type="datetime-local"
                label="Drop-off Date & Time"
                value={dropoffDate}
                onChange={e => setDropoffDate(e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pickup Location</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  value={pickupLocationId}
                  onChange={e => setPickupLocationId(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} - {loc.city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Drop-off Location</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  value={dropoffLocationId}
                  onChange={e => setDropoffLocationId(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} - {loc.city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Add-ons */}
          <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <Check className="w-5 h-5 mr-2 text-brand-500" /> Extra Add-ons
            </h2>
            <div className="space-y-4">
              {addonsList.map(addon => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <label key={addon.id} className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10' : 'border-slate-200 dark:border-dark-700 hover:border-brand-300'}`}>
                    <div className="flex items-center h-6 mr-4">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                        checked={isSelected}
                        onChange={() => toggleAddon(addon.id)}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 dark:text-white">{addon.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{addon.description}</div>
                    </div>
                    <div className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                      ₹{addon.pricePerDay}/day
                    </div>
                  </label>
                );
              })}
              {addonsList.length === 0 && <p className="text-slate-500 text-sm">No add-ons available.</p>}
            </div>
          </div>

          {/* Section 3: Notes */}
          <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <Info className="w-5 h-5 mr-2 text-brand-500" /> Additional Notes
            </h2>
            <textarea 
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
              rows={3}
              placeholder="Any special requests or instructions..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          {/* Section 4: Payment */}
          <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-brand-500" /> Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'MOCK', label: 'Test Payment (Demo)' },
                { id: 'CREDIT_CARD', label: 'Credit Card' },
                { id: 'DEBIT_CARD', label: 'Debit Card' },
                { id: 'UPI', label: 'UPI' },
                { id: 'NET_BANKING', label: 'Net Banking' }
              ].map(method => (
                <label key={method.id} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method.id ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/10' : 'border-slate-200 dark:border-dark-700 hover:border-brand-300'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id as PaymentMethod)}
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-slate-300"
                  />
                  <span className="ml-3 font-medium text-slate-900 dark:text-white">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side - Summary (Sticky) */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Price Summary</h2>
            
            <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-dark-800 pb-6">
              <img 
                src={car.primaryImageUrl || (car.images && car.images[0]?.imageUrl)} 
                alt={car.model} 
                className="w-20 h-20 object-cover rounded-xl bg-slate-100 dark:bg-dark-800"
              />
              <div>
                <div className="font-bold text-lg text-slate-900 dark:text-white">{car.brand} {car.model}</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm">{car.year} • {car.category}</div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {isCalculating ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : priceBreakdown ? (
                <>
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Base Price ({priceBreakdown.rentalDays} days)</span>
                    <span>₹{priceBreakdown.baseAmount.toLocaleString('en-IN')}</span>
                  </div>
                  {priceBreakdown.addonAmount > 0 && (
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span>Add-ons</span>
                      <span>₹{priceBreakdown.addonAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Taxes (18% GST)</span>
                    <span>₹{priceBreakdown.taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="border-t border-slate-200 dark:border-dark-800 pt-4 mt-4 flex justify-between font-bold text-xl text-slate-900 dark:text-white">
                    <span>Total Amount</span>
                    <span>₹{priceBreakdown.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-500 dark:text-slate-400 py-4 text-sm">
                  Select valid dates to see the price summary.
                </div>
              )}
            </div>

            <Button 
              size="lg" 
              className="w-full" 
              disabled={!priceBreakdown || isCalculating || isSubmitting}
              isLoading={isSubmitting}
              onClick={handleBookingSubmit}
            >
              Confirm Booking
            </Button>
            <p className="text-center text-xs text-slate-500 mt-4">By clicking confirm, you agree to our terms and conditions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
