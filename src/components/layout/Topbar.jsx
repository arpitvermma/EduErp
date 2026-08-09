import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Menu, Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';

export default function Topbar({ title }) {
  const { darkMode, setDarkMode, notifications, markNotifRead, sidebarOpen, setSidebarOpen, user } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const navigate = useNavigate();
  const unread = notifications.filter(n => !n.read).length;

  const notifIcons = { exam: '📝', assignment: '📋', fee: '💳', placement: '🏢' };

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="btn btn-icon btn-secondary" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 700 }}>{title}</h1>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
        <div className="search-bar" style={{ display: 'flex' }}>
          <Search size={14} color="var(--text-muted)" />
          <input placeholder="Search anything..." />
        </div>

        <button className="btn btn-icon btn-secondary" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-icon btn-secondary"
            onClick={() => setShowNotif(!showNotif)}
            style={{ position: 'relative' }}
          >
            <Bell size={16} />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--danger)', border: '2px solid var(--surface)'
              }} />
            )}
          </button>

          {showNotif && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 8,
              width: 320, background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', zIndex: 200
            }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Notifications</span>
                {unread > 0 && <span className="badge badge-primary">{unread} new</span>}
              </div>
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotifRead(n.id)}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      background: n.read ? 'transparent' : 'rgba(79,70,229,.05)',
                      transition: 'background .15s'
                    }}
                  >
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span>{notifIcons[n.type]}</span>
                      <div>
                        <div style={{ fontSize: 13, lineHeight: 1.4 }}>{n.message}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{n.time}</div>
                      </div>
                      {!n.read && (
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '10px 16px', textAlign: 'center' }}>
                <button className="btn btn-secondary btn-sm w-full">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}
          onClick={() => navigate(`/${user?.role}/profile`)}>
          <div className="avatar" style={{ background: 'var(--primary)', color: 'white', fontSize: 12 }}>
            {user?.avatar}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{user?.name?.split(' ')[0]}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role}</span>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>
      </div>
    </header>
  );
}
