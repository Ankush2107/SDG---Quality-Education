# SECTION 5: MASTERCLASS-WISE DIVISION

> This is the **core teaching plan**. Each masterclass builds incrementally on the last, ensuring students always have a working, deployable checkpoint.

---

## MASTERCLASS 1 — React Fundamentals: Build Your First UI
**Theme:** *"Hello, SkillPath! Getting React to talk."*

### 🎯 Class Objective
Introduce students to React.js from scratch. By the end, students have a functional, multi-page static frontend with React Router, reusable components, and props-driven UI.

### 📚 Concepts to Teach
- What is React? Why component-based?
- Setting up a project with **Vite** (`npm create vite@latest`)
- JSX syntax — writing HTML inside JavaScript
- Functional components
- Props — passing data between components
- `useState` — local component state
- React Router DOM — `<BrowserRouter>`, `<Routes>`, `<Route>`
- Folder structure best practices
- Importing CSS, using class names
- Conditional rendering

### 🔨 Exact Project Portion to Build
| Item | Details |
|------|---------|
| Vite project scaffold | `npm create vite@latest skillpath-frontend` |
| `index.html` | Title, favicon, Google Fonts link |
| `App.jsx` | Root component with Router setup |
| **Landing Page** | Hero, Features section, CTA button |
| **About Page** | Mission statement, SDG alignment info |
| **Login Page (static)** | Form UI only — no API calls yet |
| **Register Page (static)** | Form UI only — no API calls yet |
| **Navbar** | Logo, nav links, responsive hamburger concept |
| **Footer** | Links, copyright, SDG badge |
| **NotFound (404) Page** | Basic fallback page |

### 📦 Pages / Components / Modules Covered
**Pages:** `LandingPage`, `AboutPage`, `LoginPage`, `RegisterPage`, `NotFoundPage`

**Components:** `Navbar`, `Footer`, `HeroSection`, `FeatureCard`, `Button`, `InputField`

### 🖥️ Frontend / Backend / Database Topics
- **Frontend:** JSX, props, useState, React Router, CSS styling
- **Backend:** None (intentionally skipped)
- **Database:** None

### ✅ Expected Student Outcome
- Understand what React is and why it's used
- Set up and run a Vite + React project
- Build 5 pages with routing
- Understand components, props, and basic state
- Have a navigable static frontend that looks real

### 🐙 GitHub Milestone
- **Branch:** `mc1-react-fundamentals`
- **Milestone:** `v0.1.0 - Static Frontend Shell`
- **Tag:** `mc1-complete`

### 💬 Suggested Commit Messages
```
feat: initialize vite react project with folder structure
feat: add navbar and footer layout components
feat: build landing page with hero and feature cards
feat: add static login and register form pages
feat: configure react router with all page routes
chore: add google fonts and base CSS variables
```

### ⏭️ What's Left for MC2
- Styling polish, animations, glassmorphism effects
- Dashboard page UI (static)
- Roadmap page UI (static)
- AI Chat page UI (static)
- Reusable component library (cards, modals, loaders)

---

## MASTERCLASS 2 — Advanced UI: Build the Full Frontend Shell
**Theme:** *"Making SkillPath look like a real product."*

### 🎯 Class Objective
Level up the frontend with advanced styling, animations, reusable components, and all page UIs. Students will have a complete, production-quality frontend — every page and component built, all static.

### 📚 Concepts to Teach
- CSS variables and design tokens
- Flexbox and Grid layouts in depth
- Reusable component design patterns
- CSS Modules vs global styles
- `useEffect` hook — lifecycle in functional components
- `useContext` + `createContext` — global state (AuthContext)
- Conditional rendering patterns
- React controlled forms
- Loading skeletons / spinners
- Framer Motion basics — fade, slide animations
- Responsive design — mobile-first approach

### 🔨 Exact Project Portion to Build
| Item | Details |
|------|---------|
| **Design System** | CSS variables: colors, spacing, shadows, border-radius |
| **AuthContext** | Global user state (no API yet, mock data) |
| **Protected Route** | Redirect to login if not authenticated |
| **Onboarding Wizard** | 3-step form UI (goal → level → time) |
| **Dashboard Page (static)** | Progress ring, roadmap preview, quick actions |
| **Roadmap Page (static)** | Timeline view of steps, check-off UI |
| **AI Chat Page (static)** | Chat bubble UI, input box, send button |
| **Project Ideas Page (static)** | Card grid of project suggestions |
| **Resource Library (static)** | Filterable card grid |
| **Profile Page (static)** | Avatar, form fields, settings |
| **Admin Dashboard (static)** | Stats cards, table layout |
| **Reusable Components** | `Card`, `Modal`, `Spinner`, `Badge`, `ProgressBar`, `Tooltip` |
| **Toast Notifications** | React Hot Toast setup |

### 📦 Pages / Components / Modules Covered
**Pages:** `OnboardingPage`, `DashboardPage`, `RoadmapPage`, `ChatPage`, `ProjectsPage`, `ResourcesPage`, `ProfilePage`, `AdminDashboard`

**Components:** `Card`, `Modal`, `ProgressBar`, `Spinner`, `Badge`, `Tooltip`, `RoadmapStep`, `ChatBubble`, `ProjectCard`, `ResourceCard`, `StatCard`, `StepIndicator`

### 🖥️ Frontend / Backend / Database Topics
- **Frontend:** Design system, CSS modules, useEffect, useContext, AuthContext, Framer Motion
- **Backend:** None
- **Database:** None (mock/hardcoded data used)

### ✅ Expected Student Outcome
- Build a visually stunning, complete frontend
- Understand React hooks deeply (useState, useEffect, useContext)
- Create a reusable component library
- Understand protected routes and global state patterns
- Have a portfolio-worthy UI that impresses at first glance

### 🐙 GitHub Milestone
- **Branch:** `mc2-advanced-ui`
- **Milestone:** `v0.2.0 - Complete Frontend Shell`
- **Tag:** `mc2-complete`

### 💬 Suggested Commit Messages
```
feat: add design system with CSS variables and global styles
feat: create authcontext and protected route wrapper
feat: build onboarding wizard with 3-step form
feat: create static dashboard with progress and roadmap preview
feat: build roadmap page with timeline step UI
feat: add AI chat page with bubble message UI
feat: add project ideas and resource library pages
feat: build admin dashboard static layout
feat: create reusable card, modal, spinner, badge components
feat: integrate framer motion animations on page transitions
chore: setup react-hot-toast for notifications
```

### ⏭️ What's Left for MC3
- Node.js + Express.js server setup
- Auth routes (register, login, logout)
- User routes (profile CRUD)
- Middleware (JWT auth, error handler)
- Postman-tested API endpoints

---

## MASTERCLASS 3 — Backend Fundamentals: REST APIs & Server Logic
**Theme:** *"SkillPath gets a brain — building the API layer."*

### 🎯 Class Objective
Introduce server-side development with Node.js and Express. Build a working REST API with authentication, protected routes, and tested endpoints — all without connecting to MongoDB yet (use in-memory arrays initially, then transition to MongoDB connection setup).

### 📚 Concepts to Teach
- What is Node.js? Event loop concept
- npm ecosystem — installing and managing packages
- Express.js — creating a server, routing
- REST architecture — GET, POST, PUT, DELETE
- Middleware — what it is, how it works
- JWT — how tokens work (sign, verify, decode)
- bcryptjs — hashing passwords
- Error handling middleware
- Environment variables with dotenv
- Postman — testing APIs professionally
- CORS — why it's needed for MERN
- `express-async-errors` pattern
- Rate limiting basics

### 🔨 Exact Project Portion to Build
| Item | Details |
|------|---------|
| **Backend folder setup** | `skillpath-backend/` with full structure |
| **`server.js`** | Express server, middleware chain, port listen |
| **Auth Routes** | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout` |
| **Auth Controller** | Register (hash pw, create user), Login (verify, issue JWT) |
| **JWT Middleware** | `protect` middleware — verifies token on every request |
| **User Routes** | `GET /api/users/me`, `PUT /api/users/profile` |
| **User Controller** | Get/update user profile |
| **Admin Middleware** | `isAdmin` — role-check middleware |
| **Global Error Handler** | Catches all errors, returns JSON response |
| **Validation** | Input validation with custom validators |
| **Test with Postman** | All auth routes tested and documented |

### 📦 Pages / Components / Modules Covered
**Backend Modules:** `server.js`, `routes/authRoutes.js`, `routes/userRoutes.js`, `controllers/authController.js`, `controllers/userController.js`, `middleware/authMiddleware.js`, `middleware/errorMiddleware.js`, `utils/generateToken.js`

### 🖥️ Frontend / Backend / Database Topics
- **Frontend:** None (focus on backend)
- **Backend:** Node.js, Express, JWT, bcrypt, middleware, routing
- **Database:** MongoDB connection string set up, `mongoose.connect()` added — but no schemas yet (use in-memory temp arrays to teach the concept, then add DB by end)

### ✅ Expected Student Outcome
- Set up a complete Node.js + Express server
- Build and test auth APIs with Postman
- Understand JWT authentication flow
- Write middleware for route protection
- Handle errors globally and cleanly
- Be ready to plug in MongoDB schemas

### 🐙 GitHub Milestone
- **Branch:** `mc3-backend-fundamentals`
- **Milestone:** `v0.3.0 - Backend API Layer`
- **Tag:** `mc3-complete`

### 💬 Suggested Commit Messages
```
feat: initialize express server with middleware chain
feat: add auth routes for register and login
feat: implement jwt-based authentication in authController
feat: add protect middleware for route-level auth
feat: build user routes and profile controller
feat: add global error handler middleware
feat: add admin role-check middleware
chore: configure dotenv and environment variables
chore: add cors and morgan middleware
test: verify all auth routes pass in postman
```

### ⏭️ What's Left for MC4
- All Mongoose schemas (User, Profile, Roadmap, Progress, Chat, Resource)
- MongoDB Atlas connection
- Replace temp arrays with real DB queries
- Roadmap, progress, AI chat routes + controllers
- Admin resource management APIs

---

## MASTERCLASS 4 — Database Design: MongoDB, Schemas & Integration
**Theme:** *"SkillPath gets memory — data that persists."*

### 🎯 Class Objective
Design all MongoDB schemas, connect to MongoDB Atlas, integrate all backend routes with real data, and build the AI service layer (Groq API integration with fallback).

### 📚 Concepts to Teach
- NoSQL vs SQL — when to use MongoDB
- MongoDB Atlas setup — cloud database
- Mongoose — ODM for MongoDB
- Schema design — fields, types, validation, defaults
- `populate()` — referencing documents across collections
- CRUD operations with Mongoose
- Aggregation basics (for admin stats)
- AI API integration — Groq API setup, prompt design
- Async/await error handling with try-catch
- Environment variables for secrets (API keys)

### 🔨 Exact Project Portion to Build
| Item | Details |
|------|---------|
| **MongoDB Atlas Setup** | Create cluster, get connection string |
| **User Schema** | With role, isActive, createdAt |
| **Profile Schema** | Goal, skill level, time availability, linked to User |
| **Roadmap Schema** | AI-generated steps, topic, linked to User |
| **Progress Schema** | Step completion tracking, % calculation |
| **ChatHistory Schema** | Messages array, userId, timestamps |
| **Resource Schema** | Title, URL, topic, type, admin-managed |
| **SavedProject Schema** | ProjectId, userId, notes |
| **Roadmap Controller** | Generate via Groq, save to DB, retrieve |
| **Progress Controller** | Update step, calculate completion % |
| **Chat Controller** | Send message to Groq, save conversation |
| **Admin Resource Controller** | CRUD for resources |
| **AI Service** | `services/aiService.js` — Groq API calls + fallback |
| **All routes integrated** | Connect all controllers to MongoDB |

### 📦 Pages / Components / Modules Covered
**Backend Modules:** `models/User.js`, `models/Profile.js`, `models/Roadmap.js`, `models/Progress.js`, `models/ChatHistory.js`, `models/Resource.js`, `models/SavedProject.js`, `controllers/roadmapController.js`, `controllers/progressController.js`, `controllers/chatController.js`, `controllers/adminController.js`, `services/aiService.js`, `services/fallbackService.js`

### 🖥️ Frontend / Backend / Database Topics
- **Frontend:** None (data layer focus)
- **Backend:** Mongoose integration, AI service layer, all controllers updated
- **Database:** All 7 schemas created and connected

### ✅ Expected Student Outcome
- Design and implement a complete MongoDB schema set
- Connect backend to MongoDB Atlas
- Integrate Groq AI into the backend service layer
- Have all APIs returning real data from DB
- Understand document relationships with `populate()`
- Know how to design prompts for AI APIs

### 🐙 GitHub Milestone
- **Branch:** `mc4-database-integration`
- **Milestone:** `v0.4.0 - Full Data & AI Layer`
- **Tag:** `mc4-complete`

### 💬 Suggested Commit Messages
```
feat: connect mongoose to mongodb atlas
feat: create user and profile schemas with validation
feat: create roadmap and progress schemas
feat: create chathistory and resource schemas
feat: implement groq ai service with fallback logic
feat: build roadmap generation controller with ai integration
feat: add progress tracking controller and routes
feat: build chat controller with groq api and history save
feat: implement admin resource crud controller
feat: add admin user management routes
chore: add groq api key to env and gitignore
```

### ⏭️ What's Left for MC5
- Connect React frontend to live backend APIs (replace mock data)
- Implement real auth flow (login saves JWT, AuthContext updates)
- Wire up all API calls with Axios
- Frontend error handling
- Deployment to Vercel + Render
- Environment setup for production

---

## MASTERCLASS 5 — Full-Stack & Deployment: Go Live!
**Theme:** *"SkillPath goes live — connecting everything and shipping the product."*

### 🎯 Class Objective
Connect the React frontend to the live Express backend, replace all mock data with real API calls, implement real authentication, fix any integration issues, and deploy the complete application to the cloud.

### 📚 Concepts to Teach
- Axios — making HTTP requests from React
- Async data fetching with `useEffect`
- Handling loading, error, and success states
- React Context update after login/logout
- Protected route + JWT cookie handling
- `.env` files for React (VITE_ prefix)
- CORS troubleshooting
- Deployment concepts — what is a build?
- Deploying React to Vercel
- Deploying Node.js backend to Render
- MongoDB Atlas IP whitelisting for production
- Environment variable setup in Vercel/Render dashboards
- End-to-end testing

### 🔨 Exact Project Portion to Build
| Item | Details |
|------|---------|
| **Axios instance** | `utils/axios.js` — base URL, credentials, interceptors |
| **Auth API wiring** | Real register/login/logout calls, JWT in cookie |
| **AuthContext update** | `checkAuth()` on mount, real user data |
| **Protected Routes working** | With real backend session |
| **Onboarding → Roadmap flow** | Submit onboarding → generate roadmap → redirect to dashboard |
| **Dashboard API wiring** | Fetch roadmap, progress stats from DB |
| **Roadmap page live** | Fetch steps, mark complete, update progress |
| **AI Chat live** | Send message to backend → Groq → display response |
| **Project Ideas live** | Fetch AI suggestions from backend |
| **Resource Library live** | Fetch admin resources from DB |
| **Profile update live** | PUT request to update user info |
| **Admin CRUD live** | Resource management connected to API |
| **Vercel deployment** | `npm run build`, deploy to Vercel |
| **Render deployment** | Push backend, set env vars, test live URL |
| **Production `.env`** | All env vars set in dashboards |
| **Final testing** | Full user journey tested on live URL |

### 📦 Pages / Components / Modules Covered
All pages — now connected to real backend

**New files:** `src/utils/axios.js`, `src/hooks/useAuth.js`, `src/hooks/useRoadmap.js`, `src/hooks/useChat.js`, `src/hooks/useProgress.js`

### 🖥️ Frontend / Backend / Database Topics
- **Frontend:** Axios, async patterns, real API wiring, deployment
- **Backend:** CORS config for production, final testing
- **Database:** MongoDB Atlas production connection, IP whitelist

### ✅ Expected Student Outcome
- Have a **fully working, deployed, live application**
- Understand the full MERN data flow (Frontend → API → Backend → DB → Response → UI)
- Know how to deploy to Vercel and Render
- Have a real project for their portfolio
- Be confident explaining the architecture in interviews

### 🐙 GitHub Milestone
- **Branch:** `mc5-fullstack-deployment` → **merge to `main`**
- **Milestone:** `v1.0.0 - Production Launch`
- **Tag:** `v1.0.0`
- **Release:** GitHub Release with changelog

### 💬 Suggested Commit Messages
```
feat: setup axios instance with base url and interceptors
feat: wire auth context to real register and login apis
feat: connect onboarding form to profile and roadmap api
feat: integrate dashboard with live roadmap and progress data
feat: connect roadmap page to backend with step completion
feat: wire ai chat to backend groq integration
feat: connect project ideas and resource library to apis
feat: wire admin resource crud to backend api
feat: add admin user management live data
chore: configure vite env variables for production
chore: build and deploy frontend to vercel
chore: deploy backend to render with env vars
docs: update readme with live urls and setup guide
release: v1.0.0 - skillpath ai production launch
```

---

*Continue to [`03-architecture.md`](./03-architecture.md) for page-by-page, component, and backend architecture.*
