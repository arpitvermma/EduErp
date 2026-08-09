import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { StatCard, Badge, ProgressBar } from '../../components/ui';
import { CalendarCheck, FileText, DollarSign, Award, Clock } from 'lucide-react';
import { TIMETABLE } from '../../data/mockData';

export default function StudentDashboard() {
  const { user, students, assignments, notices } = useApp();
  const navigate = useNavigate();
  const me = students.find(s => s.id === user?.id) || students[0];
  const today = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][new Date().getDay() - 1] || 'Monday';
  const todaysClasses = (TIMETABLE[today] || []).slice(0, 3);
  const pendingAssignments = assignments.filter(a => a.status !== 'Closed').slice(0, 3);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Hey {user?.name?.split(' ')[0]}, welcome back! 👋</div>
        <div className="page-subtitle">{me?.dept} • Semester {me?.semester}</div>
      </div>

      <div className="grid grid-4 mb-6">
        <StatCard label="Attendance" value={`${me?.attendance}%`} icon={CalendarCheck} color={me?.attendance >= 85 ? '#10B981' : '#F59E0B'} />
        <StatCard label="Current CGPA" value={me?.cgpa} icon={Award} color="#4F46E5" />
        <StatCard label="Pending Assignments" value={pendingAssignments.length} icon={FileText} color="#F59E0B" />
        <StatCard label="Fee Status" value={me?.fees} icon={DollarSign} color={me?.fees === 'Paid' ? '#10B981' : '#EF4444'} />
      </div>

      <div className="grid grid-2 mb-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} color="var(--primary)" />
            <div style={{ fontWeight: 700, fontSize: 15 }}>Upcoming Classes Today</div>
          </div>
          {todaysClasses.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {todaysClasses.map((c, i) => (
                <div key={i} className="flex items-center gap-3" style={{ padding: '10px 12px', background: 'var(--bg)', borderRadius: 8 }}>
                  <div style={{ width: 4, height: 32, borderRadius: 4, background: '#4F46E5' }} />
                  <div style={{ flex: 1 }}>
                    <div className="font-semibold text-sm">{c.subject}</div>
                    <div className="text-xs text-muted">{c.faculty} • {c.room}</div>
                  </div>
                  <span className="text-sm font-semibold">{c.time}</span>
                </div>
              ))}
            </div>
          ) : <div className="text-sm text-muted">No classes scheduled today.</div>}
          <button className="btn btn-secondary w-full mt-4" onClick={() => navigate('/student/timetable')}>View Full Timetable</button>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} color="var(--primary)" />
            <div style={{ fontWeight: 700, fontSize: 15 }}>Assignments Due</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pendingAssignments.map(a => (
              <div key={a.id} className="flex justify-between items-center" style={{ padding: '10px 12px', background: 'var(--bg)', borderRadius: 8 }}>
                <div>
                  <div className="font-semibold text-sm">{a.title}</div>
                  <div className="text-xs text-muted">{a.course} • Due {new Date(a.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                </div>
                <Badge type={a.status === 'Due Today' ? 'warning' : 'primary'}>{a.status}</Badge>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary w-full mt-4" onClick={() => navigate('/student/assignments')}>View All Assignments</button>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card p-6">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Attendance Progress</div>
          <div className="text-sm text-muted mb-4">Minimum 75% required to be exam-eligible</div>
          <ProgressBar value={me?.attendance} color={me?.attendance >= 85 ? '#10B981' : me?.attendance >= 75 ? '#F59E0B' : '#EF4444'} height={10} />
          <div className="flex justify-between mt-2 text-sm"><span className="text-muted">Current</span><span className="font-semibold">{me?.attendance}%</span></div>
        </div>

        <div className="card p-6">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Latest Notices</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {notices.slice(0, 3).map(n => (
              <div key={n.id} className="flex items-start gap-2">
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F46E5', marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div className="text-sm font-semibold">{n.title}</div>
                  <div className="text-xs text-muted">{new Date(n.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary w-full mt-4" onClick={() => navigate('/student/notices')}>View All Notices</button>
        </div>
      </div>
    </div>
  );
}
