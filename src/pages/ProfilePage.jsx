"use client"

import { useEffect, useState } from "react"
import axiosInstance from "../axiosInstance"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import styles from "./ProfilePage.module.css"

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
          console.error("Unexpected profile error:", profileError)
          setError(`Profile error: ${profileError.response?.data?.detail || profileError.message}`)
          setProfileExists(false)
          setIsEditing(true)
        }
      }

      setLoading(false)
    } catch (userError) {
      console.error("User fetch error:", userError.response?.status, userError.response?.data)

      if (userError.response?.status === 401) {
        console.log("Authentication failed - redirecting to login")
        navigate("/")
        return
      }

      setError(`Failed to fetch user data: ${userError.response?.data?.detail || userError.message}`)
      setLoading(false)
    }
  }

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
        await axiosInstance.put("accounts/profile/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        setSuccess("Profile updated successfully!")
      } else {
        await axiosInstance.post("accounts/profile/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        setProfileExists(true)
        setSuccess("Profile created successfully!")
      }

      setIsEditing(false)
      setUserData((prev) => ({ ...prev, password: "" }))
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
      return
    }
    setIsEditing(false)
    setSuccess("")
    setError("")
    setUserData((prev) => ({ ...prev, password: "" }))
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading profile...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{profileExists ? "Profile" : "Create Profile"}</h2>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Back
        </button>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      {!profileExists ? (
        <div>
          <p className={styles.infoMessage}>No profile found. Please create your profile below.</p>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
            <ProfileForm
              userData={userData}
              profileData={profileData}
              preview={preview}
              handleUserChange={handleUserChange}
              handleProfileChange={handleProfileChange}
              isCreating={true}
            />
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.primaryButton}>
                Create Profile
              </button>
            </div>
          </form>
        </div>
      ) : !isEditing ? (
        <div>
          <ProfileView userData={userData} profileData={profileData} preview={preview} />
          <div className={styles.buttonContainer}>
            <button onClick={handleEdit} className={styles.primaryButton}>
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
          <ProfileForm
            userData={userData}
            profileData={profileData}
            preview={preview}
            handleUserChange={handleUserChange}
            handleProfileChange={handleProfileChange}
            isCreating={false}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.primaryButton}>
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className={styles.secondaryButton}>
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
    <div className={styles.profileCard}>
      {preview && (
        <div className={styles.imageContainer}>
          <img src={preview || "/placeholder.svg"} alt="Profile" className={styles.profileImage} />
        </div>
      )}

      <div className={styles.profileInfo}>
        <div className={styles.infoItem}>
          <strong>Username:</strong>
          <div className={styles.infoValue}>{userData.username}</div>
        </div>

        <div className={styles.infoItem}>
          <strong>Email:</strong>
          <div className={styles.infoValue}>{userData.email}</div>
        </div>

        {profileData.phone_number && (
          <div className={styles.infoItem}>
            <strong>Phone Number:</strong>
            <div className={styles.infoValue}>{profileData.phone_number}</div>
          </div>
        )}

        {profileData.location && (
          <div className={styles.infoItem}>
            <strong>Location:</strong>
            <div className={styles.infoValue}>{profileData.location}</div>
          </div>
        )}

        {profileData.birth_date && (
          <div className={styles.infoItem}>
            <strong>Birth Date:</strong>
            <div className={styles.infoValue}>{new Date(profileData.birth_date).toLocaleDateString()}</div>
          </div>
        )}

        {profileData.bio && (
          <div className={styles.infoItem}>
            <strong>Bio:</strong>
            <div className={styles.bioValue}>{profileData.bio}</div>
          </div>
        )}
      </div>
    </div>
  )
}

// Component for profile form (create/edit)
const ProfileForm = ({ userData, profileData, preview, handleUserChange, handleProfileChange, isCreating }) => {
  const handleImageClick = () => {
    document.getElementById("profile_image").click()
  }

  return (
    <div className={styles.formGrid}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleUserChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleUserChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Password {!isCreating && "(leave blank to keep current)"}:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleUserChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          value={profileData.phone_number}
          onChange={handleProfileChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Location:</label>
        <input
          type="text"
          name="location"
          value={profileData.location}
          onChange={handleProfileChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Birth Date:</label>
        <input
          type="date"
          name="birth_date"
          value={profileData.birth_date}
          onChange={handleProfileChange}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Bio:</label>
        <textarea
          name="bio"
          value={profileData.bio}
          onChange={handleProfileChange}
          rows={4}
          className={styles.textarea}
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className={styles.imageUploadSection}>
        <label className={styles.label}>Profile Image:</label>
        <div className={styles.imageUpload}>
          <input
            type="file"
            name="profile_image"
            id="profile_image"
            accept="image/*"
            onChange={handleProfileChange}
            className={styles.fileInput}
          />
          <button type="button" onClick={handleImageClick} className={styles.fileLabel}>
            {preview ? "Change Image" : "Choose Image"}
          </button>
          {preview && (
            <div className={styles.imagePreview}>
              <img src={preview || "/placeholder.svg"} alt="Profile Preview" className={styles.previewImage} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
