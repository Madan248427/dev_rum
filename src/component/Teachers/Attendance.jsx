"use client"

import { useState } from "react"
import "./AttendanceDashboard.css"

export default function AttendanceSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedClass, setSelectedClass] = useState("10A")
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [reportType, setReportType] = useState("student")

  // Form state for adding/editing students
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    class: "",
    email: "",
    phone: "",
  })

  // Mock student data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      rollNumber: "ST001",
      class: "10A",
      email: "john.doe@school.com",
      phone: "+1234567890",
      status: "present",
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNumber: "ST002",
      class: "10A",
      email: "jane.smith@school.com",
      phone: "+1234567891",
      status: "present",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNumber: "ST003",
      class: "10A",
      email: "mike.johnson@school.com",
      phone: "+1234567892",
      status: "absent",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      rollNumber: "ST004",
      class: "10A",
      email: "sarah.wilson@school.com",
      phone: "+1234567893",
      status: "present",
    },
    {
      id: 5,
      name: "David Brown",
      rollNumber: "ST005",
      class: "10A",
      email: "david.brown@school.com",
      phone: "+1234567894",
      status: "late",
    },
    {
      id: 6,
      name: "Emily Davis",
      rollNumber: "ST006",
      class: "10A",
      email: "emily.davis@school.com",
      phone: "+1234567895",
      status: "absent",
    },
    {
      id: 7,
      name: "Alex Johnson",
      rollNumber: "ST007",
      class: "10A",
      email: "alex.johnson@school.com",
      phone: "+1234567896",
      status: "present",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      rollNumber: "ST008",
      class: "10A",
      email: "lisa.anderson@school.com",
      phone: "+1234567897",
      status: "present",
    },
  ])

  // Mock data for dashboard and reports
  const stats = {
    totalStudents: 150,
    presentToday: 142,
    absentToday: 8,
    attendanceRate: 94.7,
  }

  const chartData = [
    { day: "Mon", present: 140, absent: 10 },
    { day: "Tue", present: 145, absent: 5 },
    { day: "Wed", present: 138, absent: 12 },
    { day: "Thu", present: 147, absent: 3 },
    { day: "Fri", present: 142, absent: 8 },
  ]

  const reportData = [
    {
      id: 1,
      name: "John Doe",
      rollNumber: "ST001",
      class: "10A",
      totalDays: 20,
      presentDays: 18,
      absentDays: 2,
      percentage: 90,
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNumber: "ST002",
      class: "10A",
      totalDays: 20,
      presentDays: 20,
      absentDays: 0,
      percentage: 100,
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNumber: "ST003",
      class: "10A",
      totalDays: 20,
      presentDays: 15,
      absentDays: 5,
      percentage: 75,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      rollNumber: "ST004",
      class: "10A",
      totalDays: 20,
      presentDays: 19,
      absentDays: 1,
      percentage: 95,
    },
    {
      id: 5,
      name: "David Brown",
      rollNumber: "ST005",
      class: "10A",
      totalDays: 20,
      presentDays: 16,
      absentDays: 4,
      percentage: 80,
    },
  ]

  const dailyData = [
    { date: "2024-01-15", present: 145, absent: 5, total: 150, rate: 96.7 },
    { date: "2024-01-14", present: 138, absent: 12, total: 150, rate: 92.0 },
    { date: "2024-01-13", present: 147, absent: 3, total: 150, rate: 98.0 },
    { date: "2024-01-12", present: 140, absent: 10, total: 150, rate: 93.3 },
    { date: "2024-01-11", present: 144, absent: 6, total: 150, rate: 96.0 },
  ]

  // Helper functions
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const updateAttendance = (studentId, status) => {
    setStudents((prev) => prev.map((student) => (student.id === studentId ? { ...student, status } : student)))
  }

  const markAllPresent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: "present" })))
  }

  const markAllAbsent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: "absent" })))
  }

  const handleAddStudent = () => {
    if (!formData.name || !formData.rollNumber || !formData.class) {
      alert("Please fill in all required fields")
      return
    }

    const newStudent = {
      id: students.length + 1,
      ...formData,
      status: "present",
    }

    setStudents((prev) => [...prev, newStudent])
    setFormData({ name: "", rollNumber: "", class: "", email: "", phone: "" })
    setIsAddFormOpen(false)
    alert(`${formData.name} has been added successfully`)
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      class: student.class,
      email: student.email,
      phone: student.phone,
    })
    setIsAddFormOpen(true)
  }

  const handleUpdateStudent = () => {
    if (!formData.name || !formData.rollNumber || !formData.class) {
      alert("Please fill in all required fields")
      return
    }

    setStudents((prev) =>
      prev.map((student) => (student.id === editingStudent.id ? { ...student, ...formData } : student)),
    )

    setEditingStudent(null)
    setFormData({ name: "", rollNumber: "", class: "", email: "", phone: "" })
    setIsAddFormOpen(false)
    alert(`${formData.name} has been updated successfully`)
  }

  const handleDeleteStudent = (studentId, studentName) => {
    if (confirm(`Are you sure you want to delete ${studentName}?`)) {
      setStudents((prev) => prev.filter((student) => student.id !== studentId))
      alert("Student has been removed from the system")
    }
  }

  const resetForm = () => {
    setFormData({ name: "", rollNumber: "", class: "", email: "", phone: "" })
    setEditingStudent(null)
    setIsAddFormOpen(false)
  }

  const handleExportReport = (format) => {
    alert(`Exporting ${reportType} report as ${format}...`)
  }

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 95) return "excellent"
    if (percentage >= 85) return "good"
    if (percentage >= 75) return "average"
    return "poor"
  }

  const getStatusText = (percentage) => {
    if (percentage >= 95) return "Excellent"
    if (percentage >= 85) return "Good"
    if (percentage >= 75) return "Average"
    return "Poor"
  }

  const presentCount = filteredStudents.filter((s) => s.status === "present").length
  const absentCount = filteredStudents.filter((s) => s.status === "absent").length
  const lateCount = filteredStudents.filter((s) => s.status === "late").length

  return (
    <div className="attendance-system">
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-brand">
          <h1>📚 Attendance System</h1>
        </div>
        <div className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </button>
          <button className={`nav-tab ${activeTab === "mark" ? "active" : ""}`} onClick={() => setActiveTab("mark")}>
            ✅ Mark Attendance
          </button>
          <button
            className={`nav-tab ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            👥 Students
          </button>
          <button
            className={`nav-tab ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            📈 Reports
          </button>
        </div>
      </nav>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="tab-content">
          <div className="page-header">
            <h2>Attendance Dashboard</h2>
            <p>Overview of attendance statistics and trends</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card total">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Total Students</h3>
                <p className="stat-number">{stats.totalStudents}</p>
              </div>
            </div>
            <div className="stat-card present">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>Present Today</h3>
                <p className="stat-number">{stats.presentToday}</p>
              </div>
            </div>
            <div className="stat-card absent">
              <div className="stat-icon">❌</div>
              <div className="stat-info">
                <h3>Absent Today</h3>
                <p className="stat-number">{stats.absentToday}</p>
              </div>
            </div>
            <div className="stat-card rate">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <h3>Attendance Rate</h3>
                <p className="stat-number">{stats.attendanceRate}%</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="chart-section">
              <h3>Weekly Attendance Trend</h3>
              <div className="chart-container">
                {chartData.map((data, index) => (
                  <div key={index} className="chart-bar">
                    <div className="bar-container">
                      <div className="bar present-bar" style={{ height: `${(data.present / 150) * 100}%` }}></div>
                      <div className="bar absent-bar" style={{ height: `${(data.absent / 150) * 100}%` }}></div>
                    </div>
                    <div className="bar-label">{data.day}</div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color present"></div>
                  <span>Present</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color absent"></div>
                  <span>Absent</span>
                </div>
              </div>
            </div>

            <div className="activity-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {dailyData.slice(0, 5).map((record, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-info">
                      <span className="activity-date">{record.date}</span>
                      <span className="activity-details">
                        Present: {record.present} | Absent: {record.absent}
                      </span>
                    </div>
                    <span className={`activity-status ${getAttendanceStatus(record.rate)}`}>
                      {getStatusText(record.rate)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mark Attendance Tab */}
      {activeTab === "mark" && (
        <div className="tab-content">
          <div className="page-header">
            <h2>Mark Attendance</h2>
            <p>Mark student attendance for the selected date and class</p>
          </div>

          <div className="controls-section">
            <div className="date-class-controls">
              <div className="control-group">
                <label htmlFor="date">Date:</label>
                <input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
              </div>
              <div className="control-group">
                <label htmlFor="class">Class:</label>
                <select
                  id="class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="class-select"
                >
                  <option value="10A">Class 10A</option>
                  <option value="10B">Class 10B</option>
                  <option value="11A">Class 11A</option>
                  <option value="11B">Class 11B</option>
                </select>
              </div>
            </div>
            <div className="bulk-actions">
              <button className="bulk-btn present" onClick={markAllPresent}>
                Mark All Present
              </button>
              <button className="bulk-btn absent" onClick={markAllAbsent}>
                Mark All Absent
              </button>
            </div>
          </div>

          <div className="summary-section">
            <div className="summary-card present">
              <div className="summary-icon">✅</div>
              <div className="summary-info">
                <div className="count">{presentCount}</div>
                <div className="label">Present</div>
              </div>
            </div>
            <div className="summary-card absent">
              <div className="summary-icon">❌</div>
              <div className="summary-info">
                <div className="count">{absentCount}</div>
                <div className="label">Absent</div>
              </div>
            </div>
            <div className="summary-card late">
              <div className="summary-icon">⏰</div>
              <div className="summary-info">
                <div className="count">{lateCount}</div>
                <div className="label">Late</div>
              </div>
            </div>
          </div>

          <div className="search-section">
            <input
              type="text"
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="students-section">
            <h3>Students ({filteredStudents.length})</h3>
            <div className="students-grid">
              {filteredStudents.map((student) => (
                <div key={student.id} className="student-card">
                  <div className="student-info">
                    <h4>{student.name}</h4>
                    <p>
                      {student.rollNumber} • Class {student.class}
                    </p>
                  </div>
                  <div className="status-controls">
                    <button
                      className={`status-btn present ${student.status === "present" ? "active" : ""}`}
                      onClick={() => updateAttendance(student.id, "present")}
                    >
                      Present
                    </button>
                    <button
                      className={`status-btn absent ${student.status === "absent" ? "active" : ""}`}
                      onClick={() => updateAttendance(student.id, "absent")}
                    >
                      Absent
                    </button>
                    <button
                      className={`status-btn late ${student.status === "late" ? "active" : ""}`}
                      onClick={() => updateAttendance(student.id, "late")}
                    >
                      Late
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="save-section">
            <button className="save-btn" onClick={() => alert("Attendance saved successfully!")}>
              Save Attendance
            </button>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === "students" && (
        <div className="tab-content">
          <div className="page-header">
            <h2>Manage Students</h2>
            <p>Add, edit, and manage student information</p>
          </div>

          <div className="controls-section">
            <div className="search-filter-controls">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="class-filter">
                <option value="all">All Classes</option>
                <option value="10A">Class 10A</option>
                <option value="10B">Class 10B</option>
                <option value="11A">Class 11A</option>
                <option value="11B">Class 11B</option>
              </select>
            </div>
            <button className="add-student-btn" onClick={() => setIsAddFormOpen(true)}>
              ➕ Add Student
            </button>
          </div>

          {isAddFormOpen && (
            <div className="add-form-section">
              <h3>{editingStudent ? "Edit Student" : "Add New Student"}</h3>
              <div className="add-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Roll Number *"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, rollNumber: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData((prev) => ({ ...prev, class: e.target.value }))}
                    className="form-input"
                  >
                    <option value="">Select Class *</option>
                    <option value="10A">Class 10A</option>
                    <option value="10B">Class 10B</option>
                    <option value="11A">Class 11A</option>
                    <option value="11B">Class 11B</option>
                  </select>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="form-input"
                  />
                  <div className="form-buttons">
                    <button className="submit-btn" onClick={editingStudent ? handleUpdateStudent : handleAddStudent}>
                      {editingStudent ? "Update Student" : "Add Student"}
                    </button>
                    <button className="cancel-btn" onClick={resetForm}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="students-list-section">
            <h3>Students List ({students.length})</h3>
            <div className="students-table">
              <div className="table-header">
                <span>Name</span>
                <span>Roll Number</span>
                <span>Class</span>
                <span>Email</span>
                <span>Phone</span>
                <span>Actions</span>
              </div>
              {students.map((student) => (
                <div key={student.id} className="table-row">
                  <span className="student-name">{student.name}</span>
                  <span>{student.rollNumber}</span>
                  <span>{student.class}</span>
                  <span>{student.email}</span>
                  <span>{student.phone}</span>
                  <div className="actions">
                    <button className="edit-btn" onClick={() => handleEditStudent(student)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteStudent(student.id, student.name)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="tab-content">
          <div className="page-header">
            <h2>Attendance Reports</h2>
            <p>Generate and view detailed attendance reports and analytics</p>
          </div>

          <div className="controls-section">
            <div className="report-controls">
              <div className="control-group">
                <label>Report Type:</label>
                <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="report-select">
                  <option value="student">Student Report</option>
                  <option value="daily">Daily Report</option>
                </select>
              </div>
              <div className="control-group">
                <label>Class:</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="class-select"
                >
                  <option value="all">All Classes</option>
                  <option value="10A">Class 10A</option>
                  <option value="10B">Class 10B</option>
                  <option value="11A">Class 11A</option>
                  <option value="11B">Class 11B</option>
                </select>
              </div>
              <div className="date-range">
                <div className="control-group">
                  <label>From:</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="control-group">
                  <label>To:</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="date-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="summary-section">
            <div className="summary-card">
              <div className="summary-icon">📊</div>
              <div className="summary-info">
                <h4>Class Average</h4>
                <p className="summary-value">87.2%</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">🏆</div>
              <div className="summary-info">
                <h4>Perfect Attendance</h4>
                <p className="summary-value">1</p>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-icon">⚠️</div>
              <div className="summary-info">
                <h4>Below 75%</h4>
                <p className="summary-value">1</p>
              </div>
            </div>
          </div>

          <div className="report-table-section">
            <div className="table-header-section">
              <h3>{reportType === "student" ? "Student Attendance Report" : "Daily Attendance Report"}</h3>
              <div className="export-buttons">
                <button className="export-btn" onClick={() => handleExportReport("CSV")}>
                  📄 Export CSV
                </button>
                <button className="export-btn" onClick={() => handleExportReport("PDF")}>
                  📋 Export PDF
                </button>
              </div>
            </div>

            <div className="report-table">
              {reportType === "student" ? (
                <>
                  <div className="table-header">
                    <span>Student</span>
                    <span>Roll No.</span>
                    <span>Class</span>
                    <span>Present</span>
                    <span>Absent</span>
                    <span>Percentage</span>
                  </div>
                  {reportData.map((student) => (
                    <div key={student.id} className="table-row">
                      <span className="student-name">{student.name}</span>
                      <span>{student.rollNumber}</span>
                      <span>{student.class}</span>
                      <span className="present">{student.presentDays}</span>
                      <span className="absent">{student.absentDays}</span>
                      <span className={`rate ${getAttendanceStatus(student.percentage)}`}>{student.percentage}%</span>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="table-header">
                    <span>Date</span>
                    <span>Total</span>
                    <span>Present</span>
                    <span>Absent</span>
                    <span>Rate</span>
                    <span>Status</span>
                  </div>
                  {dailyData.map((day, index) => (
                    <div key={index} className="table-row">
                      <span>{day.date}</span>
                      <span>{day.total}</span>
                      <span className="present">{day.present}</span>
                      <span className="absent">{day.absent}</span>
                      <span className="rate">{day.rate}%</span>
                      <span className={`status ${getAttendanceStatus(day.rate)}`}>{getStatusText(day.rate)}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
