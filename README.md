# Lokmangal Foundation Website

The website for **Lokmangal Foundation** (लोकमंगल फाउंडेशन), a registered
charitable trust in Solapur, Maharashtra. Fully bilingual (English/Marathi),
with a content-managed backend so the foundation's staff can update gallery
photos, testimonials, team members, projects, and events without touching
code.

## Tech Stack

**Frontend** (`frontend/`)
- React 19 + Vite
- Tailwind CSS v4 (CSS-first `@theme`, see `src/index.css` for the brand
  palette and fonts)
- React Router v7 (client-side routing, bilingual URL scheme)
- React Hook Form (contact form, admin content forms)
- Axios (API client)
- `motion` (animations — hero slider, mobile menu)
- `lucide-react` (icons)
- `react-helmet-async` (per-page `<title>`/meta tags)

**Backend** (`backend/`)
- Node.js (ESM) + Express 4
- Sequelize 6 — SQLite for local development (zero setup), MySQL
  (`mysql2`) for production
- JWT (`jsonwebtoken`) + `bcrypt` for admin authentication, via an
  httpOnly cookie
- `multer` for image/PDF uploads
- `express-validator` for request validation
- `express-rate-limit` (login throttling) + `helmet` + `cors` +
  `cookie-parser`
- `node-cron`, `nodemailer` — installed for future use (not currently
  wired to a feature)

## Project Structure

```
lokfoundwebsite/
  frontend/
    public/                # favicon and other static passthrough files
    src/
      assets/images/       # all site imagery, PDFs (award documents)
      components/
        layout/            # Navbar, Footer, Layout, SocialIcons
        ui/                # SectionTitle, PageBanner, loading/error states
      pages/                # one component per public route
      admin/                # admin panel: auth, layout, CRUD screens
      i18n/                 # en.js / mr.js — all static bilingual copy
      lib/                  # LanguageContext, axios instance, small hooks
      App.jsx                # route definitions
      main.jsx                # entry point
      index.css                # Tailwind v4 theme tokens (brand colors, fonts)
    vite.config.js              # dev proxy: /api and /uploads -> :4000

  backend/
    src/
      config/database.js    # Sequelize instance (dialect from env)
      models/                # AdminUser, GalleryImage, Testimonial,
                              # TeamMember, Project, Event
      routes/                # auth.js + one file per content type
                              # (crudFactory.js provides the shared
                              # list/create/update/delete logic)
      middleware/             # JWT auth guard, multer upload config,
                               # login rate limiter
      seed.js                  # populates the database with the site's
                                # real content (not placeholder data)
      app.js / server.js
    uploads/                # multer's upload destination (gitignored;
                             # served at /uploads)
    data/                   # SQLite database file (gitignored)
```

## Features

- Every page in English and Marathi: Home, About, Contact, Contribute,
  FAQ, Gallery, Projects (listing + 4 detail pages), Testimonials,
  Volunteer, Privacy Policy.
- Gallery, Testimonials, Team (on the About page), and Projects/Events
  sections are fetched live from the API — editing them in the admin
  panel updates the public site immediately, including the Home page
  previews.
- Admin panel (`/admin`) — session-authenticated CRUD for all five
  content types, with image/PDF upload.
- A catch-all route resolves project pages created or renamed through
  the admin panel (their slugs aren't known at build time) and shows a
  proper 404 for anything else, in the visitor's language.
- Responsive down to ~360px; verified with zero console errors and no
  horizontal overflow across every page at mobile and desktop widths.

## Prerequisites

- Node.js 20+ (developed against v24)
- npm
- No database server required for local development — SQLite is used
  automatically. See [Switching to MySQL](#switching-to-mysql) for
  production.

## Getting Started

Clone the repo, then set up the backend and frontend (two separate
projects, each with its own `package.json`).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed    # creates the SQLite DB and fills it with the real site content
npm run dev     # starts the API on http://localhost:4000
```

`npm run seed` also creates the admin login using `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD` from `.env` (defaults are placeholders — change
them in `.env` before seeding a real deployment). Re-running `seed`
wipes and recreates all tables, so only run it once per environment
(or when you deliberately want to reset to the seed content).

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev     # starts Vite on http://localhost:5173
```

Vite proxies `/api/*` and `/uploads/*` to the backend on `:4000` (see
`vite.config.js`), so the frontend dev server is the one URL you need:
**http://localhost:5173**.

### 3. Log in to the admin panel

Visit **http://localhost:5173/admin/login** and sign in with the
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` you set before seeding.

## Environment Variables

All in `backend/.env` (see `backend/.env.example`); none are needed on
the frontend since it only ever talks to `/api` (proxied in dev, same
origin in production).

| Variable | Purpose |
|---|---|
| `PORT` | API port (default `4000`) |
| `NODE_ENV` | `development` or `production` — controls the secure-cookie flag and whether Express serves the built frontend |
| `DB_DIALECT` | `sqlite` (default, local dev) or `mysql` (production) |
| `DB_STORAGE` | SQLite file path, used only when `DB_DIALECT=sqlite` |
| `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD` | MySQL connection, used only when `DB_DIALECT=mysql` |
| `JWT_SECRET` | Signing secret for admin session tokens — **must** be changed to a long random string for any real deployment |
| `JWT_EXPIRES_IN` | Admin session lifetime (default `7d`) |
| `CORS_ORIGIN` | Allowed origin for API requests (the frontend dev server URL) |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Admin login created by `npm run seed` |

## Admin Panel

`/admin` — dashboard with five management screens:

| Section | Manages |
|---|---|
| Gallery | The 48 photos shown on the Gallery page, tagged by project category |
| Testimonials | Supporter quotes shown on Home and the Testimonials page |
| Team | Board members shown on the About page |
| Projects | The four core initiatives — title, summary, full bilingual article (Objective / Why & How), stat badge, video, cover image |
| Events | Past events and awards, with an optional PDF attachment |

Every field has separate English and Marathi inputs where the site
shows bilingual content. Uploaded files are stored in `backend/uploads/`
and served at `/uploads/<filename>`; deleting or replacing a record's
image cleans up the old file automatically.

## Available Scripts

**Backend** (`backend/`)
| Command | Description |
|---|---|
| `npm run dev` | Start the API with nodemon (auto-restart on change) |
| `npm start` | Start the API without nodemon (production) |
| `npm run seed` | Reset the database and populate it with real site content |

**Frontend** (`frontend/`)
| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `frontend/dist/` |
| `npm run preview` | Preview the production build (note: this does **not** proxy `/api`; use the full production setup below to test the built frontend against the real API) |

## API Overview

All routes are prefixed `/api`. `GET` endpoints are public; write
endpoints require an authenticated admin session (httpOnly cookie).

- `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- `GET /gallery`, `GET /testimonials`, `GET /team`, `GET /projects`, `GET /events`
- Each of those also accepts `POST /`, `PUT /:id`, and `DELETE /:id` on
  the same path (e.g. `PUT /projects/3`) — these require an
  authenticated admin session

## Switching to MySQL

The app runs on SQLite by default so it works with zero setup. To use
MySQL instead (recommended for production):

1. Create a database and user in MySQL.
2. In `backend/.env`, set:
   ```
   DB_DIALECT=mysql
   DB_HOST=<host>
   DB_PORT=3306
   DB_NAME=<database>
   DB_USER=<user>
   DB_PASSWORD=<password>
   ```
3. Run `npm run seed` again to create the schema and content in MySQL.

No code changes are needed — `backend/src/config/database.js` picks
the dialect from `DB_DIALECT` at startup.

## Building for Production

Express is set up to serve the built frontend and the API from a
single origin (no CORS, and admin session cookies work without any
extra configuration):

```bash
cd frontend && npm run build      # outputs frontend/dist/
cd ../backend
NODE_ENV=production npm start     # serves the built frontend + /api together
```

## License

Private — property of Lokmangal Foundation.
