import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../../components/ui';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyResults() {
  const { students, courses } = useApp();
  const [course, setCourse] = useState(courses[0]?.id);
  const [marks, setMarks] = useState(() => {
    const init = {};
    students.forEach(s => init[s.id] = { internal: '', external: '' });
    return init;
  });

  const update = (id, field, value) => {
    setMarks(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleSave = () => {
    const filled = Object.values(marks).filter(m => m.internal || m.external).length;
    toast.success(`Marks saved for ${filled} students`);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Enter Marks</div>
        <div className="page-subtitle">Record internal and external assessment marks</div>
      </div>

      <div className="card p-4 mb-4">
        <select className="form-control" style={{ width: 280 }} value={course} onChange={e => setCourse(e.target.value)}>
          {courses.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
        </select>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Student</th><th>Internal (40)</th><th>External (60)</th><th>Total</th><th>Grade</th></tr></thead>
          <tbody>
            {students.map(s => {
              const internal = Number(marks[s.id]?.internal) || 0;
              const external = Number(marks[s.id]?.external) || 0;
              const total = internal + external;
              const grade = total >= 90 ? 'A+' : total >= 80 ? 'A' : total >= 70 ? 'B+' : total >= 60 ? 'B' : total >= 50 ? 'C' : total > 0 ? 'F' : '-';
              return (
                <tr key={s.id}>
                  <td><div className="flex items-center gap-3"><Avatar name={s.name} size={32} /><span className="font-semibold">{s.name}</span></div></td>
                  <td><input type="number" max={40} className="form-control" style={{ width: 90 }} value={marks[s.id]?.internal} onChange={e => update(s.id, 'internal', e.target.value)} /></td>
                  <td><input type="number" max={60} className="form-control" style={{ width: 90 }} value={marks[s.id]?.external} onChange={e => update(s.id, 'external', e.target.value)} /></td>
                  <td className="font-semibold">{total > 0 ? total : '-'}</td>
                  <td className="font-semibold">{grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="btn btn-primary btn-lg" onClick={handleSave}><Save size={16} /> Save Marks</button>
      </div>
    </div>
  );
}
