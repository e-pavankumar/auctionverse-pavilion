
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('auctionUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock sign up function
  const signUp = (email, password, name) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: Date.now().toString(), email, name };
        localStorage.setItem('auctionUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        resolve(newUser);
      }, 1000);
    });
  };

  // Mock sign in function
  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real app, you would validate credentials against a backend
        // For now, let's just simulate login with any credentials
        const mockUser = { id: '123', email, name: email.split('@')[0] };
        localStorage.setItem('auctionUser', JSON.stringify(mockUser));
        setCurrentUser(mockUser);
        resolve(mockUser);
      }, 1000);
    });
  };

  // Sign out function
  const signOut = () => {
    localStorage.removeItem('auctionUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
