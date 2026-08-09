import { useApp } from '../../context/AppContext';
import { Badge, ProgressBar, EmptyState } from '../../components/ui';
import { Calendar, FileText } from 'lucide-react';

export default function AssignmentManagement() {
  const { assignments } = useApp();

  const statusType = { 'Active': 'primary', 'Due Today': 'warning', 'Closed': 'success' };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Assignments</div>
        <div className="page-subtitle">College-wide assignment tracking across all courses</div>
      </div>

      {assignments.length === 0 ? (
        <div className="card"><EmptyState icon="📋" title="No assignments yet" /></div>
      ) : (
        <div className="grid grid-2">
          {assignments.map(a => (
            <div key={a.id} className="card p-6">
              <div className="flex justify-between items-start mb-3">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} color="var(--primary)" />
                </div>
                <Badge type={statusType[a.status]}>{a.status}</Badge>
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{a.title}</div>
              <div className="text-sm text-muted mb-3">{a.course} • {a.faculty} • {a.marks} marks</div>
              <div className="flex items-center gap-2 text-sm mb-3"><Calendar size={13} /> Due: {new Date(a.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div>
                <div className="flex justify-between text-xs text-muted mb-1">
                  <span>Submissions</span>
                  <span>{a.submissions}/{a.total}</span>
                </div>
                <ProgressBar value={a.submissions} max={a.total} color={a.submissions === a.total ? '#10B981' : '#4F46E5'} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
