import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge, SearchInput, EmptyState, Tabs } from '../../components/ui';
import { BookOpen, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const MY_BOOKS = [
  { id: 'B001', title: 'Introduction to Algorithms', author: 'Cormen et al.', issueDate: '2026-05-20', dueDate: '2026-06-20' },
  { id: 'B005', title: 'Higher Engineering Mathematics', author: 'B.S. Grewal', issueDate: '2026-05-15', dueDate: '2026-06-14' },
];

export default function StudentLibrary() {
  const { books } = useApp();
  const [tab, setTab] = useState('catalog');
  const [search, setSearch] = useState('');

  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Library</div>
        <div className="page-subtitle">Browse the catalog and manage your borrowed books</div>
      </div>

      <Tabs tabs={[{ label: 'Book Catalog', value: 'catalog' }, { label: 'My Borrowed Books', value: 'borrowed', count: MY_BOOKS.length }]} active={tab} onChange={setTab} />

      {tab === 'catalog' && (
        <>
          <div className="card p-4 mb-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search books or authors..." />
          </div>
          {filtered.length === 0 ? (
            <div className="card"><EmptyState icon="📚" title="No books found" /></div>
          ) : (
            <div className="grid grid-2">
              {filtered.map(b => (
                <div key={b.id} className="card p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={18} color="var(--primary)" />
                    </div>
                    <Badge type={b.available > 0 ? 'success' : 'danger'}>{b.available > 0 ? `${b.available} Available` : 'All Issued'}</Badge>
                  </div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-muted mb-3">{b.author} • {b.dept}</div>
                  <button
                    className="btn btn-secondary w-full"
                    style={{ justifyContent: 'center' }}
                    disabled={b.available === 0}
                    onClick={() => toast.success(`"${b.title}" requested (mock)`)}
                  >
                    {b.available > 0 ? 'Request to Issue' : 'Currently Unavailable'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'borrowed' && (
        <div className="grid grid-2">
          {MY_BOOKS.map(b => (
            <div key={b.id} className="card p-5">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <BookOpen size={18} color="var(--warning)" />
              </div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-sm text-muted mb-3">{b.author}</div>
              <div className="flex items-center gap-2 text-sm"><Calendar size={13} /> Due: {new Date(b.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
