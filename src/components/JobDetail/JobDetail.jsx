import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from '../navBar';
import Parse from 'parse';
import { addFavorite, removeFavorite, checkFavorite } from '../../services/favorites';

// Job detail page - shows full details of a single job posting
export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [isHit, setIsHit] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    // Use Algolia hit data if available for instant load
    if (location.state?.hit) {
      setJob(location.state.hit);
      setIsHit(true);
    } else {
      const query = new Parse.Query('Job');
      query.get(id).then((result) => {
        setJob(result);
      });
    }
  }, [id, location.state]);

  // Check if this job is already favorited - need the Parse object
  useEffect(() => {
    const query = new Parse.Query('Job');
    query.get(id).then((parseJob) => {
      checkFavorite(parseJob).then((favorite) => {
        if (favorite) {
          setIsFavorited(true);
          setFavoriteId(favorite.id);
        }
      });
    });
  }, [id]);

  const handleFavorite = () => {
    if (isFavorited) {
      removeFavorite(favoriteId).then(() => {
        setIsFavorited(false);
        setFavoriteId(null);
      });
    } else {
      const query = new Parse.Query('Job');
      query.get(id).then((parseJob) => {
        addFavorite(parseJob).then((favorite) => {
          setIsFavorited(true);
          setFavoriteId(favorite.id);
        });
      });
    }
  };

  if (!job) return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-blue-600 text-4xl mb-4">&#9733;</div>
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    </div>
  );

  // Helper to get field from either Algolia hit or Parse object
  const get = (field) => isHit ? job[field] : job.get(field);

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <div className="max-w-3xl mx-auto p-8">
        <button
          onClick={() => navigate('/jobs')}
          className="mb-6 text-blue-600 hover:underline"
        >
          &larr; Back to Jobs
        </button>
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{get('title')}</h1>
            <button
              onClick={handleFavorite}
              className={`text-3xl ${isFavorited ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              &#9733;
            </button>
          </div>
          <p className="text-blue-600 text-xl font-medium mb-1">{get('company')}</p>
          <p className="text-gray-500 mb-6">{get('location')}</p>
          <div className="flex gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{get('jobType')}</span>
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">{get('visaType')}</span>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">{get('salary')}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-600 mb-6">{get('description')}</p>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-semibold text-gray-700">Visa Sponsorship:</span>
            <span className={get('visaSponsorship') ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
              {get('visaSponsorship') ? 'Yes' : 'No'}
            </span>
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}