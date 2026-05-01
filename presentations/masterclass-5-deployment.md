# 🚀 Masterclass 5: From Code to Cloud
### Connecting Frontend & Backend, Deployment, Cloud Basics & Launching Live Apps
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — The Final Masterclass

### Where We Are
After 4 masterclasses, the SkillPath AI project has two completely built halves:
- ✅ **Frontend (React)** — A beautiful, professional UI with all pages, components, and state management
- ✅ **Backend (Node/Express)** — A fully functional REST API with JWT auth, all routes, and AI integration
- ✅ **Database (MongoDB)** — All schemas defined and connected to Atlas

### The One Missing Piece
The frontend and backend are NOT talking to each other yet. If you click "Login" on the website, nothing happens except a console.log. If you generate a roadmap, no data goes to MongoDB.

### MC5 Goals

1. **Wire the Frontend to the Backend** — Replace every console.log with real API calls using Axios
2. **Build Custom React Hooks** — Clean, reusable functions that manage all API state
3. **Configure Axios** — A single, pre-configured API client for the entire frontend
4. **Deploy the Backend to Render** — Go live with the Node.js server
5. **Deploy the Frontend to Vercel** — Go live with the React app
6. **Connect Both Services** — Configure CORS and environment variables
7. **Test End-to-End** — Verify every feature works in production

---

## 📌 Slide 2 — How Frontend and Backend Communicate

### The Communication Pattern: HTTP + JSON
Every piece of data flowing between the React frontend and the Express backend follows this pattern:

1. **User does something** in the React app (fills a form, clicks a button)
2. **React makes an HTTP request** using Axios (like sending a digital letter to the server)
3. **Express receives the request**, runs the appropriate controller, talks to MongoDB and/or AI
4. **Express sends back a JSON response** (a structured data object)
5. **React receives the response** and updates the UI state
6. **React re-renders** the component to show the new data

### What is Axios?
**Axios** is a JavaScript library for making HTTP requests from a browser or Node.js. It's the "messenger" that carries data between the frontend and backend.

Compared to the browser's built-in `fetch()` API, Axios:
- Automatically converts JSON (no need to call `.json()` on the response)
- Has built-in interceptors (can intercept every request/response)
- Better error handling with meaningful error objects
- Supports request cancellation
- Handles cookies automatically when `withCredentials: true` is set

### File: `frontend/src/utils/axios.js`
This is the most important connection file in the frontend. It creates ONE shared Axios instance that every component and hook uses. This instance is pre-configured with:

- **`baseURL`** — The backend API URL. Reads from `VITE_API_URL` environment variable in production, falls back to `http://localhost:5001/api` in development.
- **`withCredentials: true`** — Tells the browser to include cookies in every request (ESSENTIAL for JWT auth to work)
- **Content-Type header** — Tells the server every request body is JSON

**The Interceptor:** The Axios instance also has a **response interceptor** — a function that runs automatically on every response. If the server returns a `401 Unauthorized` status (meaning the JWT has expired or is missing), the interceptor automatically redirects the user to the Login page. Users will never see a confusing error — they just get sent to login.

---

## 📌 Slide 3 — Custom React Hooks: The Integration Layer

### Definition
A **Custom Hook** is a JavaScript function that starts with `use` and uses React's built-in hooks internally. Custom hooks let you extract complex stateful logic out of components so that the logic is reusable and the component stays clean and readable.

### Real World Analogy
Think of a custom hook as a **specialized assistant**. Instead of your manager (the component) making 20 phone calls themselves, they assign a dedicated assistant (the custom hook) to handle all the calls, track the results, and report back. The manager just asks "what's the status?" and the assistant handles everything.

### Without Custom Hooks
A component would need to:
- Declare state for roadmap data, progress data, loading status, error status
- Write `useEffect` to fetch data on mount
- Write handler functions for marking steps, regenerating, getting lessons
- All of this logic repeats in every component that needs roadmap data

### With Custom Hooks
The component just calls `const { roadmap, progress, markStep, getLesson } = useRoadmap()` — one line — and gets everything it needs. Clean, readable, reusable.

---

## 📌 Slide 4 — The `useRoadmap` Hook

### File: `frontend/src/hooks/useRoadmap.js`

This hook manages ALL state and API calls related to the user's roadmap.

### What It Does
- **On mount:** Automatically fetches the user's roadmap and progress from `GET /api/roadmaps/me`
- **Provides `roadmap`** — The roadmap object from MongoDB (or `null` if none exists)
- **Provides `progress`** — The progress tracker (completedSteps array, percentComplete, streak)
- **Provides `isLoading`** — `true` while the API call is in flight, `false` when done
- **Provides `markStep(stepNumber, completed)`** — Calls `PUT /api/progress/step` to mark a step done/undone, then updates local state
- **Provides `regenerate(goal, level, weeklyHours)`** — Calls `POST /api/roadmaps/regenerate` to ask the AI to create a new roadmap
- **Provides `getLesson(topic, description)`** — Calls `POST /api/learning/lesson` to fetch an AI mini-lesson
- **Provides `getQuiz(topic, description)`** — Calls `POST /api/learning/quiz` to generate an AI quiz

### How It's Used in `RoadmapPage.jsx`
The Roadmap page just calls this one hook and uses all the returned values directly. The page component contains zero direct API calls — they're all inside the hook.

---

## 📌 Slide 5 — The `useChat` Hook

### File: `frontend/src/hooks/useChat.js`

Manages the AI chat conversation.

### What It Does
- **`messages`** — An array of all chat messages (both user's and AI's), initialized with a greeting from the AI
- **`isTyping`** — `true` while waiting for the AI to respond (shows the animated typing indicator)
- **`sendMessage(text)`** — The main function:
  1. Immediately adds the user's message to the chat (Optimistic UI)
  2. Sets `isTyping = true`
  3. Sends `POST /api/chat` with the message
  4. When the AI responds, adds its message to the chat
  5. Sets `isTyping = false`
- **`newChat()`** — Resets the messages array to just the initial greeting

### What is Optimistic UI?
**Optimistic UI** is the pattern of updating the UI immediately with the user's action BEFORE the server confirms it. In the chat, your message appears in the chat window instantly — you don't wait for the server to respond first. This makes the app feel instant and responsive. If the server fails, the UI reverts.

---

## 📌 Slide 6 — The `useProgress` Hook

### File: `frontend/src/hooks/useProgress.js`

A simpler hook for reading progress data independently (used on the Dashboard).

### What It Does
- Fetches progress from `GET /api/progress/me`
- Provides `progress` (completedSteps, percentComplete, streak, totalSteps)
- Provides `isLoading`

---

## 📌 Slide 7 — The Roadmap Page: Full Feature Walkthrough

### File: `frontend/src/pages/RoadmapPage.jsx`

This is the most feature-rich page in the application.

### What the Page Shows and Does

**Header Section:**
- The roadmap goal (e.g., "React Development")
- Skill level badge (Beginner / Intermediate / Advanced)
- AI Generated badge (✨ if AI created it)
- A "Regenerate" button — opens a confirmation, then calls `regenerate()` from the hook

**Progress Section:**
- A horizontal ProgressBar showing overall completion percentage
- Text: "X of Y steps completed · Est. Z weeks"

**Roadmap Steps (Timeline):**
Each step card displays:
- Step number (or a checkmark if completed)
- Step title and description
- Duration badge and resource tags
- A checkbox to mark done/undone (calls `handleToggle`)
- For incomplete steps: "📖 Learn Now" and "🧠 Test Knowledge" buttons

**When "Learn Now" is clicked:**
1. Loading state activates on that button
2. Calls `getLesson(step.title, step.description)` from the hook
3. Groq AI generates a mini-lesson in ~2 seconds
4. `LessonModal` opens showing the AI-generated lesson in formatted markdown

**When "Test Knowledge" is clicked:**
1. Calls `getQuiz(step.title, step.description)`
2. Groq AI generates 3 multiple-choice questions
3. `QuizModal` opens with the interactive quiz

---

![SkillPath AI Roadmap Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\roadmap_1777288420155.png)
*The Roadmap Page — Timeline of AI-generated steps with Learn and Quiz features*

---

## 📌 Slide 8 — AI Learning Features: Lesson Modal

### File: `frontend/src/components/learning/LessonModal.jsx`

Opens when a student clicks "📖 Learn Now" on any roadmap step.

### What the Lesson Modal Shows
- **Modal title** — The step topic name
- **Lesson content** — The AI-generated lesson rendered as **formatted Markdown**
  - Uses the `react-markdown` library to convert markdown text to HTML
  - Headings, bullet points, code blocks, and bold text all render properly
- A close button to dismiss the modal

### What the AI Generates Inside the Lesson
The Groq AI is prompted to structure every lesson with:
1. A 1-sentence clear summary of the topic
2. 3–4 bullet points covering core concepts
3. A practical code example or real-world analogy
4. A "Pro Tip" for going further

### File: `frontend/src/components/learning/QuizModal.jsx`

Opens when a student clicks "🧠 Test Knowledge".

### What the Quiz Modal Shows
- **Modal title** — The step topic name
- **3 questions** — Displayed one by one (or all at once depending on implementation)
- **4 answer options per question** — Displayed as clickable buttons
- **Instant feedback** — When you select an answer:
  - Correct answer: button turns **green** with a success message
  - Wrong answer: selected button turns **red**, correct answer highlighted in green
  - An explanation is shown below the options
- **Pass/Fail detection** — If you score 2/3 or higher (70%):
  - A congratulations message appears
  - A "✅ Mark This Step Complete!" button appears — clicking it marks the step as done in the database

---

## 📌 Slide 9 — The Full Data Flow: Visualized

### From Click to Screen: A Step-by-Step Journey

When a student clicks "Generate Roadmap" after completing onboarding:

1. **OnboardingPage** collects `goal`, `level`, `weeklyHours`
2. **Axios** sends a POST request to `/api/roadmaps/regenerate`
3. **Express Router** (`roadmapRoutes.js`) matches the URL and runs `protect` middleware
4. **`protect` middleware** reads the JWT cookie, verifies it, attaches `req.user`
5. **`roadmapController.js`** receives the request
6. **`aiService.js`** calls the Groq API with a carefully crafted prompt
7. **Groq's LLaMA 3.3 70B model** generates a structured JSON roadmap
8. **`roadmapController.js`** saves the roadmap to **MongoDB Atlas**
9. **Express** sends the roadmap JSON back to Axios
10. **`useRoadmap` hook** receives the data and calls `setRoadmap(data.roadmap)`
11. **React re-renders** `RoadmapPage` with the new roadmap data
12. **Student sees** their personalized AI roadmap on screen ✅

---

## 📌 Slide 10 — Helper Utilities: Frontend

### File: `frontend/src/utils/helpers.js`

A collection of small utility functions used across multiple pages.

### Functions Included

**`formatDate(dateString)`**
- Converts a raw ISO date string (e.g., `"2026-04-22T10:00:00.000Z"`) to a human-readable format (e.g., `"Apr 22, 2026"`)
- Used on the Profile page and Admin Users table to display dates nicely

**`getLevelColor(level)`**
- Maps a skill level string to a Badge color variant
- "beginner" → "success" (green badge)
- "intermediate" → "warning" (yellow badge)
- "advanced" → "error" (red badge)
- Used on the Roadmap page to show the difficulty badge in the right color

**`truncate(str, n)`**
- Shortens a long string to `n` characters and adds "..." at the end
- Used in card views to prevent descriptions from overflowing the layout

---

## 📌 Slide 11 — Deployment: The Big Picture

### Definition
**Deployment** is the process of making your application available to real users on the internet — not just on your local machine.

### Three Deployments Needed

1. **MongoDB Atlas** — Already live! When we connected to Atlas during development, our database was already in the cloud.

2. **Backend → Render** — Deploy the Node.js + Express server to Render's cloud platform

3. **Frontend → Vercel** — Deploy the React + Vite app to Vercel's edge network

### Real World Analogy
You've been cooking in your kitchen at home (local development). Now you're opening a restaurant (deployment):
- The **food storage warehouse** (MongoDB Atlas) is already set up and supplying ingredients
- You need to rent a **commercial kitchen** (Render) where your chefs (the Express server) cook for real customers
- You need to open a **storefront** (Vercel) where customers walk in and see your menu (the React app)

---

## 📌 Slide 12 — Deploying the Backend: Render

### What is Render?
Render is a cloud platform for deploying web services, databases, and static sites. It's free to start, easy to use, and has automatic deployments from GitHub.

### File: `backend/package.json` — Node Engine Specification
Before deploying, we added `"engines": { "node": ">=18.0.0" }` to the backend's package.json. This tells Render which version of Node.js to install. Without this, Render might use an outdated Node version that doesn't support modern JavaScript features.

### Step-by-Step: Deploy to Render

1. Go to [render.com](https://render.com) and sign up / log in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Set the configuration:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install` (install all dependencies)
   - **Start Command:** `npm start` (run `node server.js`)
5. Add all Environment Variables (these replace your local `.env` file):
   - `MONGO_URI` → Your MongoDB Atlas connection string
   - `JWT_SECRET` → Your secret key (use a long random string in production)
   - `GROQ_API_KEY` → Your Groq API key
   - `NODE_ENV` → `production`
   - `CLIENT_URL` → Leave blank for now (fill in after frontend is deployed)
6. Click **"Create Web Service"** and wait for the build to complete
7. Copy your Render URL (e.g., `https://skillpath-backend.onrender.com`)

### Important: Free Tier Behavior
Render's free tier **spins down after 15 minutes of inactivity**. The first request after sleeping takes ~30–60 seconds to wake up. This is normal for free tier.

---

## 📌 Slide 13 — Deploying the Frontend: Vercel

### What is Vercel?
Vercel is a cloud platform specialized for deploying frontend JavaScript applications. Created by the same team as Next.js, it's the industry standard for deploying React + Vite apps. Extremely fast, free tier, global CDN.

### File: `frontend/vercel.json`
A critical configuration file for SPA (Single Page Application) routing. Without this, Vercel would return 404 for any URL except `/`.

**Why this happens:** Vercel serves static files from the `/dist` folder. When you build the React app, it creates `index.html`, plus JavaScript and CSS bundles. If a user navigates directly to `https://your-app.vercel.app/dashboard`, Vercel looks for a `dashboard.html` file — which doesn't exist. It returns 404.

**The fix:** `vercel.json` tells Vercel: "No matter what URL someone requests, serve `index.html`. Let React Router handle the rest." This is the "rewrite all to index.html" rule.

### Step-by-Step: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up / log in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Set the configuration:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   - `VITE_API_URL` → Your Render backend URL + `/api` (e.g., `https://skillpath-backend.onrender.com/api`)
6. Click **"Deploy"** and wait for the build
7. Copy your Vercel URL (e.g., `https://sdg-quality-education.vercel.app`)

---

## 📌 Slide 14 — The CORS Challenge and How We Solved It

### Definition
**CORS** (Cross-Origin Resource Sharing) is a browser security mechanism that blocks web pages from making requests to a different domain than the one they came from — unless the server explicitly allows it.

### The Problem
- Frontend is at: `https://sdg-quality-education.vercel.app` (Vercel domain)
- Backend is at: `https://sdg-quality-education.onrender.com` (Render domain)
- These are different domains → the browser blocks all API calls → the app doesn't work

### The Fix in `backend/server.js`
The CORS middleware is configured with an array of allowed origins — including both the Vercel URL with and without a trailing slash (common gotcha!). A dynamic origin function checks incoming requests against this list and either allows or blocks them.

### The Trailing Slash Problem (A Real Bug!)
During deployment, a trailing slash in the `CLIENT_URL` environment variable (e.g., `https://skillpath.vercel.app/` instead of `https://skillpath.vercel.app`) caused the CORS policy to fail even with correct configuration — because `vercel.app/` ≠ `vercel.app`. Our code strips trailing slashes before the comparison.

### The Cross-Domain Cookie Problem
Even after fixing CORS, the authentication cookie wasn't being sent:
- The JWT token is stored in an HTTP-only cookie
- Cookies are normally only sent to the same domain that set them
- For cross-domain cookies to work, THREE conditions must all be true:
  1. **Frontend Axios:** `withCredentials: true` — tells the browser to send cookies
  2. **Backend Cookie:** `sameSite: 'none'` — explicitly allows cross-site delivery
  3. **Backend Cookie:** `secure: true` — required by browsers when `sameSite: 'none'` is set (only works over HTTPS)
- This was configured in `backend/utils/generateToken.js`

---

## 📌 Slide 15 — Connecting Frontend to Backend: Environment Variables

### Frontend `.env` File — `frontend/.env`
Only one variable needed:
- **`VITE_API_URL`** — Points to the backend API

- **Local development value:** `http://localhost:5001/api`
- **Production value (Vercel):** `https://sdg-quality-education.onrender.com/api`

In Vite, all environment variables must start with `VITE_` to be accessible in the React code. They're injected at build time — meaning when Vercel builds the React app, it bakes the URL into the JavaScript bundle.

### Backend `.env` File — `backend/.env`
All secrets for the server:
- **`MONGO_URI`** — MongoDB Atlas connection string
- **`JWT_SECRET`** — Random secret for signing tokens
- **`GROQ_API_KEY`** — Groq AI service key
- **`NODE_ENV`** — `production`
- **`CLIENT_URL`** — The Vercel frontend URL (no trailing slash!)
- **`PORT`** — Set automatically by Render (don't hardcode this)

### The Golden Rule
- `.env` files are **NEVER committed to GitHub** — they contain passwords and API keys
- Only `.env.example` (empty values) is committed
- Each deployment environment (local, Render, Vercel) has its OWN set of these variables

---

## 📌 Slide 16 — End-to-End Testing Checklist

After both are deployed, test every feature systematically:

### Public Features (Not Logged In)
- Visit the live Vercel URL — landing page loads correctly
- Navigate to About page — no 404
- Navigate to Login and Register — forms appear correctly
- Toggle dark/light mode — persists on refresh

### Authentication Flow
- Register a new account — check MongoDB Atlas for the new user document
- Login with that account — check that you're redirected to dashboard
- Refresh the page while logged in — you stay logged in (cookie persists)
- Logout — you're redirected to the landing page
- Try to visit `/dashboard` without logging in — you're redirected to login

### Core Features
- Complete the 3-step onboarding — check MongoDB for the new Roadmap document
- View the roadmap — all steps appear with correct content
- Mark a step as complete — progress bar and percentage update
- Click "Learn Now" — lesson modal opens with AI-generated content
- Click "Test Knowledge" — quiz modal opens with 3 questions
- Submit a chat message — AI responds within a few seconds
- Visit Projects page — AI-generated project ideas appear
- Save a project — it appears in the saved projects section
- Browse Resources — cards load with all categories

### Admin Features (Requires admin account)
- Set `role: "admin"` directly in MongoDB Atlas for a user
- Login with that user
- Visit `/admin` — statistics load
- Visit `/admin/users` — all users listed, ban/unban works
- Visit `/admin/resources` — add, edit, delete a resource

---

## 📌 Slide 17 — The Complete Technology Stack

### Everything Used to Build SkillPath AI

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19 | UI component library |
| **Build Tool** | Vite | Fast development server + production builds |
| **Routing** | React Router v7 | Client-side page navigation |
| **Animations** | Framer Motion | Smooth page and element animations |
| **Charts** | Recharts | Progress visualization on dashboard |
| **HTTP Client** | Axios | API calls from frontend to backend |
| **Notifications** | React Hot Toast | Success/error toast messages |
| **Icons** | React Icons | Thousands of vector icons |
| **Markdown** | React Markdown | Render AI lesson content |
| **Backend Runtime** | Node.js | JavaScript on the server |
| **Web Framework** | Express.js | REST API routing and middleware |
| **Authentication** | JWT + bcryptjs | Secure login with hashed passwords |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL database |
| **ODM** | Mongoose | Schema modeling for MongoDB |
| **AI Service** | Groq API (LLaMA 3.3 70B) | Roadmap generation, chat, lessons, quizzes |
| **Security** | Helmet, CORS | HTTP security headers, cross-origin control |
| **Logging** | Morgan | HTTP request logging |
| **Frontend Deploy** | Vercel | Static site hosting with global CDN |
| **Backend Deploy** | Render | Node.js cloud hosting |
| **Database Cloud** | MongoDB Atlas | Managed database service |

---

## 📌 Slide 18 — What Students Have Built: The Complete Picture

### 14 Pages in the Application

| Page | Route | Access |
|------|-------|--------|
| Landing | `/` | Public |
| About | `/about` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Onboarding | `/onboarding` | 🔒 Authenticated |
| Dashboard | `/dashboard` | 🔒 Authenticated |
| Roadmap | `/roadmap` | 🔒 Authenticated |
| AI Chat | `/chat` | 🔒 Authenticated |
| Projects | `/projects` | 🔒 Authenticated |
| Resources | `/resources` | 🔒 Authenticated |
| Profile | `/profile` | 🔒 Authenticated |
| Admin Dashboard | `/admin` | 👑 Admin Only |
| Admin Users | `/admin/users` | 👑 Admin Only |
| Admin Resources | `/admin/resources` | 👑 Admin Only |

---

![SkillPath AI Dashboard](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\dashboard_1777288417109.png)
*The Dashboard — The hub of the entire logged-in experience*

---

![SkillPath AI Admin Dashboard](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\admin_1777288480851.png)
*The Admin Dashboard — Platform stats and management for admins only*

---

## 📌 Slide 19 — Final GitHub Checkpoint: MC5

### Commit Message
> `MC5: Full-Stack Integration + Deployment — Axios, Custom Hooks, Vercel Config, Cross-Domain Cookies, Production Ready`

### Tag the Final Release
`v1.0.0` — This marks the complete, deployable version

### What's in the Final Repository
- **5 milestone branches** — One per masterclass, fully documented
- **Clean commit history** — Each commit clearly labeled with which feature it adds
- **`frontend/vercel.json`** — Vercel SPA routing configuration
- **`backend/.env.example`** — Template for environment variables
- **`frontend/src/utils/axios.js`** — Pre-configured API client
- **`frontend/src/hooks/`** — All 3 custom hooks (useRoadmap, useChat, useProgress)
- All features from MC1–MC4 working and connected

---

## 📌 Slide 20 — Future Scope: What Can Be Added Next

After MC5, students who want to go further can extend SkillPath AI with:

1. **Email Notifications** — Send a welcome email on registration using Nodemailer + Gmail SMTP
2. **OAuth Login** — "Login with Google" or "Login with GitHub" using Passport.js
3. **Roadmap Export** — Generate a downloadable PDF of the learning roadmap
4. **Real-Time Chat** — Upgrade the AI chat to stream responses word-by-word using WebSockets or Server-Sent Events
5. **Learning Streak Emails** — Email users who haven't been active for 3+ days
6. **Resource Ratings** — Star rating system with average score display
7. **Shareable Roadmap Link** — Generate a public read-only link for your roadmap
8. **Mobile App** — Convert the React web app to React Native for iOS/Android
9. **Community Forum** — Let students post questions visible to other students
10. **Gamification** — Add XP points, levels, and leaderboards

---

## 📌 Slide 21 — Homework: Final Project

### Build Your Own Version
Using everything learned in the 5 masterclasses, every student should:

1. **Fork the repository** and create their own version with a different SDG theme (SDG 3 — Health, SDG 8 — Decent Work, SDG 10 — Reduced Inequalities)
2. **Customize the design** — Change the color palette, typography, and branding
3. **Add one new feature** — Something not in the original (a leaderboard, blog section, study group feature, etc.)
4. **Deploy their own version** — Their own Vercel + Render + Atlas setup
5. **Write a README** — Explaining what it does, how to set it up, and what they learned

---

## ✅ By the End of MC5, Students Should Be Able To:

- ✅ Build and configure an Axios instance for authenticated cross-domain API calls
- ✅ Create custom React hooks that manage API state, loading, and errors cleanly
- ✅ Understand and resolve CORS issues in a production deployment
- ✅ Configure and understand cross-domain cookie policies (sameSite, secure, withCredentials)
- ✅ Deploy a React SPA to Vercel with correct SPA routing configuration
- ✅ Deploy a Node.js API to Render with proper environment variable setup
- ✅ Connect a live MongoDB Atlas database to a production backend
- ✅ Test an entire full-stack application end-to-end in production
- ✅ Explain the complete request-response cycle of a MERN application
- ✅ Present and demonstrate a production-quality capstone project confidently

---

## 🎉 Congratulations — You've Built SkillPath AI!

> "In 5 masterclasses, you went from 'What is React?' to shipping a live, AI-powered, full-stack MERN application that addresses the United Nations' SDG 4 — Quality Education. This is not a tutorial project. This is production code. This is your portfolio. This is your proof of work."

**Live App:** https://sdg-quality-education.vercel.app  
**Backend API:** https://sdg-quality-education.onrender.com/api/health  
**GitHub Repository:** With 5 milestone branches, clean commits, and a professional README
