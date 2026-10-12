import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, CalendarCheck, Clock, FileText, GraduationCap,
  Settings, ChevronRight, Award, BookMarked, X
} from 'lucide-react';

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
];

export default function Sidebar() {
  const { user, sidebarOpen, setSidebarOpen } = useApp();

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
          {STUDENT_NAV.map(section => (
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
          <NavLink to="/student/profile" className="sidebar-item">
            <Settings size={16} />
            <span>Settings & Profile</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
