import { useState, useEffect } from 'react';
import { getAllJobs } from '../../services/jobs.jsx';
import { JobCard } from '../jobCard';
import { SearchBar } from '../searchBar';
import { FiltersSide } from '../filtersSide';
import { AiTools } from '../aiTools';
import { NavBar } from '../navBar';

// Jobs page - stateful parent component that loads job data from Parse
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [visaTypeFilter, setVisaTypeFilter] = useState('');

  // Fetch jobs from Parse on component mount
  useEffect(() => {
    getAllJobs().then((data) => {
      setJobs(data);
    });
  }, []);

  // Filter jobs based on search term, job type and visa type
  const filteredJobs = jobs.filter(
    (job) =>
      (job.get('title').toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.get('company').toLowerCase().includes(searchTerm.toLowerCase())) &&
      (jobTypeFilter === '' || job.get('jobType') === jobTypeFilter) &&
      (visaTypeFilter === '' || job.get('visaType') === visaTypeFilter)
  );

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <NavBar />
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <aside className="w-full lg:w-64 flex-shrink-0">
          {/* Pass visa type filter handler to FiltersSide */}
          <FiltersSide onVisaTypeFilter={setVisaTypeFilter} />
        </aside>
        <section className="flex-1">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setJobTypeFilter={setJobTypeFilter}
          />
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
        <aside className="w-full lg:w-48 flex-shrink-0">
          <AiTools />
        </aside>
      </div>
    </div>
  );
}