import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Fuel, Settings, MapPin } from 'lucide-react';
import { Car } from '../../types';
import { Badge, BadgeVariant } from '../common/Badge';
import { Button } from '../common/Button';
import { RatingStars } from '../common/RatingStars';
import { wishlistService } from '../../services/wishlistService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { success, error } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      wishlistService.checkWishlist(car.id)
        .then(res => setIsWishlisted(res))
        .catch(() => {});
    }
  }, [car.id, isAuthenticated]);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      error('Authentication required', 'Please login to add cars to your wishlist.');
      navigate('/login');
      return;
    }

    setIsWishlistLoading(true);
    try {
      if (isWishlisted) {
        await wishlistService.removeFromWishlist(car.id);
        setIsWishlisted(false);
        success('Removed from wishlist');
      } else {
        await wishlistService.addToWishlist(car.id);
        setIsWishlisted(true);
        success('Added to wishlist');
      }
    } catch (err) {
      error('Error', 'Failed to update wishlist');
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const getCategoryVariant = (category: string): BadgeVariant => {
    switch (category) {
      case 'LUXURY': return 'luxury';
      case 'EV': return 'success';
      case 'SUV': return 'info';
      case 'SEDAN': return 'accent';
      case 'HATCHBACK': return 'neutral';
      default: return 'neutral';
    }
  };

  const formattedPrice = `₹${car.pricePerDay.toLocaleString('en-IN')}`;
  const city = car.location?.city || 'Available';

  return (
    <div 
      className="bg-white dark:bg-dark-900 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800 overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer"
      onClick={() => navigate(`/cars/${car.id}`)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-dark-800">
        <img 
          src={car.primaryImageUrl || (car.images && car.images[0]?.imageUrl) || '/placeholder-car.jpg'} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge variant={getCategoryVariant(car.category)}>
            {car.category}
          </Badge>
        </div>
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
            isWishlisted 
              ? 'bg-rose-500/90 text-white' 
              : 'bg-white/80 dark:bg-dark-900/80 text-slate-400 hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {car.brand} {car.model}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-slate-500 dark:text-slate-400">{car.year}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-dark-700"></span>
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                {city}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <RatingStars rating={car.ratingAvg} reviewCount={car.reviewCount} showValue size="sm" />
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-dark-800 mb-4 mt-auto">
          <div className="flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400">
            <Users className="w-4 h-4" />
            <span className="text-xs font-medium">{car.seats} Seats</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 border-x border-slate-100 dark:border-dark-800">
            <Settings className="w-4 h-4" />
            <span className="text-xs font-medium capitalize">{car.transmission.toLowerCase()}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400">
            <Fuel className="w-4 h-4" />
            <span className="text-xs font-medium capitalize">{car.fuelType.toLowerCase()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">{formattedPrice}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">/day</span>
          </div>
          <Button 
            variant="primary" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cars/${car.id}`);
            }}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
