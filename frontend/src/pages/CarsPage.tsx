import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Car, Location, CarFilterParams, PageResponse } from '../types';
import carService from '../services/carService';
import { CarCard } from '../components/cars/CarCard';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { EmptyState } from '../components/common/EmptyState';
import { CarCardSkeleton } from '../components/common/SkeletonLoader';

export const CarsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [carsData, setCarsData] = useState<PageResponse<Car> | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const defaultFilters: CarFilterParams = {
    page: 0,
    size: 9,
    search: searchParams.get('search') || undefined,
    category: (searchParams.get('category') as any) || undefined,
    fuelType: (searchParams.get('fuelType') as any) || undefined,
    transmission: (searchParams.get('transmission') as any) || undefined,
    locationId: searchParams.get('locationId') ? Number(searchParams.get('locationId')) : undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    seats: searchParams.get('seats') ? Number(searchParams.get('seats')) : undefined,
    minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
    sortBy: searchParams.get('sortBy') || undefined,
    sortDir: (searchParams.get('sortDir') as any) || undefined,
  };

  const [filters, setFilters] = useState<CarFilterParams>(defaultFilters);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchInput || undefined, page: 0 }));
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await carService.getLocations();
        setLocations(data);
      } catch (err) {
        console.error('Failed to load locations', err);
      }
    };
    fetchLocations();
  }, []);

  const fetchCars = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await carService.getCars(filters);
      setCarsData(data);
      
      // Update URL params
      const newParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          newParams.set(key, String(value));
        }
      });
      setSearchParams(newParams, { replace: true });
    } catch (err) {
      console.error('Failed to fetch cars', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleFilterChange = (key: keyof CarFilterParams, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 0 }));
  };

  const resetFilters = () => {
    setSearchInput('');
    setFilters({ page: 0, size: 9 });
  };

  const sortOptions = [
    { label: 'Recommended', value: '' },
    { label: 'Price: Low to High', value: 'pricePerDay-ASC' },
    { label: 'Price: High to Low', value: 'pricePerDay-DESC' },
    { label: 'Rating', value: 'ratingAvg-DESC' },
    { label: 'Newest', value: 'createdAt-DESC' },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      setFilters(prev => ({ ...prev, sortBy: undefined, sortDir: undefined, page: 0 }));
      return;
    }
    const [sortBy, sortDir] = val.split('-');
    setFilters(prev => ({ ...prev, sortBy, sortDir: sortDir as 'ASC' | 'DESC', page: 0 }));
  };

  const currentSortValue = filters.sortBy ? `${filters.sortBy}-${filters.sortDir}` : '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Mobile Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Our Fleet</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {carsData ? `Showing ${carsData.totalElements} vehicles` : 'Loading vehicles...'}
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button 
              variant="outline" 
              className="md:hidden flex-1"
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              onClick={() => setIsSidebarOpen(true)}
            >
              Filters
            </Button>
            
            <Select
              className="w-full md:w-48 bg-white dark:bg-dark-900"
              value={currentSortValue}
              onChange={handleSortChange}
              options={sortOptions}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`
            fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm lg:static lg:block lg:w-72 lg:bg-transparent lg:z-auto
            ${isSidebarOpen ? 'block' : 'hidden'}
          `}>
            <div className={`
              fixed inset-y-0 left-0 w-80 bg-white dark:bg-dark-900 p-6 overflow-y-auto shadow-2xl transition-transform transform lg:static lg:w-full lg:shadow-none lg:border lg:border-slate-200 lg:dark:border-dark-800 lg:rounded-2xl lg:translate-x-0
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </h2>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Search</label>
                  <Input
                    placeholder="Brand or model"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    leftIcon={<Search className="w-4 h-4" />}
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Location</label>
                  <Select
                    value={filters.locationId || ''}
                    onChange={(e) => handleFilterChange('locationId', e.target.value ? Number(e.target.value) : undefined)}
                    options={[
                      { label: 'All Locations', value: '' },
                      ...locations.map(l => ({ label: l.city, value: l.id }))
                    ]}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Category</label>
                  <div className="space-y-2">
                    {['SEDAN', 'SUV', 'LUXURY', 'EV', 'HATCHBACK'].map(cat => (
                      <label key={cat} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={filters.category === cat}
                          onChange={() => handleFilterChange('category', cat)}
                          className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-slate-300"
                        />
                        <span className="text-slate-700 dark:text-slate-300 capitalize">{cat.toLowerCase()}</span>
                      </label>
                    ))}
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="category"
                        checked={!filters.category}
                        onChange={() => handleFilterChange('category', undefined)}
                        className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-slate-300"
                      />
                      <span className="text-slate-700 dark:text-slate-300">Any Category</span>
                    </label>
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Transmission</label>
                  <Select
                    value={filters.transmission || ''}
                    onChange={(e) => handleFilterChange('transmission', e.target.value || undefined)}
                    options={[
                      { label: 'Any', value: '' },
                      { label: 'Automatic', value: 'AUTOMATIC' },
                      { label: 'Manual', value: 'MANUAL' }
                    ]}
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Fuel Type</label>
                  <Select
                    value={filters.fuelType || ''}
                    onChange={(e) => handleFilterChange('fuelType', e.target.value || undefined)}
                    options={[
                      { label: 'Any', value: '' },
                      { label: 'Petrol', value: 'PETROL' },
                      { label: 'Diesel', value: 'DIESEL' },
                      { label: 'Electric', value: 'ELECTRIC' },
                      { label: 'Hybrid', value: 'HYBRID' }
                    ]}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Price Range / Day</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice || ''}
                      onChange={e => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice || ''}
                      onChange={e => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Seats</label>
                  <Select
                    value={filters.seats || ''}
                    onChange={(e) => handleFilterChange('seats', e.target.value ? Number(e.target.value) : undefined)}
                    options={[
                      { label: 'Any', value: '' },
                      { label: '5 Seats', value: 5 },
                      { label: '7 Seats', value: 7 }
                    ]}
                  />
                </div>

                {/* Min Rating */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">Minimum Rating</label>
                  <Select
                    value={filters.minRating || ''}
                    onChange={(e) => handleFilterChange('minRating', e.target.value ? Number(e.target.value) : undefined)}
                    options={[
                      { label: 'Any', value: '' },
                      { label: '1+ Stars', value: 1 },
                      { label: '2+ Stars', value: 2 },
                      { label: '3+ Stars', value: 3 },
                      { label: '4+ Stars', value: 4 },
                      { label: '5 Stars', value: 5 }
                    ]}
                  />
                </div>

                <Button variant="outline" className="w-full mt-4" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarCardSkeleton key={i} />
                ))}
              </div>
            ) : carsData?.content.length === 0 ? (
              <EmptyState 
                title="No cars found"
                description="We couldn't find any cars matching your current filters. Try adjusting your search criteria."
                actionLabel="Reset Filters"
                onAction={resetFilters}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {carsData?.content.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>

                {/* Pagination */}
                {carsData && carsData.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange('page', filters.page! - 1)}
                      disabled={filters.page === 0}
                      leftIcon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Page {carsData.pageNumber + 1} of {carsData.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFilterChange('page', filters.page! + 1)}
                      disabled={carsData.isLast}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
