# EduERP: Student Portal

A simple, modern college ERP web app for **students**, built with React and Vite.
It gives a student one place to see attendance, timetable, assignments, results and study
materials. The app opens straight on the student dashboard, with no login page.

**Live demo:** https://edu-erp-gamma.vercel.app
**Source code:** https://github.com/arpitvermma/EduErp

> **Scope of this version:** this is a student-only, front-end project. There is no login page and
> no Admin or Faculty role. Multi-role sign up (Student, Faculty, Admin) with role-based dashboards
> is planned as a future upgrade.

---

## Features

The app opens as the demo student **Aryan Gupta (CS2021001)** and has these sections under
**Academics**:

| Section | What the student can do |
| --- | --- |
| **Dashboard** | See stats, today's timetable, pending assignments, attendance progress and the latest notices |
| **My Attendance** | See overall and subject-wise attendance, with a chart and a warning below 75% |
| **Timetable** | View the weekly class schedule |
| **Assignments** | See pending and submitted assignments, and submit one (mock upload) |
| **Results** | See subject-wise marks and grades with SGPA and CGPA, and download the result (mock) |
| **Study Materials** | Browse and download notes and materials (mock download) |
| **Settings & Profile** | View and edit personal details, and switch light or dark mode |

**Interface**
- Clean dashboard layout with a collapsible sidebar
- Light and dark mode, remembered between visits
- Interactive charts with Recharts
- Toast messages for actions
- Notification centre with unread markers
- Responsive layout for desktop and mobile

---

## Tech stack

- **React 19** with **Vite** (build tool and dev server)
- **React Router DOM** for client-side routing
- **Context API** for global state
- **Recharts** for charts
- **Lucide React** for icons
- **React Hot Toast** for notifications
- Plain **CSS** with variables for theming

---

## Getting started

You need [Node.js](https://nodejs.org) (LTS version) installed.

```bash
# 1. Install the dependencies
npm install

# 2. Start the development server
npm run dev
```

Open the address shown in the terminal, usually `http://localhost:5173`.

To make a production build:

```bash
npm run build
npm run preview
```

---

## Project structure

```
src/
  components/
    layout/      Sidebar, Topbar, DashboardLayout
    ui/          Reusable UI pieces (Modal, StatCard, Badge, Tabs, ...)
  context/
    AppContext.jsx   Global state: demo student, theme, notifications, data
  data/
    mockData.js      Sample data used by the app
  pages/
    student/         Dashboard, Attendance, Assignments, Results,
                     Study Materials, Timetable, Profile
  App.jsx            Routes
  main.jsx           Entry point
  index.css          Global styles and design tokens
```

---

## How it works

- There is **no login**. `/` redirects to `/student`, and the app always runs as the demo student
  defined in `src/context/AppContext.jsx`.
- All data comes from `src/data/mockData.js` and is held in memory through React Context. There is
  **no backend and no database**, so changes reset when the page is refreshed.
- The dark mode choice is saved in the browser's `localStorage`.
- Uploads, downloads and payments are simulated with toast messages.

---

## Deployment

The project is deployed on **Vercel**. To deploy your own copy:

1. Push the project to GitHub.
2. Import the repository in Vercel (framework preset: **Vite**).
3. Deploy. The included `vercel.json` makes page refreshes work on every route.

---

## Future scope

- Sign up and login with multiple roles (Student, Faculty, Admin) and role-based dashboards
- Faculty tools to mark attendance, upload assignments and enter marks
- A real backend and database with secure authentication
- Online fee payment, library and placement modules
- Email and push notifications for deadlines and low attendance

---

## Author

**Arpit Verma**
GitHub: [@arpitvermma](https://github.com/arpitvermma)
