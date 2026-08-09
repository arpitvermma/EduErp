import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../../components/ui';
import { Check, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyAttendance() {
  const { students, courses } = useApp();
  const [course, setCourse] = useState(courses[0]?.id);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [attendance, setAttendance] = useState(() => {
    const init = {};
    students.forEach(s => init[s.id] = 'present');
    return init;
  });

  const toggle = (id, status) => setAttendance(prev => ({ ...prev, [id]: status }));

  const markAll = (status) => {
    const updated = {};
    students.forEach(s => updated[s.id] = status);
    setAttendance(updated);
  };

  const presentCount = Object.values(attendance).filter(v => v === 'present').length;

  const handleSubmit = () => {
    toast.success(`Attendance saved for ${students.length} students (${presentCount} present)`);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Take Attendance</div>
        <div className="page-subtitle">Mark daily attendance for your class</div>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex gap-3 items-center" style={{ flexWrap: 'wrap' }}>
          <select className="form-control" style={{ width: 240 }} value={course} onChange={e => setCourse(e.target.value)}>
            {courses.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
          </select>
          <input type="date" className="form-control" style={{ width: 180 }} value={date} onChange={e => setDate(e.target.value)} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary btn-sm" onClick={() => markAll('present')}>Mark All Present</button>
            <button className="btn btn-secondary btn-sm" onClick={() => markAll('absent')}>Mark All Absent</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center p-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Class Roster</span>
          <span className="badge badge-success">{presentCount} Present / {students.length - presentCount} Absent</span>
        </div>
        <table className="table">
          <thead><tr><th>Student</th><th>ID</th><th>Status</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td><div className="flex items-center gap-3"><Avatar name={s.name} size={32} /><span className="font-semibold">{s.name}</span></div></td>
                <td className="text-sm text-muted">{s.id}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm"
                      style={{ background: attendance[s.id] === 'present' ? 'var(--success)' : 'var(--surface)', color: attendance[s.id] === 'present' ? 'white' : 'var(--text)', border: '1px solid var(--border)' }}
                      onClick={() => toggle(s.id, 'present')}
                    ><Check size={13} /> Present</button>
                    <button
                      className="btn btn-sm"
                      style={{ background: attendance[s.id] === 'absent' ? 'var(--danger)' : 'var(--surface)', color: attendance[s.id] === 'absent' ? 'white' : 'var(--text)', border: '1px solid var(--border)' }}
                      onClick={() => toggle(s.id, 'absent')}
                    ><X size={13} /> Absent</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="btn btn-primary btn-lg" onClick={handleSubmit}><Save size={16} /> Save Attendance</button>
      </div>
    </div>
  );
}
