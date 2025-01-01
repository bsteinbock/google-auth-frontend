// src/Login.js

/* Contents of User
        User => {
          fullName: profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          googleId: profile.id,
        };
*/

import React, { useState, useEffect, useContext } from 'react';
import Todo from './Todo.jsx';
import UserContext from './UserContext';

const Login = () => {
  const { authUser, login, logout } = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/v1/auth/user', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const { user, token } = data;

        login(user, token);
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
        logout();
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <div>
      {!authUser ? (
        <div>
          <h1>Login</h1>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      ) : (
        <div>
          <h1>Welcome {authUser.fullName}</h1>
          <button onClick={handleLogout}>Logout</button>
          <Todo />
        </div>
      )}
    </div>
  );
};

export default Login;
