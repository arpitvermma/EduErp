import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge, ProgressBar, Avatar } from '../../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ATTENDANCE_DATA } from '../../data/mockData';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AttendanceManagement() {
  const { students, departments } = useApp();
  const [deptFilter, setDeptFilter] = useState('All');

  const filtered = students.filter(s => deptFilter === 'All' || s.dept === deptFilter);
  const avgAttendance = (filtered.reduce((sum, s) => sum + s.attendance, 0) / (filtered.length || 1)).toFixed(1);
  const lowAttendance = filtered.filter(s => s.attendance < 75);

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Attendance Overview</div>
          <div className="page-subtitle">Track and monitor student attendance across departments</div>
        </div>
        <button className="btn btn-secondary" onClick={() => toast.success('Report downloaded (mock)')}><Download size={15} /> Export Report</button>
      </div>

      <div className="grid grid-4 mb-6">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EEF2FF' }}><span style={{fontSize:20}}>📊</span></div>
          <div><div className="stat-value">{avgAttendance}%</div><div className="stat-label">Average Attendance</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5' }}><span style={{fontSize:20}}>✅</span></div>
          <div><div className="stat-value">{filtered.filter(s => s.attendance >= 85).length}</div><div className="stat-label">Good Standing (85%+)</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF2F2' }}><span style={{fontSize:20}}>⚠️</span></div>
          <div><div className="stat-value">{lowAttendance.length}</div><div className="stat-label">Attendance Alerts (&lt;75%)</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FFFBEB' }}><span style={{fontSize:20}}>👥</span></div>
          <div><div className="stat-value">{filtered.length}</div><div className="stat-label">Total Students</div></div>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Monthly Attendance Trend</div>
        <div className="text-sm text-muted mb-4">Present vs absent across the academic year</div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ATTENDANCE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} name="Present %" />
            <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Absent %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex justify-between items-center">
            <div style={{ fontWeight: 700, fontSize: 15 }}>Subject-Wise Attendance Records</div>
            <select className="form-control" style={{ width: 200 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
              <option value="All">All Departments</option>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
        </div>
        <table className="table">
          <thead><tr><th>Student</th><th>Department</th><th>Attendance %</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={s.name} size={32} />
                    <div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-xs text-muted">{s.id}</div>
                    </div>
                  </div>
                </td>
                <td>{s.dept}</td>
                <td style={{ minWidth: 160 }}>
                  <div className="flex items-center gap-2">
                    <ProgressBar value={s.attendance} color={s.attendance >= 85 ? '#10B981' : s.attendance >= 75 ? '#F59E0B' : '#EF4444'} />
                    <span className="text-sm font-semibold">{s.attendance}%</span>
                  </div>
                </td>
                <td>
                  <Badge type={s.attendance >= 85 ? 'success' : s.attendance >= 75 ? 'warning' : 'danger'}>
                    {s.attendance >= 85 ? 'Good' : s.attendance >= 75 ? 'Average' : 'At Risk'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
