import { useState, useEffect } from "react";
import axios from "axios";
import { getFromLS } from "./LSHelpers";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getFromLS("userToken");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.get("http://localhost:3000/auth/check", {
          headers: { Authorization: token },
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};

export default useAuth;
