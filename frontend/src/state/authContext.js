// Context for managing authentication state
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const login = (user, token) => {
    setAuthState({
      isAuthenticated: true,
      user,
      token,
    });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    localStorage.removeItem('token');
  };

  const getToken = () => {
    return authState.token || localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};