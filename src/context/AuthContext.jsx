import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const stored = localStorage.getItem('stayscape_auth');
      return stored ? JSON.parse(stored).isLoggedIn : false;
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('stayscape_auth');
      return stored ? JSON.parse(stored).user : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    if (email === 'demoaccount@email.com' && password === 'DemoAccount123') {
      const userData = { email, name: 'Demo User', memberSince: 'January 2025' };
      setIsLoggedIn(true);
      setUser(userData);
      localStorage.setItem('stayscape_auth', JSON.stringify({ isLoggedIn: true, user: userData }));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('stayscape_auth');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
