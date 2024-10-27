import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProtectedRoute: React.FC = () => {
  const { profile } = useUser();

  return profile ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
