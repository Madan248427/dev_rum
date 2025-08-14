"use client"

import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const RedirectByRole = () => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" />

  // Get role with fallback handling
  const userRole = (user.role || user.Role || (user.roles && user.roles[0]) || "user") // Default to 'user' if no role is found
    ?.toString()
    .toLowerCase()

  console.log("RedirectByRole - User:", user)
  console.log("RedirectByRole - Detected role:", userRole)

  switch (userRole) {
    case "user":
      return <Navigate to="/user-dashboard" />
    case "teacher":
      return <Navigate to="/teacher-dashboard" />
    default:
      // Instead of redirecting to unauthorized, default to user dashboard
      console.log("Unknown role, defaulting to user dashboard")
      return <Navigate to="/user-dashboard" />
  }
}

export default RedirectByRole
