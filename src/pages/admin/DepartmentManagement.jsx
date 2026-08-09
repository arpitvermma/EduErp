import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/ui';
import { Plus, Edit2, Trash2, Users, UserCheck, BookOpen, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DepartmentManagement() {
  const { departments, setDepartments } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', code: '', hod: '', students: 0, faculty: 0, courses: 0, color: '#4F46E5' });
    setModalOpen(true);
  };

  const openEdit = (d) => {
    setEditing(d.id);
    setForm(d);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.code) { toast.error('Department name and code required'); return; }
    if (editing) {
      setDepartments(prev => prev.map(d => d.id === editing ? { ...d, ...form } : d));
      toast.success('Department updated');
    } else {
      setDepartments(prev => [...prev, { ...form, id: Date.now() }]);
      toast.success('Department created');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
    toast.success('Department removed');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Departments</div>
          <div className="page-subtitle">{departments.length} departments across the college</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Create Department</button>
      </div>

      <div className="grid grid-3">
        {departments.map(d => (
          <div key={d.id} className="card p-6">
            <div className="flex justify-between items-center mb-3">
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${d.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: d.color }}>
                {d.code}
              </div>
              <div className="flex gap-2">
                <button className="btn btn-icon btn-secondary btn-sm" onClick={() => openEdit(d)}><Edit2 size={13} /></button>
                <button className="btn btn-icon btn-secondary btn-sm" onClick={() => setDeleteConfirm(d)}><Trash2 size={13} color="var(--danger)" /></button>
              </div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{d.name}</div>
            <div className="text-sm text-muted mb-4">HOD: {d.hod}</div>
            <div className="grid grid-3" style={{ gap: 8 }}>
              <div style={{ textAlign: 'center', padding: '8px 4px', background: 'var(--bg)', borderRadius: 8 }}>
                <Users size={14} style={{ marginBottom: 4 }} color={d.color} />
                <div style={{ fontWeight: 700, fontSize: 14 }}>{d.students}</div>
                <div className="text-xs text-muted">Students</div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px 4px', background: 'var(--bg)', borderRadius: 8 }}>
                <UserCheck size={14} style={{ marginBottom: 4 }} color={d.color} />
                <div style={{ fontWeight: 700, fontSize: 14 }}>{d.faculty}</div>
                <div className="text-xs text-muted">Faculty</div>
              </div>
              <div style={{ textAlign: 'center', padding: '8px 4px', background: 'var(--bg)', borderRadius: 8 }}>
                <BookOpen size={14} style={{ marginBottom: 4 }} color={d.color} />
                <div style={{ fontWeight: 700, fontSize: 14 }}>{d.courses}</div>
                <div className="text-xs text-muted">Courses</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Department' : 'Create Department'}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Save Changes' : 'Create Department'}</button>
        </>}
      >
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Department Name</label>
            <input className="form-control" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Computer Science" />
          </div>
          <div className="form-group">
            <label className="form-label">Department Code</label>
            <input className="form-control" value={form.code || ''} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="CS" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Head of Department</label>
          <input className="form-control" value={form.hod || ''} onChange={e => setForm({ ...form, hod: e.target.value })} placeholder="Dr. Jane Doe" />
        </div>
        <div className="form-group">
          <label className="form-label">Theme Color</label>
          <input type="color" className="form-control" style={{ height: 42, padding: 4 }} value={form.color || '#4F46E5'} onChange={e => setForm({ ...form, color: e.target.value })} />
        </div>
      </Modal>

      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Department"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)}>Delete Department</button>
        </>}
      >
        <p>Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? All associated data may be affected.</p>
      </Modal>
    </div>
  );
}
