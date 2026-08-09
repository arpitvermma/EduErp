import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Users, UserCheck, BookOpen, Building2,
  CalendarCheck, Clock, FileText, ClipboardList, GraduationCap,
  DollarSign, Library, Bell, Calendar, Briefcase, LogOut,
  Settings, ChevronRight, Award, BookMarked, X
} from 'lucide-react';

const ADMIN_NAV = [
  { section: 'Overview', items: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  ]},
  { section: 'Academic', items: [
    { to: '/admin/students', label: 'Students', icon: Users },
    { to: '/admin/faculty', label: 'Faculty', icon: UserCheck },
    { to: '/admin/departments', label: 'Departments', icon: Building2 },
    { to: '/admin/courses', label: 'Courses', icon: BookOpen },
    { to: '/admin/attendance', label: 'Attendance', icon: CalendarCheck },
    { to: '/admin/timetable', label: 'Timetable', icon: Clock },
  ]},
  { section: 'Exams & Results', items: [
    { to: '/admin/exams', label: 'Examinations', icon: ClipboardList },
    { to: '/admin/results', label: 'Results', icon: Award },
    { to: '/admin/assignments', label: 'Assignments', icon: FileText },
  ]},
  { section: 'Finance & Library', items: [
    { to: '/admin/fees', label: 'Fee Management', icon: DollarSign },
    { to: '/admin/library', label: 'Library', icon: Library },
  ]},
  { section: 'Campus', items: [
    { to: '/admin/notices', label: 'Notice Board', icon: Bell },
    { to: '/admin/events', label: 'Events', icon: Calendar },
    { to: '/admin/placements', label: 'Placements', icon: Briefcase },
  ]},
];

const FACULTY_NAV = [
  { section: 'Overview', items: [
    { to: '/faculty', label: 'Dashboard', icon: LayoutDashboard, end: true },
  ]},
  { section: 'Teaching', items: [
    { to: '/faculty/attendance', label: 'Attendance', icon: CalendarCheck },
    { to: '/faculty/assignments', label: 'Assignments', icon: FileText },
    { to: '/faculty/materials', label: 'Study Materials', icon: BookMarked },
    { to: '/faculty/results', label: 'Enter Marks', icon: Award },
  ]},
  { section: 'Information', items: [
    { to: '/faculty/timetable', label: 'My Schedule', icon: Clock },
    { to: '/faculty/notices', label: 'Notices', icon: Bell },
  ]},
];

const STUDENT_NAV = [
  { section: 'Overview', items: [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
  ]},
  { section: 'Academics', items: [
    { to: '/student/attendance', label: 'My Attendance', icon: CalendarCheck },
    { to: '/student/timetable', label: 'Timetable', icon: Clock },
    { to: '/student/assignments', label: 'Assignments', icon: FileText },
    { to: '/student/results', label: 'Results', icon: Award },
    { to: '/student/materials', label: 'Study Materials', icon: BookMarked },
  ]},
  { section: 'Services', items: [
    { to: '/student/fees', label: 'Fee Payment', icon: DollarSign },
    { to: '/student/library', label: 'Library', icon: Library },
    { to: '/student/notices', label: 'Notices', icon: Bell },
    { to: '/student/placements', label: 'Placements', icon: Briefcase },
  ]},
];

export default function Sidebar() {
  const { user, logout, sidebarOpen, setSidebarOpen } = useApp();
  const navigate = useNavigate();

  const navMap = { admin: ADMIN_NAV, faculty: FACULTY_NAV, student: STUDENT_NAV };
  const nav = navMap[user?.role] || [];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{ display: 'none' }}
        />
      )}
      <aside className="sidebar" style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <GraduationCap size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'Plus Jakarta Sans' }}>EduERP</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>College Management</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn btn-icon btn-secondary"
            style={{ marginLeft: 'auto', display: 'none' }}
            id="sidebar-close"
          >
            <X size={16} />
          </button>
        </div>

        {/* User Info */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar" style={{ background: 'var(--primary)', color: 'white', fontSize: 12 }}>
              {user?.avatar}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }} className="truncate">{user?.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role} • {user?.id}</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {nav.map(section => (
            <div key={section.section} className="sidebar-section">
              <div className="sidebar-section-label">{section.section}</div>
              {section.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                  <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: .4 }} />
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
          <NavLink to={`/${user?.role}/profile`} className="sidebar-item">
            <Settings size={16} />
            <span>Settings & Profile</span>
          </NavLink>
          <button className="sidebar-item" onClick={handleLogout} style={{ width: '100%', color: 'var(--danger)' }}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
