
/**
 * Authentication API functions
 * 
 * Note: This is a placeholder file for backend authentication functionality.
 * In a real application, you would implement actual authentication logic here
 * with connections to a database and proper security measures.
 */

// Mock user database
const users = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123', // In a real app, this would be hashed
    name: 'Test User'
  }
];

// Sign in function
export const signInUser = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user with matching email
  const user = users.find(user => user.email === email);
  
  // If no user found or password doesn't match
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  // Return user data (excluding password)
  const { password: _, ...userData } = user;
  return {
    user: userData,
    token: 'mock-jwt-token-' + Math.random().toString(36).substring(2)
  };
};

// Sign up function
export const signUpUser = async (email, password, name) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  if (users.find(user => user.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    email,
    password, // In a real app, this would be hashed
    name
  };
  
  // Add to mock database
  users.push(newUser);
  
  // Return user data (excluding password)
  const { password: _, ...userData } = newUser;
  return {
    user: userData,
    token: 'mock-jwt-token-' + Math.random().toString(36).substring(2)
  };
};

// Get current user function
export const getCurrentUser = async (token) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, you would validate the JWT token
  if (!token || !token.startsWith('mock-jwt-token-')) {
    throw new Error('Invalid token');
  }
  
  // For demo purposes, just return the first user
  const { password: _, ...userData } = users[0];
  return userData;
};

// Sign out function
export const signOutUser = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, you might invalidate the token on the server
  return { success: true };
};
