import React, { useState } from 'react';
import styles from './HomePage.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>SmartCampus</div>

      <div className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
        <a href="#hero">Home</a>
        <a href="#features">Features</a>
        <a href="#tools">Tools</a>
        <a href="/login">Sign Up</a>
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}



