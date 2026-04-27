# PHASE-WISE CODE GENERATION PLAN

> This section tells you **exactly what code to write, in what order, in each masterclass**.
> Use this as your live coding script.

---

# MASTERCLASS 1 — Code Generation Plan

## Files to Create (in order)

### 1. Project Initialization
```bash
npm create vite@latest skillpath-frontend -- --template react
cd skillpath-frontend
npm install react-router-dom react-icons react-hot-toast framer-motion recharts axios
```

### 2. `index.html` — Update title and meta
```html
<meta name="description" content="SkillPath AI — Your personalized learning roadmap powered by AI" />
<title>SkillPath AI | Learn Smarter</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### 3. `src/index.css` — Base Styles (MC1 version)
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --color-primary: #6C63FF;
  --color-bg: #0F0F1A;
  --color-text: #E8E8F0;
  --font-primary: 'Plus Jakarta Sans', sans-serif;
}
body {
  font-family: var(--font-primary);
  background: var(--color-bg);
  color: var(--color-text);
}
```

### 4. `src/main.jsx`
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### 5. `src/App.jsx`
```jsx
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
```

### 6. Layout Components

**`src/components/layout/Navbar.jsx`**
```jsx
import { Link, NavLink } from 'react-router-dom'
import { FiZap } from 'react-icons/fi'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <FiZap /> SkillPath AI
      </Link>
      <ul className="navbar__links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register" className="btn-primary">Get Started</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar
```

**`src/components/layout/Footer.jsx`**
- Logo, navigation links, SDG badge, copyright

### 7. Shared UI Components (MC1 basics)

**`src/components/ui/Button.jsx`**
```jsx
const Button = ({ children, variant = 'primary', onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default Button
```

**`src/components/ui/InputField.jsx`**
```jsx
const InputField = ({ label, id, type = 'text', value, onChange, placeholder, error }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  )
}
export default InputField
```

### 8. Landing Page Components

**`src/components/landing/HeroSection.jsx`**
- Large headline with gradient text
- Subtitle
- Two CTA buttons (primary + secondary)
- Animated background (CSS only)

**`src/components/landing/FeatureCard.jsx`**
```jsx
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <span className="feature-card__icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
```

### 9. Pages

**`src/pages/LandingPage.jsx`**
- Import Navbar, HeroSection, FeatureCard (x4), Footer
- Features: Roadmap Generation, AI Chat, Project Ideas, Progress Tracking

**`src/pages/AboutPage.jsx`**
- Mission section, SDG alignment info, why we built this

**`src/pages/LoginPage.jsx`**
```jsx
import { useState } from 'react'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempted:', { email, password })
    // API call will be added in MC5
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Welcome Back</h2>
        <InputField label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <InputField label="Password" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="primary">Sign In</Button>
      </form>
    </div>
  )
}
```

**`src/pages/RegisterPage.jsx`** — Similar pattern with name field

**`src/pages/NotFoundPage.jsx`** — 404 with link back to home

---

## Testing Checkpoint (MC1)
```
□ Run: npm run dev
□ Landing page loads at localhost:5173
□ Navbar links work (all routes render)
□ Login form shows (no submit logic yet)
□ Register form shows
□ 404 page shows for unknown routes
□ No console errors
```

---

# MASTERCLASS 2 — Code Generation Plan

## What Changes

All MC1 files get styling upgrades. New files are added for all remaining pages and components.

## New Files to Create

### 1. `src/index.css` — Full Design System (upgrade from MC1)
Complete CSS variables, utility classes, responsive grid, animations, skeleton styles

### 2. `src/context/AuthContext.jsx`
```jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Will be replaced with real API calls in MC5
  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

### 3. `src/routes/ProtectedRoute.jsx`
```jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
```

### 4. All Remaining UI Components
Build each component in `src/components/ui/`:
- `Card.jsx`, `Modal.jsx`, `Spinner.jsx`, `Badge.jsx`
- `ProgressBar.jsx`, `ProgressRing.jsx`, `Tooltip.jsx`
- `Avatar.jsx`, `SearchBar.jsx`, `FilterBar.jsx`, `EmptyState.jsx`

### 5. Layout Upgrades
- `Sidebar.jsx` — Left nav for dashboard
- `DashboardLayout.jsx` — Sidebar + main content wrapper
- `AdminLayout.jsx` — Admin-specific sidebar

### 6. Onboarding Page
```jsx
// src/pages/OnboardingPage.jsx
const [step, setStep] = useState(1)
const [formData, setFormData] = useState({
  learningGoal: '',
  currentLevel: '',
  weeklyHours: ''
})

// StepIndicator shows current step
// Step 1: GoalSelector (buttons for goals)
// Step 2: LevelSelector (Beginner/Intermediate/Advanced)
// Step 3: TimeSelector (2h/5h/10h)
// Final step: Submit (console.log for now)
```

### 7. Dashboard Page (with mock data)
```jsx
// Mock data for teaching
const mockUser = { name: 'Alex', goal: 'Web Development', level: 'Beginner' }
const mockProgress = { percent: 35, completedSteps: 3, totalSteps: 10 }
const mockRoadmap = [
  { step: 1, title: 'HTML Basics', completed: true },
  { step: 2, title: 'CSS Fundamentals', completed: true },
  { step: 3, title: 'JavaScript Core', completed: false },
]
```

### 8. Roadmap Page (with mock steps)
```jsx
// Mock 8 roadmap steps
// RoadmapTimeline renders all RoadmapStep components
// Each step has: checkbox, title, description, duration badge
// ProgressBar at top shows % complete
// RegenerateButton (disabled, will work in MC4)
```

### 9. Chat Page (static UI)
```jsx
// Mock messages
const mockMessages = [
  { role: 'assistant', content: 'Hi! I\'m SkillPath AI. What would you like to learn today?' },
  { role: 'user', content: 'Can you explain what React hooks are?' },
  { role: 'assistant', content: 'React hooks are functions that let you use state and lifecycle features in functional components...' }
]
// MessageInput has controlled state
// Send button logs to console (real API in MC4+MC5)
```

### 10. Projects, Resources, Profile Pages
- All with mock/hardcoded data
- Focus on UI polish

### 11. Admin Pages
- Static tables with mock user/resource data
- Modal for add/edit (no submit yet)

### 12. Update App.jsx with all new routes + AuthProvider + ProtectedRoute
```jsx
<AuthProvider>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
    <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
    <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
    <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    <Route path="/admin/resources" element={<ProtectedRoute><AdminResources /></ProtectedRoute>} />
    <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</AuthProvider>
```

---

## Testing Checkpoint (MC2)
```
□ All pages render without errors
□ AuthContext mock login: go to /login → click login → logged in state
□ Protected routes: /dashboard redirects to /login if not logged in
□ Onboarding wizard: all 3 steps work, can navigate
□ Dashboard mock data visible
□ Roadmap step UI renders correctly
□ Chat bubble UI looks correct
□ Admin tables render with mock data
□ Responsive: test on 375px (mobile)
□ Animations working on page transition
```

---

# MASTERCLASS 3 — Code Generation Plan

## New Project: Backend

```bash
mkdir skillpath-backend && cd skillpath-backend
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser cors helmet morgan express-async-errors express-rate-limit
npm install --save-dev nodemon
```

### `package.json` scripts
```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

### Files to Create in Order

**1. `.env`**
```
PORT=5000
MONGO_URI=mongodb+srv://placeholder
JWT_SECRET=skillpathai_secret_key_minimum_32_chars
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**2. `config/db.js`**
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**3. `utils/generateToken.js`**
```javascript
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

module.exports = { generateToken, cookieOptions };
```

**4. `models/User.js`** (basic MC3 version)
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

**5. `middleware/errorMiddleware.js`**
```javascript
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = { notFound, errorHandler };
```

**6. `middleware/authMiddleware.js`**
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error('Not authorized — no token');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized — token invalid');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Admin access required');
  }
};

module.exports = { protect, isAdmin };
```

**7. `controllers/authController.js`**
```javascript
const User = require('../models/User');
const { generateToken, cookieOptions } = require('../utils/generateToken');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409);
    throw new Error('Email already registered');
  }
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);
  res.status(201).json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);
  res.json({
    success: true,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

const logout = async (req, res) => {
  res.cookie('token', '', { maxAge: 0 });
  res.json({ success: true, message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};

module.exports = { register, login, logout, getMe };
```

**8. Routes, server.js** — standard Express setup connecting all above

---

## Testing Checkpoint (MC3) — Postman Tests
```
POST /api/auth/register → 201 with user object
POST /api/auth/login → 200 with user object + cookie set
GET /api/auth/me (with cookie) → 200 with user
GET /api/auth/me (no cookie) → 401 unauthorized
POST /api/auth/logout → 200 + cookie cleared
GET /api/users/me (with cookie) → 200 with user profile
PUT /api/users/profile → 200 with updated user
```

---

# MASTERCLASS 4 — Code Generation Plan

## All New Model Files

Each model file (Profile, Roadmap, Progress, ChatHistory, Resource, SavedProject) — see exact schemas in `docs/03-architecture.md`.

## AI Service Layer

**`services/aiService.js`** — Full Groq integration (as defined in `docs/04-api-and-ai.md`)

**`services/fallbackService.js`**
```javascript
const fallbackRoadmaps = require('../data/fallbackRoadmaps');

const getRoadmap = (goal, level) => {
  const key = `${goal.toLowerCase()}_${level}`;
  return fallbackRoadmaps[key] || fallbackRoadmaps['web_development_beginner'];
};

const getChatResponse = () => {
  return "I'm temporarily offline. Please try again shortly or check the Resource Library for help!";
};

const getProjectIdeas = (goal, level) => {
  // Return hardcoded project list
};

module.exports = { getRoadmap, getChatResponse, getProjectIdeas };
```

**`data/fallbackRoadmaps.js`** — Pre-written roadmaps for 5 goal/level combos

## New Controllers (with DB operations)

**`controllers/roadmapController.js`**
```javascript
const aiService = require('../services/aiService');
const fallbackService = require('../services/fallbackService');
const Roadmap = require('../models/Roadmap');
const Progress = require('../models/Progress');

const generateRoadmap = async (req, res) => {
  const { goal, level, weeklyHours } = req.body;

  let roadmapData;
  let aiGenerated = true;

  try {
    roadmapData = await aiService.generateRoadmap(goal, level, weeklyHours);
  } catch (error) {
    console.warn('AI failed, using fallback:', error.message);
    roadmapData = fallbackService.getRoadmap(goal, level);
    aiGenerated = false;
  }

  // Deactivate old roadmap
  await Roadmap.updateMany({ user: req.user._id }, { isActive: false });

  // Create new roadmap
  const roadmap = await Roadmap.create({
    user: req.user._id,
    goal,
    level,
    aiGenerated,
    steps: roadmapData.steps,
    generatedAt: new Date()
  });

  // Initialize progress
  await Progress.findOneAndUpdate(
    { user: req.user._id },
    { roadmap: roadmap._id, completedSteps: [], totalSteps: roadmap.steps.length, percentComplete: 0 },
    { upsert: true, new: true }
  );

  res.status(201).json({ success: true, roadmap });
};
```

## Rate Limiter

**`middleware/rateLimiter.js`**
```javascript
const rateLimit = require('express-rate-limit');

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  message: { success: false, message: 'Too many AI requests. Please wait a minute.' }
});

module.exports = { aiRateLimiter };
```

---

## Testing Checkpoint (MC4) — Postman Tests
```
POST /api/profiles → creates profile + triggers roadmap
GET /api/roadmaps/me → returns user's roadmap with steps
POST /api/roadmaps/generate → AI generates new roadmap (check Atlas)
GET /api/progress/me → returns 0% initially
PUT /api/progress/step { stepNumber: 1, completed: true } → 10% returned
POST /api/chat { message: "What is React?" } → AI response returned
GET /api/chat/history → previous sessions listed
GET /api/projects/recommendations → AI project ideas returned
GET /api/resources → returns admin-added resources
POST /api/admin/resources (admin token) → creates resource
GET /api/admin/stats (admin token) → returns platform counts
```

---

# MASTERCLASS 5 — Code Generation Plan

## Frontend Integration Files

### 1. `src/utils/axios.js`
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

// Response interceptor — redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 2. `src/context/AuthContext.jsx` — Replace mock with real API
```jsx
import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/auth/me')
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data.user)
    return data.user
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    setUser(data.user)
    return data.user
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {isLoading ? <div className="app-loading">Loading...</div> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

### 3. Custom Hooks

**`src/hooks/useRoadmap.js`**
```javascript
import { useState, useEffect } from 'react'
import api from '../utils/axios'

const useRoadmap = () => {
  const [roadmap, setRoadmap] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const { data } = await api.get('/roadmaps/me')
        setRoadmap(data.roadmap)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load roadmap')
      } finally {
        setIsLoading(false)
      }
    }
    fetchRoadmap()
  }, [])

  const markStep = async (stepNumber, completed) => {
    const { data } = await api.put('/progress/step', { stepNumber, completed })
    return data.progress
  }

  return { roadmap, isLoading, error, markStep }
}

export default useRoadmap
```

### 4. Wire Each Page (replace mock data with hooks)

**DashboardPage.jsx** — Replace all `const mock...` with `useRoadmap()`, `useProgress()`, `useAuth()`

**RoadmapPage.jsx** — Replace mock steps with `roadmap.steps` from `useRoadmap()`

**ChatPage.jsx** — Replace mock messages with real `POST /api/chat` calls

**LoginPage.jsx** — Call `login(email, password)` from AuthContext on submit

### 5. Final Backend CORS Update
```javascript
// server.js
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## Testing Checkpoint (MC5) — Full E2E
```
□ Register → redirects to onboarding
□ Onboarding submit → roadmap generated and visible on dashboard
□ Roadmap page → real steps from DB
□ Mark step complete → progress % updates live
□ Chat → sends to backend → Groq response displayed
□ Profile update → saves to DB
□ Admin adds resource → visible in resource library
□ Logout → redirected to landing
□ Refresh on /dashboard → stays logged in (cookie persists)
□ All features work on live Vercel + Render URLs
```
