import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Phone, FileText } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, register } = useAuth();
  const toast = useToast();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
      toast.success('Welcome back!', 'You have successfully signed in.');
      onClose();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        errorObj.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim() || !lastName.trim() || !registerEmail.trim() || !registerPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (registerPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await register({
        firstName,
        lastName,
        email: registerEmail,
        password: registerPassword,
        phone: phone || undefined,
        drivingLicense: drivingLicense || undefined,
      });
      toast.success('Account created!', 'Welcome to DriveEase. Your journey begins now.');
      onClose();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setErrorMessage(
        errorObj.response?.data?.message || 'Registration failed. Please verify your details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="space-y-6">
        {/* Tab Selector */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-dark-800 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-dark-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-dark-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Create Account
          </button>
        </div>



        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-300">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. rahul@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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
            >
              Sign In to DriveEase
            </Button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-3.5">
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
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password (min 6 chars) *"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
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
              >
                Create Free Account
              </Button>
            </div>

            <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
              By signing up, you agree to DriveEase Terms of Service and Privacy Policy.
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
};
