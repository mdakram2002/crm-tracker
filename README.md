# CRM Opportunity Tracker

A professional, full-stack CRM opportunity tracker built for the CEO Factory Full Stack Developer assignment. The application provides secure user authentication, a shared sales pipeline, and tools to create, update, and manage sales opportunities.

Live application: https://crm-tracker-opal.vercel.app
Repository: https://github.com/mdakram2002/crm-tracker
Backend API: https://crm-tracker-5r40.onrender.com

---

## Quick Overview

- Secure user registration and login (JWT)
- Ownership-based authorization for editing and deleting opportunities
- Shared opportunity pipeline visible to all authenticated users
- Opportunity fields: customer, contact, requirement, deal value, stage, priority, follow-up date, notes
- Responsive React frontend with Tailwind CSS and framer-motion

---

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, framer-motion, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth & Security: bcrypt (password hashing), JSON Web Tokens (JWT)
- Deployment: Render (backend), Vercel (frontend)

---

## Project Layout

- `backend/` — Express API, auth and opportunity routes, validation, DB connection
- `frontend/` — React app, pages, components, auth context, assets

---

## API Endpoints

- `POST /api/auth/register` — Create a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/opportunities` — List opportunities (auth required)
- `POST /api/opportunities` — Create opportunity (auth required)
- `PUT /api/opportunities/:id` — Update opportunity (owner only)
- `DELETE /api/opportunities/:id` — Delete opportunity (owner only)

---

## Local Setup

1. Copy environment variables:
   - `backend/.env.example` → `backend/.env`

2. Install dependencies from the repository root:

```bash
npm run install-all
```

3. Start both services locally:

```bash
npm run dev
```

### Example `backend/.env`

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/crm-tracker
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=2h
# Optional email settings for welcome emails
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASS=your-email-password
```

---

## Deployment

### Backend (Render)

1. Create a new Web Service on Render and connect this repository.
2. Set the Root Directory to `backend`.
3. Build command:

```bash
npm install
```

4. Start command:

```bash
npm run start
```

5. Set environment variables in Render (at minimum):

- `MONGO_URL` (MongoDB Atlas connection string)
- `JWT_SECRET`
- `JWT_EXPIRES_IN` (e.g. `2h`)

Optional (for email): `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`

### Frontend (Vercel)

1. Create a new project on Vercel and connect this repository.
2. Set the Root Directory to `frontend`.
3. Build command:

```bash
npm run build
```

4. Output Directory: `dist`
5. Add environment variable:

- `VITE_API_BASE_URL` = `https://crm-tracker-5r40.onrender.com/api`

---

## Notes & Best Practices

- The frontend stores the JWT in `localStorage` and sends it in the `Authorization` header for protected requests.
- The backend enforces ownership checks before allowing updates or deletions.
- Do not commit secrets to GitHub — use environment variables for all sensitive values.
- Passwords are hashed with `bcrypt` and never stored in plain text.

## Known Limitations & Future Work

- No pagination or server-side filtering for large lists (planned)
- Additional search and filter UI (planned)
- Unit and integration tests (planned)
- Optional email notifications require SMTP setup (optional)

---

## Contact / Submission

- Live app: https://crm-tracker-opal.vercel.app
- Repository: https://github.com/mdakram2002/crm-tracker
- Backend API: https://crm-tracker-5r40.onrender.com