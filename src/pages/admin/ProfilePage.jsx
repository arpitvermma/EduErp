import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../../components/ui';
import { Camera, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, darkMode, setDarkMode } = useApp();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({ name: user?.name || '', email: '', phone: '' });
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!pw.current || !pw.next) { toast.error('Please fill all password fields'); return; }
    if (pw.next !== pw.confirm) { toast.error('Passwords do not match'); return; }
    toast.success('Password changed successfully');
    setPw({ current: '', next: '', confirm: '' });
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Profile & Settings</div>
        <div className="page-subtitle">Manage your account information and preferences</div>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center gap-4">
          <div style={{ position: 'relative' }}>
            <Avatar name={user?.name} size={72} />
            <button className="btn btn-icon btn-primary" style={{ position: 'absolute', bottom: -4, right: -4, width: 28, height: 28, borderRadius: '50%' }} onClick={() => toast.success('Upload picture (mock)')}>
              <Camera size={13} />
            </button>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{user?.name}</div>
            <div className="text-sm text-muted" style={{ textTransform: 'capitalize' }}>{user?.role} • {user?.id}</div>
          </div>
        </div>
      </div>

      <div className="tab-list">
        <button className={`tab ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>Personal Information</button>
        <button className={`tab ${tab === 'password' ? 'active' : ''}`} onClick={() => setTab('password')}>Change Password</button>
        <button className={`tab ${tab === 'preferences' ? 'active' : ''}`} onClick={() => setTab('preferences')}>Preferences</button>
      </div>

      {tab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="card p-6" style={{ maxWidth: 560 }}>
          <div className="grid grid-2 mb-4">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">{user?.role === 'student' ? 'Roll Number' : 'ID'}</label>
              <input className="form-control" value={user?.id} disabled />
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Email Address</label>
            <input className="form-control" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@edumail.com" />
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Phone Number</label>
            <input className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" />
          </div>
          <button type="submit" className="btn btn-primary"><Save size={15} /> Save Changes</button>
        </form>
      )}

      {tab === 'password' && (
        <form onSubmit={handleChangePassword} className="card p-6" style={{ maxWidth: 480 }}>
          <div className="form-group mb-4">
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" value={pw.current} onChange={e => setPw({ ...pw, current: e.target.value })} />
          </div>
          <div className="form-group mb-4">
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" value={pw.next} onChange={e => setPw({ ...pw, next: e.target.value })} />
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" value={pw.confirm} onChange={e => setPw({ ...pw, confirm: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary"><Lock size={15} /> Update Password</button>
        </form>
      )}

      {tab === 'preferences' && (
        <div className="card p-6" style={{ maxWidth: 480 }}>
          <div className="flex justify-between items-center p-4" style={{ background: 'var(--bg)', borderRadius: 10 }}>
            <div>
              <div className="font-semibold">Dark Mode</div>
              <div className="text-sm text-muted">Switch between light and dark theme</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
              <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{
                position: 'absolute', cursor: 'pointer', inset: 0,
                background: darkMode ? 'var(--primary)' : '#CBD5E1', borderRadius: 24, transition: '.2s'
              }}>
                <span style={{
                  position: 'absolute', height: 18, width: 18, left: darkMode ? 23 : 3, bottom: 3,
                  background: 'white', borderRadius: '50%', transition: '.2s'
                }} />
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
