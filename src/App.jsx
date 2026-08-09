import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import FacultyManagement from './pages/admin/FacultyManagement';
import DepartmentManagement from './pages/admin/DepartmentManagement';
import CourseManagement from './pages/admin/CourseManagement';
import AttendanceManagement from './pages/admin/AttendanceManagement';
import TimetablePage from './pages/admin/TimetablePage';
import ExamManagement from './pages/admin/ExamManagement';
import ResultManagement from './pages/admin/ResultManagement';
import AssignmentManagement from './pages/admin/AssignmentManagement';
import FeeManagement from './pages/admin/FeeManagement';
import LibraryManagement from './pages/admin/LibraryManagement';
import NoticeBoard from './pages/admin/NoticeBoard';
import EventManagement from './pages/admin/EventManagement';
import PlacementManagement from './pages/admin/PlacementManagement';
import ProfilePage from './pages/admin/ProfilePage';

// Faculty
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyAttendance from './pages/faculty/FacultyAttendance';
import FacultyAssignments from './pages/faculty/FacultyAssignments';
import FacultyMaterials from './pages/faculty/FacultyMaterials';
import FacultyResults from './pages/faculty/FacultyResults';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentResults from './pages/student/StudentResults';
import StudentMaterials from './pages/student/StudentMaterials';
import StudentFees from './pages/student/StudentFees';
import StudentLibrary from './pages/student/StudentLibrary';
import StudentPlacements from './pages/student/StudentPlacements';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ style: { fontSize: 14 } }} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="faculty" element={<FacultyManagement />} />
            <Route path="departments" element={<DepartmentManagement />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="attendance" element={<AttendanceManagement />} />
            <Route path="timetable" element={<TimetablePage title="Timetable Management" subtitle="College-wide class schedule" />} />
            <Route path="exams" element={<ExamManagement />} />
            <Route path="results" element={<ResultManagement />} />
            <Route path="assignments" element={<AssignmentManagement />} />
            <Route path="fees" element={<FeeManagement />} />
            <Route path="library" element={<LibraryManagement />} />
            <Route path="notices" element={<NoticeBoard />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="placements" element={<PlacementManagement />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Faculty Routes */}
          <Route path="/faculty" element={<ProtectedRoute allowedRole="faculty"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<FacultyDashboard />} />
            <Route path="attendance" element={<FacultyAttendance />} />
            <Route path="assignments" element={<FacultyAssignments />} />
            <Route path="materials" element={<FacultyMaterials />} />
            <Route path="results" element={<FacultyResults />} />
            <Route path="timetable" element={<TimetablePage title="My Schedule" subtitle="Your weekly teaching timetable" />} />
            <Route path="notices" element={<NoticeBoard readOnly />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRole="student"><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<StudentDashboard />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="timetable" element={<TimetablePage title="My Timetable" subtitle="Your weekly class schedule" />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="materials" element={<StudentMaterials />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="library" element={<StudentLibrary />} />
            <Route path="notices" element={<NoticeBoard readOnly />} />
            <Route path="placements" element={<StudentPlacements />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
