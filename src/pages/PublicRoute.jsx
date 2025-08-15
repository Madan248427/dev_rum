"use client";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    // Redirect logged-in users to role-based dashboard
    return <Navigate to="/redirect" replace />;
  }

  return children;
};

export default PublicRoute;
