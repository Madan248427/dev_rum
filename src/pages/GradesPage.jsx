"use client"
import { useState } from "react"
import Sidebar from "../component/Sidebar"
import styles from "./GradesPage.module.css"

const Grades = () => {
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  const grades = [
    {
      id: "1",
      courseName: "Advanced Mathematics",
      courseCode: "MATH 301",
      grade: "A",
      creditHours: 3,
      semester: "Fall",
      year: "2024",
    },
    {
      id: "2",
      courseName: "Computer Science Fundamentals",
      courseCode: "CS 101",
      grade: "A-",
      creditHours: 4,
      semester: "Fall",
      year: "2024",
    },
    {
      id: "3",
      courseName: "Physics Laboratory",
      courseCode: "PHYS 201",
      grade: "B+",
      creditHours: 2,
      semester: "Fall",
      year: "2024",
    },
    {
      id: "4",
      courseName: "English Literature",
      courseCode: "ENG 205",
      grade: "B",
      creditHours: 3,
      semester: "Spring",
      year: "2024",
    },
    {
      id: "5",
      courseName: "Data Structures",
      courseCode: "CS 202",
      grade: "A",
      creditHours: 4,
      semester: "Spring",
      year: "2024",
    },
  ]

  const filteredGrades = grades.filter((grade) => {
    const semesterMatch = selectedSemester === "all" || grade.semester === selectedSemester
    const yearMatch = selectedYear === "all" || grade.year === selectedYear
    return semesterMatch && yearMatch
  })

  const calculateGPA = (gradesList) => {
    const gradePoints = {
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    }

    const totalPoints = gradesList.reduce((sum, grade) => {
      return sum + (gradePoints[grade.grade] || 0) * grade.creditHours
    }, 0)

    const totalCredits = gradesList.reduce((sum, grade) => sum + grade.creditHours, 0)
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00"
  }

  const getGradeClass = (grade) => {
    if (grade.startsWith("A")) return styles.gradeA
    if (grade.startsWith("B")) return styles.gradeB
    if (grade.startsWith("C")) return styles.gradeC
    if (grade.startsWith("D")) return styles.gradeD
    return styles.gradeF
  }

  const currentGPA = calculateGPA(filteredGrades)
  const totalCredits = filteredGrades.reduce((sum, grade) => sum + grade.creditHours, 0)

  return (
    <div>
      <Sidebar />
      <div className={styles.gradesContainer}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Academic Grades</h1>
          <p className={styles.headerSubtitle}>Track your academic performance and GPA</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Current GPA</div>
            <div className={styles.statValue}>{currentGPA}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Credits</div>
            <div className={styles.statValue}>{totalCredits}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Courses Completed</div>
            <div className={styles.statValue}>{filteredGrades.length}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Average Grade</div>
            <div className={styles.statValue}>A-</div>
          </div>
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.filtersGrid}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Semester</label>
              <select
                className={styles.filterSelect}
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                <option value="all">All Semesters</option>
                <option value="Fall">Fall</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Academic Year</label>
              <select
                className={styles.filterSelect}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.gradesTable}>
          <div className={styles.tableHeader}>
            <div className={styles.tableRow}>
              <div className={styles.tableHeaderCell}>Course</div>
              <div className={styles.tableHeaderCell}>Grade</div>
              <div className={styles.tableHeaderCell}>Credits</div>
              <div className={styles.tableHeaderCell}>Semester</div>
              <div className={styles.tableHeaderCell}>Year</div>
              <div className={styles.tableHeaderCell}>Status</div>
            </div>
          </div>

          {filteredGrades.length > 0 ? (
            filteredGrades.map((grade) => (
              <div key={grade.id} className={`${styles.tableRow} ${styles.tableBodyRow}`}>
                <div className={styles.tableCell} data-label="Course">
                  <div>
                    <div className={styles.courseName}>{grade.courseName}</div>
                    <div className={styles.courseCode}>{grade.courseCode}</div>
                  </div>
                </div>
                <div className={styles.tableCell} data-label="Grade">
                  <span className={`${styles.gradeValue} ${getGradeClass(grade.grade)}`}>{grade.grade}</span>
                </div>
                <div className={styles.tableCell} data-label="Credits">
                  <span className={styles.creditHours}>{grade.creditHours}</span>
                </div>
                <div className={styles.tableCell} data-label="Semester">
                  <span className={styles.semester}>{grade.semester}</span>
                </div>
                <div className={styles.tableCell} data-label="Year">
                  {grade.year}
                </div>
                <div className={styles.tableCell} data-label="Status">
                  Completed
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>📊</div>
              <p className={styles.emptyStateText}>No grades found for the selected filters</p>
            </div>
          )}
        </div>

        <div className={styles.gpaCard}>
          <div className={styles.gpaTitle}>Cumulative GPA</div>
          <div className={styles.gpaValue}>{currentGPA}</div>
          <div className={styles.gpaScale}>out of 4.0</div>
        </div>
      </div>
    </div>
  )
}

export default Grades
