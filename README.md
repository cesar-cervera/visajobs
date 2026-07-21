# Visa Jobs

A web app that helps international students find jobs that offer visa sponsorship.

## Problem & Solution
International students struggle to find jobs that actually sponsor visas. VisaJobs solves that by centralizing sponsorship verified job listings with real time search and filtering in one place.

## Partners
Farah Aburokba (Student A)
Cesar Cervera (Student B)

## Tech Stack
React with Vite
React Router DOM for client side routing
Parse and Back4App as the data layer
Algolia for instant search and filtering
Tailwind CSS for styling
Vercel for CI/CD deployment

## Features
User authentication (register, login, logout) via Parse
Protected routes that require login to view jobs
Browse job postings that offer visa sponsorship
Instant search via Algolia (title, company, skills)
Filter jobs by visa type (H1B, OPT, CPT) and job type
Detailed job page with full company and salary info
Save jobs to a personal Favorites list
Sidebar with AI tools for international students

## Getting Started

1. Clone the repo

\`\`\`
git clone https://github.com/ccervera/visajobs.git
cd visajobs
\`\`\`

2. Install dependencies

\`\`\`
npm install
\`\`\`

3. Create a .env file in the root with the following variables

\`\`\`
VITE_ALGOLIA_APP_ID=your_algolia_app_id
VITE_ALGOLIA_SEARCH_KEY=your_algolia_search_only_key
VITE_PARSE_APP_ID=your_parse_app_id
VITE_PARSE_JS_KEY=your_parse_javascript_key
VITE_PARSE_SERVER_URL=https://parseapi.back4app.com
\`\`\`

4. Run the development server

\`\`\`
npm run dev
\`\`\`

5. Open http://localhost:5173 in your browser

## Live Site
https://visajobs-delta.vercel.app/

## Deployment
This project auto deploys to Vercel on every push to the main branch on GitHub.