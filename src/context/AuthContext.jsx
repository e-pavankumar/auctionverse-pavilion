
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const signUp = (email, password, name) => {
    // In a real app, this would call an API
    const newUser = { id: Date.now().toString(), email, name };
    
    // Store users in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      throw new Error('Email already in use');
    }
    
    // Add user to users array with password
    users.push({ ...newUser, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Set current user without password
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  };

  const signIn = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Store user without password
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setCurrentUser(userWithoutPassword);
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
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
