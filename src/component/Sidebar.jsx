"use client"
import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../axiosInstance"
import styles from "./sidebar.module.css"

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState(null)
  const [imageLoading, setImageLoading] = useState(false)

  // Check if current path matches the link
  const isActive = (path) => {
    return location.pathname === path
  }

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user) return
      setImageLoading(true)
      try {
        const response = await axiosInstance.get("accounts/profile/")
        if (response.data.profile_image_url) {
          setProfileImage(response.data.profile_image_url)
        }
      } catch (error) {
        console.log("No profile image found or error fetching profile:", error)
        setProfileImage(null)
      } finally {
        setImageLoading(false)
      }
    }

    fetchProfileImage()
  }, [user])

 const handleLogout = async () => {
  try {
    const { success } = await logout();

    if (success) {
      navigate("/login", { replace: true });
      window.location.reload(); // optional
    }
  } catch (error) {
    console.error("Logout error:", error);
    navigate("/login", { replace: true });
    window.location.reload();
  }
};

  const menuItems = [
    {
      path: "/dashboard",
      icon: "📊",
      label: "Dashboard",
      description: "Overview & Analytics",
    },
    {
      path: "/courses",
      icon: "📚",
      label: "My Courses",
      description: "Enrolled Courses",
    },
    {
      path: "/assignments",
      icon: "📝",
      label: "Assignments",
      description: "Tasks & Submissions",
    },
    {
      path: "/grades",
      icon: "🎯",
      label: "Grades",
      description: "Academic Performance",
    },
    {
      path: "/schedule",
      icon: "📅",
      label: "Schedule",
      description: "Class Timetable",
    },
    {
      path: "/library",
      icon: "📖",
      label: "Library",
      description: "Resources & Materials",
    },
    {
      path: "/notifications",
      icon: "🔔",
      label: "Notifications",
      description: "Updates & Alerts",
    },
  ]

  const settingsItems = [
    {
      path: "/profile",
      icon: "👤",
      label: "Edit Profile",
      description: "Personal Information",
    },
    {
      path: "/settings",
      icon: "⚙️",
      label: "Settings",
      description: "Preferences",
    },
    {
      path: "/help",
      icon: "❓",
      label: "Help & Support",
      description: "Get Assistance",
    },
  ]

  return (
    <aside className={styles.sidebar}>
      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          {imageLoading ? (
            <div className={styles.profileImagePlaceholder}>
              <span className={styles.profileInitial}>...</span>
            </div>
          ) : profileImage ? (
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className={styles.profileImage}
              onError={() => setProfileImage(null)}
            />
          ) : (
            <div className={styles.profileImagePlaceholder}>
              <span className={styles.profileInitial}>{user?.username?.charAt(0)?.toUpperCase() || "S"}</span>
            </div>
          )}
          <div className={styles.onlineIndicator}></div>
        </div>
        <div className={styles.profileInfo}>
          <h3 className={styles.username}>{user?.username || "Student"}</h3>
          <p className={styles.email}>{user?.email || "student@example.com"}</p>
          <span className={styles.studentId}>ID: {user?.student_id || "STU001"}</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navigation}>
        <div className={styles.menuSection}>
          <h4 className={styles.sectionTitle}>Academic</h4>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.path} className={styles.menuItem}>
                <Link to={item.path} className={`${styles.menuLink} ${isActive(item.path) ? styles.active : ""}`}>
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <div className={styles.menuContent}>
                    <span className={styles.menuLabel}>{item.label}</span>
                    <span className={styles.menuDescription}>{item.description}</span>
                  </div>
                  {isActive(item.path) && <div className={styles.activeIndicator}></div>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.menuSection}>
          <h4 className={styles.sectionTitle}>Account</h4>
          <ul className={styles.menuList}>
            {settingsItems.map((item) => (
              <li key={item.path} className={styles.menuItem}>
                <Link to={item.path} className={`${styles.menuLink} ${isActive(item.path) ? styles.active : ""}`}>
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <div className={styles.menuContent}>
                    <span className={styles.menuLabel}>{item.label}</span>
                    <span className={styles.menuDescription}>{item.description}</span>
                  </div>
                  {isActive(item.path) && <div className={styles.activeIndicator}></div>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <span className={styles.menuIcon}>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
