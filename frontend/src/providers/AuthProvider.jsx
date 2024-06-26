import { createContext, useState, useEffect, useContext } from "react";
import { axiosInstance } from "../axios/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axiosInstance.get("/auth/me");
      if (res.status) {
        setIsAuthenticated(true);
        setUser(res.user);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
