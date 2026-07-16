import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch';
import { useNavigate } from 'react-router-dom';

// Initialize Algolia client
const searchClient = algoliasearch('OPJ94XYDM1', '981dd4c5239edcf04fc8c4db5a55b0ac');

// Individual hit component for each job result
function Hit({ hit }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg border border-gray-100"
      onClick={() => navigate(`/jobs/${hit.objectID}`)}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-1">
        <Highlight attribute="title" hit={hit} />
      </h3>
      <p className="text-blue-600 font-medium mb-1">{hit.company} · {hit.location}</p>
      <p className="text-gray-500 text-sm mb-2">{hit.jobType} · {hit.salary}</p>
      <p className="text-gray-600 text-sm">{hit.description}</p>
    </div>
  );
}

// Algolia search component
export default function AlgoliaSearch() {
  return (
    <div className="flex-1">
      <InstantSearch searchClient={searchClient} indexName="jobs">
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
      </InstantSearch>
    </div>
  );
}
