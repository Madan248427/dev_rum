"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./ForgetPassword.module.css"

const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.forgetPasswordCard}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>NEXUS</h1>
        </div>

        <h2 className={styles.title}>Reset Password</h2>
        <p className={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</p>

        {success && <div className={styles.success}>Password reset link has been sent to your email!</div>}

        {error && <div className={styles.error}>{error}</div>}

        {!success && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? <span className={styles.loading}></span> : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className={styles.backToLogin}>
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
