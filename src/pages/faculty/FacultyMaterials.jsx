import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, SearchInput, EmptyState } from '../../components/ui';
import { Plus, FileText, Download, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_MATERIALS = [
  { id: 1, title: 'Unit 1 - Introduction to Data Structures', course: 'CS301', type: 'PDF', size: '2.4 MB', uploadDate: '2026-05-10' },
  { id: 2, title: 'Unit 2 - Linked Lists & Trees', course: 'CS301', type: 'PDF', size: '3.1 MB', uploadDate: '2026-05-18' },
  { id: 3, title: 'Lab Manual - DBMS Practicals', course: 'CS302', type: 'PDF', size: '1.8 MB', uploadDate: '2026-05-22' },
  { id: 4, title: 'Lecture Slides - Process Scheduling', course: 'CS401', type: 'PPT', size: '4.2 MB', uploadDate: '2026-06-01' },
];

export default function FacultyMaterials() {
  const { courses } = useApp();
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  const filtered = materials.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.title || !form.course) { toast.error('Title and course required'); return; }
    setMaterials(prev => [{ ...form, id: Date.now(), type: 'PDF', size: '1.5 MB', uploadDate: new Date().toISOString().slice(0, 10) }, ...prev]);
    toast.success('Material uploaded successfully');
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    toast.success('Material removed');
  };

  const typeColor = { PDF: '#EF4444', PPT: '#F59E0B', DOC: '#4F46E5' };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Study Materials</div>
          <div className="page-subtitle">Upload lecture notes and resources for students</div>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm({ title: '', course: courses[0]?.id }); setModalOpen(true); }}>
          <Plus size={16} /> Upload Material
        </button>
      </div>

      <div className="card p-4 mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search materials..." />
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon="📂" title="No materials uploaded yet" /></div>
      ) : (
        <div className="card">
          {filtered.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${typeColor[m.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={18} color={typeColor[m.type]} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-semibold truncate">{m.title}</div>
                <div className="text-xs text-muted">{m.course} • {m.size} • {new Date(m.uploadDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => toast.success('Downloaded (mock)')}><Download size={13} /></button>
              <button className="btn btn-icon btn-secondary btn-sm" onClick={() => handleDelete(m.id)}><Trash2 size={13} color="var(--danger)" /></button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload Study Material"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAdd}>Upload</button>
        </>}
      >
        <div className="form-group">
          <label className="form-label">Material Title</label>
          <input className="form-control" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Course</label>
          <select className="form-control" value={form.course || ''} onChange={e => setForm({ ...form, course: e.target.value })}>
            {courses.map(c => <option key={c.id} value={c.id}>{c.id} - {c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">File</label>
          <div style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            Drop file here or click to browse (mock)
          </div>
        </div>
      </Modal>
    </div>
  );
}
