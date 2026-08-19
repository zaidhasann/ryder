import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Car, Heart, User as UserIcon, LogOut, Menu, X, Shield, CalendarDays, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const openAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-amber-50/90 dark:bg-dark-950/90 border-b border-amber-200/60 dark:border-amber-900/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-white shadow-glow-sm group-hover:scale-105 transition-transform duration-200">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  Drive<span className="text-amber-500 dark:text-amber-400">Ease</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                  Your journey, your choice
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/cars"
                className={`text-sm font-medium transition-colors ${
                  isActive('/cars') ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                Fleet Catalog
              </Link>
              <a
                href="/#how-it-works"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                How It Works
              </a>
              <a
                href="/#locations"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Locations
              </a>
            </nav>

            {/* Right Action Area */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white dark:bg-dark-900 border border-amber-200 dark:border-slate-700/70 hover:border-amber-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-600/30 border border-amber-200 dark:border-amber-500/50 flex items-center justify-center text-amber-700 dark:text-amber-400 font-bold text-xs">
                      {user.firstName?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium max-w-[120px] truncate">
                      {user.firstName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  </button>

                  {profileDropdownOpen && (
                    <div
                      onMouseLeave={() => setProfileDropdownOpen(false)}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-dark-700/80 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-dark-800">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{user.email}</p>
                        {isAdmin && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-red-100 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 border border-red-200 dark:border-amber-500/20">
                            <Sparkles className="w-2.5 h-2.5" /> Administrator
                          </span>
                        )}
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:bg-amber-50 dark:hover:bg-dark-800 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        Dashboard Overview
                      </Link>

                      <Link
                        to="/dashboard/bookings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:bg-amber-50 dark:hover:bg-dark-800 transition-colors"
                      >
                        <CalendarDays className="w-4 h-4 text-slate-400" />
                        My Bookings
                      </Link>

                      <Link
                        to="/dashboard/wishlist"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:bg-amber-50 dark:hover:bg-dark-800 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-slate-400" />
                        Saved Wishlist
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-amber-400 hover:text-red-700 dark:hover:text-amber-300 hover:bg-red-50 dark:hover:bg-dark-800 transition-colors font-medium border-t border-slate-100 dark:border-dark-800"
                        >
                          <Shield className="w-4 h-4" />
                          Admin Control Center
                        </Link>
                      )}

                      <div className="border-t border-slate-100 dark:border-dark-800 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                            navigate('/');
                          }}
                          className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-rose-400 hover:bg-red-50 dark:hover:bg-dark-800 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAuth('login')}
                    className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white font-semibold"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => openAuth('register')}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-dark-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-amber-200 dark:border-dark-800 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-dark-800"
              >
                Home
              </Link>
              <Link
                to="/cars"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-dark-800"
              >
                Fleet Catalog
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-dark-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white hover:bg-amber-100 dark:hover:bg-dark-800"
                  >
                    My Bookings
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-xl text-base font-medium text-red-600 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-dark-800"
                    >
                      Admin Control Center
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                      navigate('/');
                    }}
                    className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-red-600 dark:text-rose-400 hover:bg-red-50 dark:hover:bg-dark-800"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth('login');
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth('register');
                    }}
                  >
                    Register Now
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Instant Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
};

