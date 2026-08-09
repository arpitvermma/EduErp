import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge, EmptyState } from '../../components/ui';
import { Calendar, Briefcase, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentPlacements() {
  const { placements } = useApp();
  const [registered, setRegistered] = useState([3]); // mock already-registered

  const handleRegister = (p) => {
    setRegistered(prev => [...prev, p.id]);
    toast.success(`Registered for ${p.company} drive!`);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Placements</div>
        <div className="page-subtitle">Explore company drives and track your applications</div>
      </div>

      {placements.length === 0 ? (
        <div className="card"><EmptyState icon="🏢" title="No placement drives available" /></div>
      ) : (
        <div className="grid grid-2">
          {placements.map(p => {
            const isRegistered = registered.includes(p.id);
            return (
              <div key={p.id} className="card p-6">
                <div className="flex justify-between items-start mb-3">
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={20} color="var(--primary)" />
                  </div>
                  <Badge type={p.status === 'Upcoming' ? 'primary' : 'success'}>{p.status}</Badge>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{p.company}</div>
                <div className="text-sm text-muted mb-1">{p.role}</div>
                <div className="text-success font-semibold mb-3">{p.package}</div>
                <div className="flex items-center gap-2 text-sm mb-2"><Calendar size={13} /> {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div className="text-xs text-muted mb-4">Eligibility: {p.eligibility}</div>
                {p.status === 'Upcoming' && (
                  isRegistered ? (
                    <button className="btn btn-secondary w-full" style={{ justifyContent: 'center' }} disabled><CheckCircle size={14} /> Registered</button>
                  ) : (
                    <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }} onClick={() => handleRegister(p)}>Register Now</button>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
