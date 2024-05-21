import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../FormStyles/FormStyles.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          "http://localhost:3000/auth/login",
          { email, password } // Передаем email вместо username
      );
      if (response.data.loggedIn) {
        console.log("Logged in successfully!");
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login. Please try again later.");
    }
  };

  return (
      <div className={styles.formContainer}>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              required
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
          />
          <button type="submit" className={styles.submitButton}>Login</button>
        </form>
      </div>
  );
};

export default LoginForm;
