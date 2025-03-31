
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  // Show loading state instead of redirecting immediately
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

export default ProtectedRoute;
