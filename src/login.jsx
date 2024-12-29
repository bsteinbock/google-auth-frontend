// src/Login.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated by making an API request to the backend
    axios
      .get('/api/v1/me', { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    // Redirect to backend's Google OAuth route
    window.location.href = '/api/v1/auth/google';
  };

  const handleLogout = () => {
    setUser(null);
    // Clear session (this would typically involve a logout endpoint on the server)
    axios
      .post('/logout', {}, { withCredentials: true })
      .then(() => alert('Logged out'))
      .catch((err) => console.error('Logout error', err));
  };

  return (
    <div>
      {!user ? (
        <div>
          <h1>Login</h1>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      ) : (
        <div>
          <h1>Welcome {user.displayName}</h1>
          <img src={user.photos[0].value} alt="Profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
