import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, checkUser } from './AuthService';
import AuthForm from './AuthForm';

// Login component
const AuthLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [add, setAdd] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (checkUser()) {
      navigate('/');
    }
  }, [navigate]);

  // Login user when add flag is true
  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((loggedIn) => {
        if (loggedIn) {
          setTimeout(() => {
            navigate('/');
          }, 500);
        }
        setAdd(false);
      });
    }
  }, [currentUser, add, navigate]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setCurrentUser({ ...currentUser, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-1">Welcome back</h1>
        <p className="text-gray-500 mb-6">Log in to your VisaJobs account</p>
        <AuthForm
          user={currentUser}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
          isLogin={true}
        />
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;