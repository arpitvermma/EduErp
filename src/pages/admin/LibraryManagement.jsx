import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge, SearchInput, ProgressBar } from '../../components/ui';
import { Plus, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LibraryManagement() {
  const { books, setBooks } = useApp();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.title) { toast.error('Title is required'); return; }
    setBooks(prev => [...prev, { ...form, id: `B${String(prev.length + 1).padStart(3, '0')}`, available: Number(form.total), borrowed: 0 }]);
    toast.success('Book added to catalog');
    setModalOpen(false);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Library Management</div>
          <div className="page-subtitle">Book catalog and circulation tracking</div>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm({ title: '', author: '', isbn: '', dept: '', total: 1 }); setModalOpen(true); }}>
          <Plus size={16} /> Add Book
        </button>
      </div>

      <div className="grid grid-4 mb-6">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EEF2FF' }}><BookOpen size={20} color="#4F46E5" /></div>
          <div><div className="stat-value">{books.reduce((s, b) => s + b.total, 0)}</div><div className="stat-label">Total Books</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5' }}><span style={{fontSize:20}}>📗</span></div>
          <div><div className="stat-value">{books.reduce((s, b) => s + b.available, 0)}</div><div className="stat-label">Available</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FFFBEB' }}><span style={{fontSize:20}}>📙</span></div>
          <div><div className="stat-value">{books.reduce((s, b) => s + b.borrowed, 0)}</div><div className="stat-label">Borrowed</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF2F2' }}><span style={{fontSize:20}}>⏰</span></div>
          <div><div className="stat-value">7</div><div className="stat-label">Overdue Returns</div></div>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search books or authors..." />
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Book</th><th>Author</th><th>ISBN</th><th>Department</th><th>Availability</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td className="font-semibold">{b.title}</td>
                <td>{b.author}</td>
                <td className="text-sm text-muted">{b.isbn}</td>
                <td>{b.dept}</td>
                <td style={{ minWidth: 160 }}>
                  <div className="flex items-center gap-2">
                    <ProgressBar value={b.available} max={b.total} color={b.available > 0 ? '#10B981' : '#EF4444'} />
                    <span className="text-sm">{b.available}/{b.total}</span>
                  </div>
                </td>
                <td><Badge type={b.available > 0 ? 'success' : 'danger'}>{b.available > 0 ? 'Available' : 'All Issued'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Book"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAdd}>Add Book</button>
        </>}
      >
        <div className="form-group">
          <label className="form-label">Book Title</label>
          <input className="form-control" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Author</label>
          <input className="form-control" value={form.author || ''} onChange={e => setForm({ ...form, author: e.target.value })} />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">ISBN</label>
            <input className="form-control" value={form.isbn || ''} onChange={e => setForm({ ...form, isbn: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Total Copies</label>
            <input type="number" className="form-control" value={form.total || 1} onChange={e => setForm({ ...form, total: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Department</label>
          <input className="form-control" value={form.dept || ''} onChange={e => setForm({ ...form, dept: e.target.value })} placeholder="Computer Science" />
        </div>
      </Modal>
    </div>
  );
}
