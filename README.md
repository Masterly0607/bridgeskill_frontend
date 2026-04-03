# BridgeSkill Frontend

BridgeSkill Frontend is the client-side application for the BridgeSkill platform, a full-stack job and internship matching system for **students**, **clients**, and **admins**.

This frontend allows users to register, login, manage profiles, browse jobs, apply for jobs, manage job posts, and monitor platform activity based on role.

## Project Overview

BridgeSkill is designed to solve a real-world problem:
- students need a simple platform to find job or internship opportunities
- companies need a place to post opportunities and review applicants
- admins need a dashboard to monitor activity on the platform

This frontend connects to the BridgeSkill Spring Boot API.

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn/ui
- Axios
- Zustand
- React Hook Form
- Sonner

## Roles

The frontend supports 3 roles:
- **ADMIN**
- **STUDENT**
- **CLIENT**

Role IDs from the backend:
- `1 = ADMIN`
- `2 = STUDENT`
- `3 = CLIENT`

## Main Features

### Public Features
- Landing page
- Login page
- Register page
- Browse jobs
- View job details

### Student Features
- Student dashboard
- Create and update profile
- View own applications
- View application details
- Apply to jobs

### Client Features
- Client dashboard
- Create and update company profile
- Create new job
- Edit job
- View own jobs
- Close job
- View applicants for a job
- Update application status

### Admin Features
- Admin dashboard
- Admin applications page
- Monitoring summary cards

## Project Structure

```text
src
├── app
│   ├── admin
│   ├── client
│   ├── jobs
│   ├── login
│   ├── register
│   └── student
├── components
│   ├── admin
│   ├── applications
│   ├── common
│   ├── jobs
│   ├── profile
│   └── ui
├── hooks
├── lib
├── services
└── store
```

## Important Pages

### Public
- `/`
- `/login`
- `/register`
- `/jobs`
- `/jobs/[id]`

### Student
- `/student/dashboard`
- `/student/profile`
- `/student/applications`
- `/student/applications/[id]`

### Client
- `/client/dashboard`
- `/client/profile`
- `/client/jobs`
- `/client/jobs/new`
- `/client/jobs/[id]/edit`
- `/client/jobs/[id]/applications`
- `/client/jobs/[id]/applications/[applicationId]`

### Admin
- `/admin/dashboard`
- `/admin/applications`

## State Management

This project uses **Zustand** for authentication state.

Main auth store responsibilities:
- save token
- save current user
- restore login state
- logout handling
- role-aware redirects

## API Integration

This frontend uses Axios to communicate with the backend.

Main service files:
- `src/services/auth.service.js`
- `src/services/jobs.service.js`
- `src/services/applications.service.js`
- `src/services/student-profile.service.js`
- `src/services/client-profile.service.js`
- `src/services/admin.service.js`

Axios base configuration is inside:
- `src/lib/axios.js`

## UI Components

The UI is built using reusable components and shadcn/ui style structure.

Examples:
- protected route wrapper
- guest route wrapper
- job cards
- profile forms
- application cards
- status badges
- summary cards

## Form Handling

Forms use **react-hook-form**.

Examples:
- login form
- register form
- student profile form
- client profile form
- job form

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8085
```

## Local Setup

### 1. Clone the project
```bash
git clone <your-frontend-repository-url>
cd brightskill-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
Create `.env.local` and add:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8085
```

### 4. Run development server
```bash
npm run dev
```

### 5. Open in browser
```text
http://localhost:3000
```

## Build for Production

```bash
npm run build
npm run start
```

## Authentication Flow

1. User registers as student or client
2. User logs in
3. JWT token is stored in local storage
4. Auth provider restores session on refresh
5. Protected pages require valid authentication
6. Role-based route logic controls page access

## Suggested Test Flow

### Student
1. Register student account
2. Login
3. Create student profile
4. Browse jobs
5. Apply to a job
6. Open application detail page

### Client
1. Register client account
2. Login
3. Create client profile
4. Create a new job
5. Edit a job
6. View applicants
7. Update application status

### Admin
1. Login as admin
2. Open admin dashboard
3. Check summary cards
4. Open applications management page

## Deployment Notes

Recommended deployment:
- Frontend: Vercel
- Backend: Render / Railway / VPS

Before deployment:
- update `NEXT_PUBLIC_API_BASE_URL` to your deployed backend URL
- make sure backend CORS allows your frontend domain

Example production variable:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com
```

## Notes for Presentation

For demo day, show this simple flow:
1. public user browses jobs
2. student registers and applies
3. client creates job and reviews applicant
4. admin monitors platform summary

This demonstrates:
- frontend implementation
- backend integration
- database relationships
- authentication and authorization
- multi-role business flow

