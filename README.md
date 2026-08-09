# EduERP — College Management System

A modern, full-featured college ERP web application built with **React + Vite**, covering academics, attendance, fees, examinations, assignments, notices, library records, and overall college operations — with separate dashboards for Admin, Faculty, and Students.

## Tech Stack
- **React 19** + **Vite** (build tool / dev server)
- **React Router DOM** — client-side routing, protected routes, dynamic routing
- **Context API** — global state management (auth, theme, data)
- **Recharts** — interactive charts & analytics
- **Lucide React** — icon set
- **React Hot Toast** — toast notifications
- Plain CSS with CSS variables for theming (light/dark mode)

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

### Build for production
```bash
npm run build
npm run preview
```

## Demo Login
On the login page, choose a role (Student / Faculty / Admin) and click **"Use Demo Credentials"**, then **Sign In**. Any password is accepted — this is a fully mocked, front-end-only demo with no real backend.

Demo accounts:

| Role    | Demo ID     | Demo Name        |
|---------|-------------|------------------|
| Student | CS2021001   | Aryan Gupta      |
| Faculty | FAC001      | Dr. Priya Sharma |
| Admin   | ADM001      | Rakesh Mehta     |

## Features

### Landing Page
College introduction, statistics, departments overview, faculty highlights, announcements, and contact information.

### Authentication (Mock)
Role-based login (Student / Faculty / Admin), Remember Me, Forgot Password UI, protected routes per role.

### Admin Dashboard
- Student Management (Add/Edit/Delete/View, search & filter by department/semester)
- Faculty Management (Add/Edit/Delete/View, department & subject allocation)
- Department Management (create/edit/delete, statistics)
- Course Management (credits, semester, faculty allocation)
- Attendance Management & Reports (charts)
- Timetable Management (weekly/daily views)
- Examination Management (schedule, hall, type)
- Result Management (grade analytics, top performers)
- Assignment overview
- Fee Management (collection reports, structure, receipts)
- Library Management (catalog, availability)
- Notice Board (categorized announcements)
- Events Management
- Placement Management (drives, eligibility, registrations)

### Faculty Dashboard
- Take/update attendance (mark all present/absent, per-student toggle)
- Upload assignments with deadlines, track submissions
- Upload study materials / notes
- Enter marks (internal/external, auto-grade calculation)
- View personal teaching schedule
- View notices

### Student Dashboard
- View attendance (overall + subject-wise, with alerts below 75%)
- View timetable (weekly/daily)
- Submit assignments (mock upload)
- View results (SGPA/CGPA calculation, subject-wise breakdown)
- Download study materials
- Pay fees (mock payment flow + receipt)
- Library (catalog browsing + borrowed books)
- Notices & Placements

### UI/UX
- Modern, professional ERP dashboard design
- Light / Dark mode toggle (persisted)
- Fully responsive layout
- Interactive charts (Recharts: area, bar, line, pie)
- Toast notifications for all actions
- Modals for create/edit/delete/view flows
- Search, filters, and tabs throughout
- Notification center with unread indicators

## Project Structure
```
src/
  components/
    layout/        -> Sidebar, Topbar, DashboardLayout, ProtectedRoute
    ui/             -> Reusable UI primitives (Modal, StatCard, Avatar, Badge, etc.)
  context/
    AppContext.jsx  -> Global state (auth, theme, all entity data + CRUD actions)
  data/
    mockData.js     -> All seed/mock data
  pages/
    public/         -> LandingPage, LoginPage
    admin/          -> All admin module pages
    faculty/        -> All faculty module pages
    student/        -> All student module pages
  App.jsx           -> Routes
  main.jsx          -> Entry point
  index.css         -> Global styles & design tokens
```

## Notes
This is a **front-end only demo** — all data is mocked and held in memory via React Context (no backend, no real database). Refreshing the page resets unsaved changes except for login session and dark-mode preference, which are persisted to `localStorage`.
