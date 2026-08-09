import { useState } from 'react';
import { SearchInput, EmptyState } from '../../components/ui';
import { FileText, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const MATERIALS = [
  { id: 1, title: 'Unit 1 - Introduction to Data Structures', course: 'CS301', faculty: 'Dr. Priya Sharma', type: 'PDF', size: '2.4 MB' },
  { id: 2, title: 'Unit 2 - Linked Lists & Trees', course: 'CS301', faculty: 'Dr. Priya Sharma', type: 'PDF', size: '3.1 MB' },
  { id: 3, title: 'Lab Manual - DBMS Practicals', course: 'CS302', faculty: 'Prof. Aman Thakur', type: 'PDF', size: '1.8 MB' },
  { id: 4, title: 'Lecture Slides - Process Scheduling', course: 'CS401', faculty: 'Prof. Aman Thakur', type: 'PPT', size: '4.2 MB' },
  { id: 5, title: 'Mathematics Formula Sheet', course: 'MA301', faculty: 'Prof. Vikram Nair', type: 'PDF', size: '0.8 MB' },
  { id: 6, title: 'Neural Networks Reference Guide', course: 'CS501', faculty: 'Dr. Priya Sharma', type: 'PDF', size: '5.6 MB' },
];

const typeColor = { PDF: '#EF4444', PPT: '#F59E0B', DOC: '#4F46E5' };

export default function StudentMaterials() {
  const [search, setSearch] = useState('');
  const filtered = MATERIALS.filter(m => m.title.toLowerCase().includes(search.toLowerCase()) || m.course.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Study Materials</div>
        <div className="page-subtitle">Download lecture notes and resources shared by faculty</div>
      </div>

      <div className="card p-4 mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search materials or courses..." />
      </div>

      {filtered.length === 0 ? (
        <div className="card"><EmptyState icon="📂" title="No materials found" /></div>
      ) : (
        <div className="grid grid-2">
          {filtered.map(m => (
            <div key={m.id} className="card p-5 flex items-center gap-4">
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${typeColor[m.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileText size={20} color={typeColor[m.type]} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="font-semibold truncate">{m.title}</div>
                <div className="text-xs text-muted">{m.course} • {m.faculty}</div>
                <div className="text-xs text-muted">{m.type} • {m.size}</div>
              </div>
              <button className="btn btn-icon btn-primary" onClick={() => toast.success('Downloaded (mock)')}>
                <Download size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
