import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SecondHome from '../pages/secondHome';
import AdminDashboard from '../pages/Admin';
import StudentDashboard from '../pages/Entity';
import Register from '../pages/Register';
import MarkAttendance from '../pages/MarkAttendance';
import AttendanceSheet from '../pages/AttendanceSheet';
import AdminLogin from '../pages/AdminLogin'; 
import AttendanceRegister from '../pages/AttendanceRegister';
import chatbot from '../pages/Chatbot'

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/home2" element={<SecondHome />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />

        {/* Student Routes */}
        <Route path="/student/mark" element={<MarkAttendance />} />
        <Route path="/student/sheet" element={<AttendanceSheet />} />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/sheet" element={<AttendanceSheet />} />
        <Route path="/admin/full-attendance" element={<AttendanceRegister />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
      </Routes>
    </Router>
  );
}

export default App;
