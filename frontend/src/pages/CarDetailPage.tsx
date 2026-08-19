import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Users, KeyRound, Settings, Droplet, Wind, Briefcase, Zap, Heart, Star, ChevronLeft } from 'lucide-react';
import { carService } from '../services/carService';
import { wishlistService } from '../services/wishlistService';
import { reviewService, ReviewItem } from '../services/reviewService';
import { Car } from '../types/car.types';
import { PageResponse } from '../types/api.types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { EmptyState } from '../components/common/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import apiClient from '../services/api';

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showToast, error: toastError, success } = useToast();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewsPage, setReviewsPage] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchCar = async () => {
      setLoading(true);
      try {
        const data = await carService.getCarById(Number(id));
        setCar(data);
        if (data.images && data.images.length > 0) {
          const primary = data.images.find(img => img.isPrimary);
          setActiveImage(primary ? primary.imageUrl : data.images[0].imageUrl);
        } else if (data.primaryImageUrl) {
          setActiveImage(data.primaryImageUrl);
        }
      } catch (error) {
        toastError('Failed to fetch car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, toastError]);

  useEffect(() => {
    if (!id || !isAuthenticated) return;
    const checkWishlist = async () => {
      try {
        const response = await apiClient.get<{data: boolean}>(`/wishlist/${id}/check`);
        setIsWishlisted(response.data.data);
      } catch (error) {
        console.error('Failed to check wishlist status', error);
      }
    };
    checkWishlist();
  }, [id, isAuthenticated]);

  useEffect(() => {
    if (!id) return;
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const data = await reviewService.getCarReviews(Number(id), reviewsPage, 5);
        if (reviewsPage === 0) {
          setReviews(data.content);
        } else {
          setReviews(prev => [...prev, ...data.content]);
        }
        setTotalReviews(data.totalElements);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchReviews();
  }, [id, reviewsPage]);

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      showToast({ type: 'info', title: 'Login Required', description: 'Please login to add to wishlist' });
      navigate('/login');
      return;
    }
    
    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        await apiClient.delete(`/wishlist/${id}`);
        setIsWishlisted(false);
        success('Removed from wishlist');
      } else {
        await apiClient.post(`/wishlist/${id}`);
        setIsWishlisted(true);
        success('Added to wishlist');
      }
    } catch (error) {
      toastError('Failed to update wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleBookClick = () => {
    navigate(`/cars/${id}/book`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-96 bg-slate-200 dark:bg-dark-800 rounded-2xl" />
          <div className="h-10 bg-slate-200 dark:bg-dark-800 rounded w-1/3" />
          <div className="h-6 bg-slate-200 dark:bg-dark-800 rounded w-1/4" />
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState title="Car not found" description="The car you are looking for does not exist." actionLabel="Back to Cars" onAction={() => navigate('/cars')} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/cars')} className="flex items-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-dark-800 relative">
            {activeImage ? (
              <img src={activeImage} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Image Available</div>
            )}
            <button
              onClick={toggleWishlist}
              disabled={wishlistLoading}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-dark-900 transition-all shadow-sm"
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300'}`} />
            </button>
          </div>
          
          {car.images && car.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {car.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.imageUrl)}
                  className={`relative shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img.imageUrl ? 'border-brand-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Car Info */}
        <div className="flex flex-col">
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge variant="accent">{car.year}</Badge>
            <Badge variant="neutral">{car.category}</Badge>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            {car.brand} {car.model}
          </h1>

          <div className="flex items-center gap-4 mb-6 text-slate-600 dark:text-slate-300">
            <div className="flex items-center">
              <RatingStars rating={car.ratingAvg} size="md" />
              <span className="ml-2 text-sm">({car.reviewCount} reviews)</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-1 text-slate-400" />
              {car.location?.name}, {car.location?.city}
            </div>
          </div>

          <div className="mb-8">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              ₹{car.pricePerDay.toLocaleString('en-IN')}
              <span className="text-lg font-normal text-slate-500 dark:text-slate-400">/day</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 flex flex-col items-center justify-center text-center">
              <Users className="w-6 h-6 text-brand-500 mb-2" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">{car.seats} Seats</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 flex flex-col items-center justify-center text-center">
              <KeyRound className="w-6 h-6 text-brand-500 mb-2" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">{car.doors} Doors</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 flex flex-col items-center justify-center text-center">
              <Settings className="w-6 h-6 text-brand-500 mb-2" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">{car.transmission}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 flex flex-col items-center justify-center text-center">
              <Zap className="w-6 h-6 text-brand-500 mb-2" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">{car.fuelType}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 flex flex-col items-center justify-center text-center">
              <Wind className="w-6 h-6 text-brand-500 mb-2" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">{car.airConditioned ? 'A/C' : 'No A/C'}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-dark-800/50 flex flex-col items-center justify-center text-center">
              <Briefcase className="w-6 h-6 text-brand-500 mb-2" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">{car.luggageCapacity} Bags</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Description</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {car.description}
            </p>
          </div>

          <div className="mt-auto">
            <Button size="lg" className="w-full" onClick={handleBookClick} disabled={!car.isActive}>
              {car.isActive ? 'Book This Car' : 'Currently Unavailable'}
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-slate-200 dark:border-dark-800 pt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
          <div className="text-slate-600 dark:text-slate-400">
            {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
          </div>
        </div>

        {reviews.length === 0 && !reviewsLoading ? (
          <div className="bg-slate-50 dark:bg-dark-800/30 rounded-2xl p-8 text-center">
            <Star className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 dark:text-slate-400">No reviews yet for this car.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 flex items-center justify-center font-bold">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{review.userName}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <RatingStars rating={review.rating} size="sm" />
                </div>
                <p className="text-slate-600 dark:text-slate-300">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {reviewsLoading && (
          <div className="flex justify-center mt-8">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!reviewsLoading && reviewsPage < totalPages - 1 && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => setReviewsPage(p => p + 1)}>
              Load More Reviews
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailPage;
