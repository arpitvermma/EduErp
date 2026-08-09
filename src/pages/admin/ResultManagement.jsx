import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar, Badge } from '../../components/ui';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const GRADE_DIST = [
  { grade: 'A+', count: 28 },
  { grade: 'A', count: 45 },
  { grade: 'B+', count: 38 },
  { grade: 'B', count: 22 },
  { grade: 'C', count: 10 },
  { grade: 'F', count: 3 },
];

const gradeColor = { 'A+': 'success', 'A': 'success', 'B+': 'primary', 'B': 'warning', 'C': 'warning', 'F': 'danger' };

export default function ResultManagement() {
  const { students } = useApp();

  const topPerformers = [...students].sort((a, b) => b.cgpa - a.cgpa).slice(0, 5);

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Result Management</div>
          <div className="page-subtitle">Semester results, grade analytics, and performance tracking</div>
        </div>
        <button className="btn btn-primary" onClick={() => toast.success('Results published (mock)')}><Download size={15} /> Publish Results</button>
      </div>

      <div className="grid grid-4 mb-6">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EEF2FF' }}><span style={{fontSize:20}}>📈</span></div>
          <div><div className="stat-value">8.4</div><div className="stat-label">Average CGPA</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5' }}><span style={{fontSize:20}}>🎯</span></div>
          <div><div className="stat-value">96.8%</div><div className="stat-label">Pass Percentage</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FFFBEB' }}><span style={{fontSize:20}}>🏆</span></div>
          <div><div className="stat-value">28</div><div className="stat-label">A+ Grade Holders</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF2F2' }}><span style={{fontSize:20}}>⚠️</span></div>
          <div><div className="stat-value">3</div><div className="stat-label">Students Failed</div></div>
        </div>
      </div>

      <div className="grid grid-2 mb-6">
        <div className="card p-6">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Grade Distribution</div>
          <div className="text-sm text-muted mb-4">Across all students this semester</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={GRADE_DIST}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="grade" tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} color="var(--primary)" />
            <div style={{ fontWeight: 700, fontSize: 15 }}>Top Performers</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topPerformers.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: i === 0 ? '#FDE68A' : 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                  {i + 1}
                </div>
                <Avatar name={s.name} size={32} />
                <div style={{ flex: 1 }}>
                  <div className="font-semibold text-sm">{s.name}</div>
                  <div className="text-xs text-muted">{s.dept}</div>
                </div>
                <Badge type="success">{s.cgpa} CGPA</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 15 }}>Student Results Summary</div>
        <table className="table">
          <thead><tr><th>Student</th><th>Department</th><th>Semester</th><th>CGPA</th><th>Status</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={s.name} size={32} />
                    <div><div className="font-semibold">{s.name}</div><div className="text-xs text-muted">{s.id}</div></div>
                  </div>
                </td>
                <td>{s.dept}</td>
                <td>Sem {s.semester}</td>
                <td className="font-semibold">{s.cgpa}</td>
                <td><Badge type={s.cgpa >= 8 ? 'success' : s.cgpa >= 6 ? 'warning' : 'danger'}>{s.cgpa >= 8 ? 'Excellent' : s.cgpa >= 6 ? 'Good' : 'Needs Improvement'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
