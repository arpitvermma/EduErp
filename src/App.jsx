import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './components/layout/DashboardLayout';

import StudentDashboard from './pages/student/StudentDashboard';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentAssignments from './pages/student/StudentAssignments';
import StudentResults from './pages/student/StudentResults';
import StudentMaterials from './pages/student/StudentMaterials';
import TimetablePage from './pages/student/TimetablePage';
import ProfilePage from './pages/student/ProfilePage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ style: { fontSize: 14 } }} />
        <Routes>
          {/* No login page: the app opens straight into the student dashboard */}
          <Route path="/" element={<Navigate to="/student" replace />} />

          <Route path="/student" element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="timetable" element={<TimetablePage title="My Timetable" subtitle="Your weekly class schedule" />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="materials" element={<StudentMaterials />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/student" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
