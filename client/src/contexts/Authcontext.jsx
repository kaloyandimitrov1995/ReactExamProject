import { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../utils/api.js';

const AuthContext = createContext();
const AUTH_STORAGE_KEY = 'auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse auth from storage', err);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, []);

  const login = async (email, password) => {
    const result = await api.post('/users/login', { email, password });
    setUser(result);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
  };

  const register = async (email, password, username) => {
    const result = await api.post('/users/register', { email, password, username });
    setUser(result);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
  };

  const logout = async () => {
    try {
      await api.get('/users/logout');
    } catch (err) {
      console.warn('Logout request failed, clearing session anyway.');
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);