import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { setLSItem } from "../helpers/LSHelpers";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        if (!res) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res);
      } catch (error) {
        setIsAuthenticated(false);
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
