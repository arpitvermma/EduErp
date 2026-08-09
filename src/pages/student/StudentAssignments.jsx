import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal, Badge, Tabs, EmptyState } from '../../components/ui';
import { Calendar, Upload, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentAssignments() {
  const { assignments } = useApp();
  const [tab, setTab] = useState('pending');
  const [submitModal, setSubmitModal] = useState(null);
  const [submitted, setSubmitted] = useState([3, 5]); // mock submitted IDs

  const pending = assignments.filter(a => !submitted.includes(a.id) && a.status !== 'Closed');
  const done = assignments.filter(a => submitted.includes(a.id) || a.status === 'Closed');

  const list = tab === 'pending' ? pending : done;

  const handleSubmit = () => {
    setSubmitted(prev => [...prev, submitModal.id]);
    toast.success('Assignment submitted successfully!');
    setSubmitModal(null);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Assignments</div>
        <div className="page-subtitle">View and submit your course assignments</div>
      </div>

      <Tabs
        tabs={[{ label: 'Pending', value: 'pending', count: pending.length }, { label: 'Submitted / Closed', value: 'done', count: done.length }]}
        active={tab}
        onChange={setTab}
      />

      {list.length === 0 ? (
        <div className="card"><EmptyState icon="📋" title={tab === 'pending' ? 'No pending assignments' : 'No submissions yet'} /></div>
      ) : (
        <div className="grid grid-2">
          {list.map(a => {
            const isSubmitted = submitted.includes(a.id) || a.status === 'Closed';
            return (
              <div key={a.id} className="card p-6">
                <div className="flex justify-between items-start mb-3">
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: isSubmitted ? '#ECFDF5' : '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isSubmitted ? <CheckCircle size={18} color="var(--success)" /> : <Upload size={18} color="var(--primary)" />}
                  </div>
                  <Badge type={isSubmitted ? 'success' : a.status === 'Due Today' ? 'warning' : 'primary'}>{isSubmitted ? 'Submitted' : a.status}</Badge>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{a.title}</div>
                <div className="text-sm text-muted mb-3">{a.course} • {a.faculty} • {a.marks} marks</div>
                <div className="flex items-center gap-2 text-sm mb-4"><Calendar size={13} /> Due: {new Date(a.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                {!isSubmitted && (
                  <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }} onClick={() => setSubmitModal(a)}>
                    <Upload size={14} /> Submit Assignment
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={!!submitModal}
        onClose={() => setSubmitModal(null)}
        title="Submit Assignment"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setSubmitModal(null)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </>}
      >
        {submitModal && (
          <div>
            <div className="font-semibold mb-1">{submitModal.title}</div>
            <div className="text-sm text-muted mb-4">{submitModal.course} • Due {new Date(submitModal.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 10, padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              <Upload size={24} style={{ marginBottom: 8 }} />
              <div>Drop your file here or click to browse</div>
              <div className="text-xs mt-1">(Mock submission — no actual file required)</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
