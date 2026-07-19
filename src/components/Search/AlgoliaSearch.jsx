import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight, RefinementList } from 'react-instantsearch';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Parse from 'parse';
import { addFavorite, removeFavorite, checkFavorite } from '../../services/favorites';

// Initialize Algolia client
const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY
);

// Individual hit component for each job result
function Hit({ hit }) {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  // Check if job is already favorited on mount
  useEffect(() => {
    const query = new Parse.Query('Job');
    query.get(hit.objectID).then((parseJob) => {
      checkFavorite(parseJob).then((favorite) => {
        if (favorite) {
          setIsFavorited(true);
          setFavoriteId(favorite.id);
        }
      });
    });
  }, [hit.objectID]);

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFavorite(favoriteId).then(() => {
        setIsFavorited(false);
        setFavoriteId(null);
      });
    } else {
      const query = new Parse.Query('Job');
      query.get(hit.objectID).then((parseJob) => {
        addFavorite(parseJob).then((favorite) => {
          setIsFavorited(true);
          setFavoriteId(favorite.id);
        });
      });
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg border border-gray-100"
      onClick={() => navigate(`/jobs/${hit.objectID}`, { state: { hit } })}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          <Highlight attribute="title" hit={hit} />
        </h3>
        <button
          onClick={handleFavorite}
          className={`text-2xl ${isFavorited ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          &#9733;
        </button>
      </div>
      <p className="text-blue-600 font-medium mb-1">{hit.company} · {hit.location}</p>
      <p className="text-gray-500 text-sm mb-2">{hit.jobType} · {hit.salary}</p>
      <p className="text-gray-600 text-sm">{hit.description}</p>
    </div>
  );
}

// Algolia search component with filters
export default function AlgoliaSearch() {
  return (
    <InstantSearch searchClient={searchClient} indexName="jobs">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
            <div className="mb-6">
              <p className="font-semibold text-gray-700 mb-2">Visa Type</p>
              <RefinementList attribute="visaType" classNames={{
                root: 'flex flex-col gap-2',
                label: 'flex items-center gap-2 text-gray-600',
                checkbox: 'accent-blue-600',
              }} />
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-2">Job Type</p>
              <RefinementList attribute="jobType" classNames={{
                root: 'flex flex-col gap-2',
                label: 'flex items-center gap-2 text-gray-600',
                checkbox: 'accent-blue-600',
              }} />
            </div>
          </div>
        </aside>

        {/* Search and results */}
        <div className="flex-1">
          <SearchBox
            placeholder="Search jobs by title, company, or skill..."
            classNames={{
              root: 'mb-6',
              input: 'w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600',
              submit: 'hidden',
              reset: 'hidden',
            }}
          />
          <Hits hitComponent={Hit} />
        </div>

        {/* AI Tools sidebar */}
        <aside className="w-full lg:w-48 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">AI Tools</h2>
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-lg font-medium cursor-pointer hover:bg-blue-100">Resume Checker</div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-lg font-medium cursor-pointer hover:bg-blue-100">Visa Advisor</div>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-lg font-medium cursor-pointer hover:bg-blue-100">Cover Letter Generator</div>
            </div>
          </div>
        </aside>
      </div>
    </InstantSearch>
  );
}