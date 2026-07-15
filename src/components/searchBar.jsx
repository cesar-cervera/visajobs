// search bar component for filtering jobs
// allows users to search by keyword and filter by field
export function SearchBar({ searchTerm, setSearchTerm, setJobTypeFilter }) {
  return (
    <div className="bg-blue-600 p-8 rounded-xl mb-6">
      <h1 className="text-3xl font-bold text-white mb-4">Get a job that will sponsor your visa</h1>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Job title, skill or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border-0 outline-none text-gray-800"
        />
        <select
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="px-4 py-3 rounded-lg border-0 outline-none text-gray-800"
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Part-time">Part-time</option>
        </select>
        {/* Clear button resets search and filter */}
        <button
          type="button"
          onClick={() => {
            setSearchTerm("");
            setJobTypeFilter("");
          }}
          className="px-4 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
    </div>
  );
}