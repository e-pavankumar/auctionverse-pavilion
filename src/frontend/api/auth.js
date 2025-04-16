
import apiClient from './apiClient';
import { signInUser as mockSignIn, signUpUser as mockSignUp, getCurrentUser as mockGetCurrentUser } from '../../backend/api/auth';

// Use mock API instead of real API for development
const USE_MOCK_API = false; // Changed to false to use the real API that connects to MongoDB

// Sign in user
export const signInUser = async (email, password) => {
  try {
    let response;
    
    if (USE_MOCK_API) {
      // Use mock API
      response = await mockSignIn(email, password);
    } else {
      // Use real API
      response = await apiClient.post('/auth/signin', { email, password });
      response = response.data; // Ensure we return the correct format
    }
    
    // Store token in localStorage
    localStorage.setItem('token', response.token);
    
    return response;
  } catch (error) {
    console.error('Sign in error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to sign in');
  }
};

// Sign up user
export const signUpUser = async (email, password, name) => {
  try {
    let response;
    
    if (USE_MOCK_API) {
      // Use mock API
      response = await mockSignUp(email, password, name);
    } else {
      // Use real API
      console.log('Sending signup request with:', { email, password, name });
      response = await apiClient.post('/auth/signup', { email, password, name });
      console.log('Signup response:', response);
      response = response.data; // Ensure we return the correct format
    }
    
    // Store token in localStorage
    localStorage.setItem('token', response.token);
    
    return response;
  } catch (error) {
    console.error('Signup API error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to sign up');
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    let response;
    
    if (USE_MOCK_API) {
      // Use mock API
      response = await mockGetCurrentUser(token);
      return response;
    } else {
      // Use real API
      response = await apiClient.get('/auth/me');
      return response.data;
    }
  } catch (error) {
    console.error('Get current user error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to get user');
  }
};

// Sign out user
export const signOutUser = async () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  return { success: true };
};
