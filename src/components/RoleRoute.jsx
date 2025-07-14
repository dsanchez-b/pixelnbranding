// src/components/RoleRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RoleRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    // No autenticado → redirige a login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // No tiene permiso → redirige a página 403 o home
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

export default RoleRoute;
