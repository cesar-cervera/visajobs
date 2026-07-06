import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Auth/AuthService';

// Home page component - landing page for the visa jobs app
export default function Home() {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    logoutUser().then(() => {
      navigate('/auth');
    });
  };

  return (
    <section>
      <h1>Welcome to Visa Jobs</h1>
      <p>Find jobs that offer visa sponsorship for international students.</p>
      <button onClick={handleLogout}>Log Out</button>
    </section>
  );
}