import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Car as CarIcon, Calendar, Shield, ArrowRight, Search, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Car, Location } from '../types';
import carService from '../services/carService';
import { CarCard } from '../components/cars/CarCard';
import { Button } from '../components/common/Button';
import { Select } from '../components/common/Select';
import { CarCardSkeleton } from '../components/common/SkeletonLoader';

// Inline SVG taxi icon
const TaxiIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="48" height="16" rx="4" fill="currentColor"/>
    <rect x="16" y="6" width="28" height="10" rx="3" fill="currentColor" opacity="0.8"/>
    <circle cx="16" cy="28" r="4" fill="#1a1a1a" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="48" cy="28" r="4" fill="#1a1a1a" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="24" y="8" width="16" height="2" rx="1" fill="white" opacity="0.6"/>
  </svg>
);

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
    <div className="min-h-screen bg-amber-50 dark:bg-dark-950">

      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-36 lg:pt-32 lg:pb-52 bg-gradient-to-br from-slate-950 via-dark-900 to-amber-950 overflow-hidden">
        {/* Animated taxi-stripe accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 taxi-stripe opacity-80" />

        {/* Background glow blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating taxi/car decorations */}
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 right-[12%] text-amber-400 opacity-30 hidden lg:block"
        >
          <TaxiIcon className="w-28 h-14" />
        </motion.div>
        <motion.div
          animate={{ x: [0, -14, 0], y: [0, 10, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-28 left-[8%] text-red-500 opacity-25 hidden lg:block"
        >
          <TaxiIcon className="w-20 h-10" />
        </motion.div>
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-32 left-[18%] text-yellow-300 opacity-20 hidden lg:block"
        >
          <CarIcon className="w-10 h-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-semibold mb-6"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              India's #1 Premium Car Rental
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight"
            >
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
                Perfect Ride
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 mb-8"
            >
              Premium cars & taxis across India. Zero-overlap guarantee, instant booking, 24/7 support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <Button size="lg" onClick={() => navigate('/cars')}>
                🚖 Explore Fleet
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white/20 hover:bg-white/10 dark:hover:bg-white/10"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-900 p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-amber-200/60 dark:border-amber-800/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Select
                  label="City"
                  value={searchParams.locationId}
                  onChange={(e) => setSearchParams({ ...searchParams, locationId: e.target.value })}
                  options={locations.map(l => ({ value: l.id.toString(), label: l.city }))}
                  placeholder="Select City"
                  className="bg-amber-50 dark:bg-dark-950"
                />
              </div>
              <div>
                <Select
                  label="Category"
                  value={searchParams.category}
                  onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                  options={categories}
                  placeholder="Any Category"
                  className="bg-amber-50 dark:bg-dark-950"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Pickup</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-amber-200 dark:border-dark-700 bg-amber-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    value={searchParams.startDate}
                    onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Dropoff</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-amber-200 dark:border-dark-700 bg-amber-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
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

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="text-white">
              <div className="font-bold text-3xl text-amber-400">16+</div>
              <div className="text-sm text-slate-400 mt-1">Premium Cars</div>
            </div>
            <div className="text-white">
              <div className="font-bold text-3xl text-red-400">5</div>
              <div className="text-sm text-slate-400 mt-1">Cities</div>
            </div>
            <div className="text-white">
              <div className="font-bold text-3xl text-amber-400">100%</div>
              <div className="text-sm text-slate-400 mt-1">Zero Overlap</div>
            </div>
            <div className="text-white">
              <div className="font-bold text-3xl text-red-400">24/7</div>
              <div className="text-sm text-slate-400 mt-1">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Rent your dream car in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Search className="w-8 h-8 text-amber-500" />, title: 'Search', desc: 'Find the perfect car for your needs', color: 'bg-amber-500' },
              { icon: <Calendar className="w-8 h-8 text-red-500" />, title: 'Select Dates', desc: 'Choose your pickup and dropoff dates', color: 'bg-red-500' },
              { icon: <Shield className="w-8 h-8 text-amber-500" />, title: 'Add Extras', desc: 'Add insurance, child seats, etc.', color: 'bg-amber-500' },
              { icon: <CarIcon className="w-8 h-8 text-red-500" />, title: 'Drive Away', desc: 'Pick up your car and hit the road', color: 'bg-red-500' }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 bg-amber-50 dark:bg-dark-800 rounded-2xl text-center shadow-sm border border-amber-100 dark:border-dark-700 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 mx-auto ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm absolute -top-5 left-1/2 -translate-x-1/2 shadow-md`}>
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

      {/* ── Category Pills ── */}
      <section className="py-10 bg-amber-50 dark:bg-dark-950 border-y border-amber-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { emoji: '🚖', label: 'Taxi', cat: 'SEDAN', color: 'bg-amber-400 text-amber-950' },
              { emoji: '🚗', label: 'Sedan', cat: 'SEDAN', color: 'bg-yellow-100 text-yellow-800 border border-yellow-300' },
              { emoji: '🚙', label: 'SUV', cat: 'SUV', color: 'bg-red-100 text-red-700 border border-red-200' },
              { emoji: '💎', label: 'Luxury', cat: 'LUXURY', color: 'bg-amber-100 text-amber-800 border border-amber-300' },
              { emoji: '⚡', label: 'Electric', cat: 'EV', color: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
              { emoji: '🚕', label: 'Hatchback', cat: 'HATCHBACK', color: 'bg-red-500 text-white' },
            ].map(item => (
              <button
                key={item.cat + item.label}
                onClick={() => navigate(`/cars?category=${item.cat}`)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${item.color}`}
              >
                <span className="text-base">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Cars ── */}
      <section className="py-20 bg-amber-50 dark:bg-dark-950">
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
              Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)
            ) : (
              featuredCars.map(car => <CarCard key={car.id} car={car} />)
            )}
          </div>
        </div>
      </section>

      {/* ── Locations ── */}
      <section id="locations" className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Locations</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Find us in these major cities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-amber-50 dark:bg-dark-800 p-6 rounded-2xl animate-pulse h-[120px]" />
              ))
            ) : (
              locations.map(loc => (
                <div
                  key={loc.id}
                  className="bg-amber-50 dark:bg-dark-800 p-6 rounded-2xl text-center border border-amber-100 dark:border-dark-700 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                  onClick={() => navigate(`/cars?locationId=${loc.id}`)}
                >
                  <MapPin className="w-8 h-8 mx-auto text-amber-500 group-hover:text-red-500 transition-colors mb-3" />
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{loc.city}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">
        <div className="absolute inset-0 opacity-10 taxi-stripe" />
        {/* Floating car decorations in CTA */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-amber-900/20 hidden lg:block">
          <TaxiIcon className="w-40 h-20" />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-amber-900/20 hidden lg:block scale-x-[-1]">
          <TaxiIcon className="w-40 h-20" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow">Ready to Hit the Road? 🚖</h2>
          <p className="text-amber-100 mb-10 text-lg">Join thousands of happy customers and book your next ride with DriveEase.</p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-white !text-amber-700 hover:bg-amber-50 shadow-xl font-bold"
              onClick={() => navigate('/register')}
            >
              Sign Up Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white/15 font-semibold"
              onClick={() => navigate('/cars')}
            >
              Explore Fleet
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
