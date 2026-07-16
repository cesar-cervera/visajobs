import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Auth/AuthService';
import { NavBar } from '../navBar';
import { useState, useEffect } from 'react';
import { getFavorites } from '../../services/favorites';

// Home page component - landing page for the visa jobs app
export default function Home() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites on mount
  useEffect(() => {
    getFavorites().then((data) => {
      setFavorites(data);
    });
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      navigate('/auth');
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Visa Jobs</h1>
        <p className="text-gray-500 mb-8">Find jobs that offer visa sponsorship for international students.</p>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Saved Jobs</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">No saved jobs yet. Star a job to save it here.</p>
        ) : (
          <div>
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="bg-white rounded-xl shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg border border-gray-100"
                onClick={() => navigate(`/jobs/${fav.get('job').id}`)}
              >
                <h3 className="text-lg font-bold text-gray-800">{fav.get('job').get('title')}</h3>
                <p className="text-blue-600">{fav.get('job').get('company')} · {fav.get('job').get('location')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}