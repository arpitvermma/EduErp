import { X, TrendingUp, TrendingDown } from 'lucide-react';

export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button className="btn btn-icon btn-secondary" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, color, change, changeType, bg }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: bg || `${color}15` }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {change && (
          <div className="stat-change" style={{ color: changeType === 'up' ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: 3 }}>
            {changeType === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

export function Avatar({ name, size = 36, color = 'var(--primary)' }) {
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??';
  return (
    <div className="avatar" style={{ width: size, height: size, background: color, color: 'white', fontSize: size * 0.37 }}>
      {initials}
    </div>
  );
}

export function Badge({ children, type = 'primary' }) {
  return <span className={`badge badge-${type}`}>{children}</span>;
}

export function ProgressBar({ value, max = 100, color = 'var(--primary)', height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="progress-bar" style={{ height }}>
      <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="empty-state">
      <div style={{ fontSize: 48, marginBottom: 12 }}>{icon || '📭'}</div>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{title || 'Nothing here yet'}</div>
      {description && <div style={{ fontSize: 14, marginBottom: 16 }}>{description}</div>}
      {action}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '3px solid var(--border)',
        borderTopColor: 'var(--primary)',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
      <input
        className="form-control"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingLeft: 32, width: 240 }}
      />
    </div>
  );
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tab-list">
      {tabs.map(tab => (
        <button key={tab.value} className={`tab ${active === tab.value ? 'active' : ''}`} onClick={() => onChange(tab.value)}>
          {tab.label}
          {tab.count !== undefined && (
            <span className="badge badge-primary" style={{ marginLeft: 6 }}>{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
