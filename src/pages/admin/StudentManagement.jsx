import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Avatar, Badge, SearchInput, EmptyState } from '../../components/ui';
import { Plus, Edit2, Trash2, Eye, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const avatarColors = ['#4F46E5','#0EA5E9','#F59E0B','#10B981','#EF4444','#8B5CF6'];

export default function StudentManagement() {
  const { students, addStudent, updateStudent, deleteStudent, departments } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [semFilter, setSemFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || s.dept === deptFilter;
    const matchSem = semFilter === 'All' || s.semester === Number(semFilter);
    return matchSearch && matchDept && matchSem;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ id: '', name: '', email: '', dept: departments[0]?.name, semester: 1, cgpa: 0, attendance: 100, fees: 'Paid', phone: '', avatar: '' });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditing(s.id);
    setForm(s);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.id) { toast.error('Name and ID are required'); return; }
    const avatar = form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    if (editing) {
      updateStudent(editing, { ...form, avatar });
      toast.success('Student updated successfully');
    } else {
      if (students.some(s => s.id === form.id)) { toast.error('Student ID already exists'); return; }
      addStudent({ ...form, avatar, status: 'Active', admYear: new Date().getFullYear() });
      toast.success('Student added successfully');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteStudent(id);
    toast.success('Student removed');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Students</div>
          <div className="page-subtitle">{filtered.length} of {students.length} students shown</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Student</button>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex gap-3 items-center" style={{ flexWrap: 'wrap' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name or ID..." />
          <select className="form-control" style={{ width: 200 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            <option value="All">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
          <select className="form-control" style={{ width: 150 }} value={semFilter} onChange={e => setSemFilter(e.target.value)}>
            <option value="All">All Semesters</option>
            {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <EmptyState icon="🎓" title="No students found" description="Try adjusting your search or filters" />
        ) : (
          <table className="table">
            <thead>
              <tr><th>Student</th><th>Department</th><th>Semester</th><th>CGPA</th><th>Attendance</th><th>Fees</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} color={avatarColors[i % avatarColors.length]} />
                      <div>
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-xs text-muted">{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{s.dept}</td>
                  <td>Sem {s.semester}</td>
                  <td className="font-semibold">{s.cgpa}</td>
                  <td>
                    <Badge type={s.attendance >= 85 ? 'success' : s.attendance >= 75 ? 'warning' : 'danger'}>{s.attendance}%</Badge>
                  </td>
                  <td>
                    <Badge type={s.fees === 'Paid' ? 'success' : s.fees === 'Pending' ? 'warning' : 'danger'}>{s.fees}</Badge>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-icon btn-secondary btn-sm" onClick={() => setViewModal(s)}><Eye size={14} /></button>
                      <button className="btn btn-icon btn-secondary btn-sm" onClick={() => openEdit(s)}><Edit2 size={14} /></button>
                      <button className="btn btn-icon btn-secondary btn-sm" onClick={() => setDeleteConfirm(s)}><Trash2 size={14} color="var(--danger)" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Student' : 'Add New Student'}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Save Changes' : 'Add Student'}</button>
        </>}
      >
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Student ID</label>
            <input className="form-control" value={form.id || ''} disabled={!!editing} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="CS2026001" />
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-control" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-control" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="student@edumail.com" />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Department</label>
            <select className="form-control" value={form.dept || ''} onChange={e => setForm({ ...form, dept: e.target.value })}>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Semester</label>
            <select className="form-control" value={form.semester || 1} onChange={e => setForm({ ...form, semester: Number(e.target.value) })}>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-control" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" />
          </div>
          <div className="form-group">
            <label className="form-label">Fee Status</label>
            <select className="form-control" value={form.fees || 'Paid'} onChange={e => setForm({ ...form, fees: e.target.value })}>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* View Profile Modal */}
      <Modal open={!!viewModal} onClose={() => setViewModal(null)} title="Student Profile">
        {viewModal && (
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Avatar name={viewModal.name} size={56} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{viewModal.name}</div>
                <div className="text-sm text-muted">{viewModal.id} • {viewModal.dept}</div>
              </div>
            </div>
            <div className="grid grid-2 gap-3">
              <div className="card p-4"><div className="text-xs text-muted">Email</div><div className="font-semibold text-sm">{viewModal.email}</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Phone</div><div className="font-semibold text-sm">{viewModal.phone}</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Semester</div><div className="font-semibold text-sm">Semester {viewModal.semester}</div></div>
              <div className="card p-4"><div className="text-xs text-muted">CGPA</div><div className="font-semibold text-sm">{viewModal.cgpa}</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Attendance</div><div className="font-semibold text-sm">{viewModal.attendance}%</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Fee Status</div><div className="font-semibold text-sm">{viewModal.fees}</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Date of Birth</div><div className="font-semibold text-sm">{viewModal.dob}</div></div>
              <div className="card p-4"><div className="text-xs text-muted">Address</div><div className="font-semibold text-sm">{viewModal.address}</div></div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Remove Student"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)}>Remove Student</button>
        </>}
      >
        <p>Are you sure you want to remove <strong>{deleteConfirm?.name}</strong> ({deleteConfirm?.id})? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
