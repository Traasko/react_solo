import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '../redux/authSlice';

const PrivateRoute = () => {
  const user = useSelector(selectUser);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
