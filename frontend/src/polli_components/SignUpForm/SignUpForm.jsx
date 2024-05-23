import React, { useState } from "react";
import axios from "axios";
import styles from "../FormStyles/FormStyles.module.css";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        username,
        email,
        birthDate,  // Correct this if the backend expects 'birth_date'
        password,
      });
      if (response.data.loggedIn) {
        alert("Registered successfully!");
        navigate("/");
      } else {
        console.log("Signup failed:", response.data.status);
      }
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
    }
  };

  return (
      <div className={styles.formContainer}>
        <form onSubmit={handleSignup}>
          <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
              required
          />
          <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              required
          />
          <label htmlFor="birth_date">Date of Birth:</label>
          <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
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
          <button type="submit" className={styles.submitButton}>
            Signup
          </button>
        </form>
      </div>
  );
};

export default SignupForm;
