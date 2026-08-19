import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, ExternalLink } from 'lucide-react';
import { Car } from '../types/car.types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { RatingStars } from '../components/common/RatingStars';
import { useToast } from '../context/ToastContext';
import apiClient from '../services/api';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();
  
  const [wishlist, setWishlist] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await apiClient.get('/wishlist');
        setWishlist(response.data.data);
      } catch (error) {
        toastError('Failed to load wishlist');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, [toastError]);

  const handleRemove = async (carId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRemovingId(carId);
    try {
      await apiClient.delete(`/wishlist/${carId}`);
      setWishlist(prev => prev.filter(car => car.id !== carId));
      success('Removed from wishlist');
    } catch (error) {
      toastError('Failed to remove from wishlist');
    } finally {
      setRemovingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState 
          icon={<Heart className="w-12 h-12 text-rose-300 dark:text-rose-900/50" />}
          title="Your wishlist is empty" 
          description="You haven't saved any cars yet. Start exploring our fleet!"
          actionLabel="Browse Cars"
          onAction={() => navigate('/cars')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
        <Heart className="w-8 h-8 mr-3 text-rose-500 fill-rose-500" /> My Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map(car => (
          <div 
            key={car.id} 
            className="bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
            onClick={() => navigate(`/cars/${car.id}`)}
          >
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-dark-800 overflow-hidden">
              <img 
                src={car.primaryImageUrl || (car.images && car.images[0]?.imageUrl) || '/placeholder-car.jpg'} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge variant="accent" size="sm">{car.year}</Badge>
                <Badge variant="neutral" size="sm">{car.category}</Badge>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                  {car.brand} {car.model}
                </h3>
              </div>
              
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-4">
                <RatingStars rating={car.ratingAvg} size="sm" />
                <span className="ml-1">({car.reviewCount})</span>
              </div>
              
              <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100 dark:border-dark-800">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Price</div>
                  <div className="font-bold text-lg text-slate-900 dark:text-white">
                    ₹{car.pricePerDay.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/day</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-2"
                    onClick={(e) => handleRemove(car.id, e)}
                    isLoading={removingId === car.id}
                  >
                    {!removingId && <Trash2 className="w-5 h-5" />}
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/cars/${car.id}`);
                    }}
                  >
                    View <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
