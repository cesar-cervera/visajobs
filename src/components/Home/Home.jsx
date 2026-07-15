import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Auth/AuthService';
import { NavBar } from '../navBar';

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
    <div>
      <NavBar />
      <section className="p-8">
        <h1 className="text-3xl font-bold">Welcome to Visa Jobs</h1>
        <p className="text-gray-600 mt-2">Find jobs that offer visa sponsorship for international students.</p>
        <button 
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Log Out
        </button>
      </section>
    </div>
  );
}