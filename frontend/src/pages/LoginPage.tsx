import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Car, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const fillDemoAccount = (role: 'user' | 'admin') => {
    setErrorMessage(null);
    if (role === 'admin') {
      setEmail('admin@driveease.com');
      setPassword('Admin@123');
    } else {
      setEmail('user@driveease.com');
      setPassword('User@123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      toast.success('Welcome back!', 'You have successfully signed in.');
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        errorObj.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-dark-800 bg-white dark:bg-dark-900">
        {/* Left Side: Brand Visual Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-dark-950 to-brand-950 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden text-white border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-glow-sm">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Drive<span className="text-brand-500">Ease</span>
              </span>
            </Link>

            <div className="pt-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Shield className="w-3.5 h-3.5" /> Secure Authentication
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Unlock frictionless vehicle rentals across India.
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Access your booking dashboard, track active rentals, manage saved wishlists, and reserve premium cars with guaranteed availability.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 mt-8 relative z-10">
            <p className="text-xs text-slate-400">
              Need assistance? Call our 24/7 Concierge at <strong className="text-slate-200">+91 1800-DRIVE-EASE</strong>
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Welcome back
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enter your credentials to access your DriveEase account.
              </p>
            </div>

            {/* Quick Demo Fill Bar */}
            <div className="p-3.5 bg-brand-50/80 dark:bg-brand-950/30 border border-brand-200/70 dark:border-brand-800/50 rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                Click to autofill placement demo accounts:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('user')}
                  className="text-xs font-medium py-2 px-3 rounded-xl bg-white dark:bg-dark-900 border border-brand-200 dark:border-brand-800/80 text-slate-700 dark:text-slate-200 hover:border-brand-500 transition-colors text-left truncate"
                >
                  👤 <strong>Demo User</strong>
                  <span className="block text-[10px] text-slate-400">user@driveease.com</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin')}
                  className="text-xs font-medium py-2 px-3 rounded-xl bg-white dark:bg-dark-900 border border-amber-300 dark:border-amber-700/80 text-amber-700 dark:text-amber-300 hover:border-amber-500 transition-colors text-left truncate"
                >
                  👑 <strong>Demo Admin</strong>
                  <span className="block text-[10px] text-slate-400">admin@driveease.com</span>
                </button>
              </div>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="user@driveease.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                isLoading={loading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Don't have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Create free account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
