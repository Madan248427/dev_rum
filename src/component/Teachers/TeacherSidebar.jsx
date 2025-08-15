import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Teacher-Sidebar.css";
import { useAuth } from "../../context/AuthContext"; // ✅ match your path

export default function TeacherSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ use same logout as first dashboard

  const handleLogout = async () => {
    try {
      const { success } = await logout();

      if (success) {
        navigate("/login", { replace: true });
        window.location.reload(); // optional refresh to reset UI
      }
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="teacher-sidebar">
      <h2 className="sidebar-title">Teacher Panel</h2>

      <ul className="sidebar-menu">
        <li><Link to="/teacher/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/teacher/attendance">📝 Attendance</Link></li>
        <li><Link to="/teacher/events">📅 Events</Link></li>
        <li><Link to="/teacher/students">👥 Students</Link></li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
