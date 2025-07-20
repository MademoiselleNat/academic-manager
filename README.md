# Academic manager (React + Tailwind)

A simple academic managing app built with React and TailwindCSS. It lets users:

- View a list of subjects
- Add new subjects with a code and name
- View detailed subject information
- Add and manage schedules (day/time pairs)
- Add and manage assignments (name/due date)
- Edit or delete subjects and their schedules or assignments

This version is frontend-only and does not persist data across page refreshes. A Django REST backend will be added later!

---

## Features

- Clean, responsive UI using TailwindCSS
- Routing with React Router
- Component-based structure (SubjectCard, SubjectForm, SubjectDetail)
- Schedules displayed neatly with dropdowns for day and time
- Assignments listed with due dates in `dd-mm-yyyy` format

---

## Tech Stack

- **React** (Frontend Framework)
- **TailwindCSS** (Styling)
- **React Router** (Routing between pages)

---

## Screenshots

[Subject list](<Screenshot 2025-07-20 235737.png>)
[Subject detail](<Screenshot 2025-07-20 235853.png>)

---

## To-Do!

- Connect to a Django REST backend
- Add localStorage or database persistence
- Add deadline reminders for assignments
- Add to-do lists and pomodero study timers 

---

## Setup Instructions

```bash
git clone https://github.com/YOUR_USERNAME/subject-tracker-react.git
cd subject-tracker-react
npm install
npm run dev   # or npm start, depending on your setup
