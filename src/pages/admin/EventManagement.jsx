import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge } from '../../components/ui';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const typeColors = { Cultural: '#EF4444', Technical: '#4F46E5', Workshop: '#10B981', Sports: '#F59E0B' };

export default function EventManagement() {
  const { events, setEvents } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  const handleAdd = () => {
    if (!form.title) { toast.error('Event title required'); return; }
    setEvents(prev => [...prev, { ...form, id: Date.now(), registrations: 0 }]);
    toast.success('Event created');
    setModalOpen(false);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Events Management</div>
          <div className="page-subtitle">College events, workshops, and competitions</div>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm({ title: '', date: '', type: 'Cultural', venue: '', organizer: '' }); setModalOpen(true); }}>
          <Plus size={16} /> Create Event
        </button>
      </div>

      <div className="grid grid-2">
        {events.map(e => (
          <div key={e.id} className="card p-6">
            <div className="flex justify-between items-start mb-3">
              <span className="badge" style={{ background: `${typeColors[e.type]}15`, color: typeColors[e.type] }}>{e.type}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{e.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="flex items-center gap-2 text-sm"><Calendar size={14} color={typeColors[e.type]} /> {new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <div className="flex items-center gap-2 text-sm"><MapPin size={14} color={typeColors[e.type]} /> {e.venue}</div>
              <div className="flex items-center gap-2 text-sm"><Users size={14} color={typeColors[e.type]} /> {e.registrations} registered • by {e.organizer}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Event"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAdd}>Create Event</button>
        </>}
      >
        <div className="form-group">
          <label className="form-label">Event Title</label>
          <input className="form-control" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-control" value={form.type || 'Cultural'} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option>Cultural</option>
              <option>Technical</option>
              <option>Workshop</option>
              <option>Sports</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Venue</label>
          <input className="form-control" value={form.venue || ''} onChange={e => setForm({ ...form, venue: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Organizer</label>
          <input className="form-control" value={form.organizer || ''} onChange={e => setForm({ ...form, organizer: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
