import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge, SearchInput, EmptyState } from '../../components/ui';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CourseManagement() {
  const { courses, addCourse, updateCourse, deleteCourse, departments, faculty } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = courses.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || c.dept === deptFilter;
    return matchSearch && matchDept;
  });

  const openAdd = () => {
    setEditing(null);
    setForm({ id: '', name: '', dept: departments[0]?.name, credits: 3, semester: 1, faculty: faculty[0]?.name, type: 'Core', enrolled: 0 });
    setModalOpen(true);
  };

  const openEdit = (c) => {
    setEditing(c.id);
    setForm(c);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.id) { toast.error('Course name and code required'); return; }
    if (editing) {
      updateCourse(editing, form);
      toast.success('Course updated');
    } else {
      if (courses.some(c => c.id === form.id)) { toast.error('Course code already exists'); return; }
      addCourse(form);
      toast.success('Course added');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteCourse(id);
    toast.success('Course removed');
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Courses</div>
          <div className="page-subtitle">{filtered.length} of {courses.length} courses shown</div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Course</button>
      </div>

      <div className="card p-4 mb-4">
        <div className="flex gap-3 items-center" style={{ flexWrap: 'wrap' }}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search courses..." />
          <select className="form-control" style={{ width: 220 }} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            <option value="All">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <EmptyState icon="📚" title="No courses found" />
        ) : (
          <table className="table">
            <thead>
              <tr><th>Code</th><th>Course Name</th><th>Department</th><th>Credits</th><th>Semester</th><th>Faculty</th><th>Type</th><th>Enrolled</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td className="font-semibold">{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.dept}</td>
                  <td>{c.credits}</td>
                  <td>Sem {c.semester}</td>
                  <td>{c.faculty}</td>
                  <td><Badge type={c.type === 'Core' ? 'primary' : 'secondary'}>{c.type}</Badge></td>
                  <td>{c.enrolled}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-icon btn-secondary btn-sm" onClick={() => openEdit(c)}><Edit2 size={14} /></button>
                      <button className="btn btn-icon btn-secondary btn-sm" onClick={() => setDeleteConfirm(c)}><Trash2 size={14} color="var(--danger)" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Course' : 'Add New Course'}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>{editing ? 'Save Changes' : 'Add Course'}</button>
        </>}
      >
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Course Code</label>
            <input className="form-control" value={form.id || ''} disabled={!!editing} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="CS601" />
          </div>
          <div className="form-group">
            <label className="form-label">Course Name</label>
            <input className="form-control" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Cloud Computing" />
          </div>
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Department</label>
            <select className="form-control" value={form.dept || ''} onChange={e => setForm({ ...form, dept: e.target.value })}>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Assigned Faculty</label>
            <select className="form-control" value={form.faculty || ''} onChange={e => setForm({ ...form, faculty: e.target.value })}>
              {faculty.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-3">
          <div className="form-group">
            <label className="form-label">Credits</label>
            <input type="number" className="form-control" value={form.credits || 3} onChange={e => setForm({ ...form, credits: Number(e.target.value) })} />
          </div>
          <div className="form-group">
            <label className="form-label">Semester</label>
            <select className="form-control" value={form.semester || 1} onChange={e => setForm({ ...form, semester: Number(e.target.value) })}>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-control" value={form.type || 'Core'} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>Core</option>
              <option>Elective</option>
            </select>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Remove Course"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.id)}>Remove Course</button>
        </>}
      >
        <p>Are you sure you want to remove <strong>{deleteConfirm?.name}</strong>?</p>
      </Modal>
    </div>
  );
}
