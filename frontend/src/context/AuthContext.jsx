
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
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
  const API_URL = import.meta.env.PROD 
    ? '/api' 
    : 'http://localhost:5000/api';
  
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
      
      if (!response.ok) {
        let errorMsg = 'Error creating account';
        
        // Check if we can get a more specific error message
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || `Server error: ${response.status}`;
        } catch (e) {
          errorMsg = `Server error (${response.status}): The server might not be running or the route is not available`;
        }
        
        throw new Error(errorMsg);
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
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        let errorMsg = 'Invalid login credentials';
        
        // Check if we can get a more specific error message
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || `Server error: ${response.status}`;
        } catch (e) {
          errorMsg = `Server error (${response.status}): The server might not be running or the route is not available`;
        }
        
        throw new Error(errorMsg);
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

  const googleSignIn = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      
      if (!response.ok) {
        let errorMsg = 'Google sign in failed';
        
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || `Server error: ${response.status}`;
        } catch (e) {
          errorMsg = `Server error (${response.status})`;
        }
        
        throw new Error(errorMsg);
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setCurrentUser(data.user);
      return data;
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error.message);
      throw error;
    }
  };
  
  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    toast.success('Successfully signed out');
  }, []);
  
  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    googleSignIn,
    signOut
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
