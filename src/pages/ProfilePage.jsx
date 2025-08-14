"use client"

import { useEffect, useState } from "react"
import axiosInstance from "../axiosInstance"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProfilePage = () => {
  const { user } = useAuth()
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  })

  const [profileData, setProfileData] = useState({
    bio: "",
    birth_date: "",
    location: "",
    phone_number: "",
    profile_image: null,
  })

  const [preview, setPreview] = useState(null)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [profileExists, setProfileExists] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const navigate = useNavigate()

  // Add this right after the navigate declaration
  const [hasFetched, setHasFetched] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    setError("")

    try {
      // Fetch user basic info first
      console.log("Fetching user data...")
      const userRes = await axiosInstance.get("accounts/user/")
      console.log("User data fetched successfully:", userRes.data)

      setUserData({
        email: userRes.data.email || "",
        username: userRes.data.username || "",
        password: "",
      })

      // Now try to fetch profile - handle this separately
      console.log("Fetching profile data...")

      try {
        const profileRes = await axiosInstance.get("accounts/profile/")
        console.log("Profile data fetched successfully:", profileRes.data)

        setProfileExists(true)
        setIsEditing(false)
        setProfileData({
          bio: profileRes.data.bio || "",
          birth_date: profileRes.data.birth_date || "",
          location: profileRes.data.location || "",
          phone_number: profileRes.data.phone_number || "",
          profile_image: null,
        })

        if (profileRes.data.profile_image_url) {
          setPreview(profileRes.data.profile_image_url)
        }
      } catch (profileError) {
        console.log("Profile fetch error:", profileError.response?.status, profileError.response?.data)

        // Handle ONLY 404 as "no profile exists"
        if (profileError.response?.status === 404) {
          console.log("No profile found - showing create form")
          setProfileExists(false)
          setIsEditing(true)
          setProfileData({
            bio: "",
            birth_date: "",
            location: "",
            phone_number: "",
            profile_image: null,
          })
          setPreview(null)
        } else {
          // For any other profile error, show error but don't redirect
          console.error("Unexpected profile error:", profileError)
          setError(`Profile error: ${profileError.response?.data?.detail || profileError.message}`)
          setProfileExists(false)
          setIsEditing(true)
        }
      }

      setLoading(false)
    } catch (userError) {
      console.error("User fetch error:", userError.response?.status, userError.response?.data)

      // Only redirect on 401 (authentication failure)
      if (userError.response?.status === 401) {
        console.log("Authentication failed - redirecting to login")
        navigate("/")
        return
      }

      // For other user errors, show error message
      setError(`Failed to fetch user data: ${userError.response?.data?.detail || userError.message}`)
      setLoading(false)
    }
  }

  // Update the useEffect to prevent multiple calls
  useEffect(() => {
    if (!hasFetched) {
      setHasFetched(true)
      fetchData()
    }
  }, [navigate, hasFetched])

  // Handle user input changes
  const handleUserChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle profile input changes (including file)
  const handleProfileChange = (e) => {
    const { name, value, files } = e.target

    if (name === "profile_image" && files.length > 0) {
      const file = files[0]
      setProfileData((prev) => ({ ...prev, profile_image: file }))
      setPreview(URL.createObjectURL(file))
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess("")
    setError("")

    try {
      // 1. Update user info (email, username, password)
      const userPayload = {
        email: userData.email,
        username: userData.username,
      }
      if (userData.password.trim()) {
        userPayload.password = userData.password
      }

      await axiosInstance.patch("accounts/profile/update/", userPayload)

      // 2. Prepare profile form data for create/update
      const formData = new FormData()
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formData.append(key, value)
        }
      })

      if (profileExists) {
        // PUT update profile
        await axiosInstance.put("accounts/profile/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        setSuccess("Profile updated successfully!")
      } else {
        // POST create profile
        await axiosInstance.post("accounts/profile/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        setProfileExists(true)
        setSuccess("Profile created successfully!")
      }

      setIsEditing(false)
      setUserData((prev) => ({ ...prev, password: "" })) // Clear password input
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message)
      setError("Failed to save profile. Please try again.")
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setSuccess("")
    setError("")
  }

  const handleCancel = () => {
    if (!profileExists) {
      // If no profile exists, we can't cancel to a view mode
      return
    }
    setIsEditing(false)
    setSuccess("")
    setError("")
    // Reset form data
    setUserData((prev) => ({ ...prev, password: "" }))
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 600, margin: "auto", padding: 20, textAlign: "center" }}>
        <div>Loading profile...</div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2>{profileExists ? "Profile" : "Create Profile"}</h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: 10, padding: 10, backgroundColor: "#fee", borderRadius: 4 }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ color: "green", marginBottom: 10, padding: 10, backgroundColor: "#efe", borderRadius: 4 }}>
          {success}
        </div>
      )}

      {!profileExists ? (
        // No profile exists - show create form
        <div>
          <p style={{ marginBottom: 20, color: "#666" }}>No profile found. Please create your profile below.</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <ProfileForm
              userData={userData}
              profileData={profileData}
              preview={preview}
              handleUserChange={handleUserChange}
              handleProfileChange={handleProfileChange}
              isCreating={true}
            />
            <div style={{ marginTop: 20 }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      ) : !isEditing ? (
        // Profile exists and not editing - show read-only view
        <div>
          <ProfileView userData={userData} profileData={profileData} preview={preview} />
          <div style={{ marginTop: 20 }}>
            <button
              onClick={handleEdit}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        // Profile exists and editing - show edit form
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <ProfileForm
            userData={userData}
            profileData={profileData}
            preview={preview}
            handleUserChange={handleUserChange}
            handleProfileChange={handleProfileChange}
            isCreating={false}
          />
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// Component for displaying profile in read-only mode
const ProfileView = ({ userData, profileData, preview }) => {
  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: 20, borderRadius: 8 }}>
      {preview && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img
            src={preview || "/placeholder.svg"}
            alt="Profile"
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: "50%",
              border: "3px solid #dee2e6",
            }}
          />
        </div>
      )}

      <div style={{ display: "grid", gap: 15 }}>
        <div>
          <strong>Username:</strong>
          <div style={{ marginTop: 5, padding: 8, backgroundColor: "white", borderRadius: 4 }}>{userData.username}</div>
        </div>

        <div>
          <strong>Email:</strong>
          <div style={{ marginTop: 5, padding: 8, backgroundColor: "white", borderRadius: 4 }}>{userData.email}</div>
        </div>

        {profileData.phone_number && (
          <div>
            <strong>Phone Number:</strong>
            <div style={{ marginTop: 5, padding: 8, backgroundColor: "white", borderRadius: 4 }}>
              {profileData.phone_number}
            </div>
          </div>
        )}

        {profileData.location && (
          <div>
            <strong>Location:</strong>
            <div style={{ marginTop: 5, padding: 8, backgroundColor: "white", borderRadius: 4 }}>
              {profileData.location}
            </div>
          </div>
        )}

        {profileData.birth_date && (
          <div>
            <strong>Birth Date:</strong>
            <div style={{ marginTop: 5, padding: 8, backgroundColor: "white", borderRadius: 4 }}>
              {new Date(profileData.birth_date).toLocaleDateString()}
            </div>
          </div>
        )}

        {profileData.bio && (
          <div>
            <strong>Bio:</strong>
            <div
              style={{ marginTop: 5, padding: 8, backgroundColor: "white", borderRadius: 4, whiteSpace: "pre-wrap" }}
            >
              {profileData.bio}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Component for profile form (create/edit)
const ProfileForm = ({ userData, profileData, preview, handleUserChange, handleProfileChange, isCreating }) => {
  return (
    <div style={{ display: "grid", gap: 15 }}>
      {/* User Info */}
      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleUserChange}
          required
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
          }}
        />
      </div>

      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleUserChange}
          required
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
          }}
        />
      </div>

      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>
          Password {!isCreating && "(leave blank to keep current)"}:
        </label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleUserChange}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
          }}
        />
      </div>

      {/* Profile Info */}
      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          value={profileData.phone_number}
          onChange={handleProfileChange}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
          }}
        />
      </div>

      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>Location:</label>
        <input
          type="text"
          name="location"
          value={profileData.location}
          onChange={handleProfileChange}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
          }}
        />
      </div>

      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>Birth Date:</label>
        <input
          type="date"
          name="birth_date"
          value={profileData.birth_date}
          onChange={handleProfileChange}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
          }}
        />
      </div>

      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>Bio:</label>
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={handleProfileChange}
          rows={4}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
            resize: "vertical",
          }}
        />
      </div>

      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: 5 }}>Profile Image:</label>
        <input
          type="file"
          name="profile_image"
          accept="image/*"
          onChange={handleProfileChange}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
          }}
        />
        {preview && (
          <div style={{ marginTop: 10, textAlign: "center" }}>
            <img
              src={preview || "/placeholder.svg"}
              alt="Profile Preview"
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: "50%",
                border: "2px solid #dee2e6",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
