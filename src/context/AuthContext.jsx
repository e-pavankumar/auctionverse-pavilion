
import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fix the API URL to work both locally and in production
  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : '/api';
  
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
      console.log('Signing up with:', { email, name });
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });
      
      // Check if response exists before trying to parse JSON
      if (!response.ok) {
        // Try to get error message from response
        let errorMsg;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message;
        } catch (e) {
          // If parsing fails, use status text
          errorMsg = `Request failed with status ${response.status} (${response.statusText})`;
        }
        throw new Error(errorMsg || 'Error creating account');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error.message);
      throw error;
    }
  };
  
  const signIn = async (email, password) => {
    try {
      console.log('Signing in with:', { email });
      console.log('API URL:', `${API_URL}/auth/login`);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      // Check if response exists before trying to parse JSON
      if (!response.ok) {
        // Try to get error message from response
        let errorMsg;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message;
        } catch (e) {
          // If parsing fails, use status text
          errorMsg = `Request failed with status ${response.status} (${response.statusText})`;
        }
        throw new Error(errorMsg || 'Invalid login credentials');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
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
