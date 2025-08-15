// StudentList.jsx
import React, { useState } from "react";
import "./StudentManager.css";

const initialStudents = [
  { id: 1, name: "John Doe", roll: "ST001", class: "10A", email: "john.doe@school.com", phone: "+1234567890" },
  { id: 2, name: "Jane Smith", roll: "ST002", class: "10A", email: "jane.smith@school.com", phone: "+1234567891" },
  { id: 3, name: "Mike Johnson", roll: "ST003", class: "10A", email: "mike.johnson@school.com", phone: "+1234567892" },
  { id: 4, name: "Sarah Wilson", roll: "ST004", class: "10A", email: "sarah.wilson@school.com", phone: "+1234567893" },
  { id: 5, name: "David Brown", roll: "ST005", class: "10A", email: "david.brown@school.com", phone: "+1234567894" },
  { id: 6, name: "Emily Davis", roll: "ST006", class: "10A", email: "emily.davis@school.com", phone: "+1234567895" },
  { id: 7, name: "Alex Johnson", roll: "ST007", class: "10A", email: "alex.johnson@school.com", phone: "+1234567896" },
  { id: 8, name: "Lisa Anderson", roll: "ST008", class: "10A", email: "lisa.anderson@school.com", phone: "+1234567897" },
];

const StudentList = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (student) => {
    alert(`Edit ${student.name}`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-list-container">
      <h3>Students List ({filteredStudents.length})</h3>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="students-table">
        <div className="table-header">
          <span>Name</span>
          <span>Roll Number</span>
          <span>Class</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Actions</span>
        </div>
        {filteredStudents.map((student, index) => (
          <div
            key={student.id}
            className={`table-row ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <span>{student.name}</span>
            <span>{student.roll}</span>
            <span>{student.class}</span>
            <span>{student.email}</span>
            <span>{student.phone}</span>
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(student.id, student.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
