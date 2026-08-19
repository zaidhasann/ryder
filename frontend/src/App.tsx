import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Placeholder Pages for Phase 1 Scaffolding
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

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
