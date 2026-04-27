# EasyJobs — Full Stack Job Portal
## Project Report

---

## 1. Overview of the Project

**Project Name:** EasyJobs — Job Portal  
**Type:** Full Stack Web Application  
**Academic Year:** 2025–26

### Description

EasyJobs is a full-stack web-based job portal that connects job seekers with employers. It allows employers to post job listings and job seekers to browse, search, and apply for jobs — all through a clean, responsive interface. The platform handles user authentication securely using JWT tokens and persists data using an H2 file-based database.

### Technology Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 18, React Router v6, Axios, Vite          |
| Backend    | Spring Boot 3.2, Spring Security, Spring Data JPA |
| Database   | H2 (file-based, persistent)                     |
| Auth       | JWT (JSON Web Tokens) via jjwt 0.11.5           |
| Build Tool | Maven (backend), Vite (frontend)                |
| Language   | Java 17 (backend), JavaScript/JSX (frontend)    |

### Project Structure

```
Job portal(Project)/
├── backend/                  ← Spring Boot REST API
│   ├── src/main/java/com/easyjobs/
│   │   ├── controller/       ← AuthController, JobController
│   │   ├── model/            ← User, Job, Application
│   │   ├── repository/       ← JPA Repositories
│   │   ├── service/          ← AuthService, JobService
│   │   ├── security/         ← JwtFilter, JwtUtil
│   │   └── config/           ← SecurityConfig, DataSeeder
│   └── resources/
│       └── application.properties
├── frontend/                 ← React SPA
│   └── src/
│       ├── pages/            ← Home, Jobs, JobDetail, Login, Register, PostJob, MyApplications
│       ├── components/       ← Navbar, JobCard
│       ├── context/          ← AuthContext
│       └── services/         ← api.js (Axios)
└── database/
    └── setup.sql
```

---

## 2. Objectives

1. **Provide a centralized platform** where employers can post jobs and job seekers can discover opportunities in one place.
2. **Implement secure authentication** using JWT-based login/registration with role-based access (USER / EMPLOYER).
3. **Enable job search and filtering** by keyword and location so users can find relevant listings quickly.
4. **Allow job seekers to apply** directly through the portal by submitting their details and a cover letter.
5. **Track application status** — applicants can view all their submitted applications and their current status (PENDING / REVIEWED / ACCEPTED / REJECTED).
6. **Demonstrate full-stack integration** — a React frontend communicating with a Spring Boot REST API backed by a persistent database.

---

## 3. Functional Requirements

### 3.1 User Authentication

| ID   | Requirement                                                                 |
|------|-----------------------------------------------------------------------------|
| FR-1 | Users must be able to register with name, email, password, and role (USER or EMPLOYER). |
| FR-2 | Registered users must be able to log in using email and password.           |
| FR-3 | On successful login, the system must return a JWT token valid for 24 hours. |
| FR-4 | The JWT token must be attached to all protected API requests automatically. |
| FR-5 | Passwords must be stored in hashed form (BCrypt).                           |

### 3.2 Job Listings

| ID    | Requirement                                                                 |
|-------|-----------------------------------------------------------------------------|
| FR-6  | Any visitor (unauthenticated) must be able to browse all job listings.      |
| FR-7  | Users must be able to search jobs by keyword (title/company) and location.  |
| FR-8  | Each job listing must display: title, company, location, salary, job type, description, requirements, and posted date. |
| FR-9  | Authenticated employers must be able to post new job listings.              |
| FR-10 | Job listings must be stored persistently in the database.                   |

### 3.3 Job Applications

| ID    | Requirement                                                                 |
|-------|-----------------------------------------------------------------------------|
| FR-11 | Authenticated users (job seekers) must be able to apply for any job.        |
| FR-12 | The application form must collect: applicant name, email, phone, and cover letter. |
| FR-13 | Each application must be linked to the applying user and the target job.    |
| FR-14 | Application status must default to PENDING on submission.                   |
| FR-15 | Users must be able to view all their own submitted applications.             |
| FR-16 | Employers must be able to view all applications received for a specific job. |

### 3.4 Navigation & Pages

| ID    | Requirement                                                                 |
|-------|-----------------------------------------------------------------------------|
| FR-17 | The app must have a persistent Navbar showing relevant links based on auth state. |
| FR-18 | The Home page must provide an entry point with a call-to-action to browse jobs. |
| FR-19 | The Jobs page must list all available jobs with search/filter controls.     |
| FR-20 | Clicking a job card must navigate to a Job Detail page with full information and an Apply button. |

---

## 4. Flow Diagram

### 4.1 User Registration & Login Flow

```
[User visits site]
        |
        v
[Clicks Register]
        |
        v
[Fills: Name, Email, Password, Role]
        |
        v
[POST /api/auth/register]
        |
   +---------+
   | Valid?  |
   +---------+
    Yes |       No
        |         \
        v          v
[User saved    [Error shown
 to DB with     to user]
 hashed pwd]
        |
        v
[JWT token returned]
        |
        v
[Token stored in localStorage]
        |
        v
[User redirected to Home / Jobs]
```

---

### 4.2 Job Search & Apply Flow

```
[User opens Jobs page]
        |
        v
[GET /api/jobs?keyword=&location=]
        |
        v
[Job listings displayed as cards]
        |
        v
[User clicks a Job Card]
        |
        v
[GET /api/jobs/{id}]
        |
        v
[Job Detail page shown]
        |
        v
[User clicks "Apply Now"]
        |
   +------------------+
   | Logged in?       |
   +------------------+
    Yes |       No
        |         \
        v          v
[Application    [Redirected
 form shown]     to Login]
        |
        v
[Fills: Name, Email, Phone, Cover Letter]
        |
        v
[POST /api/jobs/{id}/apply  (JWT in header)]
        |
        v
[Application saved → Status: PENDING]
        |
        v
[Success message shown to user]
```

---

### 4.3 Employer Post Job Flow

```
[Employer logs in]
        |
        v
[Navigates to "Post Job"]
        |
        v
[Fills: Title, Company, Location,
        Salary, Job Type, Description,
        Requirements]
        |
        v
[POST /api/jobs  (JWT in header)]
        |
        v
[Job saved to database]
        |
        v
[Job appears in listings immediately]
```

---

### 4.4 System Architecture Flow

```
  [Browser — React SPA]
         |
         |  HTTP/REST (JSON)
         v
  [Spring Boot API — port 8080]
         |
    +----+----+
    |         |
    v         v
[AuthController]  [JobController]
    |                   |
    v                   v
[AuthService]      [JobService]
    |                   |
    v                   v
[UserRepository]  [JobRepository / ApplicationRepository]
    |                   |
    +----+----+---------+
              |
              v
      [H2 File Database]
      (easyjobsdb.mv.db)
```

---

## 5. Page Layout

### 5.1 Navbar
- Logo / brand name on the left
- Navigation links: Home | Jobs | Post Job (employer only)
- Right side: Login / Register (guest) OR My Applications + Logout (logged in)

### 5.2 Home Page (`/`)
- Hero section with headline and "Browse Jobs" CTA button
- Brief description of the platform

### 5.3 Jobs Page (`/jobs`)
- Search bar with keyword and location inputs
- Grid/list of `JobCard` components
- Each card shows: Job Title, Company, Location, Salary, Job Type, Posted Date

### 5.4 Job Detail Page (`/jobs/:id`)
- Full job information: title, company, location, salary, type, description, requirements
- "Apply Now" button → opens application form
- Application form fields: Name, Email, Phone, Cover Letter

### 5.5 Post Job Page (`/post-job`)
- Form fields: Title, Company, Location, Salary, Job Type, Description, Requirements
- Submit button → calls POST /api/jobs

### 5.6 Login Page (`/login`)
- Email and password fields
- Submit → POST /api/auth/login → stores JWT in localStorage

### 5.7 Register Page (`/register`)
- Name, Email, Password, Role (USER / EMPLOYER) fields
- Submit → POST /api/auth/register

### 5.8 My Applications Page (`/my-applications`)
- Table/list of all applications submitted by the logged-in user
- Columns: Job Title, Company, Applied Date, Status (PENDING / REVIEWED / ACCEPTED / REJECTED)

---

## 6. Limitations

| #  | Limitation                                                                                      |
|----|--------------------------------------------------------------------------------------------------|
| 1  | **No resume upload** — applicants can only submit a text cover letter; file attachments are not supported. |
| 2  | **No employer dashboard** — employers cannot update application statuses (ACCEPTED/REJECTED) through the UI; status management is backend-only. |
| 3  | **H2 database** — the project uses an H2 file-based database suitable for development/demo only; it is not production-grade. |
| 4  | **No email notifications** — neither applicants nor employers receive email alerts on application submission or status changes. |
| 5  | **No pagination** — all jobs and applications are fetched at once; performance may degrade with large datasets. |
| 6  | **No role enforcement on frontend** — any logged-in user can navigate to `/post-job`; role-based route guarding is minimal. |
| 7  | **No profile management** — users cannot update their name, email, or password after registration. |
| 8  | **Single admin role** — there is no admin panel to manage users, jobs, or applications globally. |
| 9  | **No OAuth / social login** — only email/password authentication is supported. |
| 10 | **CORS limited to localhost** — the backend only allows requests from `http://localhost:3000`, making deployment require additional configuration. |

---

## 7. API Endpoints Summary

| Method | Endpoint                    | Auth Required | Description                        |
|--------|-----------------------------|---------------|------------------------------------|
| POST   | /api/auth/register          | No            | Register a new user                |
| POST   | /api/auth/login             | No            | Login and receive JWT token        |
| GET    | /api/jobs                   | No            | Get all jobs (with optional filters)|
| GET    | /api/jobs/{id}              | No            | Get a single job by ID             |
| POST   | /api/jobs                   | Yes           | Post a new job listing             |
| POST   | /api/jobs/{id}/apply        | Yes           | Apply for a job                    |
| GET    | /api/jobs/{id}/applications | Yes           | Get all applications for a job     |
| GET    | /api/jobs/my-applications   | Yes           | Get current user's applications    |

---

*Report prepared for Full Stack Development — Academic Year 2025–26*
