import { Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const TITLES = {
  '/student': 'Student Dashboard',
  '/student/attendance': 'My Attendance',
  '/student/timetable': 'Timetable',
  '/student/assignments': 'Assignments',
  '/student/results': 'My Results',
  '/student/materials': 'Study Materials',
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
