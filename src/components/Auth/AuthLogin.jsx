import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, checkUser } from './AuthService';
import AuthForm from './AuthForm';

// Login component
const AuthLogin = () => {
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
      alert('You are already logged in!');
      navigate('/');
    }
  }, [navigate]);

  // Login user when add flag is true
  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((loggedIn) => {
        if (loggedIn) {
          alert(`Welcome back, ${loggedIn.get('firstName')}!`);
          navigate('/');
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
    <div>
      <h2>Login</h2>
      <AuthForm
        user={currentUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isLogin={true}
      />
    </div>
  );
};

export default AuthLogin;