import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const email = localStorage.getItem('email');
  return { isAuthenticated: !!email };
};

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;