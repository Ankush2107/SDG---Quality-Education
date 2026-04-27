# SECTION 15–18: Code Guidelines, UI/UX, Deployment & Student Deliverables

---

# SECTION 15: CODE GENERATION GUIDELINES

## Coding Style

### JavaScript/React Rules
```javascript
// ✅ Always use arrow functions for components
const HeroSection = ({ title, subtitle }) => {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
};

export default HeroSection;

// ✅ Use async/await, never .then() chains
const fetchRoadmap = async () => {
  try {
    const { data } = await axios.get('/api/roadmaps/me');
    setRoadmap(data.roadmap);
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to load roadmap');
  }
};

// ✅ Destructure props
const Button = ({ children, variant = 'primary', onClick, disabled = false }) => {};

// ✅ Always handle loading and error states
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
```

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `RoadmapStep`, `ChatBubble` |
| Files (components) | PascalCase | `RoadmapStep.jsx` |
| Files (utils/hooks) | camelCase | `useAuth.js`, `helpers.js` |
| CSS class names | kebab-case | `.roadmap-step`, `.chat-bubble` |
| State variables | camelCase | `isLoading`, `userData` |
| Constants | SCREAMING_SNAKE | `API_BASE_URL` |
| Functions | camelCase verbs | `handleSubmit`, `fetchData` |
| Routes (backend) | kebab-case | `/api/roadmaps/me` |
| Models | PascalCase | `User`, `Roadmap` |
| Controllers | camelCase | `authController.js` |

---

## Reusable Component Strategy

```javascript
// ✅ Good — flexible, composable Button
const Button = ({
  children,
  variant = 'primary',  // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md',          // 'sm' | 'md' | 'lg'
  onClick,
  disabled = false,
  isLoading = false,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
};

// ✅ Good — generic Card wrapper
const Card = ({ children, className = '', hover = false }) => {
  return (
    <div className={`card ${hover ? 'card--hover' : ''} ${className}`}>
      {children}
    </div>
  );
};
```

---

## API Error Handling Pattern

### Backend (Express)
```javascript
// controllers/authController.js
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Check duplicate
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error('Email already registered');
  }

  // Create user
  const user = await User.create({ name, email, password });

  // Respond
  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);
  res.status(201).json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};
```

### Frontend (React + Axios)
```javascript
// Standard pattern for all API calls
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const { data } = await axios.post('/auth/login', formData);
    setUser(data.user);
    toast.success('Welcome back!');
    navigate('/dashboard');
  } catch (err) {
    const message = err.response?.data?.message || 'Something went wrong';
    setError(message);
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
};
```

---

## Environment Variable Handling

### Frontend `.env`
```bash
VITE_API_URL=http://localhost:5000/api
```

### Frontend usage
```javascript
// utils/axios.js
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,  // Required for HTTP-only cookie auth
});
```

### Backend `.env`
```bash
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillpath
JWT_SECRET=your_super_secret_key_here_min_32_chars
JWT_EXPIRE=7d
GROQ_API_KEY=gsk_your_groq_api_key
CLIENT_URL=http://localhost:5173
```

### Backend `.gitignore`
```
node_modules/
.env
```

---

## Clean Architecture Principles (Beginner-Friendly)

| Principle | Implementation |
|-----------|---------------|
| **Separation of Concerns** | Routes → Controllers → Services → Models |
| **DRY (Don't Repeat Yourself)** | Shared components, utility functions |
| **Single Responsibility** | Each component/function does ONE thing |
| **Error Propagation** | All errors bubble up to global error handler |
| **No logic in routes** | Routes just delegate to controllers |
| **No DB calls in controllers** | Use Mongoose model methods |
| **Env-based config** | Never hardcode secrets or URLs |

---

## Responsiveness Requirements

```css
/* CSS Breakpoints — Mobile First */
/* Mobile: default (< 480px) */
/* Tablet: 480px+ */
@media (min-width: 480px) { }

/* Laptop: 768px+ */
@media (min-width: 768px) { }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { }

/* Wide: 1280px+ */
@media (min-width: 1280px) { }
```

**Minimum requirements:**
- Navbar collapses to hamburger on mobile
- All grids use `auto-fit` or switch to single column
- Touch targets ≥ 44px
- Text remains readable at all sizes
- Dashboard sidebar collapses on mobile

---

# SECTION 16: UI/UX GUIDELINES

## Design Direction
**Theme:** Modern, dark-accented, student-friendly, AI-forward

Think: **Notion + Linear + a learning platform** — clean, structured, futuristic without being cold.

---

## Color Palette

```css
:root {
  /* Primary Brand */
  --color-primary: #6C63FF;        /* Purple — AI/innovation */
  --color-primary-light: #8B85FF;
  --color-primary-dark: #4A43CC;
  --color-primary-glow: rgba(108, 99, 255, 0.2);

  /* Accent */
  --color-accent: #00D4AA;         /* Teal — progress/success */
  --color-accent-light: #00F0C0;

  /* Background */
  --color-bg: #0F0F1A;             /* Deep dark navy */
  --color-bg-secondary: #1A1A2E;   /* Slightly lighter cards */
  --color-bg-elevated: #242438;    /* Elevated surfaces */

  /* Text */
  --color-text: #E8E8F0;           /* Off-white */
  --color-text-secondary: #9090B0; /* Muted text */
  --color-text-muted: #5A5A7A;

  /* Status */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Borders */
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-strong: rgba(255, 255, 255, 0.15);
}
```

---

## Typography

```css
/* Import in index.html */
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

:root {
  --font-primary: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Scale */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-hero: 4rem;     /* 64px */
}
```

---

## Spacing System

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

---

## Card Design

```css
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: var(--space-6);
  transition: all 0.2s ease;
}

.card--hover:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 24px var(--color-primary-glow);
  transform: translateY(-2px);
}

/* Glassmorphism variant */
.card--glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## Dashboard Styling

```css
/* Sidebar */
.sidebar {
  width: 260px;
  height: 100vh;
  background: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border);
  position: fixed;
  padding: var(--space-6);
}

/* Stat cards on dashboard */
.stat-card {
  background: linear-gradient(135deg, var(--color-bg-elevated), var(--color-bg-secondary));
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

/* Progress ring glow */
.progress-ring-path {
  stroke: var(--color-accent);
  filter: drop-shadow(0 0 6px var(--color-accent));
}
```

---

## Animation Guidelines

```css
/* Page enter animation */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-enter {
  animation: fadeSlideUp 0.4s ease forwards;
}

/* Button hover */
.btn {
  transition: all 0.2s ease;
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);
}

/* Skeleton loading */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, var(--color-bg-elevated) 25%, var(--color-bg-secondary) 50%, var(--color-bg-elevated) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
```

---

## Accessibility Basics

- All interactive elements have `aria-label` where text is absent
- Color contrast ratio ≥ 4.5:1 for all text
- Focus states visible (not removed with `outline: none`)
- Form inputs have associated `<label>` elements
- Images have `alt` attributes
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`

---

# SECTION 17: DEPLOYMENT PLAN

## Frontend Deployment — Vercel

```bash
# Step 1: Build
cd skillpath-frontend
npm run build
# Outputs to /dist folder

# Step 2: Vercel CLI (optional)
npm install -g vercel
vercel --prod

# OR: Vercel Dashboard
# 1. Go to vercel.com → Import Git Repository
# 2. Select your GitHub repo (skillpath-frontend folder)
# 3. Framework: Vite
# 4. Build command: npm run build
# 5. Output directory: dist
# 6. Environment Variables:
#    VITE_API_URL = https://your-backend.onrender.com/api
# 7. Deploy!
```

---

## Backend Deployment — Render.com

```bash
# Step 1: Render Dashboard
# 1. New → Web Service → Connect GitHub repo
# 2. Name: skillpath-api
# 3. Root Directory: skillpath-backend
# 4. Runtime: Node
# 5. Build Command: npm install
# 6. Start Command: node server.js
# 7. Environment Variables (set all):
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
JWT_EXPIRE=7d
GROQ_API_KEY=gsk_...
CLIENT_URL=https://your-app.vercel.app
NODE_ENV=production
PORT=5000
```

---

## MongoDB Atlas Production Setup

```
1. Login to cloud.mongodb.com
2. Your Cluster → Network Access → + Add IP Address
3. Add: 0.0.0.0/0 (Allow from anywhere — for Render dynamic IPs)
4. Database Access → Add Database User → set username/password
5. Connection String:
   mongodb+srv://username:password@cluster.mongodb.net/skillpath?retryWrites=true&w=majority
```

---

## Common Deployment Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| CORS error on production | CLIENT_URL mismatch | Set exact Vercel URL in backend env |
| "Cannot find module" | Missing dependency | Run `npm install` again on Render |
| JWT token not working | Cookie blocked cross-origin | Set `sameSite: 'none', secure: true` in cookie options for production |
| MongoDB connection timeout | IP not whitelisted | Add 0.0.0.0/0 in Atlas Network Access |
| API calls failing | Wrong VITE_API_URL | Check Vercel env var for trailing slash |
| Render cold start delay | Free tier sleeps after 15 min | Add a Render health check ping |
| Build fails (Vite) | Env var not prefixed with VITE_ | Rename all frontend env vars |

---

## Production Cookie Config

```javascript
// utils/generateToken.js
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in prod
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
};
```

---

## Final Testing Checklist (Before Launch)

```
□ Register new user → onboarding → roadmap generated ✓
□ Login with existing user → dashboard loads ✓
□ Roadmap page shows steps → mark one complete → % updates ✓
□ AI Chat sends message → receives response ✓
□ Projects page loads AI recommendations ✓
□ Resources page shows admin-added resources ✓
□ Profile update works ✓
□ Admin login → dashboard stats visible ✓
□ Admin can add/edit/delete resource ✓
□ Admin can toggle user active status ✓
□ Logout clears session → redirect to landing ✓
□ 404 page shows for invalid routes ✓
□ Responsive on mobile (375px) ✓
□ Responsive on tablet (768px) ✓
□ All API endpoints return correct status codes ✓
□ .env files are NOT committed to GitHub ✓
```

---

# SECTION 18: STUDENT DELIVERABLES

## Working Features (by end of MC5)

```
✅ Public landing page with hero, features, CTA
✅ About page with SDG alignment
✅ User registration and login (JWT auth)
✅ 3-step onboarding wizard
✅ AI-generated personalized learning roadmap
✅ Visual roadmap with step completion tracking
✅ Progress dashboard (%, streak)
✅ AI chat doubt assistant (powered by Groq)
✅ Chat history (view past conversations)
✅ Project ideas (AI-recommended)
✅ Resource library (admin-curated)
✅ User profile management
✅ Admin dashboard (stats)
✅ Admin resource CRUD
✅ Admin user management
✅ Responsive UI (mobile + desktop)
✅ Production deployment (Vercel + Render)
```

## GitHub Repository Structure

```
skillpath-ai/
├── skillpath-frontend/     # React app
├── skillpath-backend/      # Express API
├── docs/                   # Teaching documentation
└── README.md               # Project overview with live links
```

**Branches:** mc1, mc2, mc3, mc4, mc5, main
**Releases:** v0.1.0 through v1.0.0

## Deployed App

- **Frontend:** `https://skillpath-ai.vercel.app`
- **Backend API:** `https://skillpath-api.onrender.com`
- **Database:** MongoDB Atlas (cloud)

## Screenshots (for Portfolio)

Students should screenshot:
1. Landing page (hero section)
2. Onboarding wizard (step 2)
3. Dashboard (with progress ring)
4. Full roadmap view
5. AI Chat in action
6. Project ideas page
7. Admin dashboard

## Capstone-Ready Structure

The project demonstrates:
- **Frontend:** React hooks, context, routing, components
- **Backend:** REST API, middleware, JWT auth
- **Database:** MongoDB schema design, CRUD
- **AI:** Groq API integration, prompt engineering
- **DevOps:** Environment management, cloud deployment
- **Soft Skills:** SDG alignment, problem statement, user flow

**Interview talking points:**
- "I built an AI-powered MERN app that generates personalized learning roadmaps"
- "I integrated Groq's LLaMA3 API with a fallback strategy for reliability"
- "I implemented JWT authentication with HTTP-only cookies for security"
- "I designed 7 MongoDB schemas with proper relationships using Mongoose"

---

*Continue to [`07-summary-and-tables.md`](./07-summary-and-tables.md) for the final summary, feature mapping tables, and implementation checklist.*
