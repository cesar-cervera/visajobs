import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobDetail from './JobDetail/JobDetail';
import Home from './Home/Home';
import Jobs from './Jobs/Jobs';
import AuthModule from './Auth/Auth';
import AuthRegister from './Auth/AuthRegister';
import AuthLogin from './Auth/AuthLogin';
import ProtectedRoute from './Auth/ProtectedRoute';

// Components.jsx is where all routing lives
export default function Components() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/jobs" element={<ProtectedRoute component={Jobs} />} />
        <Route path="/jobs/:id" element={<JobDetail/>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}