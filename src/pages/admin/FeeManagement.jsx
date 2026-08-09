import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar, Badge, Modal } from '../../components/ui';
import { FEE_STRUCTURE } from '../../data/mockData';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Receipt, Plus, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FeeManagement() {
  const { students } = useApp();
  const [tab, setTab] = useState('overview');
  const [receiptModal, setReceiptModal] = useState(null);

  const paid = students.filter(s => s.fees === 'Paid').length;
  const pending = students.filter(s => s.fees === 'Pending').length;
  const overdue = students.filter(s => s.fees === 'Overdue').length;

  const pieData = [
    { name: 'Paid', value: paid, color: '#10B981' },
    { name: 'Pending', value: pending, color: '#F59E0B' },
    { name: 'Overdue', value: overdue, color: '#EF4444' },
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Fee Management</div>
        <div className="page-subtitle">Track fee collection, dues, and structure</div>
      </div>

      <div className="tab-list">
        <button className={`tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
        <button className={`tab ${tab === 'students' ? 'active' : ''}`} onClick={() => setTab('students')}>Student Payments</button>
        <button className={`tab ${tab === 'structure' ? 'active' : ''}`} onClick={() => setTab('structure')}>Fee Structure</button>
      </div>

      {tab === 'overview' && (
        <div>
          <div className="grid grid-4 mb-6">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#ECFDF5' }}><span style={{fontSize:20}}>✅</span></div>
              <div><div className="stat-value">{paid}</div><div className="stat-label">Fully Paid</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#FFFBEB' }}><span style={{fontSize:20}}>⏳</span></div>
              <div><div className="stat-value">{pending}</div><div className="stat-label">Pending</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#FEF2F2' }}><span style={{fontSize:20}}>🚨</span></div>
              <div><div className="stat-value">{overdue}</div><div className="stat-label">Overdue</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#EEF2FF' }}><span style={{fontSize:20}}>💰</span></div>
              <div><div className="stat-value">₹63.8L</div><div className="stat-label">Total Collected</div></div>
            </div>
          </div>
          <div className="card p-6">
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Fee Payment Distribution</div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                  {pieData.map(d => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'students' && (
        <div className="card">
          <table className="table">
            <thead><tr><th>Student</th><th>Department</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} size={32} />
                      <div><div className="font-semibold">{s.name}</div><div className="text-xs text-muted">{s.id}</div></div>
                    </div>
                  </td>
                  <td>{s.dept}</td>
                  <td><Badge type={s.fees === 'Paid' ? 'success' : s.fees === 'Pending' ? 'warning' : 'danger'}>{s.fees}</Badge></td>
                  <td>
                    {s.fees === 'Paid' ? (
                      <button className="btn btn-secondary btn-sm" onClick={() => setReceiptModal(s)}><Receipt size={13} /> Receipt</button>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => toast.success('Reminder sent (mock)')}>Send Reminder</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'structure' && (
        <div className="card">
          <div className="flex justify-between items-center p-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Fee Structure</div>
            <button className="btn btn-primary btn-sm" onClick={() => toast.success('Add fee structure (mock)')}><Plus size={13} /> Add Item</button>
          </div>
          <table className="table">
            <thead><tr><th>Category</th><th>Amount</th><th>Period</th><th>Action</th></tr></thead>
            <tbody>
              {FEE_STRUCTURE.map(f => (
                <tr key={f.id}>
                  <td className="font-semibold">{f.category}</td>
                  <td>₹{f.amount.toLocaleString('en-IN')}</td>
                  <td>{f.period}</td>
                  <td><button className="btn btn-icon btn-secondary btn-sm" onClick={() => toast.success('Edit (mock)')}><Edit2 size={13} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!receiptModal} onClose={() => setReceiptModal(null)} title="Fee Receipt">
        {receiptModal && (
          <div style={{ textAlign: 'center' }}>
            <Receipt size={40} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontWeight: 700, fontSize: 18 }}>Payment Receipt</div>
            <div className="text-sm text-muted mb-4">Receipt #RCP{receiptModal.id}</div>
            <div className="card p-4" style={{ textAlign: 'left' }}>
              <div className="flex justify-between mb-2"><span className="text-muted">Student</span><span className="font-semibold">{receiptModal.name}</span></div>
              <div className="flex justify-between mb-2"><span className="text-muted">ID</span><span className="font-semibold">{receiptModal.id}</span></div>
              <div className="flex justify-between mb-2"><span className="text-muted">Department</span><span className="font-semibold">{receiptModal.dept}</span></div>
              <div className="flex justify-between mb-2"><span className="text-muted">Amount Paid</span><span className="font-semibold">₹59,000</span></div>
              <div className="flex justify-between"><span className="text-muted">Status</span><Badge type="success">Paid</Badge></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
