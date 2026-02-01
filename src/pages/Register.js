import React, { useState } from "react";
import "../styles/Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      alert("Email must be in format: name@gmail.com");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters, include uppercase, lowercase and number"
      );
      return;
    }

    const user = { name, email, password, role: "user" };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Registration successful! Please login.");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@gmail.com"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 chars, Caps, number"
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
