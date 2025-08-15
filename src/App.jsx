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
import TeacherDashboard from "./component/Teachers/TeacherDashboard";
import ProfilePage from "./pages/ProfilePage";
<<<<<<< HEAD
import MyCoursesPage from "./pages/MyCoursesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import GradesPage from "./pages/GradesPage";
import SchedulePage from "./pages/SchedulePage";
import LibraryPage from "./pages/LibraryPage";
import NotificationsPage from "./pages/NotificationsPage";

const App = () => {
=======
import TeacherSidebar from "./component/Teachers/TeacherSidebar";
import AttendanceDashboard from "./component/Teachers/Attendance";
import Calendar from "./component/Teachers/Calendar";
import StudentManager from "./component/Teachers/Students";
function App() {
>>>>>>> 03c1a59b66459197a8234a044a0fe4e31b0e9ae4
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

<<<<<<< HEAD
          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes for users */}
=======
          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* User Dashboard */}
>>>>>>> 03c1a59b66459197a8234a044a0fe4e31b0e9ae4
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
                <div style={{ display: "flex", minHeight: "100vh" }}>
                  <TeacherSidebar />
                  <div style={{ flex: 1, padding: "20px", background: "#f5f5f5" }}>
                    <TeacherDashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

<<<<<<< HEAD
          {/* Profile accessible for all authenticated users */}
=======
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
>>>>>>> 03c1a59b66459197a8234a044a0fe4e31b0e9ae4
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
