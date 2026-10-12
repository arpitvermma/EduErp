import { useApp } from '../../context/AppContext';
import { Badge, ProgressBar } from '../../components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ATTENDANCE_DATA } from '../../data/mockData';

const SUBJECT_ATTENDANCE = [
  { subject: 'Data Structures', code: 'CS301', attended: 42, total: 48 },
  { subject: 'Database Management', code: 'CS302', attended: 45, total: 48 },
  { subject: 'Operating Systems', code: 'CS401', attended: 38, total: 46 },
  { subject: 'Mathematics III', code: 'MA301', attended: 40, total: 44 },
  { subject: 'Machine Learning', code: 'CS501', attended: 35, total: 42 },
];

export default function StudentAttendance() {
  const { user, students } = useApp();
  const me = students.find(s => s.id === user?.id) || students[0];

  return (
    <div>
      <div className="page-header">
        <div className="page-title">My Attendance</div>
        <div className="page-subtitle">Track your subject-wise and overall attendance</div>
      </div>

      <div className="grid grid-3 mb-6">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: me?.attendance >= 75 ? '#ECFDF5' : '#FEF2F2' }}>
            <span style={{fontSize:20}}>{me?.attendance >= 75 ? '✅' : '⚠️'}</span>
          </div>
          <div><div className="stat-value">{me?.attendance}%</div><div className="stat-label">Overall Attendance</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EEF2FF' }}><span style={{fontSize:20}}>📚</span></div>
          <div><div className="stat-value">5</div><div className="stat-label">Subjects Tracked</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FFFBEB' }}><span style={{fontSize:20}}>🎯</span></div>
          <div><div className="stat-value">75%</div><div className="stat-label">Required Minimum</div></div>
        </div>
      </div>

      {me?.attendance < 75 && (
        <div className="card p-4 mb-6" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
          <div className="font-semibold text-danger">⚠️ Attendance Alert</div>
          <div className="text-sm" style={{ color: '#991B1B', marginTop: 4 }}>Your attendance has fallen below the required 75% threshold. You may not be eligible for exams. Please contact your department.</div>
        </div>
      )}

      <div className="card p-6 mb-6">
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Monthly Trend</div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={ATTENDANCE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
            <Tooltip />
            <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} name="Present %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 15 }}>Subject-Wise Attendance</div>
        <table className="table">
          <thead><tr><th>Subject</th><th>Classes Attended</th><th>Percentage</th><th>Status</th></tr></thead>
          <tbody>
            {SUBJECT_ATTENDANCE.map(s => {
              const pct = Math.round((s.attended / s.total) * 100);
              return (
                <tr key={s.code}>
                  <td><div className="font-semibold">{s.subject}</div><div className="text-xs text-muted">{s.code}</div></td>
                  <td>{s.attended}/{s.total}</td>
                  <td style={{ minWidth: 160 }}>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={pct} color={pct >= 85 ? '#10B981' : pct >= 75 ? '#F59E0B' : '#EF4444'} />
                      <span className="text-sm font-semibold">{pct}%</span>
                    </div>
                  </td>
                  <td><Badge type={pct >= 75 ? 'success' : 'danger'}>{pct >= 75 ? 'Eligible' : 'At Risk'}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
