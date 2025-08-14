import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./component/ProtectedRoute";

import RedirectByRole from "./pages/RedirectByRole";

import UserDashboardPage from "./pages/UserDashboard";
import TeacherDashboardPage from "./pages/TeacherDashboard";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} /> {/* optional explicit login path */}
          <Route path="/register" element={<Register />} />
          <Route path="/redirect" element={<RedirectByRole />} />

          {/* Unauthorized page for role-based denial only */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all Route - redirect to login (not unauthorized) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
