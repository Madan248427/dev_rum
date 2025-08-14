"use client";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const loginRequired = location.state?.fromProtected;

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      } else {
        const role = result.user.Role?.toLowerCase() || "user";
        switch (role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "teacher":
            navigate("/teacher-dashboard");
            break;
          default:
            navigate("/user-dashboard");
        }
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>NEXUS</h1>
        </div>

        <h2 className={styles.title}>Welcome Back</h2>

        {loginRequired && <div className={styles.error}>Please login to continue</div>}
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.loginButton}>
            {loading ? <span className={styles.loading}></span> : "Sign In"}
          </button>
        </form>

        <div className={styles.registerLink}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
