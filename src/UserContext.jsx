import React, { createContext, useState, useEffect } from 'react';

// Create a Context
const UserContext = createContext();

// UserProvider component to manage JWT state
export const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  // Function to store the token and persist in localStorage
  const login = (user, jwtToken) => {
    setAuthToken(jwtToken);
    setAuthUser(user);
  };

  // Function to clear the token and log out
  const logout = () => {
    setAuthToken(null);
    setAuthUser(null);
  };

  return (
    <UserContext.Provider value={{ authToken, authUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
