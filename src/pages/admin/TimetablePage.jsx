import { useState } from 'react';
import { TIMETABLE } from '../../data/mockData';
import { Clock, MapPin, User } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const subjectColors = ['#4F46E5', '#0EA5E9', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444'];

export default function TimetablePage({ title = 'Timetable', subtitle = 'Weekly class schedule' }) {
  const [view, setView] = useState('week');
  const [activeDay, setActiveDay] = useState(DAYS[new Date().getDay() - 1] || 'Monday');

  return (
    <div>
      <div className="page-header flex justify-between items-center">
        <div>
          <div className="page-title">{title}</div>
          <div className="page-subtitle">{subtitle}</div>
        </div>
        <div className="flex gap-2">
          <button className={`btn ${view === 'week' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('week')}>Weekly</button>
          <button className={`btn ${view === 'day' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('day')}>Daily</button>
        </div>
      </div>

      {view === 'day' && (
        <div className="tab-list" style={{ marginBottom: 20 }}>
          {DAYS.map(d => (
            <button key={d} className={`tab ${activeDay === d ? 'active' : ''}`} onClick={() => setActiveDay(d)}>{d}</button>
          ))}
        </div>
      )}

      {view === 'day' ? (
        <div className="card">
          {TIMETABLE[activeDay].map((slot, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < TIMETABLE[activeDay].length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 4, height: 40, borderRadius: 4, background: subjectColors[i % subjectColors.length] }} />
              <div style={{ minWidth: 110 }}>
                <div className="flex items-center gap-2 text-sm font-semibold"><Clock size={13} />{slot.time}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div className="font-semibold">{slot.subject}</div>
                <div className="text-xs text-muted flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1"><User size={11} />{slot.faculty}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} />{slot.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ overflowX: 'auto' }}>
          <table className="table" style={{ minWidth: 800 }}>
            <thead>
              <tr>
                <th>Time</th>
                {DAYS.map(d => <th key={d}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {['9:00-10:00','10:00-11:00','11:15-12:15','1:00-2:00','2:00-4:00'].map(time => (
                <tr key={time}>
                  <td className="font-semibold text-sm">{time}</td>
                  {DAYS.map(day => {
                    const slot = TIMETABLE[day]?.find(s => s.time === time);
                    return (
                      <td key={day}>
                        {slot ? (
                          <div style={{ padding: '6px 10px', borderRadius: 8, background: 'var(--bg)', borderLeft: `3px solid ${subjectColors[DAYS.indexOf(day) % subjectColors.length]}` }}>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{slot.subject}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{slot.room}</div>
                          </div>
                        ) : <span className="text-muted text-xs">—</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
