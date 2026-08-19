import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Existing pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
// Assuming CarsPage exists
import CarsPage from './pages/CarsPage';

// New pages
import CarDetailPage from './pages/CarDetailPage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import BookingsPage from './pages/BookingsPage';
import WishlistPage from './pages/WishlistPage';
import AdminPage from './pages/AdminPage';

// Placeholder Home Page
const HomePage = () => (
  <div className="py-24 px-4 max-w-7xl mx-auto text-center space-y-6">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-semibold">
      🚀 DriveEase Platform Initialized
    </div>
    <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
      Find the perfect car for <span className="text-gradient">your journey.</span>
    </h1>
    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
      Experience luxury sedans, rugged SUVs, and high-performance electric vehicles with guaranteed zero-overlap bookings and transparent server-side pricing.
    </p>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated || !isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/cars/:id" element={<CarDetailPage />} />
                <Route 
                  path="/cars/:id/book" 
                  element={
                    <ProtectedRoute>
                      <BookingPage />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/bookings" 
                  element={
                    <ProtectedRoute>
                      <BookingsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/wishlist" 
                  element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  } 
                />
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
