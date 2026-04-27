# SECTION 12–14: Folder Structure, Build Order & GitHub Checkpoint Strategy

---

# SECTION 12: COMPLETE FOLDER STRUCTURE

## Frontend — `skillpath-frontend/`

```
skillpath-frontend/
├── index.html                      # Root HTML (Vite entry)
├── vite.config.js                  # Vite configuration
├── .env                            # VITE_API_URL=http://localhost:5000
├── .env.production                 # VITE_API_URL=https://your-backend.onrender.com
├── .gitignore
├── package.json
│
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── og-image.png                # Open Graph social preview
│
└── src/
    ├── main.jsx                    # React DOM render, BrowserRouter
    ├── App.jsx                     # Route definitions
    │
    ├── index.css                   # Global styles, CSS variables, reset
    │
    ├── assets/
    │   ├── images/
    │   │   ├── hero-bg.svg
    │   │   └── empty-state.svg
    │   └── icons/                  # Custom SVG icons
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── DashboardLayout.jsx
    │   │   ├── AdminLayout.jsx
    │   │   └── AuthLayout.jsx
    │   │
    │   ├── ui/
    │   │   ├── Button.jsx
    │   │   ├── InputField.jsx
    │   │   ├── Card.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Spinner.jsx
    │   │   ├── Badge.jsx
    │   │   ├── ProgressBar.jsx
    │   │   ├── ProgressRing.jsx
    │   │   ├── Tooltip.jsx
    │   │   ├── Avatar.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── FilterBar.jsx
    │   │   └── EmptyState.jsx
    │   │
    │   ├── landing/
    │   │   ├── HeroSection.jsx
    │   │   ├── FeatureCard.jsx
    │   │   ├── TestimonialSection.jsx
    │   │   └── CTABanner.jsx
    │   │
    │   ├── auth/
    │   │   ├── AuthCard.jsx
    │   │   └── SocialLoginButton.jsx
    │   │
    │   ├── onboarding/
    │   │   ├── GoalSelector.jsx
    │   │   ├── LevelSelector.jsx
    │   │   ├── TimeSelector.jsx
    │   │   └── StepIndicator.jsx
    │   │
    │   ├── dashboard/
    │   │   ├── WelcomeCard.jsx
    │   │   ├── RoadmapPreview.jsx
    │   │   ├── RecentChatCard.jsx
    │   │   ├── QuickActions.jsx
    │   │   └── StatCard.jsx
    │   │
    │   ├── roadmap/
    │   │   ├── RoadmapTimeline.jsx
    │   │   ├── RoadmapStep.jsx
    │   │   └── RegenerateButton.jsx
    │   │
    │   ├── chat/
    │   │   ├── ChatWindow.jsx
    │   │   ├── ChatBubble.jsx
    │   │   ├── MessageInput.jsx
    │   │   ├── TypingIndicator.jsx
    │   │   └── ChatHistorySidebar.jsx
    │   │
    │   ├── projects/
    │   │   ├── ProjectCard.jsx
    │   │   └── DifficultyBadge.jsx
    │   │
    │   ├── resources/
    │   │   ├── ResourceCard.jsx
    │   │   └── TypeBadge.jsx
    │   │
    │   └── admin/
    │       ├── ResourceTable.jsx
    │       ├── ResourceModal.jsx
    │       ├── UserTable.jsx
    │       ├── StatusToggle.jsx
    │       ├── UserGrowthChart.jsx
    │       └── DeleteConfirm.jsx
    │
    ├── pages/
    │   ├── LandingPage.jsx
    │   ├── AboutPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegisterPage.jsx
    │   ├── OnboardingPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── RoadmapPage.jsx
    │   ├── ChatPage.jsx
    │   ├── ProjectsPage.jsx
    │   ├── ResourcesPage.jsx
    │   ├── ProfilePage.jsx
    │   ├── NotFoundPage.jsx
    │   └── admin/
    │       ├── AdminDashboard.jsx
    │       ├── AdminResources.jsx
    │       └── AdminUsers.jsx
    │
    ├── context/
    │   └── AuthContext.jsx         # createContext, useContext, AuthProvider
    │
    ├── hooks/
    │   ├── useAuth.js              # Custom hook for auth state
    │   ├── useRoadmap.js           # Custom hook for roadmap data
    │   ├── useChat.js              # Custom hook for chat
    │   └── useProgress.js         # Custom hook for progress
    │
    ├── utils/
    │   ├── axios.js                # Axios instance with baseURL + interceptors
    │   └── helpers.js             # Format date, truncate text, etc.
    │
    └── routes/
        └── ProtectedRoute.jsx     # HOC for auth-guarded pages
```

---

## Backend — `skillpath-backend/`

```
skillpath-backend/
├── server.js
├── .env
├── .gitignore
├── package.json
│
├── config/
│   └── db.js                       # mongoose.connect()
│
├── models/
│   ├── User.js
│   ├── Profile.js
│   ├── Roadmap.js
│   ├── Progress.js
│   ├── ChatHistory.js
│   ├── Resource.js
│   └── SavedProject.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── profileRoutes.js
│   ├── roadmapRoutes.js
│   ├── progressRoutes.js
│   ├── chatRoutes.js
│   ├── projectRoutes.js
│   ├── resourceRoutes.js
│   └── adminRoutes.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── profileController.js
│   ├── roadmapController.js
│   ├── progressController.js
│   ├── chatController.js
│   ├── projectController.js
│   ├── resourceController.js
│   └── adminController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── rateLimiter.js
│
├── services/
│   ├── aiService.js
│   └── fallbackService.js
│
├── utils/
│   ├── generateToken.js
│   └── validators.js
│
└── data/
    └── fallbackRoadmaps.js
```

---

# SECTION 13: STEP-BY-STEP BUILD ORDER

> Follow this exact sequence to build the project. Each step assumes previous steps are complete.

## Phase 1 — MC1 (Days 1–2 of teaching)

```
STEP 1: Project Setup
├── Create GitHub repo: skillpath-ai
├── npm create vite@latest skillpath-frontend -- --template react
├── cd skillpath-frontend && npm install
├── Install: react-router-dom react-icons react-hot-toast framer-motion recharts axios
└── Create folder structure (pages/, components/layout, components/ui, context/, hooks/, utils/)

STEP 2: Base Styling
├── Set up index.css with CSS variables (colors, spacing, fonts)
└── Add Google Fonts import (Inter or Plus Jakarta Sans)

STEP 3: App.jsx + Router
└── Set up BrowserRouter, Routes, and placeholder routes

STEP 4: Layout Components
├── Navbar.jsx (with React Router Links)
└── Footer.jsx

STEP 5: Public Pages
├── LandingPage.jsx (HeroSection, FeatureCard)
├── AboutPage.jsx
├── LoginPage.jsx (form UI, no submit logic)
├── RegisterPage.jsx (form UI, no submit logic)
└── NotFoundPage.jsx

STEP 6: First commit → branch mc1-react-fundamentals
```

## Phase 2 — MC2 (Days 3–4 of teaching)

```
STEP 7: Design System Polish
├── Complete CSS variables
├── Global utility classes
└── Responsive breakpoints

STEP 8: AuthContext Setup
├── context/AuthContext.jsx
└── routes/ProtectedRoute.jsx

STEP 9: UI Component Library
├── Button, InputField, Card, Modal, Spinner
├── Badge, ProgressBar, ProgressRing, Tooltip
├── Avatar, SearchBar, FilterBar, EmptyState
└── Toast integration (react-hot-toast)

STEP 10: Onboarding Page
└── 3-step wizard UI with StepIndicator

STEP 11: Dashboard Page (static mock data)
├── WelcomeCard, StatCard, RoadmapPreview
└── QuickActions, RecentChatCard

STEP 12: Roadmap Page (static)
└── RoadmapTimeline with mock steps, ProgressBar

STEP 13: Chat Page (static)
└── ChatWindow, ChatBubble, MessageInput

STEP 14: Projects Page (static)
└── ProjectCard grid with mock data

STEP 15: Resources Page (static)
└── ResourceCard grid with FilterBar

STEP 16: Profile Page (static form)

STEP 17: Admin Pages (static)
├── AdminDashboard (StatCards, UserGrowthChart)
├── AdminResources (ResourceTable, ResourceModal)
└── AdminUsers (UserTable)

STEP 18: Add Framer Motion transitions

STEP 19: Second commit → branch mc2-advanced-ui
```

## Phase 3 — MC3 (Day 5 of teaching)

```
STEP 20: Backend Project Setup
├── mkdir skillpath-backend && cd skillpath-backend
├── npm init -y
├── npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser cors helmet morgan express-async-errors express-rate-limit
└── Create complete folder structure

STEP 21: server.js
└── Express app, middleware chain, port listener

STEP 22: config/db.js
└── mongoose.connect (not yet connected to real DB — placeholder)

STEP 23: utils/generateToken.js + validators.js

STEP 24: models/User.js (basic version)

STEP 25: Auth Controllers + Routes
├── authController.js (register, login, logout, getMe)
└── authRoutes.js

STEP 26: middleware/authMiddleware.js (protect, isAdmin)

STEP 27: middleware/errorMiddleware.js (notFound, errorHandler)

STEP 28: User Controllers + Routes
├── userController.js (getProfile, updateProfile)
└── userRoutes.js

STEP 29: Test all routes in Postman

STEP 30: Third commit → branch mc3-backend-fundamentals
```

## Phase 4 — MC4 (Days 6–7 of teaching)

```
STEP 31: MongoDB Atlas Setup
└── Connect config/db.js to Atlas cluster

STEP 32: All Models
├── Profile.js, Roadmap.js, Progress.js
├── ChatHistory.js, Resource.js, SavedProject.js
└── Update User.js with avatar, isActive

STEP 33: AI Service Layer
├── services/aiService.js (Groq API calls)
├── services/fallbackService.js
└── data/fallbackRoadmaps.js

STEP 34: Profile Routes + Controller

STEP 35: Roadmap Routes + Controller (with AI)

STEP 36: Progress Routes + Controller

STEP 37: Chat Routes + Controller (with AI)

STEP 38: Project Routes + Controller (with AI)

STEP 39: Resource Routes + Controller (CRUD)

STEP 40: Admin Routes + Controller
├── Stats aggregation
├── User management
└── Resource management

STEP 41: Rate limiter middleware applied to AI routes

STEP 42: Full Postman test of all routes with real DB data

STEP 43: Fourth commit → branch mc4-database-integration
```

## Phase 5 — MC5 (Day 8 of teaching)

```
STEP 44: Axios Instance
└── src/utils/axios.js (baseURL, withCredentials, interceptors)

STEP 45: Custom Hooks
├── useAuth.js
├── useRoadmap.js
├── useChat.js
└── useProgress.js

STEP 46: Wire Auth (real login/register/logout)
├── AuthContext.jsx → real API calls
├── LoginPage.jsx → real form submit
└── RegisterPage.jsx → real form submit

STEP 47: Wire Onboarding
└── OnboardingPage → POST /api/profiles → triggers roadmap gen

STEP 48: Wire Dashboard
└── Fetch real data: roadmap preview, progress, user info

STEP 49: Wire Roadmap Page
└── Fetch steps, mark complete (PUT /api/progress/step)

STEP 50: Wire Chat Page
└── Send message → POST /api/chat → display AI response

STEP 51: Wire Projects Page
└── GET /api/projects/recommendations

STEP 52: Wire Resources Page
└── GET /api/resources

STEP 53: Wire Profile Page
└── GET + PUT /api/users/me

STEP 54: Wire Admin Pages
└── All admin CRUD wired to real API

STEP 55: Environment Variables
├── Frontend: VITE_API_URL in .env
└── Backend: All secrets in .env

STEP 56: Build Frontend
└── npm run build

STEP 57: Deploy Frontend to Vercel
├── Import GitHub repo
└── Set VITE_API_URL env var

STEP 58: Deploy Backend to Render
├── Create Web Service → connect GitHub
├── Set all env vars (MONGO_URI, JWT_SECRET, GROQ_API_KEY, CLIENT_URL)
└── Test live URL

STEP 59: MongoDB Atlas Production
└── IP whitelist: 0.0.0.0/0 (for Render dynamic IPs)

STEP 60: End-to-end testing on production URL

STEP 61: Final commit → merge to main → v1.0.0 release
```

---

# SECTION 14: GITHUB MASTERCLASS CHECKPOINT STRATEGY

## Branch Strategy

```
main                          ← production-ready, deployed
├── mc1-react-fundamentals    ← MC1 checkpoint
├── mc2-advanced-ui           ← MC2 checkpoint
├── mc3-backend-fundamentals  ← MC3 checkpoint
├── mc4-database-integration  ← MC4 checkpoint
└── mc5-fullstack-deployment  ← MC5 checkpoint → merges to main
```

## Milestone Naming

| MC | Branch | Tag | Milestone Name | Semantic Version |
|----|--------|-----|---------------|-----------------|
| MC1 | `mc1-react-fundamentals` | `mc1-complete` | Static Frontend Shell | `v0.1.0` |
| MC2 | `mc2-advanced-ui` | `mc2-complete` | Complete Frontend UI | `v0.2.0` |
| MC3 | `mc3-backend-fundamentals` | `mc3-complete` | Backend API Layer | `v0.3.0` |
| MC4 | `mc4-database-integration` | `mc4-complete` | Full Data & AI Layer | `v0.4.0` |
| MC5 | `mc5-fullstack-deployment` | `v1.0.0` | Production Launch | `v1.0.0` |

## Commit Strategy Per Masterclass

### MC1 Commits
```bash
git init
git checkout -b mc1-react-fundamentals
# ... build ...
git add .
git commit -m "feat: initialize vite react project"
git commit -m "feat: add navbar and footer"
git commit -m "feat: build landing page"
git commit -m "feat: add login and register pages"
git commit -m "feat: configure react router"
git tag mc1-complete
git push origin mc1-react-fundamentals
```

### Teaching Replay Guide
To replay any class from scratch, students can:
1. `git checkout mc[N-1]-complete` — start from end of previous class
2. `git checkout -b my-mc[N]-practice` — personal branch
3. Build the MC[N] features
4. Compare with `git diff mc[N]-complete` to see what they built

## What State to Preserve Per Checkpoint

| Checkpoint | What's Working | What's Not |
|-----------|----------------|------------|
| `mc1-complete` | Navigation, 5 static pages | No data, no auth |
| `mc2-complete` | Beautiful UI, all pages, mock data | No real APIs |
| `mc3-complete` | Auth APIs working in Postman | Frontend not connected |
| `mc4-complete` | All APIs working with real DB + AI | Frontend not connected |
| `v1.0.0` | Fully working live app | — |

## GitHub Actions (MC5 Bonus)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

*Continue to [`06-guidelines-and-deployment.md`](./06-guidelines-and-deployment.md) for code guidelines, UI/UX direction, deployment plan, and student deliverables.*
