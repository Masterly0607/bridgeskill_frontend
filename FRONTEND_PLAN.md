# Frontend Plan

## Roles
- Public
- Student (roleId = 2)
- Client (roleId = 3)
- Admin (roleId = 1)

## Public Pages
- /
- /jobs
- /jobs/[id]
- /login
- /register

## Student Pages
- /student/dashboard
- /student/profile
- /student/applications
- /student/applications/[id]

## Client Pages
- /client/dashboard
- /client/profile
- /client/jobs
- /client/jobs/new
- /client/jobs/[id]/edit
- /client/jobs/[id]/applications

## Admin Pages
- /admin/dashboard
- /admin/applications

## Services
- auth.service.js
- jobs.service.js
- student-profile.service.js
- client-profile.service.js
- applications.service.js
- admin.service.js