import { Link, useNavigate } from 'react-router-dom';
import { checkUser, logoutUser } from './Auth/AuthService';

// NavBar component - navigation bar styled with Tailwind CSS
export function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser().then(() => {
      navigate('/auth');
    });
  };

  return (
    <div>
     <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-10">
        <a className="text-2xl font-bold text-blue-600" href="#">
          <i className="fa-solid fa-briefcase mr-2"></i> VisaJobs
        </a>
        <div className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium">Jobs</Link>
          <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium">Resources</Link>
        </div>
        <div className="flex gap-3">
          {checkUser() ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">Log In</button>
              </Link>
              <Link to="/auth/register">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* Animation bar showing visa types */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden">
        <div className="flex gap-8 px-4">
          <span>H-1B Sponsorship</span>
          <span>OPT Friendly</span>
          <span>CPT Eligible</span>
          <span>Green Card Sponsorship</span>
          <span>Remote Friendly</span>
          <span>H-1B Sponsorship</span>
          <span>OPT Friendly</span>
          <span>CPT Eligible</span>
          <span>Green Card Sponsorship</span>
          <span>Remote Friendly</span>
        </div>
      </div>
    </div>
  );
}