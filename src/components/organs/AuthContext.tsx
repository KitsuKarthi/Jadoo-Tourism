// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Initialize with the login status from localStorage if available
    const storedLoginStatus = localStorage.getItem('isAuthenticated');
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  useEffect(() => {
    // Clear localStorage on component unmount (logout or page refresh)
    return () => localStorage.removeItem('isLoggedIn');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
