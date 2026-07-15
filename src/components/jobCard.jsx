// displays a single job listing card
// receives one job object as a prop and displays it
export function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 hover:shadow-lg transition-shadow border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-1">{job.get('title')}</h3>
      <p className="text-blue-600 font-medium mb-1">{job.get('company')} · {job.get('location')}</p>
      <p className="text-gray-500 text-sm mb-3">{job.get('jobType')} · {job.get('salary')}</p>
      <p className="text-gray-600 text-sm">{job.get('description')}</p>
    </div>
  );
}