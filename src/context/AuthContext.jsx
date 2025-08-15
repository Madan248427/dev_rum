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
  const hasLoggedIn = sessionStorage.getItem("hasLoggedIn") === "true";
  if (!hasLoggedIn) return null;

  try {
    const res = await axiosInstance.get("/accounts/user/");
    const userData = res.data;
    if (userData.Role) {
      userData.role = userData.Role.toLowerCase();
    }
    setUser(userData);
    setLoading(false);
    return userData;
  } catch {
    setUser(null);
    setLoading(false);
    return null;
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
    await axiosInstance.post("/accounts/login/", { email, password });
    sessionStorage.setItem("hasLoggedIn", "true");
    setHasTriedRefresh(false);

    const fetchedUser = await fetchUser(); // ✅ Use this instead of res.data
    if (!fetchedUser) {
      return { success: false, error: "Failed to fetch user after login." };
    }

    return { success: true, user: fetchedUser }; // ✅ Return actual user object
  } catch {
    return { success: false, error: "Invalid credentials" };
  }
};

const logout = async () => {
  try {
    await axiosInstance.post("/accounts/logout/");
    return { success: true };
  } catch (err) {
    console.error("Logout failed", err);
    return { success: false, error: err };
  } finally {
    setUser(null);
    sessionStorage.removeItem("hasLoggedIn");
    setHasTriedRefresh(false);
    navigate("/login"); // You can optionally move this out if handled in Sidebar
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
