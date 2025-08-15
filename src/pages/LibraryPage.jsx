"use client"

import { useState } from "react"
import Sidebar from "../component/Sidebar"
import styles from "./LibraryPage.module.css"

const StudentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Sample library data
  const borrowedBooks = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      author: "John Smith",
      dueDate: "2024-01-15",
      renewals: 1,
      cover: "/placeholder.svg?height=120&width=80",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      author: "Sarah Johnson",
      dueDate: "2024-01-20",
      renewals: 0,
      cover: "/placeholder.svg?height=120&width=80",
    },
  ]

  const availableBooks = [
    {
      id: 3,
      title: "Data Structures and Algorithms",
      author: "Robert Brown",
      category: "Computer Science",
      available: true,
      cover: "/placeholder.svg?height=120&width=80",
    },
    {
      id: 4,
      title: "Physics Fundamentals",
      author: "Emily Davis",
      category: "Physics",
      available: true,
      cover: "/placeholder.svg?height=120&width=80",
    },
    {
      id: 5,
      title: "World History",
      author: "Michael Wilson",
      category: "History",
      available: false,
      cover: "/placeholder.svg?height=120&width=80",
    },
    {
      id: 6,
      title: "Organic Chemistry",
      author: "Lisa Anderson",
      category: "Chemistry",
      available: true,
      cover: "/placeholder.svg?height=120&width=80",
    },
  ]

  const reservedBooks = [
    {
      id: 7,
      title: "Advanced Programming",
      author: "David Lee",
      reservationDate: "2024-01-10",
      estimatedAvailable: "2024-01-18",
      cover: "/placeholder.svg?height=120&width=80",
    },
  ]

  const filteredBooks = availableBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleRenewBook = (bookId) => {
    console.log(`Renewing book with ID: ${bookId}`)
  }

  const handleReserveBook = (bookId) => {
    console.log(`Reserving book with ID: ${bookId}`)
  }

  return (
    <div className={styles.libraryContainer}>
      <Sidebar />

      <div className={styles.libraryContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Student Library</h1>
          <p className={styles.subtitle}>Manage your books, reservations, and reading progress</p>
        </div>

        {/* Library Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📚</div>
            <div className={styles.statInfo}>
              <h3>2</h3>
              <p>Books Borrowed</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏰</div>
            <div className={styles.statInfo}>
              <h3>1</h3>
              <p>Reserved Books</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📖</div>
            <div className={styles.statInfo}>
              <h3>15</h3>
              <p>Books Read</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⚠️</div>
            <div className={styles.statInfo}>
              <h3>0</h3>
              <p>Overdue Books</p>
            </div>
          </div>
        </div>

        {/* Borrowed Books Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Currently Borrowed</h2>
          <div className={styles.borrowedBooks}>
            {borrowedBooks.map((book) => (
              <div key={book.id} className={styles.borrowedBookCard}>
                <img src={book.cover || "/placeholder.svg"} alt={book.title} className={styles.bookCover} />
                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <p className={styles.dueDate}>Due: {book.dueDate}</p>
                  <p className={styles.renewals}>Renewals: {book.renewals}/3</p>
                </div>
                <button className={styles.renewButton} onClick={() => handleRenewBook(book.id)}>
                  Renew
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Reserved Books Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Reserved Books</h2>
          <div className={styles.reservedBooks}>
            {reservedBooks.map((book) => (
              <div key={book.id} className={styles.reservedBookCard}>
                <img src={book.cover || "/placeholder.svg"} alt={book.title} className={styles.bookCover} />
                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <p className={styles.reservationDate}>Reserved: {book.reservationDate}</p>
                  <p className={styles.estimatedDate}>Available: {book.estimatedAvailable}</p>
                </div>
                <span className={styles.reservedStatus}>Reserved</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Browse Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse Library</h2>
            <div className={styles.viewControls}>
              <button
                className={`${styles.viewButton} ${viewMode === "grid" ? styles.active : ""}`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
              <button
                className={`${styles.viewButton} ${viewMode === "list" ? styles.active : ""}`}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
            </div>
          </div>

          <div className={styles.searchControls}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categoryFilter}
            >
              <option value="all">All Categories</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="History">History</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>

          <div className={`${styles.booksGrid} ${viewMode === "list" ? styles.listView : ""}`}>
            {filteredBooks.map((book) => (
              <div key={book.id} className={styles.bookCard}>
                <img src={book.cover || "/placeholder.svg"} alt={book.title} className={styles.bookCover} />
                <div className={styles.bookDetails}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <p className={styles.bookCategory}>{book.category}</p>
                  <div className={styles.bookActions}>
                    {book.available ? (
                      <button className={styles.reserveButton} onClick={() => handleReserveBook(book.id)}>
                        Reserve Book
                      </button>
                    ) : (
                      <span className={styles.unavailableStatus}>Not Available</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentLibrary
