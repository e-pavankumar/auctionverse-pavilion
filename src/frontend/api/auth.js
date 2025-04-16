
import apiClient from './apiClient';

// Sign in user
export const signInUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/signin', { email, password });
    
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to sign in');
  }
};

// Sign up user
export const signUpUser = async (email, password, name) => {
  try {
    const response = await apiClient.post('/auth/signup', { email, password, name });
    
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to sign up');
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get user');
  }
};

// Sign out user
export const signOutUser = async () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  return { success: true };
};
