"use client"
import Sidebar from "../component/Sidebar"
import { useState } from "react"
import { BookOpen, Clock, Users, Search, Grid, List } from "lucide-react"
import styles from "./MyCourse.module.css"


const MyCourses = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      nextClass: "Tomorrow 2:00 PM",
      students: 124,
      color: "primary",
      status: "in-progress",
      duration: "12 weeks",
      category: "Programming",
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      instructor: "Prof. Michael Chen",
      progress: 45,
      nextClass: "Friday 10:00 AM",
      students: 89,
      color: "secondary",
      status: "in-progress",
      duration: "16 weeks",
      category: "Computer Science",
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Emily Rodriguez",
      progress: 100,
      nextClass: "Completed",
      students: 156,
      color: "success",
      status: "completed",
      duration: "10 weeks",
      category: "AI/ML",
    },
    {
      id: 4,
      title: "Web Design Principles",
      instructor: "Prof. David Kim",
      progress: 20,
      nextClass: "Monday 3:00 PM",
      students: 67,
      color: "warning",
      status: "in-progress",
      duration: "8 weeks",
      category: "Design",
    },
    {
      id: 5,
      title: "Database Management Systems",
      instructor: "Dr. Lisa Wang",
      progress: 0,
      nextClass: "Not Started",
      students: 92,
      color: "info",
      status: "not-started",
      duration: "14 weeks",
      category: "Database",
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || course.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const CourseCard = ({ course }) => (
    <div className={`${styles.courseCard} ${viewMode === "list" ? styles.listView : ""}`}>
      <div className={styles.courseHeader}>
        <div className={styles.courseIcon}>
          <BookOpen className={styles.icon} />
        </div>
        <div className={styles.progressBadge}>{course.progress}% Complete</div>
      </div>

      <div className={styles.courseContent}>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.courseInstructor}>by {course.instructor}</p>
        <p className={styles.courseCategory}>{course.category}</p>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>

        <div className={styles.courseMeta}>
          <div className={styles.metaItem}>
            <Clock className={styles.metaIcon} />
            <span>{course.nextClass}</span>
          </div>
          <div className={styles.metaItem}>
            <Users className={styles.metaIcon} />
            <span>{course.students} students</span>
          </div>
        </div>

        <div className={styles.courseActions}>
          {course.status === "completed" ? (
            <button className={`${styles.btn} ${styles.btnSecondary}`}>View Certificate</button>
          ) : course.status === "not-started" ? (
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Start Course</button>
          ) : (
            <button className={`${styles.btn} ${styles.btnPrimary}`}>Continue Learning</button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
    <Sidebar/>
    <div className={styles.myCoursesContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Courses</h1>
        <p className={styles.subtitle}>Track your learning progress and continue your education journey</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Courses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="not-started">Not Started</option>
          </select>

          <div className={styles.viewToggle}>
            <button
              onClick={() => setViewMode("grid")}
              className={`${styles.viewBtn} ${viewMode === "grid" ? styles.active : ""}`}
            >
              <Grid className={styles.viewIcon} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`${styles.viewBtn} ${viewMode === "list" ? styles.active : ""}`}
            >
              <List className={styles.viewIcon} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Courses</h3>
          <p>{courses.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>In Progress</h3>
          <p>{courses.filter((c) => c.status === "in-progress").length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Completed</h3>
          <p>{courses.filter((c) => c.status === "completed").length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Average Progress</h3>
          <p>{Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)}%</p>
        </div>
      </div>

      <div className={`${styles.coursesGrid} ${viewMode === "list" ? styles.listLayout : ""}`}>
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className={styles.emptyState}>
          <BookOpen className={styles.emptyIcon} />
          <h3>No courses found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
    </>
  )
}

export default MyCourses
