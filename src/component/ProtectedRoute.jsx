"use client";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/" replace state={{ fromProtected: true }} />;
  }

  // Normalize role field: check both Role and role keys just in case
  const userRole = (user.Role ?? user.role ?? "user").toLowerCase();

  if (requiredRole && userRole !== requiredRole.toLowerCase()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
