import { useApp } from '../../context/AppContext';
import { StatCard, Badge } from '../../components/ui';
import { Users, UserCheck, BookOpen, Building2, DollarSign, ClipboardList, CalendarCheck } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { STUDENT_GROWTH, FEE_COLLECTION, ATTENDANCE_DATA } from '../../data/mockData';

const COLORS = ['#4F46E5', '#0EA5E9', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

export default function AdminDashboard() {
  const { students, faculty, courses, departments, exams, notices } = useApp();

  const totalFeesCollected = 6_380_000;
  const deptData = departments.map(d => ({ name: d.code, students: d.students }));

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Welcome back, Admin 👋</div>
        <div className="page-subtitle">Here's what's happening across your college today.</div>
      </div>

      <div className="grid grid-4 mb-6">
        <StatCard label="Total Students" value={students.length * 165} icon={Users} color="#4F46E5" change="+12% this year" changeType="up" />
        <StatCard label="Total Faculty" value={faculty.length * 14} icon={UserCheck} color="#0EA5E9" change="+5 new hires" changeType="up" />
        <StatCard label="Total Courses" value={courses.length * 8} icon={BookOpen} color="#F59E0B" change="6 departments" changeType="up" />
        <StatCard label="Departments" value={departments.length} icon={Building2} color="#10B981" />
      </div>

      <div className="grid grid-4 mb-6">
        <StatCard label="Avg. Attendance" value="89%" icon={CalendarCheck} color="#8B5CF6" change="+2% vs last month" changeType="up" />
        <StatCard label="Fees Collected" value="₹63.8L" icon={DollarSign} color="#10B981" change="₹9.3L pending" changeType="down" />
        <StatCard label="Upcoming Exams" value={exams.length} icon={ClipboardList} color="#EF4444" />
        <StatCard label="Active Notices" value={notices.length} icon={Building2} color="#4F46E5" />
      </div>

      <div className="grid grid-2 mb-6">
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Student Growth</div>
              <div className="text-sm text-muted">Enrollment trend over the years</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={STUDENT_GROWTH}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
              <Tooltip />
              <Area type="monotone" dataKey="students" stroke="#4F46E5" fillOpacity={1} fill="url(#colorStudents)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Fee Collection Report</div>
          <div className="text-sm text-muted mb-4">Monthly collected vs pending</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={FEE_COLLECTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--text-muted)" tickFormatter={v => `${v / 100000}L`} />
              <Tooltip formatter={v => `₹${(v / 100000).toFixed(1)}L`} />
              <Legend />
              <Bar dataKey="collected" fill="#10B981" radius={[4, 4, 0, 0]} name="Collected" />
              <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-2 mb-6">
        <div className="card p-6">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Attendance Overview</div>
          <div className="text-sm text-muted mb-4">Present vs absent percentage by month</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ATTENDANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
              <YAxis tick={{ fontSize: 12 }} stroke="var(--text-muted)" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} name="Present %" />
              <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} name="Absent %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Department-wise Strength</div>
          <div className="text-sm text-muted mb-4">Student distribution by department</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={deptData} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={85} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {deptData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <div style={{ fontWeight: 700, fontSize: 15 }}>Upcoming Examinations</div>
        </div>
        <table className="table">
          <thead>
            <tr><th>Exam</th><th>Course</th><th>Date</th><th>Hall</th><th>Type</th></tr>
          </thead>
          <tbody>
            {exams.map(e => (
              <tr key={e.id}>
                <td className="font-semibold">{e.name}</td>
                <td>{e.course}</td>
                <td>{new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td>{e.hall}</td>
                <td><Badge type={e.type === 'Theory' ? 'primary' : 'secondary'}>{e.type}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
