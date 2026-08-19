import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Car as CarIcon, Calendar, Star, Users, Zap, Shield, Clock, ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Car, Location } from '../types';
import carService from '../services/carService';
import { CarCard } from '../components/cars/CarCard';
import { Button } from '../components/common/Button';
import { Select } from '../components/common/Select';
import { CarCardSkeleton } from '../components/common/SkeletonLoader';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useState({
    locationId: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const [carsRes, locRes] = await Promise.all([
          carService.getCars({ size: 6, sortBy: 'ratingAvg', sortDir: 'DESC' }),
          carService.getLocations()
        ]);
        setFeaturedCars(carsRes.content);
        setLocations(locRes);
      } catch (error) {
        console.error('Failed to fetch home data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchParams.locationId) params.append('locationId', searchParams.locationId);
    if (searchParams.category) params.append('category', searchParams.category);
    // Dates could be passed to context or local storage, or as params
    if (searchParams.startDate) params.append('startDate', searchParams.startDate);
    if (searchParams.endDate) params.append('endDate', searchParams.endDate);
    
    navigate(`/cars?${params.toString()}`);
  };

  const categories = [
    { value: 'SEDAN', label: 'Sedan' },
    { value: 'SUV', label: 'SUV' },
    { value: 'LUXURY', label: 'Luxury' },
    { value: 'EV', label: 'Electric' },
    { value: 'HATCHBACK', label: 'Hatchback' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 bg-gradient-to-br from-dark-950 via-dark-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
            >
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Perfect Ride</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 mb-8"
            >
              Experience premium car rentals with zero overlap guarantee. Book your next journey with DriveEase today.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <Button size="lg" onClick={() => navigate('/cars')}>Explore Fleet</Button>
              <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10 dark:hover:bg-white/10" onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-900 p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-200 dark:border-dark-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Select
                  label="City"
                  value={searchParams.locationId}
                  onChange={(e) => setSearchParams({ ...searchParams, locationId: e.target.value })}
                  options={locations.map(l => ({ value: l.id.toString(), label: l.city }))}
                  placeholder="Select City"
                  className="bg-slate-50 dark:bg-dark-950"
                />
              </div>
              <div>
                <Select
                  label="Category"
                  value={searchParams.category}
                  onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                  options={categories}
                  placeholder="Any Category"
                  className="bg-slate-50 dark:bg-dark-950"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Pickup</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 dark:border-dark-700 bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    value={searchParams.startDate}
                    onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Dropoff</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 dark:border-dark-700 bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    value={searchParams.endDate}
                    onChange={(e) => setSearchParams({ ...searchParams, endDate: e.target.value })}
                  />
                </div>
              </div>
              <Button size="lg" className="w-full py-2.5 h-[46px]" onClick={handleSearch} rightIcon={<Search className="w-4 h-4" />}>
                Search
              </Button>
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
             <div className="text-white"><div className="font-bold text-2xl text-brand-400">16+</div><div className="text-sm text-slate-400">Premium Cars</div></div>
             <div className="text-white"><div className="font-bold text-2xl text-brand-400">5</div><div className="text-sm text-slate-400">Cities</div></div>
             <div className="text-white"><div className="font-bold text-2xl text-brand-400">100%</div><div className="text-sm text-slate-400">Zero Overlap Guarantee</div></div>
             <div className="text-white"><div className="font-bold text-2xl text-brand-400">24/7</div><div className="text-sm text-slate-400">Support</div></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Rent your dream car in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Search className="w-8 h-8 text-brand-500" />, title: 'Search', desc: 'Find the perfect car for your needs' },
              { icon: <Calendar className="w-8 h-8 text-brand-500" />, title: 'Select Dates', desc: 'Choose your pickup and dropoff dates' },
              { icon: <Shield className="w-8 h-8 text-brand-500" />, title: 'Add Extras', desc: 'Add insurance, child seats, etc.' },
              { icon: <CarIcon className="w-8 h-8 text-brand-500" />, title: 'Drive Away', desc: 'Pick up your car and hit the road' }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 bg-slate-50 dark:bg-dark-800 rounded-2xl text-center shadow-sm">
                <div className="w-16 h-16 mx-auto bg-white dark:bg-dark-900 rounded-full flex items-center justify-center shadow-md mb-4 border border-slate-100 dark:border-dark-700 text-2xl font-bold text-slate-200 dark:text-dark-700 absolute -top-8 left-1/2 -translate-x-1/2">
                   {idx + 1}
                </div>
                <div className="mt-6 flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-slate-50 dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Cars</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Our highest rated vehicles</p>
            </div>
            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => navigate('/cars')}>
              View All Cars
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))
            ) : (
              featuredCars.map(car => <CarCard key={car.id} car={car} />)
            )}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Locations</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Find us in these major cities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {isLoading ? (
               Array.from({ length: 5 }).map((_, i) => (
                 <div key={i} className="bg-slate-50 dark:bg-dark-800 p-6 rounded-2xl animate-pulse h-[120px]" />
               ))
            ) : (
              locations.map(loc => (
                <div key={loc.id} className="bg-slate-50 dark:bg-dark-800 p-6 rounded-2xl text-center border border-slate-100 dark:border-dark-700 hover:border-brand-500 dark:hover:border-brand-500 transition-colors cursor-pointer" onClick={() => {
                  navigate(`/cars?locationId=${loc.id}`);
                }}>
                  <MapPin className="w-8 h-8 mx-auto text-brand-500 mb-3" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">{loc.city}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-600 dark:bg-brand-900 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Hit the Road?</h2>
           <p className="text-brand-100 mb-10 text-lg">Join thousands of happy customers and book your next ride with DriveEase.</p>
           <div className="flex justify-center gap-4">
             <Button size="lg" className="bg-white text-brand-600 hover:bg-slate-100" onClick={() => navigate('/register')}>
               Sign Up
             </Button>
             <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10" onClick={() => navigate('/cars')}>
               Explore Fleet
             </Button>
           </div>
         </div>
      </section>
    </div>
  );
};

export default HomePage;
