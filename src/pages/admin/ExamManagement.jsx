import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge, EmptyState } from '../../components/ui';
import { Plus, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExamManagement() {
  const { exams, addExam, deleteExam, courses } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openAdd = () => {
    setForm({ name: '', course: courses[0]?.id, date: '', time: '10:00 AM', duration: '3 hours', hall: '', maxMarks: 100, type: 'Theory' });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.date) { toast.error('Exam name and date required'); return; }
    addExam({ ...form, id: Date.now() });
    toast.success('Exam scheduled successfully');
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteExam(id);
    toast.success('Exam removed');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Examinations</div>
          <div className="page-subtitle">Schedule and manage exam timetables</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Schedule Exam</button>
      </div>

      {exams.length === 0 ? (
        <div className="card"><EmptyState icon="📝" title="No exams scheduled" /></div>
      ) : (
        <div className="grid grid-2">
          {exams.map(e => (
            <div key={e.id} className="card p-6">
              <div className="flex justify-between items-start mb-3">
                <Badge type={e.type === 'Theory' ? 'primary' : 'secondary'}>{e.type}</Badge>
                <button className="btn btn-icon btn-secondary btn-sm" onClick={() => setDeleteConfirm(e)}><Trash2 size={13} color="var(--danger)" /></button>
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{e.name}</div>
              <div className="text-sm text-muted mb-4">Course: {e.course} • Max Marks: {e.maxMarks}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div className="flex items-center gap-2 text-sm"><Calendar size={14} color="var(--primary)" /> {new Date(e.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                <div className="flex items-center gap-2 text-sm"><Clock size={14} color="var(--primary)" /> {e.time} ({e.duration})</div>
                <div className="flex items-center gap-2 text-sm"><MapPin size={14} color="var(--primary)" /> {e.hall}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule New Exam"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Schedule Exam</button>
        </>}
      >
        <div className="form-group">
          <label className="form-label">Exam Name</label>
          <input className="form-control" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="End Semester Exam - CS601" />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Course</label>
            <select className="form-control" value={form.course || ''} onChange={e => setForm({ ...form, course: e.target.value })}>
              {courses.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Exam Type</label>
            <select className="form-control" value={form.type || 'Theory'} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>Theory</option>
              <option>Practical</option>
            </select>
          </div>
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Time</label>
            <input className="form-control" value={form.time || ''} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="10:00 AM" />
          </div>
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Duration</label>
            <input className="form-control" value={form.duration || ''} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="3 hours" />
          </div>
          <div className="form-group">
            <label className="form-label">Max Marks</label>
            <input type="number" className="form-control" value={form.maxMarks || 100} onChange={e => setForm({ ...form, maxMarks: Number(e.target.value) })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Exam Hall</label>
          <input className="form-control" value={form.hall || ''} onChange={e => setForm({ ...form, hall: e.target.value })} placeholder="Hall A" />
        </div>
      </Modal>

      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Cancel Exam"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Keep Exam</button>
          <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)}>Cancel Exam</button>
        </>}
      >
        <p>Are you sure you want to cancel <strong>{deleteConfirm?.name}</strong>?</p>
      </Modal>
    </div>
  );
}
