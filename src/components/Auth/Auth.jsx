import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkUser } from './AuthService';

// Auth module - entry point for login and register
const AuthModule = () => {
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (checkUser()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">VisaJobs</h1>
        <p className="text-gray-500 mb-8">Find jobs that sponsor your visa</p>
        <div className="flex flex-col gap-4">
          <Link to="/auth/register">
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Create Account
            </button>
          </Link>
          <Link to="/auth/login">
            <button className="w-full px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthModule;