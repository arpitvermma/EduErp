import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge, ProgressBar } from '../../components/ui';
import { Plus, FileText, Calendar, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyAssignments() {
  const { assignments, setAssignments, courses } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  const statusType = { 'Active': 'primary', 'Due Today': 'warning', 'Closed': 'success' };

  const handleAdd = () => {
    if (!form.title || !form.dueDate) { toast.error('Title and due date required'); return; }
    setAssignments(prev => [...prev, { ...form, id: Date.now(), submissions: 0, total: 65, status: 'Active' }]);
    toast.success('Assignment uploaded successfully');
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
    toast.success('Assignment removed');
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">My Assignments</div>
          <div className="page-subtitle">Upload and manage assignments for your courses</div>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm({ title: '', course: courses[0]?.id, faculty: 'You', dueDate: '', marks: 20 }); setModalOpen(true); }}>
          <Plus size={16} /> Upload Assignment
        </button>
      </div>

      <div className="grid grid-2">
        {assignments.map(a => (
          <div key={a.id} className="card p-6">
            <div className="flex justify-between items-start mb-3">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} color="var(--primary)" />
              </div>
              <div className="flex gap-2">
                <Badge type={statusType[a.status]}>{a.status}</Badge>
                <button className="btn btn-icon btn-secondary btn-sm" onClick={() => handleDelete(a.id)}><Trash2 size={13} color="var(--danger)" /></button>
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{a.title}</div>
            <div className="text-sm text-muted mb-3">{a.course} • {a.marks} marks</div>
            <div className="flex items-center gap-2 text-sm mb-3"><Calendar size={13} /> Due: {new Date(a.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
            <div>
              <div className="flex justify-between text-xs text-muted mb-1"><span>Submissions</span><span>{a.submissions}/{a.total}</span></div>
              <ProgressBar value={a.submissions} max={a.total} />
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload New Assignment"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAdd}>Upload Assignment</button>
        </>}
      >
        <div className="form-group">
          <label className="form-label">Assignment Title</label>
          <input className="form-control" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Course</label>
            <select className="form-control" value={form.course || ''} onChange={e => setForm({ ...form, course: e.target.value })}>
              {courses.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Total Marks</label>
            <input type="number" className="form-control" value={form.marks || 20} onChange={e => setForm({ ...form, marks: Number(e.target.value) })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Deadline</label>
          <input type="date" className="form-control" value={form.dueDate || ''} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">File Upload</label>
          <div style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            Drop assignment file here or click to browse (mock)
          </div>
        </div>
      </Modal>
    </div>
  );
}
