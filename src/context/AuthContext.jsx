"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasTriedRefresh, setHasTriedRefresh] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/accounts/user/");
      const userData = res.data;
      if (userData.Role) {
        userData.role = userData.Role.toLowerCase();
      }
      setUser(userData);
      setLoading(false);
      sessionStorage.setItem("hasLoggedIn", "true");
      return true;
    } catch {
      setUser(null);
      setLoading(false);
      return false;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const hasLoggedIn = sessionStorage.getItem("hasLoggedIn") === "true";
    if (!hasLoggedIn || refreshing || hasTriedRefresh) return false;

    setRefreshing(true);
    setHasTriedRefresh(true);

    try {
      await axiosInstance.post("/accounts/refresh/");
      setRefreshing(false);
      return true;
    } catch (err) {
      setUser(null);
      setRefreshing(false);
      return false;
    }
  }, [refreshing, hasTriedRefresh]);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && !hasTriedRefresh) {
          originalRequest._retry = true;
          const success = await refreshToken();
          if (success) {
            await fetchUser();
            return axiosInstance(originalRequest);
          } else {
            navigate("/login");
          }
        }

        if (error.response?.status === 401) {
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [refreshToken, fetchUser, navigate, hasTriedRefresh]);

  useEffect(() => {
    const initAuth = async () => {
      const userExists = await fetchUser();
      if (!userExists) {
        const refreshed = await refreshToken();
        if (refreshed) {
          await fetchUser();
        } else {
          setLoading(false);
        }
      }
    };
    initAuth();
  }, [fetchUser, refreshToken]);

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/accounts/login/", { email, password });
      sessionStorage.setItem("hasLoggedIn", "true");
      setHasTriedRefresh(false);
      await fetchUser();
      return { success: true, user };
    } catch {
      return { success: false, error: "Invalid credentials" };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/accounts/logout/");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      sessionStorage.removeItem("hasLoggedIn");
      setHasTriedRefresh(false);
      navigate("/login");
    }
  };

  const register = async (userData) => {
    try {
      await axiosInstance.post("/accounts/register/", userData);
      return { success: true };
    } catch (error) {
      const errMsg = error.response?.data || "Registration failed";
      return { success: false, error: errMsg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
