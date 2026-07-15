// filters sidebar component
// allows users to filter jobs by type and field
export function FiltersSide() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
      <div className="mb-6">
        <p className="font-semibold text-gray-700 mb-2">Visa Type</p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-blue-600" /> H-1B
          </label>
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-blue-600" /> OPT
          </label>
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-blue-600" /> CPT
          </label>
        </div>
      </div>
      <div>
        <p className="font-semibold text-gray-700 mb-2">Job Type</p>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-blue-600" /> Full-time
          </label>
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-blue-600" /> Internship
          </label>
          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" className="accent-blue-600" /> Part-time
          </label>
        </div>
      </div>
    </div>
  );
}