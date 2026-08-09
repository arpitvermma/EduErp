import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Avatar, Badge, SearchInput, EmptyState } from '../../components/ui';
import { Plus, Edit2, Trash2, Eye, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const avatarColors = ['#4F46E5','#0EA5E9','#F59E0B','#10B981','#EF4444','#8B5CF6'];

export default function FacultyManagement() {
  const { faculty, addFaculty, updateFaculty, deleteFaculty, departments } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = faculty.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || f.dept === deptFilter;
    return matchSearch && matchDept;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ id: '', name: '', email: '', dept: departments[0]?.name, designation: 'Assistant Professor', subjects: '', experience: 0, phone: '', qualification: '' });
    setModalOpen(true);
  };

  const openEdit = (f) => {
    setEditing(f.id);
    setForm({ ...f, subjects: f.subjects.join(', ') });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.id) { toast.error('Name and ID are required'); return; }
    const avatar = form.name.split(' ').filter(w => w !== 'Dr.' && w !== 'Prof.').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const subjectsArr = typeof form.subjects === 'string' ? form.subjects.split(',').map(s => s.trim()).filter(Boolean) : form.subjects;
    if (editing) {
      updateFaculty(editing, { ...form, avatar, subjects: subjectsArr });
      toast.success('Faculty updated successfully');
    } else {
      if (faculty.some(f => f.id === form.id)) { toast.error('Faculty ID already exists'); return; }
      addFaculty({ ...form, avatar, subjects: subjectsArr, status: 'Active' });
      toast.success('Faculty added successfully');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteFaculty(id);
    toast.success('Faculty removed');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Faculty</div>
          <div className="page-subtitle">{filtered.length} of {faculty.length} faculty members shown</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Faculty</button>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex gap-3 items-center" style={{ flexWrap: 'wrap' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name or ID..." />
          <select className="form-control" style={{ width: 220 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            <option value="All">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon="👨‍🏫" title="No faculty found" description="Try adjusting your search or filters" /></div>
      ) : (
        <div className="grid grid-3">
          {filtered.map((f, i) => (
            <div key={f.id} className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={f.name} size={48} color={avatarColors[i % avatarColors.length]} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="font-semibold truncate">{f.name}</div>
                  <div className="text-xs text-muted">{f.id}</div>
                </div>
              </div>
              <Badge type="primary">{f.designation}</Badge>
              <div className="text-sm text-muted mt-4" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div>{f.dept}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={12} />{f.email}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={12} />{f.phone}</div>
              </div>
              <div className="mt-4" style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {f.subjects.slice(0, 3).map(s => <span key={s} className="chip">{s}</span>)}
              </div>
              <div className="flex gap-2 mt-4">
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setViewModal(f)}><Eye size={13} /> View</button>
                <button className="btn btn-secondary btn-sm btn-icon" onClick={() => openEdit(f)}><Edit2 size={13} /></button>
                <button className="btn btn-secondary btn-sm btn-icon" onClick={() => setDeleteConfirm(f)}><Trash2 size={13} color="var(--danger)" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Faculty' : 'Add New Faculty'}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Save Changes' : 'Add Faculty'}</button>
        </>}
      >
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Faculty ID</label>
            <input className="form-control" value={form.id || ''} disabled={!!editing} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="FAC007" />
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-control" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. Jane Doe" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-control" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="faculty@edumail.com" />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Department</label>
            <select className="form-control" value={form.dept || ''} onChange={e => setForm({ ...form, dept: e.target.value })}>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Designation</label>
            <select className="form-control" value={form.designation || ''} onChange={e => setForm({ ...form, designation: e.target.value })}>
              <option>Assistant Professor</option>
              <option>Associate Professor</option>
              <option>Professor</option>
              <option>HOD & Professor</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Subjects Taught (comma-separated)</label>
          <input className="form-control" value={form.subjects || ''} onChange={e => setForm({ ...form, subjects: e.target.value })} placeholder="Data Structures, Algorithms" />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Experience (years)</label>
            <input type="number" className="form-control" value={form.experience || 0} onChange={e => setForm({ ...form, experience: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-control" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="9812345678" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Qualification</label>
          <input className="form-control" value={form.qualification || ''} onChange={e => setForm({ ...form, qualification: e.target.value })} placeholder="Ph.D. Computer Science" />
        </div>
      </Modal>

      <Modal open={!!viewModal} onClose={() => setViewModal(null)} title="Faculty Profile">
        {viewModal && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Avatar name={viewModal.name} size={56} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{viewModal.name}</div>
                <div className="text-sm text-muted">{viewModal.designation} • {viewModal.dept}</div>
              </div>
            </div>
            <div className="grid grid-2 gap-3">
              <div className="card p-4"><div className="text-xs text-muted">Email</div><div className="font-semibold text-sm">{viewModal.email}</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Phone</div><div className="font-semibold text-sm">{viewModal.phone}</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Experience</div><div className="font-semibold text-sm">{viewModal.experience} years</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Qualification</div><div className="font-semibold text-sm">{viewModal.qualification}</div></div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-muted mb-2">Subjects Taught</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {viewModal.subjects.map(s => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Remove Faculty"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)}>Remove Faculty</button>
        </>}
      >
        <p>Are you sure you want to remove <strong>{deleteConfirm?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
