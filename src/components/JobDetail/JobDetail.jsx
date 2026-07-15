import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar } from '../navBar';
import Parse from 'parse';

// Job detail page - shows full details of a single job posting
export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  // Fetch the specific job by ID from Parse
  useEffect(() => {
    const query = new Parse.Query('Job');
    query.get(id).then((result) => {
      setJob(result);
    });
  }, [id]);

  if (!job) return <div className="p-8">Loading...</div>;

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.get('title')}</h1>
          <p className="text-blue-600 text-xl font-medium mb-1">{job.get('company')}</p>
          <p className="text-gray-500 mb-6">{job.get('location')}</p>
          <div className="flex gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{job.get('jobType')}</span>
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">{job.get('visaType')}</span>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">{job.get('salary')}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-600 mb-6">{job.get('description')}</p>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-semibold text-gray-700">Visa Sponsorship:</span>
            <span className={job.get('visaSponsorship') ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
              {job.get('visaSponsorship') ? 'Yes' : 'No'}
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
