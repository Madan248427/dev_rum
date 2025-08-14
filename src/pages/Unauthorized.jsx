import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>403 - Unauthorized</h1>
      <p style={{ marginBottom: '20px' }}>You don't have permission to access this page.</p>
      <Link 
        to="/" 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '4px' 
        }}
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Unauthorized;
