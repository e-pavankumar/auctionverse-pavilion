
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const API_URL = 'http://localhost:5000/api';
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchCurrentUser = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      } else {
        // Token invalid
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Fetch user error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const signUp = async (email, password, name) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error creating account');
      }
      
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid login credentials');
      }
      
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  
  const signOut = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };
  
  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signOut
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
