import { Navigate } from 'react-router-dom';
import { checkUser } from './AuthService.js';

// Protected route - redirects to auth if not logged in
const ProtectedRoute = ({ component: Component }) => {
  return checkUser() ? <Component /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;