import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import useNavigate
import Navbar from './Navbar';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate(); // initialize navigate

  const handleGetStarted = () => {
    navigate('/login'); // navigate to /login
  };

  return (
    <div className={styles.homepage}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            Smart Campus Learning & Collaboration
          </h1>
          <p className={styles.heroText}>
            Empowering students, faculty, and staff with smart tools for seamless learning and teamwork.
          </p>
          <button className={styles.btnPrimary} onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={`${styles.container} ${styles.grid3}`}>
          <div className={styles.card}>
            <h3>📚 Smart Learning</h3>
            <p>Access digital resources, online courses, and real-time learning materials from anywhere.</p>
          </div>
          <div className={styles.card}>
            <h3>🤝 Collaboration Hub</h3>
            <p>Join virtual classrooms, participate in discussions, and collaborate on projects in real-time.</p>
          </div>
          <div className={styles.card}>
            <h3>📊 Progress Tracking</h3>
            <p>Track assignments, grades, and personal progress with smart analytics and reports.</p>
          </div>
        </div>
      </section>

      {/* Collaboration Tools Section */}
      <section id="tools" className={styles.tools}>
        <div className={styles.container}>
          <h2>Tools for Smarter Collaboration</h2>
          <p>
            From shared whiteboards to instant messaging and video conferencing, our platform brings the campus community closer than ever.
          </p>
          <div className={styles.grid4}>
            <div className={styles.toolCard}>🖥️ Virtual Classrooms</div>
            <div className={styles.toolCard}>💬 Discussion Boards</div>
            <div className={styles.toolCard}>🗂️ Resource Library</div>
            <div className={styles.toolCard}>📅 Event Scheduling</div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2025 Smart Campus. All rights reserved.</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
