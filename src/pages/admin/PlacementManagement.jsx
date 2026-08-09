import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge } from '../../components/ui';
import { Plus, Calendar, Briefcase, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PlacementManagement() {
  const { placements, setPlacements } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  const handleAdd = () => {
    if (!form.company) { toast.error('Company name required'); return; }
    setPlacements(prev => [...prev, { ...form, id: Date.now(), registered: 0, status: 'Upcoming' }]);
    toast.success('Placement drive added');
    setModalOpen(false);
  };

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">Placement Management</div>
          <div className="page-subtitle">Company listings, drives, and application tracking</div>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm({ company: '', role: '', package: '', date: '', eligibility: '' }); setModalOpen(true); }}>
          <Plus size={16} /> Add Drive
        </button>
      </div>

      <div className="grid grid-4 mb-6">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#EEF2FF' }}><Briefcase size={20} color="#4F46E5" /></div>
          <div><div className="stat-value">{placements.length}</div><div className="stat-label">Total Drives</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ECFDF5' }}><span style={{fontSize:20}}>📈</span></div>
          <div><div className="stat-value">{placements.filter(p => p.status === 'Upcoming').length}</div><div className="stat-label">Upcoming Drives</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FFFBEB' }}><Users size={20} color="#F59E0B" /></div>
          <div><div className="stat-value">{placements.reduce((s, p) => s + p.registered, 0)}</div><div className="stat-label">Total Registrations</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FEF2F2' }}><span style={{fontSize:20}}>🎯</span></div>
          <div><div className="stat-value">94%</div><div className="stat-label">Placement Rate</div></div>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead><tr><th>Company</th><th>Role</th><th>Package</th><th>Drive Date</th><th>Eligibility</th><th>Registered</th><th>Status</th></tr></thead>
          <tbody>
            {placements.map(p => (
              <tr key={p.id}>
                <td className="font-semibold">{p.company}</td>
                <td>{p.role}</td>
                <td className="text-success font-semibold">{p.package}</td>
                <td>{new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td className="text-sm text-muted">{p.eligibility}</td>
                <td>{p.registered}</td>
                <td><Badge type={p.status === 'Upcoming' ? 'primary' : 'success'}>{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Placement Drive"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleAdd}>Add Drive</button>
        </>}
      >
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input className="form-control" value={form.company || ''} onChange={e => setForm({ ...form, company: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <input className="form-control" value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Package</label>
            <input className="form-control" value={form.package || ''} onChange={e => setForm({ ...form, package: e.target.value })} placeholder="6-10 LPA" />
          </div>
          <div className="form-group">
            <label className="form-label">Drive Date</label>
            <input type="date" className="form-control" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Eligibility Criteria</label>
          <input className="form-control" value={form.eligibility || ''} onChange={e => setForm({ ...form, eligibility: e.target.value })} placeholder="CS/EC, CGPA >= 7.0" />
        </div>
      </Modal>
    </div>
  );
}
