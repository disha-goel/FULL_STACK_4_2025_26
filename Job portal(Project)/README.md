# EasyJobs Portal — Full Stack

React + Spring Boot + MySQL job portal with Login, Register, Apply for Jobs.

---

## Features
- Register / Login with JWT authentication
- Browse & search jobs
- Apply for jobs (saved to database with your account)
- My Applications dashboard
- Post new jobs
- MySQL persistent database

---

## Step 1 — Setup MySQL Database

1. Open **MySQL Workbench** or **MySQL CLI**
2. Run:
```sql
CREATE DATABASE easyjobsdb;
```
3. Open `backend/src/main/resources/application.properties`
4. Update your MySQL password:
```properties
spring.datasource.password=your_mysql_password
```

---

## Step 2 — Run Backend

```bash
cd backend
mvn spring-boot:run
```
Runs at: http://localhost:8080

---

## Step 3 — Run Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:3000

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/jobs | No | List/search jobs |
| GET | /api/jobs/:id | No | Job detail |
| POST | /api/jobs | Yes | Post a job |
| POST | /api/jobs/:id/apply | Yes | Apply for job |
| GET | /api/jobs/my-applications | Yes | My applications |

---

## Database Tables (auto-created by Spring Boot)

- `users` — id, name, email, password, role
- `jobs` — id, title, company, location, salary, job_type, description, requirements, posted_date
- `applications` — id, applicant_name, email, phone, cover_letter, status, applied_date, job_id, user_id
