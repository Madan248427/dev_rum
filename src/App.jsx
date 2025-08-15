"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Public Pages
import HomePage from "./component/Homepage/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

// Role & Route Guards
import PublicRoute from "./pages/PublicRoute";
import ProtectedRoute from "./component/ProtectedRoute";
import RedirectByRole from "./pages/RedirectByRole";

// User Pages
import UserDashboardPage from "./pages/UserDashboard";
import MyCoursesPage from "./pages/MyCoursesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import GradesPage from "./pages/GradesPage";
import SchedulePage from "./pages/SchedulePage";
import LibraryPage from "./pages/LibraryPage";
import NotificationsPage from "./pages/NotificationsPage";

// Teacher Pages
import TeacherDashboard from "./component/Teachers/TeacherDashboard";
import TeacherSidebar from "./component/Teachers/TeacherSidebar";
import AttendanceDashboard from "./component/Teachers/Attendance";
import Calendar from "./component/Teachers/Calendar";
import StudentManager from "./component/Teachers/Students";

// Shared
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
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

          {/* Redirect by Role */}
          <Route path="/redirect" element={<RedirectByRole />} />

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* User Dashboard Routes */}
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

          {/* Teacher Dashboard */}
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute requiredRole="teacher">
                <div style={{ display: "flex", minHeight: "100vh" }}>
                  <TeacherSidebar />
                  <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
                    <TeacherDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/attendance"
            element={
              <ProtectedRoute requiredRole="teacher">
                <div style={{ display: "flex", minHeight: "100vh" }}>
                  <TeacherSidebar />
                  <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
                    <AttendanceDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/events"
            element={
              <ProtectedRoute requiredRole="teacher">
                <div style={{ display: "flex", minHeight: "100vh" }}>
                  <TeacherSidebar />
                  <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
                    <Calendar />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/students"
            element={
              <ProtectedRoute requiredRole="teacher">
                <div style={{ display: "flex", minHeight: "100vh" }}>
                  <TeacherSidebar />
                  <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
                    <StudentManager />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Profile for all authenticated users */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
