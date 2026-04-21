import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.verifyToken();
          setUser(response.data.user);
        } catch (error) {
          console.error('Session expired or invalid:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const data = response.data;
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Login failed";
      throw new Error(message);
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const response = await authAPI.signup(email, password, displayName);
      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }
      return data;
    } catch (error) {
      const message = error.response?.data?.error || error.message || "Signup failed";
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
