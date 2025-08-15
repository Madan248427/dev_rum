// Calendar.jsx
import React, { useState, useMemo } from "react";
import "./Calendar.css";

const pad = (n) => (n < 10 ? `0${n}` : n);
const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const buildMonthMatrix = (year, monthIdx, weekStartsOn = 0) => {
  const firstOfMonth = new Date(year, monthIdx, 1);
  const startOffset = (firstOfMonth.getDay() - weekStartsOn + 7) % 7;
  const startDate = new Date(year, monthIdx, 1 - startOffset);

  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + w * 7 + d);
      days.push(day);
    }
    weeks.push(days);
  }
  return weeks;
};

// Sample events (replace or fetch dynamically)
const sampleEvents = [
  { date: "2025-08-20", title: "Math Exam", desc: "Grade 10 syllabus" },
  { date: "2025-08-22", title: "Science Fair", desc: "Auditorium 10AM–3PM" },
  { date: "2025-08-25", title: "Sports Day", desc: "Main ground" },
  { date: "2025-09-01", title: "Teachers' Day", desc: "Assembly Hall" },
];

export default function Calendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today);

  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const e of sampleEvents) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date).push(e);
    }
    return map;
  }, []);

  const matrix = useMemo(() => buildMonthMatrix(viewDate.getFullYear(), viewDate.getMonth()), [viewDate]);

  const monthName = viewDate.toLocaleString("default", { month: "long" });
  const year = viewDate.getFullYear();

  const goPrev = () => setViewDate(new Date(year, viewDate.getMonth() - 1, 1));
  const goNext = () => setViewDate(new Date(year, viewDate.getMonth() + 1, 1));
  const goToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelected(today);
  };

  const selectedKey = toKey(selected);
  const selectedEvents = eventsByDay.get(selectedKey) || [];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="cal-wrap">
      {/* Calendar Grid */}
      <div className="cal-card">
        <header className="cal-header">
          <div className="cal-title">
            <h2>{monthName} {year}</h2>
            <button className="cal-today" onClick={goToday}>Today</button>
          </div>
          <div className="cal-nav">
            <button onClick={goPrev}>‹</button>
            <button onClick={goNext}>›</button>
          </div>
        </header>

        <div className="cal-grid">
          {weekDays.map((w) => (
            <div key={w} className="cal-weekday">{w}</div>
          ))}

          {matrix.flat().map((day) => {
            const inMonth = day.getMonth() === viewDate.getMonth();
            const isToday = sameDay(day, today);
            const isSelected = sameDay(day, selected);
            const key = toKey(day);
            const dayEvents = eventsByDay.get(key) || [];

            return (
              <button
                key={key}
                onClick={() => setSelected(day)}
                className={[
                  "cal-cell",
                  inMonth ? "" : "is-out",
                  isToday ? "is-today" : "",
                  isSelected ? "is-selected" : "",
                ].join(" ").trim()}
              >
                <span className="cal-date">{day.getDate()}</span>
                {dayEvents.length > 0 && <span className="cal-dot" />}
                {dayEvents.length > 1 && <span className="cal-count">{dayEvents.length}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar for selected day */}
      <aside className="cal-side">
        <h3 className="side-title">
          {selected.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </h3>

        {selectedEvents.length === 0 ? (
          <p className="side-empty">No events for this day.</p>
        ) : (
          <ul className="side-list">
            {selectedEvents.map((ev, idx) => (
              <li key={idx} className="side-item">
                <div className="side-bullet" />
                <div>
                  <div className="side-name">{ev.title}</div>
                  {ev.desc && <div className="side-desc">{ev.desc}</div>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
