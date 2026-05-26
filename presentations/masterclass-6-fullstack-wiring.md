# 🔗 Masterclass 6: Connecting the Dots
### Axios Setup, Custom React Hooks, API Integration & Full-Stack Wiring
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — What We're Completing in MC6

### The Missing Connection
After 5 masterclasses, SkillPath AI has two fully built, completely independent halves:
- ✅ **Frontend (React)** — Beautiful, professional UI with all 14 pages and hardcoded mock data
- ✅ **Backend (Node/Express)** — Fully functional REST API with JWT auth, MongoDB, and Groq AI

But they are **NOT talking to each other**. If you click "Login" on the website, nothing happens except a `console.log`. If you generate a roadmap, no data flows to MongoDB.

### MC6 Goals
1. **Configure Axios** — Create a single, pre-configured API client for the entire frontend
2. **Build Custom React Hooks** — Wrap every API call in clean, reusable hooks
3. **Wire the Auth Flow** — Login, Register, Logout, and "Stay Logged In" all working with the real database
4. **Wire the Onboarding** — Profile creation + AI roadmap generation on form submit
5. **Wire the Roadmap Page** — Real steps from MongoDB, real step completion, real AI lessons and quizzes
6. **Wire the Chat Page** — Real AI responses, persistent history across sessions
7. **Wire all remaining pages** — Projects, Resources, Profile, Admin
8. **End-to-End Testing** — Verify every feature works from browser to database

---

## 📌 Slide 2 — How Frontend and Backend Communicate

### The Communication Pattern
Every piece of data flowing between React and Express follows this exact pattern:

```
1. User does something (clicks "Login")
      ↓
2. React event handler runs
      ↓
3. Axios sends an HTTP request (POST /api/auth/login + credentials in body)
      ↓
4. Express receives the request, runs middleware
      ↓
5. Controller runs (validates credentials, queries MongoDB, generates JWT)
      ↓
6. Express sends a JSON response + sets cookie
      ↓
7. Axios receives the response
      ↓
8. Custom hook updates React state (setUser(userData))
      ↓
9. React re-renders the component with the new data
      ↓
10. User sees: they're now logged in, redirected to dashboard ✅
```

### What is Axios?
**Axios** is a JavaScript library for making HTTP requests from a browser (or Node.js). It's the "messenger" that carries data between the frontend and backend.

**Why Axios instead of the browser's built-in `fetch()`?**

| Feature | Axios | fetch() |
|---------|-------|---------|
| JSON auto-parsing | ✅ Automatic | ❌ Must call `.json()` manually |
| Request/response interceptors | ✅ Built-in | ❌ Not built-in |
| Error handling | ✅ Non-2xx → caught as error | ❌ Only network errors |
| Cookie credentials | ✅ `withCredentials: true` | ✅ `credentials: 'include'` |
| Request cancellation | ✅ AbortController support | ✅ Also supported |
| Browser support | ✅ Excellent | ✅ Modern browsers |
| Bundle size | ~14KB | 0KB (built-in) |

The interceptors are the key reason we use Axios — they let us add global behavior (auto-redirect on 401) to every request without touching each one individually.

---

## 📌 Slide 3 — Configuring Axios: The Shared API Client

### File: `frontend/src/utils/axios.js`

This is **the most important connection file** in the entire frontend. We create ONE shared Axios instance that every hook, page, and component uses.

```javascript
import axios from 'axios';

// Create a pre-configured Axios instance
const api = axios.create({
  // In development: http://localhost:5001/api
  // In production (Vercel): https://your-backend.onrender.com/api
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',

  // CRITICAL: This tells the browser to include cookies (JWT) with EVERY request
  // Without this, the JWT cookie is never sent → every protected route returns 401
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});
```

### The Response Interceptor: Auto-Redirect on 401
```javascript
// This runs automatically for EVERY response received by any hook or component
api.interceptors.response.use(
  // Success handler (2xx responses) — just pass through
  (response) => response,

  // Error handler — runs for any non-2xx response
  (error) => {
    if (error.response?.status === 401) {
      // JWT expired or missing — redirect to login
      // This handles EVERY protected route uniformly
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Why is this interceptor so valuable?**
Without it, every single API call would need its own 401 check:
```javascript
// WITHOUT interceptor — repetitive in every hook:
try {
  const response = await api.get('/roadmaps/me');
} catch (error) {
  if (error.response?.status === 401) {
    navigate('/login');
  }
}
```

With the interceptor, this never-expires-or-redirects logic lives in **one place** and applies to every single API call automatically.

### The `VITE_API_URL` Environment Variable

**File: `frontend/.env`** (local development)
```
VITE_API_URL=http://localhost:5001/api
```

**On Vercel (production):**
```
VITE_API_URL=https://your-skillpath-backend.onrender.com/api
```

In Vite, environment variables must start with `VITE_` to be accessible in the React code via `import.meta.env.VITE_API_URL`. They are **baked into the JavaScript bundle at build time** — this means changing the variable on Vercel requires triggering a new build (it's not read at runtime).

---

## 📌 Slide 4 — Custom React Hooks: The Integration Layer

### Why Custom Hooks?
Without custom hooks, every page would be cluttered with API calls, loading states, error states, and data transformation logic. A component would look like:

```jsx
// WITHOUT custom hooks — a mess:
function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [lessonContent, setLessonContent] = useState(null);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/roadmaps/me');
        setRoadmap(response.data.roadmap);
        setProgress(response.data.progress);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoadmap();
  }, []);

  // All the markStep, regenerate, getLesson, getQuiz functions here...
  // This component becomes 200+ lines of logic, drowning the JSX
```

With custom hooks:
```jsx
// WITH custom hooks — clean and readable:
function RoadmapPage() {
  const { roadmap, progress, isLoading, markStep, regenerate, getLesson, getQuiz } = useRoadmap();

  if (isLoading) return <Spinner />;
  return <div>...clean JSX only...</div>;
}
```

### Definition
A **Custom Hook** is a JavaScript function whose name starts with `use` that calls React's built-in hooks internally. The `use` prefix is a naming convention that:
1. Tells React to apply the Rules of Hooks to it
2. Signals to other developers that this function uses hooks

### Real World Analogy
Think of a custom hook as a **specialized assistant**. Instead of your manager (the component) personally making 20 phone calls, managing a callback list, and handling errors — they delegate to an assistant (the hook) who does all that and reports back with a simple status report. The manager just asks "what's the current roadmap?" and gets the answer without knowing how it was fetched.

---

## 📌 Slide 5 — The `useAuth` Hook: Complete Auth Integration

### File: `frontend/src/context/AuthContext.jsx` (Updated in MC6)

The `AuthContext` from MC2 stored a `user` object, but it was populated with mock data. In MC6, we wire it to the real backend.

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Check auth on startup

  // On app load: verify if the JWT cookie is still valid
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);  // JWT valid — store user
      } catch {
        setUser(null);  // JWT invalid/expired — user is not logged in
      } finally {
        setIsLoading(false);  // Auth check complete
      }
    };
    verifyAuth();
  }, []);  // Run only once on mount

  // Login function — called from LoginPage
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    setUser(response.data);  // Backend returns user data, cookie is set automatically
    return response.data;
  };

  // Register function — called from RegisterPage
  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    setUser(response.data);
    return response.data;
  };

  // Logout function
  const logout = async () => {
    await api.post('/auth/logout');  // Backend clears the cookie
    setUser(null);                   // Frontend clears the user state
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### How LoginPage Uses `useAuth`
```jsx
// frontend/src/pages/LoginPage.jsx (updated in MC6)
function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');  // Redirect after successful login
    } catch (err) {
      // Axios error — the error message from the backend
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField value={email} onChange={setEmail} label="Email" type="email" />
      <InputField value={password} onChange={setPassword} label="Password" type="password" />
      {error && <p className="error-text">{error}</p>}
      <Button type="submit" isLoading={isLoading}>Sign In</Button>
    </form>
  );
}
```

---

## 📌 Slide 6 — The `useRoadmap` Hook

### File: `frontend/src/hooks/useRoadmap.js`

This hook manages ALL state and API calls related to the user's roadmap and learning experience.

```javascript
import { useState, useEffect } from 'react';
import api from '../utils/axios';
import toast from 'react-hot-toast';

export function useRoadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch roadmap and progress when the hook first mounts
  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/roadmaps/me');
      setRoadmap(response.data.roadmap);
      setProgress(response.data.progress);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load roadmap');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Mark a step as complete or incomplete
  const markStep = async (stepNumber, completed) => {
    // Optimistic UI: update state immediately before API confirms
    setProgress(prev => {
      const updatedCompleted = completed
        ? [...(prev?.completedSteps || []), stepNumber]
        : (prev?.completedSteps || []).filter(s => s !== stepNumber);
      
      const newPercent = Math.round(
        (updatedCompleted.length / (roadmap?.steps?.length || 1)) * 100
      );
      
      return { ...prev, completedSteps: updatedCompleted, percentComplete: newPercent };
    });

    try {
      // Confirm with the server
      await api.put('/progress/step', { stepNumber, completed });
      toast.success(completed ? '✅ Step marked complete!' : 'Step unchecked');
    } catch (err) {
      // Revert on failure
      fetchRoadmap();
      toast.error('Failed to update progress');
    }
  };

  // 3. Generate/regenerate the AI roadmap
  const regenerate = async (goal, level, weeklyHours) => {
    setIsLoading(true);
    try {
      const response = await api.post('/roadmaps/regenerate', { goal, level, weeklyHours });
      setRoadmap(response.data.roadmap);
      setProgress(response.data.progress);
      toast.success('🤖 New roadmap generated!');
    } catch (err) {
      toast.error('Failed to generate roadmap. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Fetch an AI lesson for a specific step
  const getLesson = async (topic, description) => {
    try {
      const response = await api.post('/learning/lesson', { topic, description });
      return response.data.lesson;  // Returns Markdown text
    } catch {
      throw new Error('Failed to generate lesson');
    }
  };

  // 5. Fetch an AI quiz for a specific step
  const getQuiz = async (topic, description) => {
    try {
      const response = await api.post('/learning/quiz', { topic, description });
      return response.data.quiz;  // Returns array of question objects
    } catch {
      throw new Error('Failed to generate quiz');
    }
  };

  return { roadmap, progress, isLoading, error, markStep, regenerate, getLesson, getQuiz, refetch: fetchRoadmap };
}
```

### How `RoadmapPage` Uses This Hook
```jsx
// frontend/src/pages/RoadmapPage.jsx (updated in MC6)
function RoadmapPage() {
  const { roadmap, progress, isLoading, markStep, regenerate, getLesson, getQuiz } = useRoadmap();
  const [selectedStep, setSelectedStep] = useState(null);
  const [lessonContent, setLessonContent] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  const handleLearnNow = async (step) => {
    setSelectedStep(step);
    setLessonLoading(true);
    setLessonModalOpen(true);
    
    try {
      const lesson = await getLesson(step.title, step.description);
      setLessonContent(lesson);
    } catch {
      toast.error('Could not generate lesson');
    } finally {
      setLessonLoading(false);
    }
  };

  if (isLoading) return <div className="loading-page"><Spinner size="lg" /></div>;
  if (!roadmap) return <EmptyState title="No Roadmap Yet" description="Complete onboarding to generate your AI roadmap" />;

  return (
    <DashboardLayout>
      <ProgressBar value={progress?.percentComplete || 0} />
      {roadmap.steps.map(step => (
        <StepCard
          key={step.stepNumber}
          step={step}
          isCompleted={progress?.completedSteps?.includes(step.stepNumber)}
          onToggle={(done) => markStep(step.stepNumber, done)}
          onLearn={() => handleLearnNow(step)}
          onQuiz={() => handleTestKnowledge(step)}
        />
      ))}
      <LessonModal
        isOpen={lessonModalOpen}
        onClose={() => setLessonModalOpen(false)}
        step={selectedStep}
        lesson={lessonContent}
        isLoading={lessonLoading}
      />
    </DashboardLayout>
  );
}
```

---

## 📌 Slide 7 — The `useChat` Hook

### File: `frontend/src/hooks/useChat.js`

Manages the entire AI chat conversation — messages, typing state, and history persistence.

```javascript
import { useState, useEffect } from 'react';
import api from '../utils/axios';

export function useChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your SkillPath AI tutor 👋 Ask me anything about coding or your roadmap!",
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Load chat history from backend on first mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await api.get('/chat/history');
      if (response.data.messages && response.data.messages.length > 0) {
        // Replace the initial greeting with real history
        setMessages(response.data.messages);
      }
    } catch {
      // If no history exists, keep the initial greeting — that's fine
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text, timestamp: new Date() };

    // 1. Optimistic UI: Show user's message immediately
    setMessages(prev => [...prev, userMessage]);

    // 2. Show the "AI is typing" indicator
    setIsTyping(true);

    try {
      // 3. Send to backend (which calls Groq AI + saves history)
      const response = await api.post('/chat', { message: text });

      // 4. Add the AI's response
      const aiMessage = {
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      // Show error as an AI message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment!",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearHistory = async () => {
    await api.delete('/chat/history');
    setMessages([messages[0]]);  // Reset to just the initial greeting
  };

  return { messages, isTyping, sendMessage, clearHistory };
}
```

### What is Optimistic UI? (Deep Dive)
**Optimistic UI** is the pattern of updating the interface **immediately**, optimistically assuming the action will succeed, before the server actually confirms it.

**Without Optimistic UI:**
1. User types "What is useEffect?" and clicks Send
2. User's message does NOT appear in chat yet
3. Waits 1–2 seconds for API call...
4. API responds → user's message + AI response both appear simultaneously

**With Optimistic UI:**
1. User types "What is useEffect?" and clicks Send
2. User's message **immediately appears** in chat (fast, responsive feel)
3. Typing indicator shows...
4. AI response appears 1–2 seconds later

The app "feels" much faster because the user sees immediate feedback on their action.

---

## 📌 Slide 8 — The `useProgress` Hook

### File: `frontend/src/hooks/useProgress.js`

A simpler hook for reading progress data — used by the Dashboard page independently of the Roadmap page.

```javascript
import { useState, useEffect } from 'react';
import api from '../utils/axios';

export function useProgress() {
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await api.get('/progress/me');
        setProgress(response.data);
      } catch {
        setProgress(null);  // User hasn't started yet
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgress();
  }, []);

  return { progress, isLoading };
}
```

Why a separate hook instead of using `useRoadmap`?
- The Dashboard only needs progress data — it doesn't need the full roadmap steps
- Fetching only what you need is more efficient
- Separation of concerns — each hook has one clear responsibility

---

## 📌 Slide 9 — Wiring the Remaining Pages

### OnboardingPage — Profile Creation + Roadmap Generation

```jsx
// The final submit in OnboardingPage (MC6 version):
const handleSubmit = async () => {
  setIsGenerating(true);

  try {
    // Step 1: Create/update the user's profile
    await api.put('/users/profile', {
      learningGoal: goal,
      currentLevel: level,
      weeklyHours,
    });

    // Step 2: Generate the AI roadmap
    await api.post('/roadmaps/regenerate', { goal, level, weeklyHours });

    toast.success('Your AI roadmap is ready! 🎉');
    navigate('/roadmap');
  } catch (err) {
    toast.error('Failed to generate roadmap. Please try again.');
    setIsGenerating(false);
  }
};
```

### DashboardPage — Real Progress Data

```jsx
// Updated DashboardPage using useProgress hook:
function DashboardPage() {
  const { user } = useAuth();
  const { progress, isLoading } = useProgress();

  // No more hardcoded numbers — everything comes from the database
  return (
    <DashboardLayout>
      <h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
      
      {isLoading ? (
        <Spinner />
      ) : (
        <ProgressRing value={progress?.percentComplete || 0} />
      )}
    </DashboardLayout>
  );
}
```

### ProfilePage — Real Profile Data with Save

```jsx
// ProfilePage save handler (MC6):
const handleSave = async () => {
  setIsSaving(true);
  try {
    const response = await api.put('/users/profile', formData);
    toast.success('Profile updated! ✅');
    setIsEditing(false);
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to save profile');
  } finally {
    setIsSaving(false);
  }
};
```

### ProjectsPage — Real AI Recommendations

```jsx
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await api.get('/projects/recommendations');
      setProjects(response.data.projects);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  const handleSave = async (project) => {
    await api.post('/projects/save', project);
    toast.success('Project saved! 🎉');
  };
```

### AdminDashboardPage — Real Platform Stats

```jsx
function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then(response => setStats(response.data));
  }, []);

  return (
    <div>
      <StatCard label="Total Users" value={stats?.totalUsers || 0} icon="👥" />
      <StatCard label="Roadmaps Generated" value={stats?.totalRoadmaps || 0} icon="🗺️" />
      <StatCard label="Resources" value={stats?.totalResources || 0} icon="📚" />
    </div>
  );
}
```

---

## 📌 Slide 10 — React Hot Toast: Notifications

### File: Install with `npm install react-hot-toast`

Throughout the wiring process, we've been calling `toast.success()` and `toast.error()`. React Hot Toast is a lightweight notification library that shows brief, dismissible toast messages.

### Setup in `main.jsx`
```jsx
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            success: { duration: 3000, style: { background: '#1a1a2e', color: '#fff' } },
            error: { duration: 5000 },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
```

### Usage
```javascript
import toast from 'react-hot-toast';

// Success notification
toast.success('Roadmap generated! 🤖');

// Error notification
toast.error('Failed to connect. Check your internet.');

// Loading toast (useful for long operations)
const toastId = toast.loading('Generating your AI roadmap...');
// Later:
toast.success('Done!', { id: toastId });  // Replaces the loading toast
```

---

## 📌 Slide 11 — The Full Data Flow: End-to-End Visualization

### From Click to Screen: A Complete Journey

When a student clicks "Generate Roadmap" after completing the onboarding form:

```
1.  OnboardingPage calls:
    await api.post('/roadmaps/regenerate', { goal, level, weeklyHours })
    
2.  Axios sends:
    POST https://localhost:5001/api/roadmaps/regenerate
    Headers: { Cookie: "jwt=eyJhbGciO..." }
    Body: { "goal": "React Dev", "level": "beginner", "weeklyHours": 10 }

3.  Express CORS middleware:
    Checks Origin header against CLIENT_URL → Allowed ✅

4.  express.json() middleware:
    Parses the JSON body → req.body = { goal, level, weeklyHours }

5.  protect() middleware:
    Reads req.cookies.jwt → jwt.verify() → Decodes userId
    User.findById(userId) → req.user = { _id, name, role, ... }

6.  roadmapController.regenerateRoadmap():
    Receives goal, level, weeklyHours from req.body
    Calls aiService.generateRoadmapWithAI(goal, level, weeklyHours)

7.  aiService sends to Groq API:
    POST https://api.groq.com/openai/v1/chat/completions
    Model: "llama-3.3-70b-versatile"
    Prompt: "Create a learning roadmap for React Dev, beginner, 10hrs/week..."
    
8.  Groq's LLaMA 3.3 70B processes the prompt and returns:
    {
      "estimatedDuration": "10 weeks",
      "steps": [
        { "stepNumber": 1, "title": "HTML & CSS Fundamentals", ... },
        { "stepNumber": 2, "title": "JavaScript Basics", ... },
        ...
      ]
    }

9.  roadmapController saves to MongoDB Atlas:
    Roadmap.findOneAndUpdate({ user: userId }, data, { upsert: true, new: true })
    Progress.findOneAndUpdate({ user: userId }, { completedSteps: [], ... }, { upsert: true })

10. Express sends response:
    Status: 200 OK
    Body: { "roadmap": { ... } }
    
11. Axios receives the response in useRoadmap hook:
    setRoadmap(response.data.roadmap)
    setProgress(response.data.progress)

12. React re-renders RoadmapPage:
    Maps over roadmap.steps → Renders step cards
    Progress bar fills to 0%

13. Student sees:
    Their personalized AI roadmap with 10 steps, ready to start ✅
```

---

## 📌 Slide 12 — Helper Utilities

### File: `frontend/src/utils/helpers.js`
```javascript
// Formats ISO date strings to human-readable format
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }); // Returns: "Apr 22, 2026"
};

// Maps skill level strings to Badge color variants
export const getLevelColor = (level) => {
  const colors = {
    beginner: 'success',       // Green
    intermediate: 'warning',   // Yellow
    advanced: 'error',         // Red
  };
  return colors[level] || 'neutral';
};

// Truncates long strings with ellipsis
export const truncate = (str, maxLength) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};

// Calculates progress percentage
export const calcPercent = (completed, total) => {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
};
```

---

## 📌 Slide 13 — End-to-End Testing Checklist

Run through every feature systematically after wiring everything:

### Authentication Flow
- [ ] **Register** a new account → User appears in MongoDB Atlas users collection
- [ ] **Login** with that account → Redirected to `/dashboard`
- [ ] **Refresh the page** while logged in → Still logged in (cookie persists)
- [ ] **Log out** → Redirected to landing page
- [ ] **Visit `/dashboard` while logged out** → Redirected to `/login`
- [ ] **Try wrong password** → Error message appears (from backend)

### Core Features
- [ ] **Complete onboarding** → Profile created in MongoDB, roadmap generated by AI
- [ ] **View roadmap** → All AI-generated steps show with correct titles
- [ ] **Mark a step complete** → Progress bar updates, percentage updates
- [ ] **Uncheck the step** → Progress bar goes back down
- [ ] **Click "Learn Now"** → AI lesson generates (~2 seconds) and appears in modal
- [ ] **Click "Test Knowledge"** → Quiz with 3 questions appears
- [ ] **Pass the quiz** → "Mark Complete" button appears → clicking it marks the step
- [ ] **Send a chat message** → AI responds within 2–3 seconds
- [ ] **Close and reopen chat** → Previous messages are still there (persisted in MongoDB)
- [ ] **Visit Projects** → 3 AI-generated project recommendations appear
- [ ] **Save a project** → Appears in "Saved Projects" section
- [ ] **Browse Resources** → Resources load with search and filter working
- [ ] **Toggle dark/light mode** → Theme switches and persists on refresh

### Admin Features
- [ ] **Set `role: "admin"`** in MongoDB Atlas for a user
- [ ] **Login as admin** → Admin section appears in sidebar
- [ ] **Visit `/admin`** → Real platform stats (user count, roadmap count, resource count)
- [ ] **Visit `/admin/users`** → Real list of all registered users
- [ ] **Ban a user** → `isActive` set to `false` in MongoDB
- [ ] **Try to login as banned user** → Login error "account suspended"
- [ ] **Add a resource in admin** → Appears in Resources page for all users

---

## 📌 Slide 14 — Files Created/Updated in Masterclass 6

| File | Status | Purpose |
|------|--------|---------|
| `frontend/src/utils/axios.js` | **NEW** | Pre-configured Axios instance with interceptor |
| `frontend/src/utils/helpers.js` | **NEW** | Utility functions (formatDate, getLevelColor, truncate) |
| `frontend/src/hooks/useRoadmap.js` | **NEW** | Roadmap + progress + lesson + quiz data management |
| `frontend/src/hooks/useChat.js` | **NEW** | Chat messages + AI typing state |
| `frontend/src/hooks/useProgress.js` | **NEW** | Progress data for Dashboard |
| `frontend/src/context/AuthContext.jsx` | **UPDATED** | Wired to real `/api/auth/*` endpoints |
| `frontend/src/pages/LoginPage.jsx` | **UPDATED** | Real `login()` from AuthContext |
| `frontend/src/pages/RegisterPage.jsx` | **UPDATED** | Real `register()` from AuthContext |
| `frontend/src/pages/OnboardingPage.jsx` | **UPDATED** | Real profile creation + roadmap API calls |
| `frontend/src/pages/DashboardPage.jsx` | **UPDATED** | Uses `useProgress` hook — real data |
| `frontend/src/pages/RoadmapPage.jsx` | **UPDATED** | Uses `useRoadmap` — real steps, mark done, AI features |
| `frontend/src/pages/ChatPage.jsx` | **UPDATED** | Uses `useChat` — real AI responses |
| `frontend/src/pages/ProjectsPage.jsx` | **UPDATED** | Real AI recommendations from backend |
| `frontend/src/pages/ResourcesPage.jsx` | **UPDATED** | Real resources from MongoDB |
| `frontend/src/pages/ProfilePage.jsx` | **UPDATED** | Real profile save via PUT API |
| `frontend/src/pages/AdminDashboardPage.jsx` | **UPDATED** | Real stats from `/api/admin/stats` |
| `frontend/src/pages/AdminUsersPage.jsx` | **UPDATED** | Real users from `/api/admin/users` |
| `frontend/src/pages/AdminResourcesPage.jsx` | **UPDATED** | Real CRUD via `/api/admin/resources` |
| `frontend/.env` | **NEW** | `VITE_API_URL=http://localhost:5001/api` |

---

## 📌 Slide 15 — GitHub Checkpoint: MC6

### Commit Message
> `MC6: Full-Stack Integration — Axios, Custom Hooks (useRoadmap, useChat, useProgress), Auth Wiring, All Pages Connected to Real API`

### Branch Naming
`masterclass-6/full-stack-wiring`

### What's Intentionally Left for MC7
- App only runs on your local machine
- MongoDB Atlas is already live, but the backend and frontend need to be deployed
- No one else can access your app until you deploy
- Deployment (Render + Vercel) comes in MC7

---

## ✅ By the End of MC6, Students Should Be Able To:

- ✅ Create a pre-configured Axios instance with base URL, credentials, and interceptors
- ✅ Build custom React hooks that manage API state, loading, and errors cleanly
- ✅ Wire login, logout, and registration to a real Express backend with JWT cookies
- ✅ Implement optimistic UI — updating state before server confirmation
- ✅ Chain multiple API calls (profile creation + roadmap generation) on a single form submit
- ✅ Use `useEffect` to auto-fetch data when a component mounts
- ✅ Handle API errors gracefully with user-friendly toast notifications
- ✅ Understand the complete end-to-end request-response cycle in a MERN app
- ✅ Test an entire full-stack application locally and verify data in MongoDB Atlas

---

## 🎮 Two Truths and One Lie — MC6

---

### 🔴 Round 1 — About Axios and Custom Hooks

- 🟢 Axios's `withCredentials: true` setting tells the browser to include the JWT cookie with every request — without this, all protected endpoints return 401 and the user appears logged out.
- 🟢 The Axios response interceptor runs automatically for every response — if the backend returns 401, it redirects to login without any code in individual hooks or components.
- 🔴 Custom hooks can be called inside `useEffect` — this is actually the recommended pattern to ensure hooks run after the component is mounted.

> **🎯 The Lie:** React's Rules of Hooks strictly state that hooks must be called at the **top level of a component** or another hook — never inside `useEffect`, conditionals, or loops. Our custom hook `useRoadmap()` is called at the top of `RoadmapPage`, NOT inside a `useEffect`.

---

### 🔴 Round 2 — About Optimistic UI

- 🟢 Optimistic UI updates the interface immediately before the server confirms the action — making the app feel faster and more responsive.
- 🟢 When an optimistic UI action fails (e.g., the mark-step API call fails), the best practice is to revert the state to its previous value and show an error notification.
- 🔴 Optimistic UI is risky for financial transactions like payments — but it's completely safe and appropriate for any non-critical action like marking a learning step complete.

> **🎯 The Lie:** The statement implies optimistic UI is binary — either safe or unsafe. The truth is: **you must always handle the failure case**. Even marking a step complete should revert if the API fails, because the database wouldn't have been updated — the frontend would show "completed" but MongoDB would still show it as incomplete, causing a data mismatch.

---

### 🔴 Round 3 — About Environment Variables

- 🟢 Vite environment variables must start with `VITE_` to be accessible in React code via `import.meta.env.VITE_API_URL`.
- 🟢 Vite env variables are "baked in" at build time — changing them requires triggering a new build on Vercel, they are not read at runtime.
- 🔴 Setting `VITE_API_URL` in the `.env` file is sufficient for production deployment — we don't need to configure this separately on Vercel's dashboard.

> **🎯 The Lie:** The `.env` file is for **local development only** and is never committed to Git (it's in `.gitignore`). For production on Vercel, you MUST configure `VITE_API_URL` separately in Vercel's Environment Variables dashboard. When Vercel builds the app, it reads its own configured variables, not your local `.env` file.

---

## 🙋 Mid-Class Questions — MC6

1. **"We have `withCredentials: true` in our Axios instance. What would happen if I removed just that one line, saved the file, and tried to log in on the app?"**
   *(Expected: The login API call succeeds — the backend validates credentials and sends back the JWT cookie. But the cookie is NOT stored by the browser (because withCredentials: false = don't send/accept cross-site cookies). Every subsequent protected API call returns 401. The user appears to be logged out immediately after logging in.)*

2. **"What is the difference between our `useRoadmap` custom hook and just writing the API call directly inside `RoadmapPage.jsx`? List 3 concrete advantages of the hook approach."**
   *(Expected: 1) Separation of concerns — page only contains JSX/UI logic. 2) Reusability — if another page ever needs roadmap data, it calls the same hook. 3) Testability — hooks can be tested independently from the UI component.)*

3. **"When a student clicks 'Mark Done' on a step, we update the progress state immediately before the API call responds. What is this pattern called, and what must we do if the API call fails?"**
   *(Expected: Optimistic UI. If the API fails, we must REVERT the state to the previous value — because MongoDB was not updated. If we don't revert, the frontend shows "completed" but the database says "not completed" — a data mismatch that persists until the user refreshes.)*

4. **"Our Axios interceptor redirects to `/login` when any response is 401. Can you think of a case where this auto-redirect might be a bad user experience?"**
   *(Expected: Multiple scenarios: 1) If the user is on the Login page itself and gets a 401 (wrong password) — they'd get stuck in a redirect loop. 2) If the user has an operation in progress (typing a message) and the JWT expires — they'd lose their work. This is why some apps show a "Session Expired" modal instead of auto-redirecting.)*

5. **"We use `Promise.all` in some places. Walk me through exactly what happens when the login API call in `AuthContext.login()` completes — what changes in the React component tree?"**
   *(Expected: `api.post('/auth/login')` resolves → `setUser(response.data)` is called → `AuthContext` value changes → ALL components consuming `useAuth()` re-render: Navbar now shows "Dashboard" instead of "Login", Sidebar shows user's name, ProtectedRoute now allows access → `navigate('/dashboard')` is called → React Router renders DashboardPage.)*

---

## 📋 File Creation Flow — MC6 (Start Here, Follow This Order!)

> You have a fully built frontend (MC1–MC3) and a fully built backend (MC4–MC5). In MC6, you CONNECT them.

---

### 🟢 STEP 1 — Axios Configuration (The Bridge — build before ANYTHING makes API calls)

| Order | File | Why First? |
|-------|------|------------|
| 1️⃣ | `frontend/src/utils/axios.js` | Every hook imports this — it MUST exist first |
| 2️⃣ | `frontend/.env` | `VITE_API_URL` — Axios reads this for the baseURL |

---

### 🟡 STEP 2 — Helper Utilities

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 3️⃣ | `frontend/src/utils/helpers.js` | `formatDate`, `getLevelColor`, `truncate` — used by pages |

---

### 🟠 STEP 3 — Update AuthContext (Wire auth before anything else)

| Order | File | What Changes |
|-------|------|-------------|
| 4️⃣ | `frontend/src/context/AuthContext.jsx` (update) | Add real `login()`, `register()`, `logout()`, `verifyAuth()` using Axios |

---

### 🔵 STEP 4 — Custom Hooks (Wrap all API calls — build before pages that use them)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 5️⃣ | `frontend/src/hooks/useProgress.js` | Simplest hook — fetches progress only |
| 6️⃣ | `frontend/src/hooks/useChat.js` | Chat messages + AI typing state |
| 7️⃣ | `frontend/src/hooks/useRoadmap.js` | Most complex — roadmap + progress + lesson + quiz |

---

### 🟣 STEP 5 — Update Pages (Replace mock data with real API calls)

| Order | File | What Changes |
|-------|------|-------------|
| 8️⃣ | `frontend/src/pages/LoginPage.jsx` | Call `useAuth().login()` on submit |
| 9️⃣ | `frontend/src/pages/RegisterPage.jsx` | Call `useAuth().register()` on submit |
| 🔟 | `frontend/src/pages/OnboardingPage.jsx` | Call profile API + `api.post('/roadmaps/regenerate')` |
| 1️⃣1️⃣ | `frontend/src/pages/DashboardPage.jsx` | Use `useProgress()` hook |
| 1️⃣2️⃣ | `frontend/src/pages/RoadmapPage.jsx` | Use `useRoadmap()` hook + wire LessonModal + QuizModal |
| 1️⃣3️⃣ | `frontend/src/pages/ChatPage.jsx` | Use `useChat()` hook |
| 1️⃣4️⃣ | `frontend/src/pages/ProjectsPage.jsx` | Call `api.get('/projects/recommendations')` |
| 1️⃣5️⃣ | `frontend/src/pages/ResourcesPage.jsx` | Call `api.get('/resources')` |
| 1️⃣6️⃣ | `frontend/src/pages/ProfilePage.jsx` | Call `api.put('/users/profile')` on save |
| 1️⃣7️⃣ | `frontend/src/pages/AdminDashboardPage.jsx` | Call `api.get('/admin/stats')` |
| 1️⃣8️⃣ | `frontend/src/pages/AdminUsersPage.jsx` | Call `api.get('/admin/users')` + ban/unban |
| 1️⃣9️⃣ | `frontend/src/pages/AdminResourcesPage.jsx` | Full CRUD via admin resources API |

---

### ✅ MC6 Creation Order — Quick Visual Summary

```
FOUNDATION:
1. utils/axios.js       ← Axios instance (baseURL + withCredentials + interceptor)
2. frontend/.env        ← VITE_API_URL variable

UTILITIES:
3. utils/helpers.js     ← formatDate, getLevelColor, truncate

AUTH WIRING:
4. context/AuthContext.jsx (update) ← Real login/register/logout/verifyAuth

CUSTOM HOOKS:
5. hooks/useProgress.js ← Progress data
6. hooks/useChat.js     ← Chat + AI typing
7. hooks/useRoadmap.js  ← Roadmap + steps + lesson + quiz

PAGE UPDATES (replace mock → real):
8.  LoginPage.jsx
9.  RegisterPage.jsx
10. OnboardingPage.jsx
11. DashboardPage.jsx
12. RoadmapPage.jsx     ← Uses useRoadmap + LessonModal + QuizModal
13. ChatPage.jsx        ← Uses useChat
14. ProjectsPage.jsx
15. ResourcesPage.jsx
16. ProfilePage.jsx
17. AdminDashboardPage.jsx
18. AdminUsersPage.jsx
19. AdminResourcesPage.jsx
```

> 💡 **Golden Rule for MC6:** Always create the **Axios instance first** — it's the foundation that every hook and API call depends on. Then build **hooks before the pages that use them**, and always wire **auth before everything else** because most hooks depend on the user being authenticated.
