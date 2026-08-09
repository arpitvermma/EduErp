import { useApp } from '../../context/AppContext';
import { StatCard, Avatar, Badge, ProgressBar } from '../../components/ui';
import { Users, FileText, CalendarCheck, Clock, BookOpen } from 'lucide-react';
import { TIMETABLE } from '../../data/mockData';

export default function FacultyDashboard() {
  const { user, students, assignments } = useApp();
  const today = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][new Date().getDay() - 1] || 'Monday';
  const todaysClasses = TIMETABLE[today] || [];
  const myAssignments = assignments.slice(0, 3);
  const topStudents = students.slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Welcome, {user?.name?.split(' ').slice(-1)[0]} 👋</div>
        <div className="page-subtitle">Here's your teaching overview for today</div>
      </div>

      <div className="grid grid-4 mb-6">
        <StatCard label="Today's Classes" value={todaysClasses.length} icon={Clock} color="#4F46E5" />
        <StatCard label="Total Students" value={130} icon={Users} color="#0EA5E9" />
        <StatCard label="Pending Assignments" value={myAssignments.filter(a => a.status !== 'Closed').length} icon={FileText} color="#F59E0B" />
        <StatCard label="Avg. Class Attendance" value="89%" icon={CalendarCheck} color="#10B981" />
      </div>

      <div className="grid grid-2 mb-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} color="var(--primary)" />
            <div style={{ fontWeight: 700, fontSize: 15 }}>Today's Classes ({today})</div>
          </div>
          {todaysClasses.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {todaysClasses.map((c, i) => (
                <div key={i} className="flex items-center gap-3" style={{ padding: '10px 12px', background: 'var(--bg)', borderRadius: 8 }}>
                  <div style={{ width: 4, height: 32, borderRadius: 4, background: '#4F46E5' }} />
                  <div style={{ flex: 1 }}>
                    <div className="font-semibold text-sm">{c.subject}</div>
                    <div className="text-xs text-muted">{c.room}</div>
                  </div>
                  <span className="text-sm font-semibold">{c.time}</span>
                </div>
              ))}
            </div>
          ) : <div className="text-sm text-muted">No classes scheduled today.</div>}
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} color="var(--primary)" />
            <div style={{ fontWeight: 700, fontSize: 15 }}>Pending Assignments</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myAssignments.map(a => (
              <div key={a.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm">{a.title}</span>
                  <Badge type={a.status === 'Due Today' ? 'warning' : 'primary'}>{a.status}</Badge>
                </div>
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>{a.submissions}/{a.total} submitted</span>
                </div>
                <ProgressBar value={a.submissions} max={a.total} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users size={16} color="var(--primary)" />
          <div style={{ fontWeight: 700, fontSize: 15 }}>Student Performance Snapshot</div>
        </div>
        <table className="table">
          <thead><tr><th>Student</th><th>Department</th><th>CGPA</th><th>Attendance</th></tr></thead>
          <tbody>
            {topStudents.map(s => (
              <tr key={s.id}>
                <td><div className="flex items-center gap-3"><Avatar name={s.name} size={32} /><span className="font-semibold">{s.name}</span></div></td>
                <td>{s.dept}</td>
                <td>{s.cgpa}</td>
                <td><Badge type={s.attendance >= 85 ? 'success' : 'warning'}>{s.attendance}%</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
