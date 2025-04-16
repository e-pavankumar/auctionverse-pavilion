
import { createContext, useContext, useState, useEffect } from 'react';
import { signInUser, signUpUser, getCurrentUser, signOutUser } from '../frontend/api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Try to get current user with the token
      getCurrentUser()
        .then(user => {
          setCurrentUser(user);
        })
        .catch(error => {
          console.error('Auth error:', error);
          // If the token is invalid, remove it
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = async (email, password, name) => {
    const data = await signUpUser(email, password, name);
    setCurrentUser(data.user);
    return data;
  };

  const signIn = async (email, password) => {
    const data = await signInUser(email, password);
    setCurrentUser(data.user);
    return data;
  };

  const signOut = async () => {
    await signOutUser();
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
