"use client"

import { useState } from "react"
import Sidebar from "../component/Sidebar"
import styles from "./Dashboard.module.css"

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    department: "Computer Science",
    courses: [
      { id: 1, name: "Introduction to Programming", students: 45, code: "CS101" },
      { id: 2, name: "Data Structures", students: 32, code: "CS201" },
      { id: 3, name: "Web Development", students: 28, code: "CS301" },
    ],
    recentAssignments: [
      { id: 1, title: "Python Basics Quiz", course: "CS101", dueDate: "2024-01-15", submissions: 42 },
      { id: 2, title: "Binary Trees Project", course: "CS201", dueDate: "2024-01-20", submissions: 28 },
      { id: 3, title: "React Portfolio", course: "CS301", dueDate: "2024-01-25", submissions: 25 },
    ],
    pendingGrades: 15,
    totalStudents: 105,
  })

  const [stats, setStats] = useState({
    totalCourses: 3,
    totalStudents: 105,
    pendingGrades: 15,
    upcomingDeadlines: 5,
  })

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.welcomeSection}>
              <h1 className={styles.title}>Teacher Dashboard</h1>
              <p className={styles.subtitle}>Welcome back, {teacherData.name}</p>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileImage}>
                {teacherData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className={styles.profileDetails}>
                <h3>{teacherData.name}</h3>
                <p>{teacherData.department}</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Total Courses</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.statNumber}>{stats.totalCourses}</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Total Students</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.statNumber}>{stats.totalStudents}</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Pending Grades</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.statNumber}>{stats.pendingGrades}</div>
                <span className={styles.urgentBadge}>Urgent</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Upcoming Deadlines</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.statNumber}>{stats.upcomingDeadlines}</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Courses Section */}
            <div className={styles.coursesCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>My Courses</h3>
                <p className={styles.cardDescription}>Manage your active courses</p>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.coursesList}>
                  {teacherData.courses.map((course) => (
                    <div key={course.id} className={styles.courseItem}>
                      <div className={styles.courseInfo}>
                        <h4>{course.name}</h4>
                        <p>
                          {course.code} • {course.students} students
                        </p>
                      </div>
                      <div className={styles.courseActions}>
                        <button className={styles.buttonOutline}>View</button>
                        <button className={styles.button}>Manage</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Assignments */}
            <div className={styles.assignmentsCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Recent Assignments</h3>
                <p className={styles.cardDescription}>Track assignment submissions</p>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.assignmentsList}>
                  {teacherData.recentAssignments.map((assignment) => (
                    <div key={assignment.id} className={styles.assignmentItem}>
                      <div className={styles.assignmentInfo}>
                        <h4>{assignment.title}</h4>
                        <p>
                          {assignment.course} • Due: {assignment.dueDate}
                        </p>
                      </div>
                      <div className={styles.assignmentStats}>
                        <span className={styles.badge}>{assignment.submissions} submissions</span>
                        <button className={styles.buttonOutline}>Grade</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <button className={styles.actionButton}>Create Assignment</button>
            <button className={styles.actionButtonOutline}>Grade Submissions</button>
            <button className={styles.actionButtonOutline}>View Analytics</button>
            <button className={styles.actionButtonOutline}>Manage Students</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
