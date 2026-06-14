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

> **How to use this:** You already have all the MC1 files. Now add these MC2 files in this exact order. Each group depends on the group above it.

---

### 🟢 STEP 1 — Design System (FIRST — every component style depends on it)

| Order | File | Why First? |
|-------|------|------------|
| 1️⃣ | `frontend/src/index.css` | All CSS variables, animations, base styles — nothing can be styled correctly without this |

---

### 🟡 STEP 2 — Context Providers (Global state — must exist before anything reads them)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 2️⃣ | `frontend/src/context/ThemeContext.jsx` | Global theme state — `ThemeToggle`, `Sidebar`, and `Navbar` all use `useTheme()` |
| 3️⃣ | `frontend/src/context/AuthContext.jsx` | Global user state — `ProtectedRoute`, `AdminRoute`, `Sidebar` all use `useAuth()` |

---

### 🟠 STEP 3 — UI Component Library (Smallest pieces first — pages and layouts need them)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 4️⃣ | `frontend/src/components/ui/Spinner.jsx` | Used INSIDE `Button` — must exist before Button |
| 5️⃣ | `frontend/src/components/ui/Button.jsx` | Most-used component — everything else may need it |
| 6️⃣ | `frontend/src/components/ui/Badge.jsx` | Used in Sidebar and pages |
| 7️⃣ | `frontend/src/components/ui/Card.jsx` | Used in Dashboard and pages |
| 8️⃣ | `frontend/src/components/ui/InputField.jsx` | Used in forms and onboarding |
| 9️⃣ | `frontend/src/components/ui/Modal.jsx` | Used by LessonModal + QuizModal later |
| 🔟 | `frontend/src/components/ui/EmptyState.jsx` | Used when no data exists |
| 1️⃣1️⃣ | `frontend/src/components/ui/ProgressBar.jsx` | Used in Dashboard |
| 1️⃣2️⃣ | `frontend/src/components/ui/ProgressRing.jsx` | Used in Dashboard |
| 1️⃣3️⃣ | `frontend/src/components/ui/Avatar.jsx` | Used in Sidebar + Profile |
| 1️⃣4️⃣ | `frontend/src/components/ui/SearchBar.jsx` | Used in Resources page |
| 1️⃣5️⃣ | `frontend/src/components/ui/FilterBar.jsx` | Used in Resources page |
| 1️⃣6️⃣ | `frontend/src/components/ui/ThemeToggle.jsx` | Uses `useTheme()` — Context must exist (done) |

---

### 🔵 STEP 4 — Route Guards (Must exist before pages are added to App.jsx)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 1️⃣7️⃣ | `frontend/src/routes/ProtectedRoute.jsx` | Reads `AuthContext` — guards all logged-in pages |
| 1️⃣8️⃣ | `frontend/src/routes/AdminRoute.jsx` | Reads `AuthContext` — guards admin-only pages |

---

### 🟣 STEP 5 — Dashboard Shell (Build the container before pages that go inside it)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 1️⃣9️⃣ | `frontend/src/components/layout/Sidebar.jsx` | Uses `AuthContext`, `ThemeContext`, `Avatar`, `ThemeToggle`, `NavLink` — all done above |
| 2️⃣0️⃣ | `frontend/src/components/layout/DashboardLayout.jsx` | Wraps Sidebar + `{children}` — used by every logged-in page |

---

### 🔴 STEP 6 — Onboarding Page

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 2️⃣1️⃣ | `frontend/src/pages/OnboardingPage.jsx` | 3-step wizard — uses Button, InputField (done above) |

---

### ⚫ STEP 7 — Update App.jsx

| Order | File | What to Add |
|-------|------|-------------|
| 2️⃣2️⃣ | `frontend/src/App.jsx` (update) | Wrap ThemeProvider + AuthProvider around everything; add `/onboarding` route with ProtectedRoute |

---

### ✅ MC2 Creation Order — Quick Visual Summary

```
1.  index.css              ← Design system — ALWAYS FIRST
2.  ThemeContext.jsx        ← Global theme state
3.  AuthContext.jsx         ← Global user/auth state
4.  Spinner.jsx             ← Atomic UI (used inside Button)
5.  Button.jsx              ← Core UI component
6.  Badge.jsx               ← Core UI component
7.  Card.jsx                ← Core UI component
8.  InputField.jsx          ← Core UI component
9.  Modal.jsx               ← Core UI component
10. EmptyState.jsx          ← Core UI component
11. ProgressBar.jsx         ← Core UI component
12. ProgressRing.jsx        ← Core UI component
13. Avatar.jsx              ← Core UI component
14. SearchBar.jsx           ← Core UI component
15. FilterBar.jsx           ← Core UI component
16. ThemeToggle.jsx         ← Uses ThemeContext
17. ProtectedRoute.jsx      ← Uses AuthContext
18. AdminRoute.jsx          ← Uses AuthContext
19. Sidebar.jsx             ← Uses both Contexts + Avatar + ThemeToggle
20. DashboardLayout.jsx     ← Wraps Sidebar + children
21. OnboardingPage.jsx      ← First logged-in page
22. App.jsx (update)        ← Wrap providers + add routes — LAST
```

> 💡 **Golden Rule for MC2:** Build **design tokens → contexts → atoms → molecules → layouts → pages** in that order. Never build a page before its building blocks exist. The design system (index.css) is always first — nothing can be styled correctly without it.
