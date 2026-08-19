import React, { useState, useEffect } from 'react';
import { User, Shield, Key, Mail, Phone, Book } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { authService } from '../services/authService';
import apiClient from '../services/api';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';

export const DashboardPage: React.FC = () => {
  const { user, refreshUserProfile } = useAuth();
  const { success, error: toastError } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [drivingLicense, setDrivingLicense] = useState(user?.drivingLicense || '');
  const [isSaving, setIsSaving] = useState(false);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [isChangingPw, setIsChangingPw] = useState(false);

  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone || '');
      setDrivingLicense(user.drivingLicense || '');
    }
  }, [user]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [totalRes, activeRes, completedRes] = await Promise.all([
          apiClient.get('/bookings', { params: { size: 1 } }),
          apiClient.get('/bookings', { params: { size: 1, status: 'ACTIVE' } }),
          apiClient.get('/bookings', { params: { size: 1, status: 'COMPLETED' } })
        ]);
        setStats({
          total: totalRes.data.data.totalElements,
          active: activeRes.data.data.totalElements,
          completed: completedRes.data.data.totalElements
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleProfileSave = async () => {
    setIsSaving(true);
    try {
      await authService.updateProfile({ firstName, lastName, phone, drivingLicense });
      await refreshUserProfile();
      success('Profile Updated', 'Your profile information has been saved.');
      setIsEditing(false);
    } catch (err) {
      toastError('Update Failed', 'Could not save profile changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      toastError('Passwords mismatch', 'New password and confirm password must match.');
      return;
    }
    setIsChangingPw(true);
    try {
      await authService.changePassword(currentPw, newPw);
      success('Password Updated', 'Your password has been changed successfully.');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (err: any) {
      toastError('Password Change Failed', err?.response?.data?.message || 'Could not change password.');
    } finally {
      setIsChangingPw(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800 flex items-center">
          <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mr-4">
            <Book className="w-6 h-6 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Total Bookings</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {statsLoading ? '-' : stats.total}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800 flex items-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4">
            <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Active Rentals</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {statsLoading ? '-' : stats.active}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800 flex items-center">
          <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mr-4">
            <Key className="w-6 h-6 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Completed Trips</div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {statsLoading ? '-' : stats.completed}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Profile info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-brand-500 text-white flex items-center justify-center text-2xl font-bold mr-4">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.fullName}</h2>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="accent">{user.role === 'ROLE_ADMIN' ? 'Administrator' : 'Customer'}</Badge>
                    {user.status === 'ACTIVE' && <Badge variant="success">Active</Badge>}
                  </div>
                </div>
              </div>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  <Input label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
                  <Input label="Driving License" value={drivingLicense} onChange={e => setDrivingLicense(e.target.value)} />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={isSaving}>Cancel</Button>
                  <Button onClick={handleProfileSave} isLoading={isSaving}>Save Changes</Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email
                  </div>
                  <div className="font-medium text-slate-900 dark:text-white">{user.email}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 flex items-center">
                    <Phone className="w-4 h-4 mr-2" /> Phone
                  </div>
                  <div className="font-medium text-slate-900 dark:text-white">{user.phone || '-'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 flex items-center">
                    <Book className="w-4 h-4 mr-2" /> Driving License
                  </div>
                  <div className="font-medium text-slate-900 dark:text-white">{user.drivingLicense || '-'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 flex items-center">
                    <User className="w-4 h-4 mr-2" /> Member Since
                  </div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Change Password */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-dark-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                type="password"
                label="Current Password"
                value={currentPw}
                onChange={e => setCurrentPw(e.target.value)}
                required
              />
              <Input
                type="password"
                label="New Password"
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Confirm New Password"
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                required
              />
              <Button type="submit" className="w-full mt-2" isLoading={isChangingPw}>
                Update Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
