import { Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const TITLES = {
  '/admin': 'Admin Dashboard',
  '/admin/students': 'Student Management',
  '/admin/faculty': 'Faculty Management',
  '/admin/departments': 'Department Management',
  '/admin/courses': 'Course Management',
  '/admin/attendance': 'Attendance Management',
  '/admin/timetable': 'Timetable',
  '/admin/exams': 'Examination Management',
  '/admin/results': 'Result Management',
  '/admin/assignments': 'Assignments',
  '/admin/fees': 'Fee Management',
  '/admin/library': 'Library Management',
  '/admin/notices': 'Notice Board',
  '/admin/events': 'Events',
  '/admin/placements': 'Placement Management',
  '/admin/profile': 'Profile & Settings',
  '/faculty': 'Faculty Dashboard',
  '/faculty/attendance': 'Take Attendance',
  '/faculty/assignments': 'Assignments',
  '/faculty/materials': 'Study Materials',
  '/faculty/results': 'Enter Marks',
  '/faculty/timetable': 'My Schedule',
  '/faculty/notices': 'Notices',
  '/faculty/profile': 'Profile & Settings',
  '/student': 'Student Dashboard',
  '/student/attendance': 'My Attendance',
  '/student/timetable': 'Timetable',
  '/student/assignments': 'Assignments',
  '/student/results': 'My Results',
  '/student/materials': 'Study Materials',
  '/student/fees': 'Fee Payment',
  '/student/library': 'Library',
  '/student/notices': 'Notices',
  '/student/placements': 'Placements',
  '/student/profile': 'Profile & Settings',
};

export default function DashboardLayout() {
  const { sidebarOpen } = useApp();
  const { pathname } = useLocation();
  const title = TITLES[pathname] || 'EduERP';

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content" style={{ marginLeft: sidebarOpen ? 'var(--sidebar-w)' : 0, transition: 'margin .3s' }}>
        <Topbar title={title} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
