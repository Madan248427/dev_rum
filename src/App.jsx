"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./component/Homepage/Homepage";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

import PublicRoute from "./pages/PublicRoute";
import ProtectedRoute from "./component/ProtectedRoute";
import RedirectByRole from "./pages/RedirectByRole";

import UserDashboardPage from "./pages/UserDashboard";
import TeacherDashboardPage from "./pages/TeacherDashboard";
import ProfilePage from "./pages/ProfilePage";
import MyCoursesPage from "./pages/MyCoursesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import GradesPage from "./pages/GradesPage";
import SchedulePage from "./pages/SchedulePage";
import LibraryPage from "./pages/LibraryPage";
import NotificationsPage from "./pages/NotificationsPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Redirect based on role */}
          <Route path="/redirect" element={<RedirectByRole />} />

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes for users */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mycourse"
            element={
              <ProtectedRoute requiredRole="user">
                <MyCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoute requiredRole="user">
                <AssignmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <ProtectedRoute requiredRole="user">
                <GradesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute requiredRole="user">
                <SchedulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute requiredRole="user">
                <LibraryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute requiredRole="user">
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          {/* Protected routes for teachers */}
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Profile accessible for all authenticated users */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
