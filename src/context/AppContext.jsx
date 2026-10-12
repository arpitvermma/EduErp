import { createContext, useContext, useState, useEffect } from 'react';
import { STUDENTS, FACULTY, DEPARTMENTS, COURSES, NOTICES, ASSIGNMENTS, EXAMS, BOOKS, PLACEMENTS, EVENTS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // No login: the app always runs as this demo student.
  const [user] = useState({ role: 'student', name: 'Aryan Gupta', id: 'CS2021001', avatar: 'AG' });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('erp_dark') === 'true');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'exam', message: 'End Semester Exam scheduled for CS301 on July 1st', time: '2h ago', read: false },
    { id: 2, type: 'assignment', message: 'Assignment due: Process Scheduling Algorithms today', time: '5h ago', read: false },
    { id: 3, type: 'fee', message: 'Fee payment deadline: June 30th, 2026', time: '1d ago', read: true },
    { id: 4, type: 'placement', message: 'TechCorp India placement drive on June 20th', time: '2d ago', read: true },
  ]);

  const [students, setStudents] = useState(STUDENTS);
  const [faculty, setFaculty] = useState(FACULTY);
  const [departments, setDepartments] = useState(DEPARTMENTS);
  const [courses, setCourses] = useState(COURSES);
  const [notices, setNotices] = useState(NOTICES);
  const [assignments, setAssignments] = useState(ASSIGNMENTS);
  const [exams, setExams] = useState(EXAMS);
  const [books, setBooks] = useState(BOOKS);
  const [placements, setPlacements] = useState(PLACEMENTS);
  const [events, setEvents] = useState(EVENTS);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('erp_dark', darkMode);
  }, [darkMode]);

  const markNotifRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addStudent = (s) => setStudents(prev => [...prev, s]);
  const updateStudent = (id, data) => setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  const deleteStudent = (id) => setStudents(prev => prev.filter(s => s.id !== id));

  const addFaculty = (f) => setFaculty(prev => [...prev, f]);
  const updateFaculty = (id, data) => setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...data } : f));
  const deleteFaculty = (id) => setFaculty(prev => prev.filter(f => f.id !== id));

  const addCourse = (c) => setCourses(prev => [...prev, c]);
  const updateCourse = (id, data) => setCourses(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  const deleteCourse = (id) => setCourses(prev => prev.filter(c => c.id !== id));

  const addNotice = (n) => setNotices(prev => [n, ...prev]);
  const deleteNotice = (id) => setNotices(prev => prev.filter(n => n.id !== id));

  const addExam = (e) => setExams(prev => [...prev, e]);
  const deleteExam = (id) => setExams(prev => prev.filter(e => e.id !== id));

  return (
    <AppContext.Provider value={{
      user,
      darkMode, setDarkMode,
      sidebarOpen, setSidebarOpen,
      notifications, markNotifRead,
      students, addStudent, updateStudent, deleteStudent,
      faculty, addFaculty, updateFaculty, deleteFaculty,
      departments, setDepartments,
      courses, addCourse, updateCourse, deleteCourse,
      notices, addNotice, deleteNotice,
      assignments, setAssignments,
      exams, addExam, deleteExam,
      books, setBooks,
      placements, setPlacements,
      events, setEvents,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
