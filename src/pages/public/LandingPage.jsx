import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, Award, MapPin, Phone, Mail, ChevronRight, Star, ArrowRight } from 'lucide-react';

const STATS = [
  { label: 'Students Enrolled', value: '1,320+', icon: '🎓' },
  { label: 'Faculty Members', value: '85+', icon: '👨‍🏫' },
  { label: 'Departments', value: '6', icon: '🏛️' },
  { label: 'Placement Rate', value: '94%', icon: '🏢' },
];

const DEPARTMENTS = [
  { name: 'Computer Science', icon: '💻', students: 240, desc: 'AI, ML, Software Engineering' },
  { name: 'Mechanical Eng.', icon: '⚙️', students: 180, desc: 'Design, Manufacturing, Robotics' },
  { name: 'Electronics & Comm.', icon: '📡', students: 200, desc: 'VLSI, Embedded, Communication' },
  { name: 'Civil Engineering', icon: '🏗️', students: 160, desc: 'Structures, Environment, Transport' },
  { name: 'Business Admin.', icon: '📊', students: 220, desc: 'Finance, Marketing, Strategy' },
  { name: 'Mathematics', icon: '∑', students: 120, desc: 'Pure Math, Statistics, Operations' },
];

const FACULTY_HIGHLIGHTS = [
  { name: 'Dr. Priya Sharma', dept: 'Computer Science', exp: '15 yrs', qualification: 'Ph.D. IIT Delhi', avatar: 'PS' },
  { name: 'Dr. Rajesh Kumar', dept: 'Mechanical Engineering', exp: '18 yrs', qualification: 'Ph.D. IIT Roorkee', avatar: 'RK' },
  { name: 'Dr. Sunita Patel', dept: 'Electronics', exp: '14 yrs', qualification: 'Ph.D. IIT Bombay', avatar: 'SP' },
  { name: 'Dr. Meena Joshi', dept: 'Business Administration', exp: '16 yrs', qualification: 'Ph.D. Management', avatar: 'MJ' },
];

const ANNOUNCEMENTS = [
  { title: 'End Semester Exams - July 2026', date: 'June 12', tag: 'Academic', color: '#4F46E5' },
  { title: 'TechCorp India Placement Drive - June 20', date: 'June 7', tag: 'Placement', color: '#10B981' },
  { title: 'College Annual Day - June 25', date: 'June 4', tag: 'Events', color: '#F59E0B' },
];

const avatarColors = ['#4F46E5','#0EA5E9','#F59E0B','#10B981','#EF4444','#8B5CF6'];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,.95)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 48px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, fontFamily: 'Plus Jakarta Sans', color: '#0F172A' }}>EduERP</div>
            <div style={{ fontSize: 10, color: '#64748B', marginTop: -2 }}>College Management System</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>Get Started <ArrowRight size={14} /></button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #0EA5E9 100%)',
        padding: '80px 48px', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,.08) 0%, transparent 50%)' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', borderRadius: 20, padding: '4px 12px', marginBottom: 20, fontSize: 13 }}>
            <Star size={12} fill="white" /> Ranked #1 Engineering College in Punjab
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            Shaping Tomorrow's<br />
            <span style={{ color: '#FDE68A' }}>Engineers & Leaders</span>
          </h1>
          <p style={{ fontSize: 18, opacity: .85, marginBottom: 36, lineHeight: 1.7 }}>
            A modern ERP platform connecting students, faculty, and administration for seamless academic excellence.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-lg" style={{ background: 'white', color: '#4F46E5', fontWeight: 700 }} onClick={() => navigate('/login')}>
              Student Login
            </button>
            <button className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: 'white', border: '1px solid rgba(255,255,255,.3)', fontWeight: 600 }} onClick={() => navigate('/login')}>
              Faculty Portal
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '48px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#4F46E5', fontFamily: 'Plus Jakarta Sans' }}>{s.value}</div>
              <div style={{ fontSize: 14, color: '#64748B', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section style={{ padding: '64px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Academic Programs</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Our Departments</h2>
            <p style={{ color: '#64748B', fontSize: 16 }}>World-class education across engineering and management disciplines</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {DEPARTMENTS.map((d, i) => (
              <div key={d.name} className="card" style={{ padding: 24, cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{d.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{d.name}</div>
                <div style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>{d.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4F46E5' }}>
                  <Users size={13} /> {d.students} students enrolled
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section style={{ padding: '48px', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Latest Announcements</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ANNOUNCEMENTS.map(a => (
              <div key={a.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', border: '1px solid var(--border)', borderRadius: 10, background: 'var(--bg)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontWeight: 500, fontSize: 15 }}>{a.title}</span>
                <span style={{ fontSize: 12, color: '#64748B' }}>{a.date}</span>
                <span className="badge" style={{ background: `${a.color}15`, color: a.color }}>{a.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section style={{ padding: '64px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Expert Educators</div>
            <h2 style={{ fontSize: 32, fontWeight: 800 }}>Our Distinguished Faculty</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {FACULTY_HIGHLIGHTS.map((f, i) => (
              <div key={f.name} className="card" style={{ padding: 24, textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: avatarColors[i % avatarColors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: 'white', fontSize: 20, fontWeight: 700 }}>
                  {f.avatar}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: '#64748B', margin: '4px 0' }}>{f.dept}</div>
                <div style={{ fontSize: 12, color: '#4F46E5' }}>{f.qualification}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>{f.exp} experience</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '48px', background: '#0F172A', color: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={20} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: 18 }}>EduERP College</span>
            </div>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, fontSize: 14 }}>
              Committed to excellence in education and shaping future professionals since 1998.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Contact Information</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10, color: '#94A3B8', fontSize: 14 }}><MapPin size={16} />Industrial Area, Ludhiana, Punjab - 141001</div>
              <div style={{ display: 'flex', gap: 10, color: '#94A3B8', fontSize: 14 }}><Phone size={16} />+91 161 234 5678</div>
              <div style={{ display: 'flex', gap: 10, color: '#94A3B8', fontSize: 14 }}><Mail size={16} />info@eduerp.edu.in</div>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Quick Links</div>
            {['Student Portal', 'Faculty Portal', 'Admin Dashboard', 'Library', 'Placements'].map(l => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94A3B8', fontSize: 14, marginBottom: 8, cursor: 'pointer' }}
                onClick={() => navigate('/login')}>
                <ChevronRight size={14} /> {l}
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '32px auto 0', paddingTop: 24, borderTop: '1px solid #1E293B', textAlign: 'center', color: '#475569', fontSize: 13 }}>
          © 2026 EduERP College Management System. All rights reserved.
        </div>
      </section>
    </div>
  );
}
