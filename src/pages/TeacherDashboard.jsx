// pages/TeacherDashboardPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';

const TeacherDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main style={{ flex: 1, padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Teacher Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Welcome, Professor {user?.username}!</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.Role}</p>
          <p><strong>Teacher ID:</strong> {user?.id}</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <h3>Teacher Features</h3>
          <ul>
            <li>Create and manage courses</li>
            <li>Grade assignments</li>
            <li>View student progress</li>
            <li>Upload learning materials</li>
            <li>Manage class schedules</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboardPage;
