# 🎨 Masterclass 2: Make It Look WOW
### Design System, CSS Variables, Dark Mode, Reusable UI Components & Context API
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — What We're Completing in MC2

In Masterclass 1, we built the **skeleton** of the app — pages exist, routing works, but everything looks plain, unstyled, and amateur. In MC2, we transform it into a **stunning, professional, portfolio-worthy UI**.

### The Goal of MC2
By the end of this class, SkillPath AI will look like a product someone is paying $20/month for.

### MC2 Goals
1. Build a **CSS Design System** — a consistent visual language for the entire app using CSS variables
2. Add **Dark Mode and Light Mode** toggle that persists across sessions
3. Create a full **Reusable UI Component Library** — Button, Badge, Card, Modal, InputField, Spinner, and more
4. Implement **React Context API** — share theme and user data across the entire app without prop drilling
5. Build the **Dashboard Layout** — the sidebar-based layout for logged-in users
6. Set up **Route Protection** — users who aren't logged in can't access the dashboard
7. Add **smooth micro-animations** that make the UI feel alive and premium

---

## 📌 Slide 2 — What is a Design System?

### Definition
A **Design System** is a collection of reusable design decisions — colors, fonts, spacing, shadows, border-radius values — that are defined **once** in one place and used consistently across the entire application.

### Why It Matters: The Inconsistency Problem
Without a design system, every developer makes their own choices:
- Developer A makes buttons `blue`
- Developer B makes buttons `#3B82F6`
- Developer C makes buttons `indigo`

The result? An inconsistent, amateur-looking app. With a design system, **every element follows the same visual language** — every button uses `--color-primary`, every card uses `--border-radius-lg`, every shadow uses `--shadow-md`.

### Real World Analogy
Think of McDonald's **brand guidelines**. Whether you see a McDonald's sign in Mumbai, London, or New York, the arches are always the exact same shade of yellow (`#FFC72C`), the font is always `Speedee`, the red is always `#DA291C`. Every franchise follows these rules. Your design system does the same thing for your app — enforces consistency across every component.

### File: `frontend/src/index.css`
This is the **single most important styling file** in the entire project. It defines all design tokens as **CSS Custom Properties** (CSS Variables). Every component uses these variables instead of hardcoded colors.

```css
:root {
  /* Colors */
  --color-primary: #6C63FF;        /* Purple — the brand color */
  --color-accent: #00D4AA;         /* Teal — secondary accent */
  --color-bg: #0A0B1A;             /* Dark background */
  --color-surface: #111228;        /* Card/panel background */
  --color-text: #F0F0FF;           /* Primary text */
  --color-text-secondary: #9898B0; /* Muted text */
  --color-border: rgba(255,255,255,0.08); /* Subtle borders */

  /* Typography */
  --font-family: 'Plus Jakarta Sans', sans-serif;
  --font-size-xs: 0.75rem;         /* 12px */
  --font-size-sm: 0.875rem;        /* 14px */
  --font-size-base: 1rem;          /* 16px */
  --font-size-lg: 1.125rem;        /* 18px */
  --font-size-xl: 1.25rem;         /* 20px */
  --font-size-2xl: 1.5rem;         /* 24px */
  --font-size-4xl: 2.25rem;        /* 36px */

  /* Spacing */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */

  /* Borders & Shadows */
  --border-radius-sm: 6px;
  --border-radius-md: 10px;
  --border-radius-lg: 16px;
  --border-radius-xl: 24px;
  --shadow-md: 0 4px 16px rgba(0,0,0,0.3);
  --shadow-glow: 0 0 20px rgba(108,99,255,0.3);

  /* Transitions */
  --transition: all 0.2s ease;
}
```

### The Dark/Light Mode Trick
The same file defines a second set of variables for light mode:

```css
/* Default = dark mode (above) */
/* Light mode overrides: */
[data-theme="light"] {
  --color-bg: #FFFFFF;
  --color-surface: #F8F9FF;
  --color-text: #1A1A2E;
  --color-text-secondary: #6B6B80;
  --color-border: rgba(0,0,0,0.1);
  /* Colors like --color-primary stay the same in both modes */
}
```

When a user clicks the theme toggle, we set `document.documentElement.setAttribute('data-theme', 'light')`. All CSS variables **instantly update** across the entire app — no JavaScript needed to re-style individual elements. This is the elegance of CSS variables.

---

---
## 🗳️ ZOOM POLL 1 — CSS Design System
> ⏱️ **Share this poll:** After Slide 2 (Design System / CSS Variables). Core concept for the whole masterclass.

**Question: Our entire app uses `--color-primary: #6C63FF`. If we want to change the brand color from purple to orange across EVERY component, how many files do we edit?**
*(Single Choice)*

A) Every component file that uses a button, card, or badge — could be 20+ files
B) Just `index.css` — change the one `:root` variable and every component updates instantly
C) We need to re-run `npm install` to reload the styles
D) We change it in `App.jsx` and it propagates down through props

✅ **Correct Answer:** B

> 💬 **Instructor note:** This is the single biggest "aha" moment of MC2. CSS Custom Properties are the foundation of scalable design. Demo it live in DevTools by changing `--color-primary` and watching the entire app shift color.

---

## 📌 Slide 3 — The ThemeContext: Global Dark/Light Mode

### The Prop Drilling Problem
The theme toggle button lives inside the `Navbar`. But the theme affects **every single component** in the app. Without Context, we'd have to pass the theme down as a prop through every level:

```
App.jsx
  └── LandingPage.jsx (needs theme prop)
      └── HeroSection.jsx (needs theme prop)
          └── Button.jsx (finally uses theme prop)
```

This is called **prop drilling** — passing props through many levels of components just to get data to a deeply nested child. It's tedious, error-prone, and makes code hard to refactor.

### Solution: React Context API

**React Context** creates a "global" data store that any component can tap into directly — without going through its parents.

### Real World Analogy
Think of the **electricity grid** in a city. The power plant (Context Provider) generates electricity once and distributes it through the city's wiring. Any building (component) can plug into a socket (useContext hook) and get power. Buildings don't ask their neighboring buildings for power — they all connect directly to the shared grid.

### File: `frontend/src/context/ThemeContext.jsx`

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the "socket" — any component can plug into this
const ThemeContext = createContext();

// 2. Create the "power plant" — holds the actual state
export function ThemeProvider({ children }) {
  // Read saved preference from localStorage (persists across sessions)
  const [theme, setTheme] = useState(
    localStorage.getItem('sp-theme') || 'dark'
  );

  useEffect(() => {
    // Apply the theme to the HTML element — triggers CSS variable switch
    document.documentElement.setAttribute('data-theme', theme);
    // Save to localStorage so it persists when user closes and reopens browser
    localStorage.setItem('sp-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook — any component calls this to access theme + toggleTheme
export function useTheme() {
  return useContext(ThemeContext);
}
```

### How Any Component Uses It
```jsx
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme(); // Gets theme data directly

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

### File: `frontend/src/context/AuthContext.jsx`
Similarly, `AuthContext` stores the globally logged-in **user object**. This means:
- The `Navbar` can show "Dashboard" instead of "Login" when a user is logged in
- The `Sidebar` can display the user's name and role
- The `DashboardPage` can say "Welcome back, Ankush!"
- `ProtectedRoute` can check if a user is logged in without any prop drilling

**`useEffect` deep dive — Why do we use it here?**
`useEffect` is a React Hook that runs code **after** a component renders — or when specific values change. In `ThemeContext`:
- The `useEffect` with `[theme]` as its dependency array runs **every time `theme` changes**
- It then updates the HTML attribute and saves to localStorage
- Without `useEffect`, this side effect (touching the DOM/localStorage) would run during render, which React discourages

---

---
## 🗳️ ZOOM POLL 2 — Context API vs Prop Drilling
> ⏱️ **Share this poll:** After Slide 3 (ThemeContext). Tests understanding of WHY Context exists.

**Question: The dark/light mode toggle is inside the Navbar. Without React Context, how would `Button.jsx` — nested deep inside the app — know the current theme?**
*(Single Choice)*

A) It would use `localStorage.getItem('sp-theme')` directly — no props needed
B) The theme would be passed as a prop through every parent component all the way down — prop drilling
C) React automatically shares all state between siblings and children
D) The `Button` would fetch the theme from the backend API

✅ **Correct Answer:** B

> 💬 **Instructor note:** Act out prop drilling — "App gives theme to LandingPage, LandingPage passes to HeroSection, HeroSection passes to Button... every middle component has to carry a prop it doesn't even use." Context cuts this chain entirely.

---

## 📌 Slide 4 — The Reusable UI Component Library

### Why Build a Component Library?
In MC1, we used raw HTML `<button>` elements. As the app grows, we need buttons everywhere — on forms, in modals, on cards — each with different visual styles. If we hardcode button styles 50 times in 50 places, changing the button design means editing 50 files.

A component library means: **write once, use everywhere, change in one place**.

### File: `frontend/src/components/ui/Button.jsx`

The most-used component in the entire app. Accepts props to control its appearance and behavior:

```jsx
function Button({ 
  children,           // The text/content inside the button
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent'
  size = 'md',        // 'sm' | 'md' | 'lg'
  isLoading = false,  // Show spinner instead of text during API calls
  disabled = false,
  onClick,
  type = 'button',
  ...props            // Any other HTML button attributes
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </button>
  );
}
```

**Why the `isLoading` prop is critical in real apps:**
When a user submits a login form, the app sends an HTTP request to the backend (which takes 300–500ms). Without `isLoading`, a user could click the button multiple times before the first request completes — sending duplicate login requests, potentially creating duplicate accounts or double-charging users. `isLoading = true` disables the button and shows a spinner until the API responds.

### File: `frontend/src/components/ui/Badge.jsx`
A small pill-shaped label for status or categories.

| Variant | Color | Used For |
|---------|-------|---------|
| `primary` | Purple | Primary labels |
| `success` | Green | "Beginner" level |
| `warning` | Yellow | "Intermediate" level |
| `error` | Red | "Advanced" level |
| `accent` | Teal | "AI Generated" tag |
| `neutral` | Gray | Secondary information |

### File: `frontend/src/components/ui/Card.jsx`
A content container with consistent background, border, and border-radius. The `--hover` variant adds an upward movement and glow effect on mouse hover — making it feel interactive and premium.

### File: `frontend/src/components/ui/Modal.jsx`
A popup overlay component for dialogs. Features:
- **Click outside to close** — clicking the dark backdrop dismisses the modal
- **Scroll lock** — body scroll is disabled while the modal is open (prevents content jumping)
- **Animated entrance** — fades in and slides up from below using CSS `@keyframes`
- **Close button** — A ✕ button in the top-right corner

The reason we build Modal as a reusable component: it gets used by **LessonModal** (AI lesson popup) and **QuizModal** (interactive quiz popup) in MC3 and MC6.

### File: `frontend/src/components/ui/InputField.jsx`
A styled form input that includes:
- The `<label>` above the field (associated with the input via `htmlFor`)
- The `<input>` itself with focus state (purple border glow on active)
- An optional error message displayed in red below the input

Wrapping these three into one `InputField` component means every form in the app uses the same field structure automatically.

### File: `frontend/src/components/ui/Spinner.jsx`
A circular, animated loading indicator. Used everywhere data is being fetched — roadmap generation, AI chat responses, page loads. Accepts a `size` prop (`sm`, `md`, `lg`).

### File: `frontend/src/components/ui/EmptyState.jsx`
A "nothing here yet" placeholder. Shows an emoji, a title, a description, and an optional action button. Used when:
- A user has no roadmap yet
- A user has no saved projects yet
- A search returns no results

### File: `frontend/src/components/ui/ProgressBar.jsx`
A horizontal bar that fills from left to right based on a `value` prop (0–100). Uses a gradient from primary purple to accent teal. Animates smoothly to its value on load.

### File: `frontend/src/components/ui/ProgressRing.jsx`
A circular SVG progress indicator. Implemented using two SVG `<circle>` elements:
1. A full gray background circle
2. A colored progress arc that uses `stroke-dashoffset` to show only a portion

```jsx
// The math behind the ring:
const circumference = 2 * Math.PI * radius; // Full circle length
const offset = circumference - (value / 100) * circumference; // How much to hide
// stroke-dashoffset: offset tells SVG "skip this many units before drawing"
```

The `stroke-dashoffset` value transitions smoothly from `circumference` (empty) to the calculated offset (filled) using a CSS transition — creating a smooth fill animation when the page loads.

### File: `frontend/src/components/ui/Avatar.jsx`
Displays a user's profile picture. If no photo exists, shows the user's **first initial** in a styled, colored circle. Used in the Sidebar (user info section) and Profile page.

### File: `frontend/src/components/ui/SearchBar.jsx`
A styled search input with a magnifying glass icon. Used on the Resources page.

### File: `frontend/src/components/ui/FilterBar.jsx`
A row of pill-shaped filter buttons. Clicking one applies that filter to the content below. Used on the Resources page to filter by category (All, Web Dev, Data Science, AI/ML, etc.).

### File: `frontend/src/components/ui/ThemeToggle.jsx`
The small circular button that switches between dark and light mode. Shows a ☀️ sun icon in dark mode (clicking will switch to light) and 🌙 moon icon in light mode. Calls `toggleTheme()` from `ThemeContext`.

---

## 📌 Slide 5 — Dashboard Layout: The Two-Panel System

### The Layout Shift
Once a user logs in, the app switches from the **public layout** (full-width page with Navbar on top) to the **dashboard layout** — a fixed sidebar on the left and scrollable content on the right.

### File: `frontend/src/components/layout/DashboardLayout.jsx`
A **wrapper component** used by every single logged-in page:

```jsx
function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

// How a page uses it:
function DashboardPage() {
  return (
    <DashboardLayout>
      <h1>Dashboard Content Here</h1>
    </DashboardLayout>
  );
}
```

The `{children}` prop is a special React prop that renders whatever JSX is placed between `<DashboardLayout>` and `</DashboardLayout>`. This is called the **"children prop pattern"** and is how wrapper/layout components work.

### File: `frontend/src/components/layout/Sidebar.jsx`
The fixed left navigation panel for logged-in users. Contains:
- **SkillPath AI logo** at the top
- **Primary navigation links** with icons: Dashboard, My Roadmap, AI Chat, Projects, Resources, Profile
- **Admin section** — Shown only to users with the `admin` role: Admin Dashboard, Manage Users, Manage Resources
- **User info at the bottom** — User's avatar, name, role badge, and a Logout button
- **Theme toggle** — The dark/light mode switch

**Key Behavior:** Uses `NavLink` from React Router which automatically applies an `"active"` CSS class to the link that matches the current URL. The active link gets a distinct purple glow background so users always know where they are.

The sidebar also reads `user` from `AuthContext` to:
1. Display the correct user name and role
2. Conditionally show the Admin section only for `role === 'admin'`

---

## 📌 Slide 6 — Protected Routes & Admin Routes

### The Security Problem
Without route protection, anyone can type `/dashboard` directly into the browser address bar and see the dashboard — even without logging in. This exposes user data and admin features.

### Definition: Route Guard / Protected Route
A **Protected Route** is a wrapper component that **checks authentication** before allowing access. If the user is not authenticated, it redirects them elsewhere.

### File: `frontend/src/routes/ProtectedRoute.jsx`

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  // Still checking auth status — show spinner instead of flickering to login
  if (isLoading) {
    return <div className="loading-screen"><Spinner size="lg" /></div>;
  }

  // Not logged in — send to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in — render the protected page
  return children;
}

// In App.jsx:
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
```

**Why the `isLoading` check is critical:**
When the app first loads, `AuthContext` checks if there's a stored session (verifying the JWT cookie with the backend). This takes a brief moment. Without the loading check, the user object would be `null` during this check — causing the app to briefly redirect to the login page, then flip back to the dashboard. The `isLoading` state prevents this "flash of wrong page."

### File: `frontend/src/routes/AdminRoute.jsx`
An additional guard for admin-only pages:

```jsx
function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />; // Redirect non-admins to their dashboard
  }

  return children;
}
```

### Real World Analogy
Think of a hotel keycard system:
- **Anyone** can walk into the hotel lobby (Landing Page — public)
- **Only guests** with a keycard (JWT token) can access guest floors (Dashboard — Protected Route)
- **Only VIP guests** can access the penthouse (Admin Panel — Admin Route)

---

---
## 🗳️ ZOOM POLL 3 — Protected Routes
> ⏱️ **Share this poll:** After Slide 6 (Protected Routes). Security-critical concept check.

**Question: A user is NOT logged in. They type `/dashboard` directly into the browser address bar. What happens?**
*(Single Choice)*

A) The dashboard loads normally — the URL is public
B) The browser shows a generic 403 Forbidden error page
C) `ProtectedRoute` checks `user` from `AuthContext`, finds it null, and redirects to `/login`
D) The backend rejects the page request with a 401 status

✅ **Correct Answer:** C

> 💬 **Instructor note:** Emphasize that this is ALL client-side — it's a UX guard. The real security is on the backend (JWT middleware on API endpoints). The ProtectedRoute just prevents showing a broken, empty dashboard UI to unauthenticated users.

---

## 📌 Slide 7 — The Onboarding Flow: Multi-Step Form

### File: `frontend/src/pages/OnboardingPage.jsx`

Onboarding is a **3-step wizard** that collects the information needed to generate a personalized AI roadmap. It's the gateway between registration and the dashboard.

### Why Multi-Step? The UX Reason
Showing all 3 questions on one page would feel overwhelming. Breaking it into steps:
- Feels lighter and less intimidating (one question at a time)
- Gives the user a sense of progress ("Step 2 of 3")
- Allows input validation per step before proceeding

### The 3 Steps

**Step 1 — Choose Your Learning Goal**
```jsx
// Controlled text input + pre-filled suggestion chips
<input
  value={goal}
  onChange={(e) => setGoal(e.target.value)}
  placeholder="e.g., Full-Stack Web Development"
/>
{/* Quick-select suggestion chips */}
{["React Developer", "Data Science", "Machine Learning", "UI/UX Design"].map(suggestion => (
  <button key={suggestion} onClick={() => setGoal(suggestion)}>
    {suggestion}
  </button>
))}
```

**Step 2 — Select Your Skill Level**
- 3 large, clickable cards: **Beginner**, **Intermediate**, **Advanced**
- Each card describes what that level means in practice
- Selecting one highlights it with a purple border and glow — using a `level` state variable

**Step 3 — Set Your Weekly Hours**
- A slider or number input asking how many hours/week the student can commit
- This directly affects how the AI schedules the roadmap (more hours = faster progression)

**Final Submit — The Loading Experience**
```jsx
const [isGenerating, setIsGenerating] = useState(false);

const handleSubmit = async () => {
  setIsGenerating(true);
  // In MC6, this calls: POST /api/roadmaps/regenerate
  // For now, simulate a 2-second AI generation
  await new Promise(resolve => setTimeout(resolve, 2000));
  setIsGenerating(false);
  navigate('/roadmap'); // Redirect to the roadmap page
};

// Show an engaging "generating" screen during the wait:
if (isGenerating) {
  return (
    <div className="generating-screen">
      <Spinner size="lg" />
      <h2>🤖 Generating your personalized AI roadmap...</h2>
      <p>This usually takes 5–10 seconds</p>
    </div>
  );
}
```

### State Management Inside Onboarding
```jsx
const [currentStep, setCurrentStep] = useState(1); // Which step (1, 2, or 3) is visible
const [goal, setGoal] = useState('');
const [level, setLevel] = useState(''); // 'beginner' | 'intermediate' | 'advanced'
const [weeklyHours, setWeeklyHours] = useState(10);
const [isGenerating, setIsGenerating] = useState(false);
```

---

## 📌 Slide 8 — Animations and Micro-Interactions

### What Are Micro-Interactions?
**Micro-interactions** are tiny, barely-noticeable animations that happen in response to user actions. They make the UI feel alive, responsive, and premium — rather than flat and static.

### How Micro-Interactions Are Built

**1. CSS Keyframe Animations — Page Entry**
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.4s ease forwards;
}
```
Every dashboard page and card fades up from below when it loads. Apply `className="animate-fade-up"` to any element.

**2. CSS Hover Transitions — Button Lift Effect**
```css
.btn--primary {
  transition: var(--transition); /* all 0.2s ease */
}

.btn--primary:hover {
  transform: translateY(-2px);    /* Lift up 2px */
  box-shadow: var(--shadow-glow); /* Purple glow appears */
}
```
This subtle 2px lift on hover signals "this is interactive and responsive" without being distracting.

**3. Card Hover — Glow Effect**
```css
.card--hover:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
  transform: translateY(-4px);
  transition: var(--transition);
}
```

**4. Progress Ring Animation — SVG Stroke**
```css
.progress-ring__fill {
  transition: stroke-dashoffset 1s ease-in-out;
}
```
The SVG arc animates from 0 (empty) to the actual percentage in 1 second when the page loads — creating a satisfying "filling up" visual.

**5. Typing Indicator — Three Bouncing Dots**
```css
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.16s; }
.typing-dot:nth-child(3) { animation-delay: 0.32s; }
```
Three dots bounce sequentially (like iMessage "...") to indicate the AI is "thinking". This gives users confidence the request is being processed.

---

---
## 🗳️ ZOOM POLL 4 — useEffect Timing
> ⏱️ **Share this poll:** After Slide 8 (Animations and Micro-Interactions). Tests the useEffect misconception from the Two Truths game.

**Question: In `ThemeContext`, we have a `useEffect` that saves the theme to `localStorage` every time `theme` changes. When does this `useEffect` actually run?**
*(Single Choice)*

A) Before the component renders — so localStorage is updated before the UI appears
B) Only once when the app first loads
C) After the component renders, every time the `theme` state value changes
D) Only when the user manually calls `toggleTheme()`

✅ **Correct Answer:** C

> 💬 **Instructor note:** This is one of the most misunderstood React concepts. useEffect fires AFTER rendering — never before. The `[theme]` dependency array means "run whenever `theme` changes". An empty `[]` means "run only once after first render".

---

## 📌 Slide 9 — Files Built in Masterclass 2

| File | Purpose |
|------|---------|
| `frontend/src/index.css` | Complete design system — tokens, animations, component styles, dark/light mode |
| `frontend/src/context/ThemeContext.jsx` | Global dark/light mode state with localStorage persistence |
| `frontend/src/context/AuthContext.jsx` | Global user authentication state |
| `frontend/src/components/ui/Button.jsx` | Reusable button — 5 variants, 3 sizes, loading state |
| `frontend/src/components/ui/Badge.jsx` | Status/category pill labels |
| `frontend/src/components/ui/Card.jsx` | Content container with hover effects |
| `frontend/src/components/ui/Modal.jsx` | Popup overlay component |
| `frontend/src/components/ui/InputField.jsx` | Styled form input with label and error |
| `frontend/src/components/ui/Spinner.jsx` | Animated loading indicator |
| `frontend/src/components/ui/EmptyState.jsx` | Empty/no-data placeholder |
| `frontend/src/components/ui/ProgressBar.jsx` | Horizontal progress bar |
| `frontend/src/components/ui/ProgressRing.jsx` | Circular SVG progress chart |
| `frontend/src/components/ui/Avatar.jsx` | User picture or initials circle |
| `frontend/src/components/ui/SearchBar.jsx` | Search input with icon |
| `frontend/src/components/ui/FilterBar.jsx` | Tabbed category filter row |
| `frontend/src/components/ui/ThemeToggle.jsx` | Dark/Light mode toggle button |
| `frontend/src/components/layout/DashboardLayout.jsx` | Logged-in page shell — Sidebar + content area |
| `frontend/src/components/layout/Sidebar.jsx` | Left navigation panel for logged-in users |
| `frontend/src/routes/ProtectedRoute.jsx` | Auth guard — redirects unauthenticated users |
| `frontend/src/routes/AdminRoute.jsx` | Admin role guard — redirects non-admins |
| `frontend/src/pages/OnboardingPage.jsx` | 3-step roadmap setup wizard |
| `frontend/src/App.jsx` (update) | Add routes for `/onboarding` with ProtectedRoute |

---

## 📌 Slide 10 — GitHub Checkpoint: MC2

### Commit Message
> `MC2: Design System, Dark/Light Mode, UI Component Library, Context API, Dashboard Layout, Protected Routes, Onboarding`

### Branch Naming
`masterclass-2/advanced-ui`

### What's Intentionally Left for MC3
- No dashboard page content yet (just the shell and layout)
- No roadmap, chat, projects, resources, or profile pages
- Onboarding doesn't actually call any API yet
- These pages come in Masterclass 3

---

## 📌 Slide 11 — Homework for Students

1. **Spot the design system** — Open the live site and inspect any button. In DevTools → Computed styles, find which CSS variables are being applied. Change `--color-primary` to `hotpink` in DevTools and watch the entire app change color.

2. **Test Dark Mode persistence** — Toggle to light mode, then close and reopen the browser tab. Notice it remembered your choice. Open DevTools → Application → Local Storage — find the `sp-theme` key.

3. **Build a new UI component** — Without looking at any existing code, build an `AlertBox` component that accepts `type` ("success" | "warning" | "error") and `message` props. Style it with green/yellow/red left border respectively.

4. **Add a 4th Onboarding step** — Design what a 4th step might look like (e.g., "Choose Your Programming Language"). Add the step without connecting it to any real functionality.

---

## ✅ By the End of MC2, Students Should Be Able To:

- ✅ Create a CSS design system with custom properties for colors, spacing, and typography
- ✅ Implement dark/light mode using `data-theme` attribute and CSS variable sets
- ✅ Build a reusable component library with prop-driven variants (Button, Badge, Card, etc.)
- ✅ Solve prop drilling using the React Context API (ThemeContext, AuthContext)
- ✅ Use `useEffect` to handle side effects like updating the DOM and localStorage
- ✅ Build a professional dashboard layout with a responsive fixed sidebar
- ✅ Protect routes using custom ProtectedRoute and AdminRoute wrapper components
- ✅ Build multi-step forms with state-driven step navigation
- ✅ Apply CSS micro-animations: keyframes, hover transitions, SVG stroke animations

---

## 🎮 Two Truths and One Lie — MC2

---

### 🔴 Round 1 — About the Design System

- 🟢 CSS Custom Properties (variables) let you change the primary color of the entire app by editing a single value in `index.css`.
- 🟢 The app switches between dark and light mode by toggling a `data-theme` attribute on the `<html>` element — no JavaScript re-renders required for the color change.
- 🔴 `localStorage` data is automatically wiped when you close the browser tab, so the theme resets to default every visit.

> **🎯 The Lie:** `localStorage` **persists** until manually cleared by the user or the code. That's exactly why the theme preference survives closing and reopening the browser — `ThemeContext` reads it on startup.

---

### 🔴 Round 2 — About Context and Hooks

- 🟢 React Context solves the prop drilling problem by letting any component access shared data without passing props through every parent in between.
- 🟢 `useContext` is a React Hook — it can only be called inside a functional component, not directly in regular JavaScript files or inside `if` blocks.
- 🔴 Once you wrap the app in a `ThemeProvider`, every single component in the app is automatically forced to re-render whenever the theme changes, even if they don't use the theme at all.

> **🎯 The Lie:** React is smart about this. Only components that **actually call `useTheme()`** (consuming the context) re-render when the context value changes. Components that don't consume the context are completely unaffected.

---

### 🔴 Round 3 — About Route Guards and `useEffect`

- 🟢 `ProtectedRoute` redirects users to `/login` if they try to visit a dashboard page without being logged in — even if they type the URL directly.
- 🟢 The `isLoading` state in `ProtectedRoute` prevents a "flash to login page" by waiting until the authentication check is complete before deciding what to render.
- 🔴 `useEffect` runs its callback function BEFORE the component renders for the first time — this is why it's useful for setting up data before displaying it.

> **🎯 The Lie:** `useEffect` runs **AFTER** the component renders, not before. The component renders first (possibly with empty/loading state), then `useEffect` fires. If you need data before rendering, you'd use React's newer `use` API or handle it with initial state values.

---

## 🙋 Mid-Class Questions — MC2

1. **"Our entire app uses CSS variables like `--color-primary`. If I want to change the main purple across every single button, card, and badge — how many files do I need to edit?"**
   *(Expected: Just one place — the `:root` block in `index.css`. Every component reads this variable, so changing it in one place updates everything simultaneously.)*

2. **"When a user toggles dark mode, the `ThemeToggle` is inside the Navbar. But the theme affects every component in the entire app. If we didn't have Context, how would we pass the theme down? Why would that be painful?"**
   *(Expected: We'd have to pass `theme` and `toggleTheme` as props through App.jsx → every page → every component. Every intermediate component would need to receive and pass along props it doesn't even use. Context creates a direct line from provider to consumer.)*

3. **"I'm logged out and I type `/dashboard` directly into the browser address bar. Walk me through exactly what happens — which file runs first, what does it check, and where do I end up?"**
   *(Expected: `App.jsx` tries to render the `/dashboard` route → it's wrapped in `<ProtectedRoute>` → `ProtectedRoute` reads `user` from `AuthContext` → finds it null → renders `<Navigate to="/login" replace />` → user ends up on the login page.)*

4. **"Our `Button` component has an `isLoading` prop. When `isLoading` is true, it shows a spinner and disables the button. Why is this important? What bad thing does it prevent?"**
   *(Expected: Prevents double-clicking/double-submission. If a user clicks "Submit" and the button stays active during the API call, they could click again before the first request finishes — sending duplicate requests, creating duplicate data.)*

5. **"In the `ProgressRing` component, we use `stroke-dashoffset` to animate the SVG circle. Without the CSS transition on this property, what would the ring look like when the page loads?"**
   *(Expected: It would instantly jump to the final percentage value with no animation — just snap to whatever the value is. The CSS transition is what makes it smoothly animate from 0 to the real percentage over 1 second.)*

---

## 📋 File Creation Flow — MC2 (Start Here, Follow This Order!)

This section provides a clear, step-by-step walkthrough of the files you need to create, modify, or update during Masterclass 2. Click on the file name links to open the files directly on your screen.

---

### 🟢 STEP 1 — Design System (FIRST — every component style depends on it)

#### 1️⃣ File: [frontend/src/index.css](file:///e:/SDG-Quality-Education/frontend/src/index.css)
- **Action:** Open and replace its contents.
- **Instructor Note:** Explain that `index.css` acts as our design token library (storing CSS variables for HSL colors, dark/light theme definitions, font scales, spacing systems, and custom transitions).
- **Code to Write:** Instruct students to copy the complete production CSS from the main workspace file [index.css](file:///e:/SDG-Quality-Education/frontend/src/index.css) to ensure they have the full design system ready.

---

### 🟡 STEP 2 — Context Providers (Global state — must exist before anything reads them)

#### 2️⃣ File: [frontend/src/context/ThemeContext.jsx](file:///e:/SDG-Quality-Education/frontend/src/context/ThemeContext.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Explain that React Context solves "prop drilling". We store the current theme (light or dark) globally. We use `useEffect` to sync the state variable with `localStorage` and toggle the `data-theme` attribute on the root HTML element.
- **Code to Write:**
```jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('skillpath_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('skillpath_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

#### 3️⃣ File: [frontend/src/context/AuthContext.jsx](file:///e:/SDG-Quality-Education/frontend/src/context/AuthContext.jsx)
- **Action:** Create this new file.
- **Instructor Note:** In this UI stage (before we build the real backend API in MC4), we mock the user authentication states so that routing guards and pages can read session states. We simulate login, registration, and logout actions using `localStorage`.
- **Code to Write:**
```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('skillpath_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    const mockUser = { name: 'Demo Student', email, role: 'student', streak: 3 };
    setUser(mockUser);
    localStorage.setItem('skillpath_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const register = (name, email, password) => {
    const mockUser = { name, email, role: 'student', streak: 1 };
    setUser(mockUser);
    localStorage.setItem('skillpath_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillpath_user');
  };

  const updateUser = (updatedData) => {
    setUser(prev => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem('skillpath_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
```

---

### 🟠 STEP 3 — UI Component Library (Atomic components needed by layouts and pages)

#### 4️⃣ File: [frontend/src/components/ui/Spinner.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/Spinner.jsx)
- **Action:** Create this new file.
- **Instructor Note:** A small circular spinner. It reads `var(--color-primary)` CSS variable for custom colors.
- **Code to Write:**
```jsx
const Spinner = ({ size = 24, color }) => (
  <div
    className="spinner"
    style={{
      width: size,
      height: size,
      borderTopColor: color || 'var(--color-primary)',
    }}
  />
)

export default Spinner;
```

#### 5️⃣ File: [frontend/src/components/ui/Button.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/Button.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Reusable button component. Features style variants, sizes, and a built-in disabled state when loading.
- **Code to Write:**
```jsx
import Spinner from './Spinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  isLoading = false,
  type = 'button',
  className = '',
}) => (
  <button
    type={type}
    className={`btn btn--${variant} btn--${size} ${className}`}
    onClick={onClick}
    disabled={disabled || isLoading}
  >
    {isLoading ? <Spinner size={16} /> : children}
  </button>
)

export default Button;
```

#### 6️⃣ File: [frontend/src/components/ui/Badge.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/Badge.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Small text bubble for tags, status indicators, and lesson levels.
- **Code to Write:**
```jsx
const Badge = ({ children, variant = 'neutral', icon }) => (
  <span className={`badge badge--${variant}`}>
    {icon && <span>{icon}</span>}
    {children}
  </span>
)

export default Badge;
```

#### 7️⃣ File: [frontend/src/components/ui/Card.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/Card.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Content container component. Features classes for hover state transforms and glassmorphism.
- **Code to Write:**
```jsx
const Card = ({ children, className = '', hover = false, glass = false, style = {} }) => (
  <div
    className={`card ${hover ? 'card--hover' : ''} ${glass ? 'card--glass' : ''} ${className}`}
    style={style}
  >
    {children}
  </div>
)

export default Card;
```

#### 8️⃣ File: [frontend/src/components/ui/InputField.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/InputField.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Groups labels, inputs, and validation error messages in a single styled block.
- **Code to Write:**
```jsx
const InputField = ({
  label, id, type = 'text', value, onChange,
  placeholder, error, required = false, autoComplete
}) => (
  <div className="input-group">
    {label && (
      <label htmlFor={id} className="input-label">
        {label} {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
      </label>
    )}
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className={`input-field ${error ? 'input-field--error' : ''}`}
    />
    {error && <span className="input-error-msg">{error}</span>}
  </div>
)

export default InputField;
```

#### 9️⃣ File: [frontend/src/components/ui/Modal.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/Modal.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Standard overlay dialog. When open, it prevents page-background scroll by setting `overflow: hidden` on `document.body` via a `useEffect` cleaner.
- **Code to Write:**
```jsx
import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 520 }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
```

#### 🔟 File: [frontend/src/components/ui/EmptyState.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/EmptyState.jsx)
- **Action:** Create this new file.
- **Instructor Note:** A fallback display component to present when dynamic arrays (goals, search findings, projects) have zero items.
- **Code to Write:**
```jsx
import Button from './Button';

const EmptyState = ({ icon = '📭', title, text, action, actionLabel }) => (
  <div className="empty-state">
    <div className="empty-state__icon">{icon}</div>
    <h3 className="empty-state__title">{title}</h3>
    {text && <p className="empty-state__text">{text}</p>}
    {action && <Button onClick={action} variant="primary">{actionLabel}</Button>}
  </div>
)

export default EmptyState;
```

#### 1️⃣1️⃣ File: [frontend/src/components/ui/ProgressBar.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/ProgressBar.jsx)
- **Action:** Create this new file.
- **Instructor Note:** A horizontal completion bar with active indicator values.
- **Code to Write:**
```jsx
const ProgressBar = ({ value = 0, height = 8, showLabel = false, color }) => (
  <div>
    {showLabel && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 'var(--text-sm)', fontWeight: 600 }}>
        <span>Progress</span>
        <span style={{ color: 'var(--color-accent)' }}>{Math.round(value)}%</span>
      </div>
    )}
    <div className="progress-bar-wrap" style={{ height }}>
      <div
        className="progress-bar-fill"
        style={{ width: `${Math.min(value, 100)}%`, height: '100%', background: color }}
      />
    </div>
  </div>
)

export default ProgressBar;
```

#### 1️⃣2️⃣ File: [frontend/src/components/ui/ProgressRing.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/ProgressRing.jsx)
- **Action:** Create this new file.
- **Instructor Note:** A SVG-based circular progress tracker. Explain how we calculate the `strokeDashoffset` dynamically based on the circle's circumference formula ($2 \pi r$) and the input percentage value.
- **Code to Write:**
```jsx
const ProgressRing = ({ value = 0, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="var(--color-bg-elevated)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="var(--color-accent)" strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease', filter: 'drop-shadow(0 0 8px var(--color-accent))' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1 }}>{Math.round(value)}%</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 2 }}>complete</span>
      </div>
    </div>
  );
};

export default ProgressRing;
```

#### 1️⃣3️⃣ File: [frontend/src/components/ui/Avatar.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/Avatar.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Creates a visual user representation. If no image URL is provided, it extracts name initials and applies a color dynamically.
- **Code to Write:**
```jsx
const Avatar = ({ name = '', size = 40, src }) => {
  // Simple helper to get name initials
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colors = ['#6C63FF', '#00D4AA', '#F59E0B', '#EF4444', '#3B82F6'];
  const color = colors[name.charCodeAt(0) % colors.length] || colors[0];

  if (src) return (
    <img src={src} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />
  );

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `${color}33`, border: `2px solid ${color}66`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0,
    }}>
      {initials || '?'}
    </div>
  );
};

export default Avatar;
```

#### 1️⃣4️⃣ File: [frontend/src/components/ui/SearchBar.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/SearchBar.jsx)
- **Action:** Create this new file.
- **Instructor Note:** A text search component pre-packaged with an absolute-positioned search icon inside.
- **Code to Write:**
```jsx
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <div style={{ position: 'relative' }}>
    <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
      style={{ paddingLeft: 40 }}
    />
  </div>
)

export default SearchBar;
```

#### 1️⃣5️⃣ File: [frontend/src/components/ui/FilterBar.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/FilterBar.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Displays inline category pill buttons. Triggers status filters when clicked.
- **Code to Write:**
```jsx
const FilterBar = ({ options, active, onChange }) => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {options.map(opt => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        style={{
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid',
          borderColor: active === opt.value ? 'var(--color-primary)' : 'var(--color-border)',
          background: active === opt.value ? 'var(--color-primary-glow)' : 'transparent',
          color: active === opt.value ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
          fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
          transition: 'var(--transition)',
          fontFamily: 'inherit',
        }}
      >
        {opt.label}
      </button>
    ))}
  </div>
)

export default FilterBar;
```

#### 1️⃣6️⃣ File: [frontend/src/components/ui/ThemeToggle.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/ui/ThemeToggle.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Custom button toggling the UI theme using the global context hook we built in Step 2.
- **Code to Write:**
```jsx
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
};

export default ThemeToggle;
```

---

### 🔵 STEP 4 — Route Guards (Protect pages from anonymous users)

#### 1️⃣7️⃣ File: [frontend/src/routes/ProtectedRoute.jsx](file:///e:/SDG-Quality-Education/frontend/src/routes/ProtectedRoute.jsx)
- **Action:** Create this new file.
- **Instructor Note:** A layout guard wrapper. Reads the user profile status from `AuthContext` to determine if a student is logged in. If not, it forces a path redirection to `/login` using the router `<Navigate>` tag.
- **Code to Write:**
```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
```

#### 1️⃣8️⃣ File: [frontend/src/routes/AdminRoute.jsx](file:///e:/SDG-Quality-Education/frontend/src/routes/AdminRoute.jsx)
- **Action:** Create this new file.
- **Instructor Note:** A high-level layout guard wrapper. Restricts access to admin dashboard paths. Checks if user is logged in and owns the `'admin'` role, otherwise redirects back to the standard student dashboard.
- **Code to Write:**
```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
}

export default AdminRoute;
```

---

### 🟣 STEP 5 — Dashboard Layout & Shell

#### 1️⃣9️⃣ File: [frontend/src/components/layout/Sidebar.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/layout/Sidebar.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Build a vertical panel showing navigation pages. Uses `NavLink` to automatically color active tabs. Displays user details, theme toggles, and restricts admin tools to admin roles.
- **Code to Write:**
```jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { FiZap, FiHome, FiMap, FiMessageSquare, FiFolder, FiBookOpen, FiUser, FiLogOut, FiShield, FiDatabase, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { to: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
  { to: '/roadmap', icon: <FiMap />, label: 'My Roadmap' },
  { to: '/chat', icon: <FiMessageSquare />, label: 'AI Chat' },
  { to: '/projects', icon: <FiFolder />, label: 'Project Ideas' },
  { to: '/resources', icon: <FiBookOpen />, label: 'Resources' },
  { to: '/profile', icon: <FiUser />, label: 'Profile' },
];

const adminLinks = [
  { to: '/admin', icon: <FiShield />, label: 'Admin Dashboard' },
  { to: '/admin/resources', icon: <FiDatabase />, label: 'Resources' },
  { to: '/admin/users', icon: <FiUsers />, label: 'Users' },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
        <NavLink to="/" className="sidebar__logo" style={{ marginBottom: 0 }}>
          <FiZap className="sidebar__logo-icon" />
          <span>SkillPath <span className="gradient-text">AI</span></span>
        </NavLink>
        <ThemeToggle />
      </div>

      <nav className="sidebar__nav">
        <span className="sidebar__section-label">Navigation</span>
        {navLinks.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}>
            {icon} {label}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <>
            <span className="sidebar__section-label">Admin</span>
            {adminLinks.map(({ to, icon, label }) => (
              <NavLink key={to} to={to} end className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}>
                {icon} {label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <Avatar name={user?.name} size={36} />
          <div>
            <div className="sidebar__user-name">{user?.name}</div>
            <div className="sidebar__user-role">{user?.role}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="sidebar__link" style={{ width: '100%', marginTop: 8, background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', textAlign: 'left' }}>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
```

#### 2️⃣0️⃣ File: [frontend/src/components/layout/DashboardLayout.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/layout/DashboardLayout.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Grid shell dividing the side bar panel from the main page widgets. Wraps every page inside our logged-in route paths.
- **Code to Write:**
```jsx
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => (
  <div className="dashboard-layout">
    <Sidebar />
    <main className="dashboard-main">
      {children}
    </main>
  </div>
)

export default DashboardLayout;
```

---

### 🔴 STEP 6 — Onboarding Page & App Providers Setup

#### 2️⃣1️⃣ File: [frontend/src/pages/OnboardingPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/OnboardingPage.jsx)
- **Action:** Create this new page.
- **Instructor Note:** A three-step onboarding form. Explain how we manage multi-step states with a local integer index (`step`). It updates the user's mock account profile variables with their learning path objectives, experience level, and study schedules.
- **Code to Write:**
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const goals = ['Web Development', 'Data Science', 'Machine Learning', 'Mobile Development', 'DevOps & Cloud', 'UI/UX Design', 'Cybersecurity', 'Blockchain'];
const levels = [
  { value: 'beginner', label: 'Beginner', desc: 'Just starting out — little to no experience', emoji: '🌱' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Have some basics — want to go deeper', emoji: '🚀' },
  { value: 'advanced', label: 'Advanced', desc: 'Solid foundation — want to master advanced topics', emoji: '⚡' },
];
const timeOptions = [
  { value: 2, label: '2 hrs/week', desc: 'Casual pace — slow and steady', emoji: '☕' },
  { value: 5, label: '5 hrs/week', desc: 'Moderate pace — balanced approach', emoji: '📚' },
  { value: 10, label: '10+ hrs/week', desc: 'Intensive — fast-track your learning', emoji: '🔥' },
];

const StepIndicator = ({ current, total }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-8)' }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: i < current ? 'var(--color-primary)' : i === current ? 'var(--color-primary-glow)' : 'var(--color-bg-elevated)',
          border: `2px solid ${i <= current ? 'var(--color-primary)' : 'var(--color-border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'var(--text-sm)', fontWeight: 700,
          color: i < current ? '#fff' : i === current ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
          transition: 'var(--transition)',
        }}>
          {i < current ? '✓' : i + 1}
        </div>
        {i < total - 1 && <div style={{ width: 40, height: 2, background: i < current ? 'var(--color-primary)' : 'var(--color-border)', transition: 'var(--transition)' }} />}
      </div>
    ))}
  </div>
);

const OnboardingPage = () => {
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ learningGoal: '', currentLevel: '', weeklyHours: '' });

  const isStepValid = () => {
    if (step === 0) return !!form.learningGoal;
    if (step === 1) return !!form.currentLevel;
    if (step === 2) return !!form.weeklyHours;
    return true;
  };

  const handleSubmit = () => {
    updateUser({ ...form, hasOnboarded: true });
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
      <div style={{ width: '100%', maxWidth: 640 }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>
            <FiZap style={{ color: 'var(--color-primary)' }} />
            <span>SkillPath <span className="gradient-text">AI</span></span>
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Let's Build Your Learning Path</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Answer 3 quick questions — our AI will create your personalized roadmap instantly.</p>
        </div>

        <div className="card" style={{ padding: 'var(--space-8)' }}>
          <StepIndicator current={step} total={3} />

          {step === 0 && (
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>What do you want to learn?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>Choose your primary learning goal.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                {goals.map(goal => (
                  <button key={goal} onClick={() => setForm({ ...form, learningGoal: goal })}
                    style={{
                      padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', textAlign: 'left',
                      background: form.learningGoal === goal ? 'var(--color-primary-glow)' : 'var(--color-bg-elevated)',
                      border: `1px solid ${form.learningGoal === goal ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: form.learningGoal === goal ? 'var(--color-primary-light)' : 'var(--color-text)',
                      fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer',
                      transition: 'var(--transition)', fontFamily: 'inherit',
                    }}>
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>What's your current level?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>Be honest — the AI will tailor your roadmap accordingly.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {levels.map(({ value, label, desc, emoji }) => (
                  <button key={value} onClick={() => setForm({ ...form, currentLevel: value })}
                    style={{
                      padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', textAlign: 'left',
                      background: form.currentLevel === value ? 'var(--color-primary-glow)' : 'var(--color-bg-elevated)',
                      border: `1px solid ${form.currentLevel === value ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: 'var(--color-text)', cursor: 'pointer', transition: 'var(--transition)',
                      display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontFamily: 'inherit',
                    }}>
                    <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: form.currentLevel === value ? 'var(--color-primary-light)' : 'var(--color-text)' }}>{label}</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>How much time can you dedicate?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>This helps us set realistic timelines in your roadmap.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {timeOptions.map(({ value, label, desc, emoji }) => (
                  <button key={value} onClick={() => setForm({ ...form, weeklyHours: value })}
                    style={{
                      padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', textAlign: 'left',
                      background: form.weeklyHours === value ? 'var(--color-primary-glow)' : 'var(--color-bg-elevated)',
                      border: `1px solid ${form.weeklyHours === value ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: 'var(--color-text)', cursor: 'pointer', transition: 'var(--transition)',
                      display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontFamily: 'inherit',
                    }}>
                    <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: form.weeklyHours === value ? 'var(--color-primary-light)' : 'var(--color-text)' }}>{label}</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)', gap: 'var(--space-3)' }}>
            {step > 0 && <Button variant="secondary" onClick={() => setStep(step - 1)}><FiArrowLeft /> Back</Button>}
            <div style={{ marginLeft: 'auto' }}>
              {step < 2
                ? <Button variant="primary" onClick={() => setStep(step + 1)} disabled={!isStepValid()}>Next <FiArrowRight /></Button>
                : <Button variant="accent" onClick={handleSubmit} disabled={!isStepValid()}>✨ Generate My Roadmap</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
```

#### 2️⃣2️⃣ File: [frontend/src/App.jsx](file:///e:/SDG-Quality-Education/frontend/src/App.jsx) (Update Route Mapping)
- **Action:** Open and update this file.
- **Instructor Note:** Import context wrappers (`ThemeProvider` and `AuthProvider`) and wrap them around the application layout. Register the new `/onboarding` route protected by `ProtectedRoute`.
- **Code to Write:**
```jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes */}
      <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
```
*(Remember to update [frontend/src/main.jsx](file:///e:/SDG-Quality-Education/frontend/src/main.jsx) to wrap the root `<App />` component in the state providers):*
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

---

### ✅ MC2 Creation Order Summary

```
1.  index.css              ← Design variables and global styles
2.  ThemeContext.jsx        ← Shared UI theme state
3.  AuthContext.jsx         ← Mocked session context provider
4.  Spinner.jsx             ← Action loader element
5.  Button.jsx              ← Reusable action button component
6.  Badge.jsx               ← Categorization tag component
7.  Card.jsx                ← Reusable visual container component
8.  InputField.jsx          ← Reusable form text input
9.  Modal.jsx               ← Reusable floating dialog overlay
10. EmptyState.jsx          ← Reusable fallback zero-results state
11. ProgressBar.jsx         ← Horizontal completion indicator
12. ProgressRing.jsx        ← Circular progress ring vector (uses SVG)
13. Avatar.jsx              ← Graphical representation / text initials
14. SearchBar.jsx           ← Text input with search icon
15. FilterBar.jsx           ← Category buttons listing bar
16. ThemeToggle.jsx         ← Toggles site themes
17. ProtectedRoute.jsx      ← Redirection guard for students
18. AdminRoute.jsx          ← Redirection guard for admins
19. Sidebar.jsx             ← Sidebar panel navigation layout
20. DashboardLayout.jsx     ← Dashboard wrapper layout grid
21. OnboardingPage.jsx      ← Onboarding steps questionnaire
22. App.jsx (update)        ← Wires paths and wraps providers (LAST ALWAYS)
```

