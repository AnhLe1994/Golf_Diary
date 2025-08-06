import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userRole, setUserRole] = useState(localStorage.getItem('user_role'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const login = (newToken, newUsername, newRole) => {
    setToken(newToken);
    setUsername(newUsername);
    setUserRole(newRole);
    setIsAuthenticated(true);
    localStorage.setItem('jwt_token', newToken);
    localStorage.setItem('username', newUsername);
    localStorage.setItem('user_role', newRole);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_role');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('user_role');
    
    if (storedToken) {
      setToken(storedToken);
      setUsername(storedUsername);
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    token,
    isAuthenticated,
    username,
    userRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 