import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge, Tabs, EmptyState } from '../../components/ui';
import { Plus, Trash2, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const priorityType = { High: 'danger', Medium: 'warning', Low: 'secondary' };

export default function NoticeBoard({ readOnly = false }) {
  const { notices, addNotice, deleteNotice } = useApp();
  const [category, setCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  const categories = ['All', 'Academic', 'Administrative', 'Events', 'Placement'];
  const filtered = category === 'All' ? notices : notices.filter(n => n.category === category);

  const handleAdd = () => {
    if (!form.title) { toast.error('Title is required'); return; }
    addNotice({ ...form, id: Date.now(), date: new Date().toISOString().slice(0, 10), author: 'Admin Office' });
    toast.success('Notice published');
    setModalOpen(false);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Notice Board</div>
          <div className="page-subtitle">College announcements and updates</div>
        </div>
        {!readOnly && (
          <button className="btn btn-primary" onClick={() => { setForm({ title: '', category: 'Academic', priority: 'Medium', content: '' }); setModalOpen(true); }}>
            <Plus size={16} /> New Notice
          </button>
        )}
      </div>

      <div className="tab-list">
        {categories.map(c => (
          <button key={c} className={`tab ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon="📢" title="No notices in this category" /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(n => (
            <div key={n.id} className="card p-6">
              <div className="flex justify-between items-start">
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bell size={18} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{n.title}</div>
                    <div className="text-sm text-muted mt-1">{n.content}</div>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted">
                      <span>{n.author}</span>
                      <span>•</span>
                      <span>{new Date(n.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2" style={{ flexShrink: 0 }}>
                  <Badge type={priorityType[n.priority]}>{n.priority}</Badge>
                  {!readOnly && (
                    <button className="btn btn-icon btn-secondary btn-sm" onClick={() => { deleteNotice(n.id); toast.success('Notice removed'); }}>
                      <Trash2 size={13} color="var(--danger)" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Publish New Notice"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAdd}>Publish Notice</button>
        </>}
      >
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-control" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-control" value={form.category || 'Academic'} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option>Academic</option>
              <option>Administrative</option>
              <option>Events</option>
              <option>Placement</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select className="form-control" value={form.priority || 'Medium'} onChange={e => setForm({ ...form, priority: e.target.value })}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea className="form-control" rows={4} value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
