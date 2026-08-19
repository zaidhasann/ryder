import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Phone, FileText, Car, CheckCircle2, ArrowRight } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all required fields marked with *.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    setLoading(true);
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        phone: phone || undefined,
        drivingLicense: drivingLicense || undefined,
      });
      toast.success('Account created!', 'Welcome to DriveEase. You are now logged in.');
      navigate('/');
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        errorObj.response?.data?.message || 'Registration failed. Please check your details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-dark-800 bg-white dark:bg-dark-900">
        {/* Left Side: Benefits Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-dark-950 to-brand-950 p-8 sm:p-12 flex flex-col justify-between text-white border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-glow-sm">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Drive<span className="text-brand-500">Ease</span>
              </span>
            </Link>

            <div className="pt-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Join thousands of discerning travelers across India.
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Create an account in under 60 seconds to unlock exclusive fleet discounts, seamless zero-deposit reservations, and 24/7 priority support.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Guaranteed Zero-Overlap Bookings</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Full Comprehensive Insurance Options</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Free cancellation up to 6 hours before pickup</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 mt-8 relative z-10">
            <p className="text-xs text-slate-400">
              Already a member?{' '}
              <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Create your account
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enter your information to register as a verified driver.
              </p>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name *"
                  type="text"
                  placeholder="Rahul"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  leftIcon={<UserIcon className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Last Name *"
                  type="text"
                  placeholder="Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Email Address *"
                type="email"
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <Input
                label="Password (min 6 characters) *"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
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

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  leftIcon={<Phone className="w-4 h-4" />}
                />
                <Input
                  label="Driving License"
                  type="text"
                  placeholder="DL-14201100..."
                  value={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.value)}
                  leftIcon={<FileText className="w-4 h-4" />}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={loading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Register Account
                </Button>
              </div>

              <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                By creating an account, you agree to DriveEase Terms of Service, Privacy Policy, and Vehicle Rental Guidelines.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
