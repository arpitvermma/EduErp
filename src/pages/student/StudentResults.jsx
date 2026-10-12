import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui';
import { RESULTS } from '../../data/mockData';
import { Download, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const gradePoints = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C': 6, 'F': 0 };
const gradeType = { 'A+': 'success', 'A': 'success', 'B+': 'primary', 'B': 'warning', 'C': 'warning', 'F': 'danger' };

export default function StudentResults() {
  const { user, students } = useApp();
  const me = students.find(s => s.id === user?.id) || students[0];

  const totalCredits = RESULTS.reduce((s, r) => s + r.credits, 0);
  const weightedSum = RESULTS.reduce((s, r) => s + gradePoints[r.grade] * r.credits, 0);
  const sgpa = (weightedSum / totalCredits).toFixed(2);

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">My Results</div>
          <div className="page-subtitle">Semester {me?.semester} Result Summary</div>
        </div>
        <button className="btn btn-primary" onClick={() => toast.success('Result downloaded (mock)')}><Download size={15} /> Download Result</button>
      </div>

      <div className="grid grid-4 mb-6">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EEF2FF' }}><Award size={20} color="#4F46E5" /></div>
          <div><div className="stat-value">{sgpa}</div><div className="stat-label">SGPA This Semester</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5' }}><span style={{fontSize:20}}>🎓</span></div>
          <div><div className="stat-value">{me?.cgpa}</div><div className="stat-label">Overall CGPA</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FFFBEB' }}><span style={{fontSize:20}}>📘</span></div>
          <div><div className="stat-value">{totalCredits}</div><div className="stat-label">Total Credits</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF2F2' }}><span style={{fontSize:20}}>✅</span></div>
          <div><div className="stat-value">Pass</div><div className="stat-label">Result Status</div></div>
        </div>
      </div>

      <div className="card">
        <div className="p-4" style={{ borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 15 }}>Subject-Wise Performance</div>
        <table className="table">
          <thead><tr><th>Subject</th><th>Code</th><th>Internal (40)</th><th>External (60)</th><th>Total</th><th>Credits</th><th>Grade</th></tr></thead>
          <tbody>
            {RESULTS.map(r => (
              <tr key={r.code}>
                <td className="font-semibold">{r.subject}</td>
                <td className="text-sm text-muted">{r.code}</td>
                <td>{r.internal}</td>
                <td>{r.external}</td>
                <td className="font-semibold">{r.total}/{r.max}</td>
                <td>{r.credits}</td>
                <td><Badge type={gradeType[r.grade]}>{r.grade}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
