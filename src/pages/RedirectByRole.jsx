"use client";

import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RedirectByRole = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  const role = (user.Role ?? user.role ?? "").toLowerCase();

  if (role === "teacher") return <Navigate to="/teacher-dashboard" replace />;
  if (role === "user") return <Navigate to="/user-dashboard" replace />;

  return <Navigate to="/unauthorized" replace />;
};

export default RedirectByRole;
