import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // 👈 import useAuth
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth(); // ✅ Use login from context

  const handleLogin = async (e) => {
    e.preventDefault();

    const { success, error: loginError } = await login(email, password);

    if (success) {
      alert("Login successful");
      navigate("/redirect"); // 👈 go to redirect (or dashboard)
    } else {
      setError(loginError || "Login failed");
    }
  };

  return (
    <div className="login1">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
