
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load registered users from localStorage
    const storedUsers = localStorage.getItem('auctionUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize empty users array if none exists
      localStorage.setItem('auctionUsers', JSON.stringify([]));
      setUsers([]);
    }

    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('auctionUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signUp = (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
          reject(new Error('User with this email already exists'));
          return;
        }

        const newUser = { 
          id: Date.now().toString(), 
          email, 
          password, // In a real app, never store plain text passwords
          name 
        };
        
        // Update users array
        const updatedUsers = [...users, newUser];
        localStorage.setItem('auctionUsers', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        
        // Auto login after signup
        const userInfo = { id: newUser.id, email: newUser.email, name: newUser.name };
        localStorage.setItem('auctionUser', JSON.stringify(userInfo));
        setCurrentUser(userInfo);
        
        resolve(userInfo);
      }, 1000);
    });
  };

  // Sign in function
  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find user in the stored users array
        const user = users.find(user => user.email === email);
        
        if (!user) {
          reject(new Error('No user found with this email. Please sign up first.'));
          return;
        }
        
        // In a real app, you'd use proper password hashing and comparison
        if (user.password !== password) {
          reject(new Error('Invalid password'));
          return;
        }
        
        // Store user data in localStorage (except password)
        const userInfo = { id: user.id, email: user.email, name: user.name };
        localStorage.setItem('auctionUser', JSON.stringify(userInfo));
        setCurrentUser(userInfo);
        
        resolve(userInfo);
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
    users,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
