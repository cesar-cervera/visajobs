import {
  html,
  render,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.module.js";

// i commented out the header because i'm building my own navbar
//import { Header } from "./Header.js";
import { getJobs } from "./services/jobs.js";
import { NavBar } from "./components/navbar.js";
import { JobCard } from "./components/jobCard.js";
import { FiltersSide } from "./components/filtersSide.js";
import { AiTools } from "./components/aiTools.js";
import { SearchBar } from "./components/searchBar.js";
function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  useEffect(() => {
    getJobs().then((data) => {
      setJobs(data);
    });
  }, []);
  const filteredJobs = jobs.filter(
    (job) =>
      (job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (jobTypeFilter === "" || job.jobType === jobTypeFilter)
  );
  return html`
    <div>
      <${NavBar} />
      <div class="fullContainer">
        <aside class="filtersSide">
          <${FiltersSide} />
        </aside>
        <section class="mainSearchInfo">
          <${SearchBar}
            searchTerm=${searchTerm}
            setSearchTerm=${setSearchTerm}
            setJobTypeFilter=${setJobTypeFilter}
          />
          ${filteredJobs.map((job) => html`<${JobCard} job=${job} />`)}
        </section>
        <aside class="aiTools">
          <${AiTools} />
        </aside>
      </div>
    </div>
  `;
}
render(html` <${App} /> `, document.getElementById("app"));
