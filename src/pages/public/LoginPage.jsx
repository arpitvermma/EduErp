import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { GraduationCap, User, UserCog, ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ROLES = [
  { key: 'student', label: 'Student', icon: User, desc: 'Access courses, results & more', demo: { id: 'CS2021001', name: 'Aryan Gupta' } },
  { key: 'faculty', label: 'Faculty', icon: UserCog, desc: 'Manage classes & students', demo: { id: 'FAC001', name: 'Dr. Priya Sharma' } },
  { key: 'admin', label: 'Admin', icon: ShieldCheck, desc: 'Full system administration', demo: { id: 'ADM001', name: 'Rakesh Mehta' } },
];

export default function LoginPage() {
  const [role, setRole] = useState('student');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const selectedRole = ROLES.find(r => r.key === role);

  const handleLogin = (e) => {
    e.preventDefault();
    const name = id.trim() ? id : selectedRole.demo.name;
    const userId = id.trim() || selectedRole.demo.id;
    login(role, selectedRole.demo.name, userId);
    toast.success(`Welcome back, ${selectedRole.demo.name}!`);
    navigate(`/${role}`);
  };

  const fillDemo = () => {
    setId(selectedRole.demo.id);
    setPassword('demo1234');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #0EA5E9 100%)',
      padding: 20
    }}>
      <button onClick={() => navigate('/')} className="btn" style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(255,255,255,.15)', color: 'white' }}>
        <ArrowLeft size={16} /> Back to Home
      </button>

      <div style={{ width: '100%', maxWidth: 420 }}>
        <div className="card" style={{ padding: 36, background: 'white' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <GraduationCap size={28} color="white" />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800 }}>Welcome to EduERP</h1>
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Sign in to access your dashboard</p>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {ROLES.map(r => (
              <button
                key={r.key}
                onClick={() => { setRole(r.key); setId(''); setPassword(''); }}
                style={{
                  flex: 1, padding: '12px 8px', borderRadius: 10, border: role === r.key ? '2px solid #4F46E5' : '1px solid #E2E8F0',
                  background: role === r.key ? '#EEF2FF' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  transition: 'all .15s'
                }}
              >
                <r.icon size={20} color={role === r.key ? '#4F46E5' : '#64748B'} />
                <span style={{ fontSize: 12, fontWeight: 600, color: role === r.key ? '#4F46E5' : '#0F172A' }}>{r.label}</span>
              </button>
            ))}
          </div>

          {!showForgot ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">{role === 'admin' ? 'Admin ID' : role === 'faculty' ? 'Faculty ID' : 'Student ID / Roll Number'}</label>
                <input className="form-control" placeholder={`e.g. ${selectedRole.demo.id}`} value={id} onChange={e => setId(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="form-control"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingRight: 36 }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748B' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B', cursor: 'pointer' }}>
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                  Remember me
                </label>
                <button type="button" onClick={() => setShowForgot(true)} style={{ background: 'none', border: 'none', color: '#4F46E5', fontSize: 13, fontWeight: 500 }}>
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center' }}>
                Sign In as {selectedRole.label}
              </button>
              <button type="button" onClick={fillDemo} className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>
                Use Demo Credentials
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 13, color: '#64748B' }}>Enter your registered email and we'll send a password reset link.</p>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-control" placeholder="you@edumail.com" />
              </div>
              <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }} onClick={() => { toast.success('Reset link sent! (mock)'); setShowForgot(false); }}>
                Send Reset Link
              </button>
              <button className="btn btn-secondary w-full" style={{ justifyContent: 'center' }} onClick={() => setShowForgot(false)}>
                Back to Login
              </button>
            </div>
          )}

          <div style={{ marginTop: 20, padding: 12, background: '#F8FAFC', borderRadius: 8, fontSize: 12, color: '#64748B', textAlign: 'center' }}>
            This is a demo system. Click "Use Demo Credentials" then Sign In — any password works.
          </div>
        </div>
      </div>
    </div>
  );
}
