"use client"

import { useState } from "react"
import Sidebar from "../component/Sidebar"
import styles from "./SchedulePage.module.css"

const StudentSchedule = () => {
  const [selectedWeek, setSelectedWeek] = useState("current")
  const [viewMode, setViewMode] = useState("week") // 'week' or 'day'

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const schedule = {
    Monday: {
      "9:00 AM": { course: "Mathematics 101", room: "Room A-201", instructor: "Dr. Smith" },
      "11:00 AM": { course: "Physics Lab", room: "Lab B-105", instructor: "Prof. Johnson" },
      "2:00 PM": { course: "Computer Science", room: "Room C-301", instructor: "Dr. Wilson" },
    },
    Tuesday: {
      "8:00 AM": { course: "English Literature", room: "Room D-102", instructor: "Ms. Brown" },
      "10:00 AM": { course: "Chemistry", room: "Lab A-203", instructor: "Dr. Davis" },
      "3:00 PM": { course: "History", room: "Room B-205", instructor: "Prof. Miller" },
    },
    Wednesday: {
      "9:00 AM": { course: "Mathematics 101", room: "Room A-201", instructor: "Dr. Smith" },
      "1:00 PM": { course: "Biology", room: "Lab C-104", instructor: "Dr. Garcia" },
      "4:00 PM": { course: "Art Studio", room: "Studio 1", instructor: "Ms. Taylor" },
    },
    Thursday: {
      "8:00 AM": { course: "English Literature", room: "Room D-102", instructor: "Ms. Brown" },
      "10:00 AM": { course: "Chemistry", room: "Lab A-203", instructor: "Dr. Davis" },
      "2:00 PM": { course: "Computer Science", room: "Room C-301", instructor: "Dr. Wilson" },
    },
    Friday: {
      "9:00 AM": { course: "Physics Lecture", room: "Room B-301", instructor: "Prof. Johnson" },
      "11:00 AM": { course: "Mathematics 101", room: "Room A-201", instructor: "Dr. Smith" },
      "3:00 PM": { course: "Study Hall", room: "Library", instructor: "Self-Study" },
    },
  }

  const upcomingClasses = [
    { course: "Mathematics 101", time: "9:00 AM", room: "Room A-201", day: "Today" },
    { course: "Physics Lab", time: "11:00 AM", room: "Lab B-105", day: "Today" },
    { course: "English Literature", time: "8:00 AM", room: "Room D-102", day: "Tomorrow" },
  ]

  return (
    <div className={styles.scheduleLayout}>
      <Sidebar />
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.scheduleTitle}>My Schedule</h1>
            <p className={styles.scheduleSubtitle}>Manage your weekly class schedule</p>
          </div>
          <div className={styles.headerControls}>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className={styles.weekSelector}
            >
              <option value="previous">Previous Week</option>
              <option value="current">Current Week</option>
              <option value="next">Next Week</option>
            </select>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.toggleBtn} ${viewMode === "week" ? styles.active : ""}`}
                onClick={() => setViewMode("week")}
              >
                Week
              </button>
              <button
                className={`${styles.toggleBtn} ${viewMode === "day" ? styles.active : ""}`}
                onClick={() => setViewMode("day")}
              >
                Day
              </button>
            </div>
          </div>
        </div>

        <div className={styles.scheduleContent}>
          <div className={styles.upcomingSection}>
            <h3 className={styles.sectionTitle}>Upcoming Classes</h3>
            <div className={styles.upcomingList}>
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className={styles.upcomingItem}>
                  <div className={styles.upcomingTime}>
                    <span className={styles.timeText}>{classItem.time}</span>
                    <span className={styles.dayText}>{classItem.day}</span>
                  </div>
                  <div className={styles.upcomingDetails}>
                    <h4 className={styles.courseName}>{classItem.course}</h4>
                    <p className={styles.roomInfo}>{classItem.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.scheduleGrid}>
            <div className={styles.timeColumn}>
              <div className={styles.timeHeader}>Time</div>
              {timeSlots.map((time, index) => (
                <div key={index} className={styles.timeSlot}>
                  {time}
                </div>
              ))}
            </div>

            {days.map((day) => (
              <div key={day} className={styles.dayColumn}>
                <div className={styles.dayHeader}>{day}</div>
                {timeSlots.map((time, index) => {
                  const classInfo = schedule[day] && schedule[day][time]
                  return (
                    <div key={index} className={styles.scheduleSlot}>
                      {classInfo && (
                        <div className={styles.classBlock}>
                          <div className={styles.courseTitle}>{classInfo.course}</div>
                          <div className={styles.classDetails}>
                            <span className={styles.roomText}>{classInfo.room}</span>
                            <span className={styles.instructorText}>{classInfo.instructor}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentSchedule
