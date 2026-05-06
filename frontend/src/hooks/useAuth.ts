import { useState } from 'react';
import { api, AuthResponse } from '../utils/api';
import { authStore } from '../store/authStore';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await api.post<AuthResponse>('/api/auth/login', { email, password });
      authStore.getState().setUser(response.user);
      authStore.getState().setToken(response.accessToken);
      localStorage.setItem('token', response.accessToken);
      return response;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await api.post<AuthResponse>('/api/auth/register', { email, name, password });
      authStore.getState().setUser(response.user);
      authStore.getState().setToken(response.accessToken);
      localStorage.setItem('token', response.accessToken);
      return response;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authStore.getState().setUser(null);
    authStore.getState().setToken(null);
    localStorage.removeItem('token');
  };

  return {
    user: authStore.getState().user,
    loading,
    error,
    login,
    register,
    logout,
  };
}
