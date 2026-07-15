import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser, checkUser } from './AuthService';
import AuthForm from './AuthForm';

// Register component
const AuthRegister = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
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

  // Create user when add flag is true
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          navigate('/');
        }
        setAdd(false);
      });
    }
  }, [newUser, add, navigate]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({ ...newUser, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-1">Create account</h1>
        <p className="text-gray-500 mb-6">Join VisaJobs and find your next opportunity</p>
        <AuthForm
          user={newUser}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
          isLogin={false}
        />
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthRegister;