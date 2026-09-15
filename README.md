# Lokmangal Foundation Website

This repository contains the website for **Lokmangal Foundation** (लोकमंगल फाउंडेशन).

## Features
- Complete bilingual support (English & Marathi)
- Dedicated pages for all core initiatives:
  - Lokmangal Annapoorna Yojana (अन्नपूर्णा योजना)
  - Jalsandharan Project (जलसंधारण प्रकल्प)
  - LOTUS / Vidyadaan Yojana (विद्यादान योजना)
  - Samudayik Vivah Sohala (सामुदायिक विवाह सोहळा)
  - Lokmangal Shikshakratna Puraskar (शिक्षकरत्न पुरस्कार)
- Admin panel for managing gallery, testimonials, team members, and projects/events
- Mobile-responsive design

## Project Structure
- `frontend/` — React 19 + Vite + Tailwind CSS v4 single-page app. Bilingual routing:
  English at `/`, Marathi at `/mr/*`.
- `backend/` — Node.js + Express API (ESM) with Sequelize. Uses SQLite for local
  development (no install needed) and MySQL in production — see `backend/.env.example`.

## Running Locally

Two servers, run in separate terminals:

```bash
# Backend (API on :4000)
cd backend
npm install
cp .env.example .env
npm run dev
```

```bash
# Frontend (Vite dev server on :5173, proxies /api to the backend)
cd frontend
npm install
npm run dev
```

Then visit `http://localhost:5173`.

## Status

This is a full rewrite in progress from the previous static HTML site (still
recoverable from git history). Current state:
- Home page fully ported with real content, bilingual, responsive.
- Navbar/Footer/routing shell in place for every page.
- Backend skeleton running (Express + Sequelize/SQLite), health-checked.
- Remaining pages, the admin panel, and the dynamic (DB-backed) gallery/testimonials/team/projects sections are still to be built.
