// AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // You can expand this later to store user info
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // On app start → load token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // Optional: load user info here if you have it in your API
    }
  }, []);

  // Login function
  const login = (newToken) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    // Optional: setUser({}) if you want to store user data
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  // Context value
  const contextValue = {
    user,
    isAuthenticated,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;

