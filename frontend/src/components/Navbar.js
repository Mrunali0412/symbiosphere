import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, clearToken } from '../utils/auth';

import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>Symbiosphere</Link>
      </div>
      <div>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex' }}>
          <li>
            <Link to="/environmental-data" style={{ textDecoration: 'none', marginRight: '15px' }}>Environmental Data</Link>
          </li>
          <li>
            <Link to="/locations" style={{ textDecoration: 'none', marginRight: '15px' }}>Locations</Link>
          </li>
          {!isAuthenticated() ? (
            <>
              <li>
                <Link to="/login" style={{ textDecoration: 'none', marginRight: '15px' }}>Login</Link>
              </li>
              <li>
                <Link to="/register" style={{ textDecoration: 'none' }}>Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
