# CRM Opportunity Tracker

A secure full-stack CRM opportunity tracker built to satisfy the CEO Factory Full Stack Developer assignment.
The app includes user authentication, authorization, and a shared sales pipeline for tracking opportunities.

## Key Features
- Secure user registration and login with JWT authentication
- Password hashing with bcrypt
- Ownership-based access control for update and delete actions
- Shared opportunity pipeline across all authenticated users
- Opportunity fields: customer, contact, requirement, deal value, stage, priority, follow-up date, notes
- Backend validation with express-validator
- Frontend form validation, loading states, and professional UI styling
- Optional email welcome notification via Nodemailer

## Project Structure
- `backend/` — Node.js, Express, MongoDB, JWT auth, routes, controllers, models, middleware
- `frontend/` — Vite, React, Tailwind CSS, framer-motion, protected routes, dashboard pages

## Backend Routes
- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — authenticate and receive JWT
- `GET /api/opportunities` — fetch all opportunities (authenticated)
- `POST /api/opportunities` — create a new opportunity (authenticated)
- `PUT /api/opportunities/:id` — update an opportunity you own
- `DELETE /api/opportunities/:id` — delete an opportunity you own

## Frontend Pages
- `/login` — sign in to the application
- `/register` — create a new account
- `/dashboard` — view and manage opportunities

## Setup
1. Copy environment variables:
   - `backend/.env.example` → `backend/.env`
2. Install dependencies from the repository root:
   ```bash
   npm run install-all
   ```
3. Start backend and frontend together:
   ```bash
   npm run dev
   ```

## Environment Variables
Create `backend/.env` with values similar to:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/crm-tracker
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=2h
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=your-email-password
```

## Notes
- The frontend uses `localStorage` to store the JWT token.
- All opportunity APIs require `Authorization: Bearer <token>` header.
- The backend enforces ownership rules before updating or deleting opportunities.
- If email config is not provided, registration still works but welcome email is skipped.

## Deployment
### Backend on Render
1. Create a new Web Service on Render and connect your GitHub repo.
2. Set the root directory to `backend`.
3. Use build command:
   ```bash
   npm install
   ```
4. Use start command:
   ```bash
   npm run start
   ```
5. Add environment variables in Render:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a strong secret
   - `JWT_EXPIRES_IN` = `2h`
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` if you want email support

### Frontend on Vercel
1. Create a new project on Vercel and connect your GitHub repo.
2. Set the root directory to `frontend`.
3. Use build command:
   ```bash
   npm run build
   ```
4. Set output directory to:
   ```bash
   dist
   ```
5. Add environment variable:
   - `VITE_API_BASE_URL` = `https://<your-render-backend-url>/api`

### Production API URL
In production, the frontend uses `VITE_API_BASE_URL` to communicate with the backend.
If not set, it falls back to `/api`, which is only suitable for local development with Vite proxy.
