"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

import PublicRoute from "./pages/PublicRoute";
import ProtectedRoute from "./component/ProtectedRoute";
import RedirectByRole from "./pages/RedirectByRole";

import UserDashboardPage from "./pages/UserDashboard";
import TeacherDashboard from "./component/Teachers/TeacherDashboard";
import ProfilePage from "./pages/ProfilePage";
import TeacherSidebar from "./component/Teachers/TeacherSidebar";
import AttendanceDashboard from "./component/Teachers/Attendance";
import Calendar from "./component/Teachers/Calendar";
import StudentManager from "./component/Teachers/Students";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
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

          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* User Dashboard */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboardPage />
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

          {/* Teacher Attendance */}
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



          {/* Profile */}
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
}

export default App;
