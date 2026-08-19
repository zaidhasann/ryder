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

// Framer Motion Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 120 } }
};

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
        <div className="absolute top-0 left-0 right-0 h-1 taxi-stripe opacity-80" />

        {/* Dynamic Background Glow Blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-10 right-10 w-72 h-72 bg-red-600/15 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Floating taxi decorations */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 right-[12%] text-amber-400 opacity-20 hidden lg:block"
        >
          <TaxiIcon className="w-28 h-14" />
        </motion.div>
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-28 left-[8%] text-red-500 opacity-20 hidden lg:block"
        >
          <TaxiIcon className="w-20 h-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center max-w-3xl mx-auto mb-12"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-semibold mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              India's #1 Premium Car Rental
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-sm">
                Perfect Ride
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Premium cars & taxis across India. Zero-overlap guarantee, instant booking, 24/7 support.
            </motion.p>

            <motion.div variants={fadeUp} className="flex justify-center gap-4">
              <Button size="lg" className="shadow-lg hover:shadow-amber-500/20 hover:-translate-y-1 transition-all" onClick={() => navigate('/cars')}>
                🚖 Explore Fleet
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white/20 hover:bg-white/10 dark:hover:bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-1"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100, damping: 20 }}
            className="bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-amber-200/50 dark:border-amber-500/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Select
                  label="City"
                  value={searchParams.locationId}
                  onChange={(e) => setSearchParams({ ...searchParams, locationId: e.target.value })}
                  options={locations.map(l => ({ value: l.id.toString(), label: l.city }))}
                  placeholder="Select City"
                  className="bg-amber-50/50 dark:bg-dark-950/50"
                />
              </div>
              <div>
                <Select
                  label="Category"
                  value={searchParams.category}
                  onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                  options={categories}
                  placeholder="Any Category"
                  className="bg-amber-50/50 dark:bg-dark-950/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Pickup</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-amber-200 dark:border-dark-700 bg-amber-50/50 dark:bg-dark-950/50 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow"
                    value={searchParams.startDate}
                    onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">Dropoff</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-amber-200 dark:border-dark-700 bg-amber-50/50 dark:bg-dark-950/50 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none transition-shadow"
                    value={searchParams.endDate}
                    onChange={(e) => setSearchParams({ ...searchParams, endDate: e.target.value })}
                  />
                </div>
              </div>
              <Button size="lg" className="w-full py-2.5 h-[46px] shadow-md hover:shadow-lg transition-all" onClick={handleSearch} rightIcon={<Search className="w-4 h-4" />}>
                Search
              </Button>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            {[
              { val: '16+', label: 'Premium Cars', color: 'text-amber-400' },
              { val: '5', label: 'Cities', color: 'text-red-400' },
              { val: '100%', label: 'Zero Overlap', color: 'text-amber-400' },
              { val: '24/7', label: 'Support', color: 'text-red-400' }
            ].map((stat, i) => (
              <motion.div key={i} variants={popIn} className="text-white">
                <div className={`font-black text-4xl mb-1 ${stat.color} drop-shadow-md`}>{stat.val}</div>
                <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">How It Works</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg">Rent your dream car in 4 simple steps</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { icon: <Search className="w-8 h-8 text-amber-500" />, title: 'Search', desc: 'Find the perfect car for your needs', color: 'bg-amber-500' },
              { icon: <Calendar className="w-8 h-8 text-red-500" />, title: 'Select Dates', desc: 'Choose your pickup and dropoff dates', color: 'bg-red-500' },
              { icon: <Shield className="w-8 h-8 text-amber-500" />, title: 'Add Extras', desc: 'Add insurance, child seats, etc.', color: 'bg-amber-500' },
              { icon: <CarIcon className="w-8 h-8 text-red-500" />, title: 'Drive Away', desc: 'Pick up your car and hit the road', color: 'bg-red-500' }
            ].map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="relative p-6 bg-amber-50/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl text-center shadow-sm border border-amber-100/50 dark:border-dark-700/50 hover:shadow-xl hover:border-amber-200 transition-all"
              >
                <div className={`w-12 h-12 mx-auto ${step.color} rounded-full flex items-center justify-center text-white font-black text-lg absolute -top-6 left-1/2 -translate-x-1/2 shadow-lg ring-4 ring-white dark:ring-dark-900`}>
                  {idx + 1}
                </div>
                <div className="mt-8 flex justify-center mb-5 bg-white dark:bg-dark-900 w-16 h-16 mx-auto rounded-2xl items-center shadow-inner">{step.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category Pills ── */}
      <section className="py-12 bg-amber-50/50 dark:bg-dark-950/50 border-y border-amber-100 dark:border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {[
              { emoji: '🚖', label: 'Taxi', cat: 'SEDAN', color: 'bg-amber-400 text-amber-950 hover:bg-amber-500 hover:text-white' },
              { emoji: '🚗', label: 'Sedan', cat: 'SEDAN', color: 'bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700 hover:border-amber-400' },
              { emoji: '🚙', label: 'SUV', cat: 'SUV', color: 'bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700 hover:border-amber-400' },
              { emoji: '💎', label: 'Luxury', cat: 'LUXURY', color: 'bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700 hover:border-amber-400' },
              { emoji: '⚡', label: 'Electric', cat: 'EV', color: 'bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700 hover:border-amber-400' },
              { emoji: '🚕', label: 'Hatchback', cat: 'HATCHBACK', color: 'bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-dark-700 hover:border-amber-400' },
            ].map(item => (
              <motion.button
                key={item.cat + item.label}
                variants={popIn}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/cars?category=${item.cat}`)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-sm hover:shadow-md ${item.color}`}
              >
                <span className="text-xl">{item.emoji}</span>
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Cars ── */}
      <section className="py-24 bg-amber-50 dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4"
          >
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Featured Cars</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-lg">Our highest rated vehicles</p>
            </div>
            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={() => navigate('/cars')}>
              View All Cars
            </Button>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <CarCardSkeleton key={i} />)
            ) : (
              featuredCars.map(car => (
                <motion.div key={car.id} variants={fadeUp}>
                  <CarCard car={car} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Locations ── */}
      <section id="locations" className="py-24 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Our Locations</h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg">Find us in these major cities</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
          >
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-amber-50 dark:bg-dark-800 p-6 rounded-2xl animate-pulse h-[120px]" />
              ))
            ) : (
              locations.map(loc => (
                <motion.div
                  key={loc.id}
                  variants={popIn}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-amber-50/50 dark:bg-dark-800/50 backdrop-blur-sm p-6 rounded-3xl text-center border border-amber-100/50 dark:border-dark-700/50 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => navigate(`/cars?locationId=${loc.id}`)}
                >
                  <div className="bg-white dark:bg-dark-900 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                    <MapPin className="w-6 h-6 text-amber-500 group-hover:text-red-500 transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{loc.city}</h3>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-28 relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">
        <div className="absolute inset-0 opacity-10 taxi-stripe" />
        
        {/* Animated taxi decorations in CTA */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 0.2 }}
          className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-900 drop-shadow-sm hidden lg:block"
        >
          <TaxiIcon className="w-48 h-24" />
        </motion.div>
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 0.4 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-900 drop-shadow-sm hidden lg:block scale-x-[-1]"
        >
          <TaxiIcon className="w-48 h-24" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md">Ready to Hit the Road? 🚖</h2>
          <p className="text-amber-50 font-medium mb-12 text-xl drop-shadow">Join thousands of happy customers and book your next ride with DriveEase.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white !text-amber-700 hover:bg-amber-50 shadow-xl font-bold text-lg px-8 py-4 h-auto rounded-full hover:scale-105 transition-transform"
              onClick={() => navigate('/register')}
            >
              Sign Up Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-2 border-white hover:bg-white/15 font-bold text-lg px-8 py-4 h-auto rounded-full hover:scale-105 transition-transform backdrop-blur-sm"
              onClick={() => navigate('/cars')}
            >
              Explore Fleet
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;

