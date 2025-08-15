<<<<<<< HEAD
"use client"
=======
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../component/Teachers/TeacherSidebar';
import axios from '../axiosInstance';
>>>>>>> 03c1a59b66459197a8234a044a0fe4e31b0e9ae4

import { useState } from "react"
import Sidebar from "../component/Sidebar"
import styles from "./Dashboard.module.css"

const StudentDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek")

  // Sample data
  const upcomingAssignments = [
    { id: 1, title: "Physics Lab Report", course: "Physics 101", dueDate: "2024-01-15", priority: "high" },
    { id: 2, title: "Math Problem Set 5", course: "Calculus II", dueDate: "2024-01-17", priority: "medium" },
    { id: 3, title: "History Essay", course: "World History", dueDate: "2024-01-20", priority: "low" },
  ]

  const recentGrades = [
    { id: 1, course: "Chemistry", assignment: "Midterm Exam", grade: "A-", points: "92/100" },
    { id: 2, course: "English", assignment: "Essay #2", grade: "B+", points: "87/100" },
    { id: 3, course: "Mathematics", assignment: "Quiz 3", grade: "A", points: "95/100" },
  ]

  const announcements = [
    { id: 1, title: "Library Hours Extended", date: "2024-01-10", type: "info" },
    { id: 2, title: "Registration Opens Monday", date: "2024-01-12", type: "important" },
    { id: 3, title: "Campus Event: Tech Fair", date: "2024-01-14", type: "event" },
  ]

  const courses = [
    { id: 1, name: "Physics 101", instructor: "Dr. Smith", progress: 75, nextClass: "Today 2:00 PM" },
    { id: 2, name: "Calculus II", instructor: "Prof. Johnson", progress: 82, nextClass: "Tomorrow 10:00 AM" },
    { id: 3, name: "World History", instructor: "Dr. Brown", progress: 68, nextClass: "Wed 1:00 PM" },
    { id: 4, name: "Chemistry", instructor: "Prof. Davis", progress: 90, nextClass: "Thu 3:00 PM" },
  ]

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return styles.priorityHigh
      case "medium":
        return styles.priorityMedium
      case "low":
        return styles.priorityLow
      default:
        return ""
    }
  }

  const getGradeClass = (grade) => {
    if (grade.startsWith("A")) return styles.gradeA
    if (grade.startsWith("B")) return styles.gradeB
    if (grade.startsWith("C")) return styles.gradeC
    return styles.gradeOther
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Student Dashboard</h1>
          <div className={styles.headerControls}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={styles.periodSelect}
            >
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="thisSemester">This Semester</option>
            </select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📚</div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>4</h3>
              <p className={styles.statLabel}>Active Courses</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📝</div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>7</h3>
              <p className={styles.statLabel}>Pending Assignments</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎯</div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>3.7</h3>
              <p className={styles.statLabel}>Current GPA</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏰</div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>85%</h3>
              <p className={styles.statLabel}>Attendance Rate</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Upcoming Assignments */}
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Upcoming Assignments</h2>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.cardContent}>
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className={styles.assignmentItem}>
                  <div className={styles.assignmentInfo}>
                    <h4 className={styles.assignmentTitle}>{assignment.title}</h4>
                    <p className={styles.assignmentCourse}>{assignment.course}</p>
                  </div>
                  <div className={styles.assignmentMeta}>
                    <span className={styles.dueDate}>{assignment.dueDate}</span>
                    <span className={`${styles.priority} ${getPriorityClass(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Grades */}
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Grades</h2>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.cardContent}>
              {recentGrades.map((grade) => (
                <div key={grade.id} className={styles.gradeItem}>
                  <div className={styles.gradeInfo}>
                    <h4 className={styles.gradeAssignment}>{grade.assignment}</h4>
                    <p className={styles.gradeCourse}>{grade.course}</p>
                  </div>
                  <div className={styles.gradeMeta}>
                    <span className={styles.gradePoints}>{grade.points}</span>
                    <span className={`${styles.gradeValue} ${getGradeClass(grade.grade)}`}>{grade.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Progress */}
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Course Progress</h2>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.cardContent}>
              {courses.map((course) => (
                <div key={course.id} className={styles.courseItem}>
                  <div className={styles.courseInfo}>
                    <h4 className={styles.courseName}>{course.name}</h4>
                    <p className={styles.courseInstructor}>{course.instructor}</p>
                    <p className={styles.nextClass}>Next: {course.nextClass}</p>
                  </div>
                  <div className={styles.courseProgress}>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className={styles.progressText}>{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Announcements</h2>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.cardContent}>
              {announcements.map((announcement) => (
                <div key={announcement.id} className={styles.announcementItem}>
                  <div className={styles.announcementInfo}>
                    <h4 className={styles.announcementTitle}>{announcement.title}</h4>
                    <p className={styles.announcementDate}>{announcement.date}</p>
                  </div>
                  <span className={`${styles.announcementType} ${styles[announcement.type]}`}>{announcement.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
