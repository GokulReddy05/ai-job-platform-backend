# AI Job Search Platform

A backend application built with Node.js and Express that helps job seekers discover jobs, apply for positions, upload resumes, and analyze resume compatibility with job descriptions using Google Gemini AI.

## Features

- **Authentication and Authorization** — JWT-based authentication and role-based access for job seekers and employers.
- **Job Management** — Employers can create jobs, and users can browse job listings and view job details.
- **Job Applications** — Job seekers can apply for jobs and view their applications.
- **Resume Management** — Upload and list PDF and DOCX resumes.
- **Cloud File Storage** — Store resumes in a private Supabase Storage bucket.
- **Resume Text Extraction** — Extract text from PDF and DOCX files and store it in PostgreSQL.
- **AI Resume–Job Matching** — Use Google Gemini to analyze matching skills, missing skills, relevant experience, and improvement suggestions.

## Tech Stack

- **Runtime:** Node.js
- **Backend:** Express.js
- **Language:** JavaScript (ES Modules)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JSON Web Tokens (JWT)
- **File Storage:** Supabase Storage
- **AI Integration:** Google Gemini API
- **File Processing:** `pdf-parse`, `mammoth`

## Prerequisites

- Node.js and npm
- A PostgreSQL database
- A Supabase project with a private `resumes` storage bucket
- A Google Gemini API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GokulReddy05/ai-job-platform-backend.git
   cd ai-job-platform-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure the required environment variables:

   ```env
   DATABASE_URL="your_database_connection_string"
   JWT_SECRET="your_jwt_secret"
   SUPABASE_URL="your_supabase_project_url"
   SUPABASE_SECRET_KEY="your_supabase_secret_key"
   GEMINI_API_KEY="your_gemini_api_key"
   ```

   Replace the placeholder values with your own credentials. Never commit your `.env` file.

4. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

5. Start the development server using your configured npm script:

   ```bash
   npm run dev
   ```

The API runs on port `3000` if configured with that port.

## AI Resume–Job Matching

The matching endpoint accepts a resume ID and a job ID. The backend verifies resume ownership, retrieves the extracted resume text and published job description, and sends both to Gemini for analysis.

Example request:

```http
POST /ai/match
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

```json
{
  "resumeId": "YOUR_RESUME_UUID",
  "jobId": "YOUR_JOB_UUID"
}
```

The expected analysis includes:

- Match score
- Matching skills
- Missing skills
- Relevant experience
- Improvement suggestions

## API Endpoints

The following endpoints reflect the implemented features; confirm the exact route prefixes and authentication requirements in the source code.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/ai/match` | Analyze a resume against a job |
| POST | `/documents` | Upload a resume |
| GET | `/documents` | List the user's resumes |
| POST | `/jobs` | Create a job |
| GET | `/jobs` | List jobs |
| GET | `/jobs/:id` | Retrieve a job's details |
| POST | `/applications` | Apply for a job |
| GET | `/applications/my-applications` | List the user's applications |

## Security Notes

- Keep API keys, database credentials, and JWT secrets out of source control.
- Resume access should be restricted to the owning user.
- Keep the Supabase resume bucket private.
- Validate request data and handle errors safely.
- Configure production environment variables separately from local development.

## Future Improvements

- Centralized error handling and request validation
- Employer applicant management and application status updates
- Job search filters, sorting, and pagination
- AI match history
- Automated testing and deployment

## License

No license has been specified yet.
