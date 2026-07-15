
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addFavorite, removeFavorite, checkFavorite } from '../services/favorites';

// displays a single job listing card
// receives one job object as a prop and displays it
export function JobCard({ job }) {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  // Check if job is already favorited on mount
  useEffect(() => {
    checkFavorite(job).then((favorite) => {
      if (favorite) {
        setIsFavorited(true);
        setFavoriteId(favorite.id);
      }
    });
  }, [job]);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFavorite(favoriteId).then(() => {
        setIsFavorited(false);
        setFavoriteId(null);
      });
    } else {
      addFavorite(job).then((favorite) => {
        setIsFavorited(true);
        setFavoriteId(favorite.id);
      });
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 mb-4 hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{job.get('title')}</h3>
        <button
          onClick={handleFavorite}
          className={`text-2xl ${isFavorited ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          &#9733;
        </button>
      </div>
      <p className="text-blue-600 font-medium mb-1">{job.get('company')} · {job.get('location')}</p>
      <p className="text-gray-500 text-sm mb-3">{job.get('jobType')} · {job.get('salary')}</p>
      <p className="text-gray-600 text-sm">{job.get('description')}</p>
    </div>
  );
}
