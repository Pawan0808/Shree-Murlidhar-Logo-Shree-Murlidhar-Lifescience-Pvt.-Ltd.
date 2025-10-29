import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loadingAuth } = useAuth(); // Destructure user and loadingAuth

  if (loadingAuth) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  if (!user) { // Check if user is null (not authenticated)
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
