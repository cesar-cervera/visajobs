import { NavBar } from '../navBar';
import AlgoliaSearch from '../Search/AlgoliaSearch';

// Jobs page - uses Algolia for search and filtering
export default function Jobs() {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <NavBar />
      <div className="p-6">
        <AlgoliaSearch />
      </div>
    </div>
  );
}