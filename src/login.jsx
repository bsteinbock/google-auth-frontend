// src/Login.js

import React, { useState, useEffect } from 'react';

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/v1/auth/me', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = () => {
    // Redirect to backend's Google OAuth route
    window.location.href = '/api/v1/auth/google'; //login route
  };

  const handleLogout = async () => {
    try {
      // Clear session (this would typically involve a logout endpoint on the server)

      const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null);
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error', err);
    }
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
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
