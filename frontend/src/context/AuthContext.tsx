import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (data: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('driveease_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('driveease_access_token')
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const saveAuthData = (authData: AuthResponse) => {
    localStorage.setItem('driveease_access_token', authData.accessToken);
    localStorage.setItem('driveease_refresh_token', authData.refreshToken);
    localStorage.setItem('driveease_user', JSON.stringify(authData.user));
    setToken(authData.accessToken);
    setUser(authData.user);
  };

  const clearAuthData = useCallback(() => {
    localStorage.removeItem('driveease_access_token');
    localStorage.removeItem('driveease_refresh_token');
    localStorage.removeItem('driveease_user');
    setToken(null);
    setUser(null);
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem('driveease_refresh_token');
    try {
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } finally {
      clearAuthData();
    }
  }, [clearAuthData]);

  const refreshUserProfile = useCallback(async () => {
    if (!token) return;
    try {
      const updatedUser = await authService.getMe();
      setUser(updatedUser);
      localStorage.setItem('driveease_user', JSON.stringify(updatedUser));
    } catch (err) {
      console.warn('Could not sync user profile', err);
    }
  }, [token]);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('driveease_access_token');
      if (savedToken) {
        try {
          const profile = await authService.getMe();
          setUser(profile);
          localStorage.setItem('driveease_user', JSON.stringify(profile));
        } catch {
          // Token might be refreshed by axios interceptor or invalidated
        }
      }
      setIsLoading(false);
    };

    const handleAutoLogout = () => {
      clearAuthData();
    };

    window.addEventListener('auth:logout', handleAutoLogout);
    initAuth();

    return () => {
      window.removeEventListener('auth:logout', handleAutoLogout);
    };
  }, [clearAuthData]);

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      saveAuthData(response);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      saveAuthData(response);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('driveease_user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'ROLE_ADMIN',
    login,
    register,
    logout,
    updateUser,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
