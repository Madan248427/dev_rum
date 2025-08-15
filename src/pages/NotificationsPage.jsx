"use client"

import { useState } from "react"
import Sidebar from "../component/Sidebar"
import styles from "./NotificationsPage.module.css"

const Notice = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const notices = [
    {
      id: 1,
      title: "Mid-Term Examination Schedule Released",
      content:
        "The mid-term examination schedule for all courses has been published. Please check your student portal for detailed timings and venues.",
      category: "academic",
      priority: "high",
      date: "2024-03-15",
      author: "Academic Office",
    },
    {
      id: 2,
      title: "Library Hours Extended",
      content: "Library will remain open 24/7 during examination period from March 20th to April 5th.",
      category: "facility",
      priority: "medium",
      date: "2024-03-14",
      author: "Library Administration",
    },
    {
      id: 3,
      title: "Campus Wi-Fi Maintenance",
      content:
        "Scheduled maintenance of campus Wi-Fi network on March 18th from 2:00 AM to 6:00 AM. Temporary disruption expected.",
      category: "technical",
      priority: "medium",
      date: "2024-03-13",
      author: "IT Department",
    },
    {
      id: 4,
      title: "Student Council Elections",
      content: "Nominations for Student Council elections are now open. Submit your applications by March 25th.",
      category: "event",
      priority: "low",
      date: "2024-03-12",
      author: "Student Affairs",
    },
    {
      id: 5,
      title: "Emergency Contact Update Required",
      content: "All students must update their emergency contact information in the student portal by March 30th.",
      category: "administrative",
      priority: "high",
      date: "2024-03-11",
      author: "Registrar Office",
    },
  ]

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = selectedCategory === "all" || notice.category === selectedCategory
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return styles.priorityHigh
      case "medium":
        return styles.priorityMedium
      case "low":
        return styles.priorityLow
      default:
        return styles.priorityMedium
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.noticeContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Campus Notices</h1>
          <p className={styles.subtitle}>Stay updated with important announcements and information</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterContainer}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Categories</option>
              <option value="academic">Academic</option>
              <option value="facility">Facility</option>
              <option value="technical">Technical</option>
              <option value="event">Events</option>
              <option value="administrative">Administrative</option>
            </select>
          </div>
        </div>

        <div className={styles.noticesGrid}>
          {filteredNotices.map((notice) => (
            <div key={notice.id} className={styles.noticeCard}>
              <div className={styles.noticeHeader}>
                <div className={styles.noticeTitle}>
                  <h3>{notice.title}</h3>
                  <span className={`${styles.priorityBadge} ${getPriorityColor(notice.priority)}`}>
                    {notice.priority.toUpperCase()}
                  </span>
                </div>
                <div className={styles.noticeDate}>{formatDate(notice.date)}</div>
              </div>

              <div className={styles.noticeContent}>
                <p>{notice.content}</p>
              </div>

              <div className={styles.noticeFooter}>
                <span className={styles.author}>By: {notice.author}</span>
                <span className={styles.category}>{notice.category}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className={styles.noResults}>
            <h3>No notices found</h3>
            <p>Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notice
