
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Initialize from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('auctionUsers') || '[]');
    setUsers(storedUsers);
    
    const storedUser = localStorage.getItem('auctionUser');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    
    setLoading(false);
  }, []);

  // Helper to update localStorage
  const updateLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const signUp = (email, password, name) => {
    return new Promise((resolve, reject) => {
      // Check if user exists
      if (users.find(user => user.email === email)) {
        return reject(new Error('User with this email already exists'));
      }

      const newUser = { id: Date.now().toString(), email, password, name };
      const updatedUsers = [...users, newUser];
      
      // Update both states and localStorage
      updateLocalStorage('auctionUsers', updatedUsers);
      setUsers(updatedUsers);
      
      // Auto login after signup
      const userInfo = { id: newUser.id, email: newUser.email, name: newUser.name };
      updateLocalStorage('auctionUser', userInfo);
      setCurrentUser(userInfo);
      
      resolve(userInfo);
    });
  };

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = users.find(user => user.email === email);
      
      if (!user) {
        return reject(new Error('No user found with this email. Please sign up first.'));
      }
      
      if (user.password !== password) {
        return reject(new Error('Invalid password'));
      }
      
      const userInfo = { id: user.id, email: user.email, name: user.name };
      updateLocalStorage('auctionUser', userInfo);
      setCurrentUser(userInfo);
      
      resolve(userInfo);
    });
  };

  const signOut = () => {
    localStorage.removeItem('auctionUser');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, users, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
