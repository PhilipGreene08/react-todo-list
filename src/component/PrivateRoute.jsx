import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../custom_hooks/useAuthStatus';

const PrivateRoute = () => {
  const { loggedIn } = useAuthStatus();
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
