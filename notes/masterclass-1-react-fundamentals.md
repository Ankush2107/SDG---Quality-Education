# 🎓 Masterclass 1: From Zero to UI Hero
### Introduction to React Fundamentals, JSX, Components & Props
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — Welcome & What We're Building

### The Project: SkillPath AI
SkillPath AI is a real-world, production-quality web application built using the **MERN stack** (MongoDB, Express, React, Node.js). It directly addresses the United Nations' **SDG 4 — Quality Education** by making personalized, AI-driven learning accessible to every student with an internet connection.

The platform helps students by:
- Generating a **personalized AI learning roadmap** based on their goal, skill level, and weekly hours
- Providing a **24/7 AI Doubt Assistant** — like having a personal tutor available at midnight
- Recommending **real project ideas** tailored to their current skill level
- Visually **tracking progress** on a professional dashboard

### Why This Project Matters
This is not a tutorial. This is not a demo. This is the kind of application you would see in a real startup or product team. By the end of all **7 masterclasses**, you will have built, deployed, and own a live application that you can:
- Show on your **GitHub portfolio**
- Present at **campus placements and tech interviews**
- Claim as a **capstone project** for certificates and resumes

### SDG 4 — Quality Education
> "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."

SkillPath AI directly addresses SDG 4 by replacing expensive private tutors and one-size-fits-all roadmaps with an intelligent, free, personalized AI system that adapts to each student's unique situation.

---

## 📌 Slide 2 — The Problem We're Solving

### Every Student Has Faced These Exact Problems

1. **"I want to learn coding but I don't know where to start."**
   - There are hundreds of languages, frameworks, tutorials, and bootcamps. Beginners feel paralysed by choice.
   - SkillPath AI **eliminates decision fatigue** with an AI-generated roadmap personalized to your stated goal.

2. **"I found a roadmap online but it's not made for me."**
   - Generic roadmaps don't account for your current level, time availability, or specific goal.
   - SkillPath AI creates a roadmap that says "you have 10 hours/week and want to be a React developer — here is your personalized 12-week plan."

3. **"I get stuck on a concept at 11 PM and there's no one to ask."**
   - Forums take hours. YouTube tutorials are long and off-topic.
   - SkillPath AI's **24/7 AI Chat** gives an instant, conversational, context-aware answer in seconds.

4. **"I know theory but I don't know what to actually build."**
   - Projects are the best way to land jobs, but students don't know which project to pick.
   - SkillPath AI generates **3 project ideas** calibrated to your current difficulty level.

5. **"I can't see how far I've come."**
   - Without progress tracking, learning feels endless and unmotivating.
   - SkillPath AI shows a **visual progress bar, completion percentage, and learning streak** so students can celebrate every win.

### The Solution Map

| Problem | SkillPath AI Feature |
|---------|---------------------|
| Don't know where to start | AI Roadmap Generator |
| Generic roadmaps | Personalized by goal + level + weekly hours |
| Stuck at night | 24/7 AI Chat Doubt Assistant |
| Don't know what to build | AI Project Recommendations |
| Can't track progress | Visual Dashboard + Streak Tracking |

---

## 📌 Slide 3 — The 7-Masterclass Journey

We've designed this course into 7 focused masterclasses so you can deeply understand each layer of the stack before building the next.

| Class | Title | Focus Area | What You Build |
|-------|-------|-----------|----------------|
| **MC 1** | From Zero to UI Hero | React Basics | Public pages (Landing, About, Login, Register) ✅ |
| MC 2 | Make It Look WOW | Design System, Advanced UI | Design tokens, component library, dark mode |
| MC 3 | Dashboard & Pages | Full Frontend | All logged-in pages, routing, animations |
| MC 4 | Power Behind the Scenes | Backend & REST APIs | Express server, routes, controllers, JWT auth |
| MC 5 | Data That Works | Database & AI | MongoDB models, Mongoose, Groq AI integration |
| MC 6 | Connecting the Dots | Full-Stack Wiring | Axios, custom hooks, API wiring |
| MC 7 | From Code to Cloud | Deployment | Render + Vercel, CORS, environment variables |

**By the end of MC1**, you will have built the complete public face of the website — the Landing Page, About Page, Login Page, and Register Page — all working with navigation between them.

---

## 📌 Slide 4 — What is React?

### Definition
React is a **JavaScript library** for building user interfaces. It was created by Meta (Facebook) in 2013 and is now used by companies like Airbnb, Netflix, Instagram, WhatsApp Web, Dropbox, and thousands more.

### The Core Idea: Thinking in Components
Instead of writing one massive HTML file, React lets you break your UI into **small, independent, reusable pieces** called **components**. Think of them like LEGO bricks — you build small, focused bricks and then assemble them into a complete structure.

### Real World Analogy
Imagine you're building a house:
- **Without React:** You build the entire house in one 500-page blueprint. If you want to change just one window, you have to search through the entire document to find it.
- **With React:** Each room is its own separate blueprint (component). The kitchen, bedroom, bathroom — each is designed independently. When you want to change the kitchen window, you only open and edit the **kitchen blueprint**. The bedroom and bathroom are completely unaffected.

### Why Vite Instead of Create-React-App?
We use **Vite** to set up our React project instead of the older Create-React-App (CRA). Here's why:

| Feature | Vite | Create-React-App |
|---------|------|-----------------|
| Startup time | Under 1 second | 30–60 seconds |
| Refresh on save | Instant (HMR) | 2–5 seconds |
| Build output | Smaller bundle | Larger bundle |
| Status | Modern, actively maintained | Deprecated |

### Project Setup Command
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev
```

### Key Files Created Automatically by Vite

| File | Purpose |
|------|---------|
| `frontend/package.json` | The project's "identity card" — lists dependencies, scripts, and project name |
| `frontend/index.html` | The ONE HTML file of the entire app — React mounts itself inside `<div id="root">` here |
| `frontend/vite.config.js` | Configuration for the Vite build tool — you rarely need to touch this |
| `frontend/src/main.jsx` | The entry point — the very first JS file that runs, connects React to the HTML |
| `frontend/src/App.jsx` | The root component — all pages and routes are defined here |

### Why Only One HTML File?
Traditional websites have many HTML files — `index.html`, `about.html`, `login.html`, etc. React apps are called **Single Page Applications (SPAs)**. There is only one `index.html`. React dynamically swaps out the content on screen when you "navigate" — without ever loading a new HTML file from the server. This makes the app feel fast and instant.

---

## 📌 Slide 5 — Understanding JSX

### Definition
**JSX** (JavaScript XML) is a special syntax extension that lets you write HTML-like code directly inside a JavaScript file. Behind the scenes, React's build tool (Babel) converts your JSX into regular JavaScript function calls.

### Why JSX Exists
Before JSX, to create even a simple button in React, you had to write:
```javascript
// Without JSX — verbose and hard to read
React.createElement('button', { className: 'btn', onClick: handleClick }, 'Click Me')

// With JSX — looks almost like HTML!
<button className="btn" onClick={handleClick}>Click Me</button>
```
JSX makes your code look and read almost exactly like the HTML output you're creating, which makes it far easier to write, read, and maintain.

### Real World Analogy
JSX is like writing a text message with emoji shortcuts. When you type `:)` in some apps, it automatically becomes 😊. You write in a human-friendly shorthand, and the system converts it into the real thing behind the scenes.

### The 5 Golden Rules of JSX (Memorize These!)

**Rule 1: `className` instead of `class`**
```jsx
// ❌ Wrong — 'class' is reserved in JavaScript for ES6 classes
<div class="card">...</div>

// ✅ Correct
<div className="card">...</div>
```
Why? Because `class` is already a reserved keyword in JavaScript (used for `class MyClass {}`). JSX is still JavaScript, so it can't use `class` as an attribute name.

**Rule 2: Self-closing tags are mandatory**
```jsx
// ❌ Wrong — HTML allows this, JSX does not
<img src="photo.jpg">
<input type="text">

// ✅ Correct — Every tag must be closed
<img src="photo.jpg" />
<input type="text" />
```

**Rule 3: Every component must return ONE root element**
```jsx
// ❌ Wrong — Two siblings cannot be returned without a wrapper
return (
  <h1>Title</h1>
  <p>Paragraph</p>
)

// ✅ Correct — Wrap in a div or a Fragment <>
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
)
```
A `<>...</>` is called a **React Fragment**. It acts as an invisible wrapper — it groups elements without adding an extra `<div>` to the actual HTML output.

**Rule 4: JavaScript expressions go inside curly braces `{}`**
```jsx
const name = "Ankush";
const isLoggedIn = true;

// Inserting a variable
<h1>Welcome, {name}!</h1>

// Using an expression
<p>Score: {10 * 5}</p>

// Conditional rendering
<p>{isLoggedIn ? "Welcome back!" : "Please log in"}</p>

// Using a variable as an attribute value
<img src={profilePhotoUrl} alt={name} />
```

**Rule 5: Inline styles are JavaScript objects, not CSS strings**
```jsx
// ❌ Wrong — This is HTML syntax, not JSX
<div style="color: red; font-size: 16px">...</div>

// ✅ Correct — Two sets of curly braces: outer = JS expression, inner = JS object
<div style={{ color: 'red', fontSize: '16px' }}>...</div>
```
Notice that `font-size` becomes `fontSize` — CSS property names with hyphens are converted to **camelCase** in JSX.

---

---
## 🗳️ ZOOM POLL 1 — JSX Rules Check
> ⏱️ **Share this poll:** After Slide 5 (5 Golden Rules of JSX). Tests core rule recall.

**Question: Which of the following is VALID JSX?**
*(Single Choice)*

A) `<div class="card">Hello</div>`
B) `<img src="photo.jpg">`
C) `<div style={{ color: 'red', fontSize: '16px' }}>Hello</div>`
D) `return (<h1>Title</h1><p>Text</p>)`

✅ **Correct Answer:** C

> 💬 **Instructor note:** Walk through each wrong answer — A uses `class` (should be `className`), B is missing self-closing `/`, D has two sibling root elements (needs a `<>` Fragment wrapper).

---

## 📌 Slide 6 — Components: The Building Blocks

### Definition
A **Component** in React is a JavaScript function that returns JSX. That's the entire definition. Nothing more mysterious than that.

```jsx
// This is a complete, valid React component
function Greeting() {
  return <h1>Hello, Ankush!</h1>;
}
```

### The Two Rules for Components
1. The function name **must start with a capital letter** — `Greeting`, not `greeting`. This is how React tells the difference between an HTML tag (`<div>`) and a React component (`<Greeting>`).
2. The function **must return JSX** (or `null` if it renders nothing).

### How Components Are Used
```jsx
// You "use" a component like an HTML tag
function App() {
  return (
    <div>
      <Greeting />   {/* This renders the Greeting component */}
      <Greeting />   {/* You can use it multiple times! */}
    </div>
  );
}
```

### Types of Components in SkillPath AI

**1. Layout Components** — Define the overall structure shared across pages
- **`frontend/src/components/layout/Navbar.jsx`** — The navigation bar shown at the top of every public page. Contains the SkillPath AI logo, navigation links (Home, About, Resources), and action buttons (Login, Get Started).
- **`frontend/src/components/layout/Footer.jsx`** — The footer at the bottom of public pages. Contains links, copyright, and social media icons.

**2. Landing Page Components** — Sections that together build the home page
- **`frontend/src/components/landing/HeroSection.jsx`** — The very first thing a visitor sees: the big headline, subtext, and call-to-action buttons.
- **`frontend/src/components/landing/FeatureCard.jsx`** — A single card that shows one key feature (icon, title, description). This same component is used 4 times on the landing page with different data.
- **`frontend/src/components/landing/TestimonialSection.jsx`** — Shows 3 student testimonials to build trust and social proof.
- **`frontend/src/components/landing/CTABanner.jsx`** — "Call To Action" — the bottom section urging visitors to sign up.

### Real World Analogy
Think of a newspaper:
- The **masthead** (paper name at the top) is a component
- Each **article** is a component
- The **sports scores sidebar** is a component
- The **footer** with phone numbers is a component

They're all independent, reusable pieces that together form one newspaper page.

---

## 📌 Slide 7 — Props: Passing Data to Components

### Definition
**Props** (short for Properties) are the way a parent component passes data into a child component. Think of props as the "inputs" or "arguments" to a component — the information it needs to do its job.

### Real World Analogy
A component is like a **stamp machine**. The machine always stamps the same shape, but you insert different ink colors and labels (props) to get different results. The `FeatureCard` component always renders the same card shape, but you pass it different `icon`, `title`, and `description` props to get 4 unique, different-looking cards.

### How Props Work: The FeatureCard Example

**The child component (receives props):**
```jsx
// File: frontend/src/components/landing/FeatureCard.jsx

function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="feature-card" style={{ borderColor: color }}>
      <span className="feature-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

**The parent component (sends props):**
```jsx
// File: frontend/src/pages/LandingPage.jsx

const features = [
  { icon: "🗺️", title: "AI Roadmap Generator", description: "Personalized learning path...", color: "#6C63FF" },
  { icon: "🤖", title: "AI Doubt Assistant", description: "24/7 help at any hour...", color: "#00D4AA" },
  { icon: "💡", title: "Project Recommendations", description: "Know exactly what to build...", color: "#FF6B6B" },
  { icon: "📊", title: "Progress Dashboard", description: "Track every milestone...", color: "#FFD93D" },
];

function LandingPage() {
  return (
    <div>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          color={feature.color}
        />
      ))}
    </div>
  );
}
```
**Result:** 4 different cards rendered from ONE component — the power of props!

### The Immutable Rule of Props
Props are **READ-ONLY**. A child component can use props to display data, but it **CANNOT** modify them. If a child needs to communicate back to the parent, it does so through a **function that was passed as a prop** (called a "callback prop").

---

---
## 🗳️ ZOOM POLL 2 — Props vs State
> ⏱️ **Share this poll:** After Slide 7 (Props). Reinforces the key Props rule before moving to State.

**Question: A `FeatureCard` component receives a `title` prop from `LandingPage`. What can `FeatureCard` do with this prop?**
*(Single Choice)*

A) Display it in JSX — that's it. Props are read-only inside the child.
B) Modify it directly using `title = "New Title"` — React will re-render
C) Store it in localStorage so it persists across sessions
D) Pass it back to the parent using `return title` inside the component

✅ **Correct Answer:** A

> 💬 **Instructor note:** Emphasize the stamp-machine analogy — the machine (component) uses the ink (prop) but can't change what ink is available. If the child needs to communicate back up, the parent must pass a callback function as a prop.

---

## 📌 Slide 8 — State: Making Components Interactive

### Definition
**State** is data that a component **owns and manages itself**. Unlike props (which come from the parent and are read-only), state is internal to the component. When state changes, React automatically **re-renders** the component to show the updated UI.

### Real World Analogy
Think of a light switch:
- The switch has two possible **states**: ON or OFF
- When you **flip the switch** (an event/action), the state changes
- The **room immediately responds** (re-renders) — lights go on or off
- Nobody outside the switch controls its state — the switch itself is responsible for tracking whether it's on or off

### `useState` Hook: How to Add State
`useState` is the React built-in function (called a "Hook") that lets a functional component have its own state.

```jsx
import { useState } from 'react';

function Counter() {
  // Declare a state variable called 'count', starting at 0
  // useState(0) returns an array: [currentValue, setterFunction]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### `useState` returns exactly TWO things:
1. **The current value** of the state (e.g., `count` = 0)
2. **A setter function** to update the state (e.g., `setCount`)

When you call the setter function (`setCount(newValue)`), React automatically re-renders the component with the new value. You **never** directly change the state variable (never do `count = 5`) — always go through the setter.

### State in SkillPath AI — MC1 Examples

**File:** `frontend/src/components/layout/Navbar.jsx`
```jsx
const [menuOpen, setMenuOpen] = useState(false);

// When the hamburger button is clicked:
<button onClick={() => setMenuOpen(!menuOpen)}>☰</button>

// Conditionally show/hide the mobile menu:
{menuOpen && <div className="mobile-menu">...</div>}
```
- **State:** `menuOpen` — a `true` or `false` boolean
- **When false:** The hamburger menu is hidden
- **When true:** The menu slides open
- **Event:** Clicking the button flips the state

**File:** `frontend/src/pages/LoginPage.jsx`
```jsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// Every keystroke updates the state:
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>
```
This is called a **Controlled Input** — React is in full control of what the input shows. The `value` is tied to the state, and `onChange` keeps the state in sync with every keystroke.

### Why Controlled Inputs?
Without controlled inputs (called "uncontrolled"), the browser DOM manages the input's value independently — React can't easily read it. With controlled inputs, React always knows exactly what's in every field at all times, making validation, submission, and testing trivial.

---

---
## 🗳️ ZOOM POLL 3 — useState Deep Dive
> ⏱️ **Share this poll:** After Slide 8 (State section). Core concept check before moving to routing.

**Question: We have `const [menuOpen, setMenuOpen] = useState(false)`. A user clicks the hamburger button. Which line correctly toggles the menu?**
*(Single Choice)*

A) `menuOpen = true`
B) `setMenuOpen(!menuOpen)`
C) `useState(!menuOpen)`
D) `menuOpen.toggle()`

✅ **Correct Answer:** B

> 💬 **Instructor note:** Explain why A fails — directly mutating state doesn't trigger a re-render. React watches the setter function, not the variable. C and D don't exist — `useState` is called only at declaration, not to update.

---

## 📌 Slide 9 — React Router: Navigation Without Reload

### The Problem With Normal Links
In a traditional multi-page website, clicking a link causes the browser to:
1. Send an HTTP GET request to the server
2. Wait for the server to respond with a new HTML page
3. Render the entire page from scratch (white flash)

In a React SPA, we want navigation to feel instant — no white flash, no network round-trip.

### Definition
**React Router** is a library that adds **client-side routing** to a React app. Instead of the browser asking the server for a new page, React Router just **swaps which component is displayed** — instantaneously.

```bash
npm install react-router-dom
```

### Real World Analogy
Think of a TV with a remote control. When you change the channel, you **don't buy a new TV** — the same TV just shows different content. React Router is the remote. The `<App />` shell (with the Navbar) is the TV. The "channel" (page component) changes, but the TV stays.

### File: `frontend/src/App.jsx`
This is the most important file for routing. Every URL in the app is mapped to a component here:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Routes Defined in MC1

| URL Path | Component | Who Can Access |
|----------|-----------|----------------|
| `/` | `LandingPage` | Everyone |
| `/about` | `AboutPage` | Everyone |
| `/login` | `LoginPage` | Everyone |
| `/register` | `RegisterPage` | Everyone |
| `*` (everything else) | `NotFoundPage` | Everyone |

### Key React Router Components

**`<Link>`** — Used instead of `<a>` for navigation. Does NOT reload the page.
```jsx
// ❌ Normal HTML link — causes full page reload
<a href="/about">About</a>

// ✅ React Router link — instant navigation, no reload
<Link to="/about">About</Link>
```

**`<NavLink>`** — Same as `<Link>` but automatically adds an `"active"` CSS class when the URL matches. Used in the Navbar to highlight the current page link.

**`<Routes>`** — The container that holds all `<Route>` definitions. Renders only the FIRST matching route.

**`<Route>`** — Maps a URL path to a component. When the URL matches `path`, it renders the `element`.

---

---
## 🗳️ ZOOM POLL 4 — React Router vs HTML Links
> ⏱️ **Share this poll:** After Slide 9 (React Router). Tests the critical SPA navigation concept.

**Question: In our Navbar, which code should we use to link to the About page?**
*(Single Choice)*

A) `<a href="/about">About</a>`
B) `<Link to="/about">About</Link>`
C) `<button onClick={() => window.location.href='/about'}>About</button>`
D) `<Route path="/about" />`

✅ **Correct Answer:** B

> 💬 **Instructor note:** A causes a full page reload — the browser sends a new HTTP request and reloads the entire React app from scratch, losing all state. B intercepts the click and just swaps which component renders — instant, no reload. C also causes a full reload. D is for defining routes, not navigating.

---

## 📌 Slide 10 — The Landing Page: Composition in Action

### File: `frontend/src/pages/LandingPage.jsx`
The Landing Page is the best example of **component composition** — assembling many smaller, focused components into one large, complete screen.

### What the Page Contains (Top to Bottom)

1. **`<Navbar />`** — Sticky navigation bar at the top of every page
2. **`<HeroSection />`** — Full-viewport hero with the headline, subtext, and CTA buttons
3. **Features Section** — 4 `<FeatureCard />` components laid out in a responsive grid
4. **"How It Works" Section** — 4 numbered step cards explaining the user journey (sign up → onboard → roadmap → learn)
5. **Stats Section** — "10K+ Students", "500+ Roadmaps Generated", "98% Satisfaction Rate"
6. **`<TestimonialSection />`** — 3 student quote cards
7. **`<CTABanner />`** — Final call-to-action section with a large "Start Learning Free" button
8. **`<Footer />`** — Links, social media, copyright

### The Golden Insight
Notice that `LandingPage.jsx` contains **almost no logic**. It just assembles components. This is the ideal architectural pattern:
- **Pages are assemblers** — they arrange components
- **Components are workers** — they handle specific UI pieces

This means if the Hero section design needs to change, you only edit `HeroSection.jsx`. The rest of `LandingPage.jsx` is untouched.

---

## 📌 Slide 11 — Login & Register Pages

### File: `frontend/src/pages/LoginPage.jsx`
The Login page uses controlled inputs and state to collect user credentials.

### Structure & Concepts

```jsx
function LoginPage() {
  // State for each form field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent browser from submitting the HTML form
    // In MC6 this will call the real backend API
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? '👁️ Hide' : '👁 Show'}
        </button>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
```

### What It Contains
- **Email input** — Controlled input, state synced on every keystroke via `onChange`
- **Password input** — Controlled, with a show/hide toggle (`showPassword` state)
- **Error message** — Conditionally rendered only when `error` state is not empty
- **Form submission** — `e.preventDefault()` stops the page from reloading, logs data for now
- **Link to Register** — For users who don't have an account yet

### File: `frontend/src/pages/RegisterPage.jsx`
Identical structure to Login, but collects 3 fields: name, email, and password. Includes:
- **Form validation** — Checks all fields are filled before allowing submit
- **Password strength hint** — "Must be at least 6 characters"
- **Link to Login** — For users who already have an account

---

## 📌 Slide 12 — About Page

### File: `frontend/src/pages/AboutPage.jsx`
The About page explains the project's mission, the SDG 4 alignment, and the tech stack powering the platform.

### What It Contains
- **Mission statement** — Why SkillPath AI was built and who it's for
- **SDG 4 explanation** — The UN goal this project directly addresses, with a quote and context
- **Tech stack showcase** — Visual cards showing the 4 core technologies: React, Node.js, MongoDB, Groq AI
- **Feature highlights** — Cards explaining what makes the platform unique compared to traditional learning resources

### Key Teaching Point
The About page is a **static page** — it has no state, no API calls, and no dynamic data. It just renders JSX with hardcoded content and uses `Navbar` and `Footer` from the layout components. This is a perfect example of a simple, pure React page.

---

## 📌 Slide 13 — Component Hierarchy Map

This diagram shows how all components in MC1 relate to each other:

```
App.jsx (Root — defines all routes)
│
├── LandingPage.jsx (route: "/")
│   ├── Navbar.jsx         ← Layout component
│   ├── HeroSection.jsx    ← Landing-specific section
│   ├── FeatureCard.jsx    ← Used 4 times with different props
│   ├── TestimonialSection.jsx
│   ├── CTABanner.jsx
│   └── Footer.jsx         ← Layout component
│
├── AboutPage.jsx (route: "/about")
│   ├── Navbar.jsx         ← Same Navbar reused here
│   └── Footer.jsx         ← Same Footer reused here
│
├── LoginPage.jsx (route: "/login")
│   └── (No Navbar — standalone auth card design)
│
├── RegisterPage.jsx (route: "/register")
│   └── (No Navbar — standalone auth card design)
│
└── NotFoundPage.jsx (route: "*")
```

### The Power of Reusability
`Navbar.jsx` is written **once** and used on multiple pages. If you ever want to change the logo or add a new navigation link, you edit it in **ONE file** and the change appears on every page that uses it — automatically, instantly. This is the central benefit of component-based architecture.

---

## 📌 Slide 14 — Files Built in Masterclass 1

| File | Purpose | Key Concepts Taught |
|------|---------|-------------------|
| `frontend/src/main.jsx` | Entry point — launches the React app | ReactDOM.createRoot, BrowserRouter |
| `frontend/src/App.jsx` | Root component with all routes | Routes, Route, page imports |
| `frontend/src/pages/LandingPage.jsx` | The home page | Component composition |
| `frontend/src/pages/AboutPage.jsx` | About/mission page | Static page, JSX, layout components |
| `frontend/src/pages/LoginPage.jsx` | Login form | useState, controlled inputs, events |
| `frontend/src/pages/RegisterPage.jsx` | Register form | State, form validation |
| `frontend/src/pages/NotFoundPage.jsx` | 404 error page | Catch-all route, Link |
| `frontend/src/components/layout/Navbar.jsx` | Public navigation bar | useState, NavLink, mobile menu |
| `frontend/src/components/layout/Footer.jsx` | Page footer | Static component, Link |
| `frontend/src/components/landing/HeroSection.jsx` | Landing page hero | JSX, inline styles, CTA |
| `frontend/src/components/landing/FeatureCard.jsx` | Reusable feature card | Props, destructuring |
| `frontend/src/components/landing/TestimonialSection.jsx` | Testimonials section | Array.map(), component lists |
| `frontend/src/components/landing/CTABanner.jsx` | Call-to-action banner | Link, JSX, conditionals |

---

## 📌 Slide 15 — GitHub Checkpoint: MC1

### What to Commit After This Class

```bash
git add .
git commit -m "MC1: React Fundamentals — Landing, About, Login, Register pages with routing and component architecture"
git push origin masterclass-1/react-fundamentals
```

### Branch Naming
Create a dedicated branch:
`masterclass-1/react-fundamentals`

### What's Intentionally Left for MC2 & MC3
- No design system — everything is unstyled / basic CSS for now
- No dark/light mode
- Login button just logs to console — no real backend
- No dashboard, no sidebar, no logged-in experience
- No animations or micro-interactions
- These will come in Masterclass 2 (design system & UI components) and Masterclass 3 (dashboard pages)

---

## 📌 Slide 16 — Homework for Students

1. **Explore and identify components** — Open the live site. Right-click any element and try to name which component file it belongs to based on what you learned today. Check your answer in the source code.

2. **Add a new stat** — On the Landing Page, find the stats section ("10K+ Students", "500+ Roadmaps"). Add a 4th stat of your choice (e.g., "50+ Countries" or "4.9/5 Stars"). Use the same pattern as the existing stats.

3. **Form validation exercise** — On the Login Page, add a check that shows a red error message if the user tries to submit with an empty email field — without any backend. Just check `if (email === '') { setError('Email is required'); }`.

4. **Create a new page** — Create a simple `ContactPage.jsx` that shows a heading "Contact Us" and a paragraph. Add a route for `/contact` in `App.jsx` and a link to it in the Navbar.

---

## ✅ By the End of MC1, Students Should Be Able To:

- ✅ Explain what React is and why it replaced traditional JavaScript for building UIs
- ✅ Create a functional component and return JSX from it
- ✅ Write valid JSX following all 5 golden rules (className, self-closing, single root, curly braces, style objects)
- ✅ Pass data from a parent component into a child component using Props
- ✅ Manage interactive state inside a component using `useState`
- ✅ Build and wire up client-side page navigation using React Router
- ✅ Build a multi-page React website from scratch using Vite
- ✅ Identify real-world components in any website they visit

---

## 🎮 Two Truths and One Lie — MC1

> **For the Instructor:** Read all three statements out loud. Ask students to vote (raise hands / type in chat) on which one is the **LIE**. Reveal the answer after discussion. Run these at natural energy dips — they reset focus instantly.

---

### 🔴 Round 1 — About React

- 🟢 React was created by Meta (Facebook) in 2013 and is now used by Netflix, Airbnb, and Instagram.
- 🟢 In JSX, you must use `className` instead of `class` because `class` is a reserved keyword in JavaScript.
- 🔴 React is a complete framework like Angular — it handles routing, API calls, forms, and state management all out of the box.

> **🎯 The Lie:** React is just a **UI library**, not a full framework. You need extra libraries for routing (React Router), HTTP calls (Axios), and global state management (Context/Redux). This is actually considered React's strength — it's minimal and composable.

---

### 🔴 Round 2 — About Props and State

- 🟢 `useState` always returns exactly two things: the current value and a setter function to update it.
- 🟢 React Router's `<Link>` component navigates between pages without a full browser reload.
- 🔴 A child component can modify the props it receives from its parent if it needs to update shared data.

> **🎯 The Lie:** Props are **read-only**. A child component can never modify the props it receives. If a child needs to send data back up to the parent, the parent must pass a function (callback) as a prop, which the child can then call.

---

### 🔴 Round 3 — About JSX and Vite

- 🟢 Vite starts the development server in under 1 second — Create-React-App used to take 30–60 seconds.
- 🟢 In JSX, inline styles are written as JavaScript objects: `style={{ color: 'red', fontSize: '16px' }}`.
- 🔴 Every React component must have its own dedicated `.css` file, otherwise the styles won't apply.

> **🎯 The Lie:** There is **no such requirement**. Styles can come from a global CSS file, inline style objects, CSS Modules, a design system, or a CSS-in-JS library. Many components in SkillPath AI share styles from one global `index.css` file.

---

## 🙋 Mid-Class Questions — MC1

> **For the Instructor:** Ask these during natural pauses to check understanding and encourage participation. Designed to spark discussion, not trick students.

1. **"We just saw that JSX uses `className` instead of `class`. Can anyone tell me — WHY? What is `class` used for in plain JavaScript?"**
   *(Expected: `class` is a reserved keyword in JavaScript for defining ES6 classes like `class MyClass {}`. Since JSX is still JavaScript under the hood, it can't use `class` as an attribute.)*

2. **"I have a `FeatureCard` component and I use it 4 times on the Landing Page. If I want all 4 cards to show a different title — what mechanism do I use, and where does the title value come from?"**
   *(Expected: Props! The parent (LandingPage) passes the `title` as a prop. The child (FeatureCard) just reads it. Use the stamp-machine analogy.)*

3. **"In our `Navbar`, we have a `menuOpen` state. What are the TWO things `useState` always gives us back, and what does each one do?"**
   *(Expected: 1) The current value (true/false). 2) The setter function (setMenuOpen) that triggers a re-render when called.)*

4. **"If I type in the email input on the Login Page and the `onChange` handler is missing — what happens? Can React see what I typed?"**
   *(Expected: React loses control — the input becomes uncontrolled. The `email` state stays as `''` no matter what the user types. This breaks form submission because you'd always submit an empty email.)*

5. **"I want to add a link from the Navbar to the About page. Should I use an HTML `<a>` tag or React Router's `<Link>`? What is the actual difference?"**
   *(Expected: `<Link>` — it intercepts the click and swaps the component instead of reloading the page. `<a>` would cause the browser to send a new HTTP request and reload the entire app from scratch.)*

---

## 📋 File Creation Flow — MC1 (Start Here, Follow This Order!)

This section provides a clear, step-by-step walkthrough of the files you need to create, modify, or clean up during Masterclass 1. Click on the file name links to open the files directly on your screen.

---

### 🟢 STEP 1 — Project Setup & Boilerplate Cleanup (Do this FIRST)

#### 1️⃣ Action: Initialize Vite React App & Install Packages
- **Command:** Run the following commands in your terminal:
  ```bash
  npm create vite@latest frontend -- --template react
  cd frontend
  npm install
  npm install react-router-dom
  ```
- **Instructor Note:** Explain that Vite is a modern build tool that starts up in under a second compared to the deprecated Create-React-App. Also explain that we install `react-router-dom` to support client-side single page app (SPA) routing.

#### 2️⃣ Action: Delete Boilerplate Files
To build a clean app from scratch, open and delete these boilerplate files inside the `frontend` folder:
- **Delete:** `frontend/src/App.css` (we don't need default app styles)
- **Delete:** `frontend/src/assets/react.svg` (we don't need default icons)
- **Delete:** `frontend/public/vite.svg`
- **Clean:** Open [frontend/src/index.css](file:///e:/SDG-Quality-Education/frontend/src/index.css) and delete all default CSS styles inside it. Copy and paste the core UI styles here so our components have clean layout classes.

---

### 🟡 STEP 2 — Entry Point (The App's "On Switch")

#### 3️⃣ File: [frontend/src/main.jsx](file:///e:/SDG-Quality-Education/frontend/src/main.jsx)
- **Action:** Open and modify the existing file.
- **Instructor Note:** Explain that this is the entry point file. It connects the virtual DOM tree created by React to the real `<div id="root">` in `index.html`.
- **Code to write:**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

### 🟠 STEP 3 — Layout Components (Shared across all pages — build once, use everywhere)

#### 4️⃣ File: [frontend/src/components/layout/Navbar.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/layout/Navbar.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Explain `useState` state hook. We use `menuOpen` state to show/hide the hamburger navigation on mobile screens. Explain that `<NavLink>` is used instead of `<a>` to prevent page reloads and automatically apply active styles.
- **Code to write:**
```jsx
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span>SkillPath <span className="gradient-text">AI</span></span>
      </Link>
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
        <Link to="/login" className="nav-btn-login">Login</Link>
        <Link to="/register" className="nav-btn-register">Get Started</Link>
      </div>
      <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );
}

export default Navbar;
```

#### 5️⃣ File: [frontend/src/components/layout/Footer.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/layout/Footer.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Explain that this is a simple static component using client-side `<Link>` components to navigate between the footer paths.
- **Code to write:**
```jsx
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2026 SkillPath AI. SDG 4: Quality Education.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

---

### 🔵 STEP 4 — Landing Page Sections (Build components before assembling pages)

#### 6️⃣ File: [frontend/src/components/landing/HeroSection.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/landing/HeroSection.jsx)
- **Action:** Create this new file.
- **Instructor Note:** This is the top banner section of the landing page. Point out the text alignment with UN SDG 4.
- **Code to write:**
```jsx
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero-section">
      <h1>Personalized AI Roadmaps for <span className="gradient-text">Lifelong Learning</span></h1>
      <p>Aligning with UN SDG 4 to make quality education and AI-guided learning free and accessible to all.</p>
      <div className="hero-buttons">
        <Link to="/register" className="btn btn-primary">Start Learning Free</Link>
        <Link to="/about" className="btn btn-secondary">Learn More</Link>
      </div>
    </section>
  );
}

export default HeroSection;
```

#### 7️⃣ File: [frontend/src/components/landing/FeatureCard.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/landing/FeatureCard.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Explain **Props destructuring** here. The card is a reusable blueprint. It does not hardcode data; it receives icon, title, description, and color dynamic props from the parent.
- **Code to write:**
```jsx
function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="feature-card" style={{ borderColor: color }}>
      <div className="feature-icon" style={{ backgroundColor: `${color}15`, color: color }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
```

#### 8️⃣ File: [frontend/src/components/landing/TestimonialSection.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/landing/TestimonialSection.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Teach the use of `map()` to dynamically render lists of data. Remind students that React needs a unique `key` on mapped children.
- **Code to write:**
```jsx
function TestimonialSection() {
  const testimonials = [
    { name: "Rahul S.", role: "Computer Science Student", quote: "The AI doubt assistant answered my coding queries at midnight instantly!" },
    { name: "Priya M.", role: "Self-taught Developer", quote: "Following the personalized roadmap helped me build my first full-stack app." },
    { name: "David K.", role: "High School Teacher", quote: "A wonderful resource for students who cannot afford expensive private tutors." }
  ];

  return (
    <section className="testimonials-section">
      <h2>What Our <span className="gradient-text">Students Say</span></h2>
      <div className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <p className="quote">"{t.quote}"</p>
            <h4 className="author">{t.name}</h4>
            <p className="role">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;
```

#### 9️⃣ File: [frontend/src/components/landing/CTABanner.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/landing/CTABanner.jsx)
- **Action:** Create this new file.
- **Instructor Note:** A bottom banner urging visitors to sign up. Uses simple layout wrapping with a button link.
- **Code to write:**
```jsx
import { Link } from 'react-router-dom';

function CTABanner() {
  return (
    <section className="cta-banner">
      <h2>Ready to build your personalized skill path?</h2>
      <p>Join thousands of students learning at their own pace with AI.</p>
      <Link to="/register" className="btn btn-light">Get Started Now</Link>
    </section>
  );
}

export default CTABanner;
```

---

### 🟣 STEP 5 — Pages (Assemble components you just built)

#### 🔟 File: [frontend/src/pages/LandingPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/LandingPage.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Explain **Component Composition**. Show how we import and orchestrate layout components and page-specific sections to build a structured layout.
- **Code to write:**
```jsx
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeatureCard from '../components/landing/FeatureCard';
import TestimonialSection from '../components/landing/TestimonialSection';
import CTABanner from '../components/landing/CTABanner';

const features = [
  { icon: "🗺️", title: "AI Roadmap Generator", description: "Personalized learning path based on your goals and availability.", color: "#6C63FF" },
  { icon: "🤖", title: "AI Doubt Assistant", description: "24/7 contextual chat tutor that answers coding queries instantly.", color: "#00D4AA" },
  { icon: "💡", title: "Project Recommendations", description: "Tailored project ideas to practice what you learn.", color: "#FF6B6B" },
  { icon: "📊", title: "Progress Tracker", description: "Keep track of learning milestones and maintain your streak.", color: "#FFD93D" }
];

function LandingPage() {
  return (
    <div className="page-container">
      <Navbar />
      <main>
        <HeroSection />
        <section className="features-section">
          <h2 className="section-title">Why Use SkillPath AI?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))}
          </div>
        </section>
        <TestimonialSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
```

#### 1️⃣1️⃣ File: [frontend/src/pages/AboutPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/AboutPage.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Point out that this is a static informational page. It has no state of its own but reuses the global `Navbar` and `Footer` layout shells.
- **Code to write:**
```jsx
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function AboutPage() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="about-main">
        <h1>Our Mission: <span className="gradient-text">Quality Education for All</span></h1>
        <p className="about-intro">SkillPath AI directly addresses UN SDG 4 — Quality Education. We leverage advanced artificial intelligence to democratize education and build high-quality, personalized learning paths for everyone, everywhere.</p>
        
        <div className="about-grid">
          <div className="about-card">
            <h3>SDG 4 Alignment</h3>
            <p>By providing free roadmap generation, instant 24/7 mentoring, and project planning, we remove financial and geographical barriers to expert tutoring.</p>
          </div>
          <div className="about-card">
            <h3>Tech Stack</h3>
            <p>Built using the MERN stack (MongoDB, Express, React, Node.js) and powered by the Groq AI API for lightning-fast roadmaps.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
```

#### 1️⃣2️⃣ File: [frontend/src/pages/LoginPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/LoginPage.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Explain **Controlled Inputs** and form submissions. The inputs bind their value to component state, syncing on every keystroke (`onChange`). We intercept form submission with `e.preventDefault()` to avoid a page reload.
- **Code to write:**
```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    console.log('Logging in with:', { email, password });
    // Note: In Masterclass 6, we connect this to the real Express backend auth API.
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In to <span className="gradient-text">SkillPath AI</span></h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="show-hide-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary auth-submit-btn">Sign In</button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
```

#### 1️⃣3️⃣ File: [frontend/src/pages/RegisterPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/RegisterPage.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Reinforce state concepts. Add form level validation checking password length before submission.
- **Code to write:**
```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    console.log('Registering user:', { name, email, password });
    // Note: In Masterclass 6, we connect this to the real Express backend auth API.
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit-btn">Get Started</button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
```

#### 1️⃣4️⃣ File: [frontend/src/pages/NotFoundPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/NotFoundPage.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Renders a clean 404 page when the user lands on an unmatched route path.
- **Code to write:**
```jsx
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>404 🔍</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go back home</Link>
    </div>
  );
}

export default NotFoundPage;
```

---

### 🔴 STEP 6 — App Router (Connect everything together LAST)

#### 1️⃣5️⃣ File: [frontend/src/App.jsx](file:///e:/SDG-Quality-Education/frontend/src/App.jsx)
- **Action:** Open and modify the existing file.
- **Instructor Note:** This is the application router. It connects page components to path routes. Explain that this MUST go last since it imports all pages. Walk through the wild-card fallback `path="*"` route at the bottom.
- **Code to write:**
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### ✅ MC1 Creation Order — Quick Summary & Rule of Thumb

```
1. Vite setup & npm packages
2. Boilerplate cleanup (App.css, react.svg, etc.)
3. index.css              ← Empty out / add starter CSS
4. main.jsx              ← React mounting entrypoint
5. Navbar.jsx            ← Shared Layout component
6. Footer.jsx            ← Shared Layout component
7. HeroSection.jsx       ← Section inside landing page
8. FeatureCard.jsx       ← Card prop component inside landing
9. TestimonialSection.jsx ← Section inside landing page
10. CTABanner.jsx         ← Section inside landing page
11. LandingPage.jsx      ← Assembles steps 5–10
12. AboutPage.jsx        ← Static informational page
13. LoginPage.jsx        ← useState controlled form
14. RegisterPage.jsx     ← useState validation form
15. NotFoundPage.jsx     ← Fallback Asterisk page
16. App.jsx              ← Imports all and routes them (LAST ALWAYS)
```

> 💡 **Golden Rule for MC1:** Build components first, page assemblies second, and write the App Router (`App.jsx`) last since it imports everything else.


---

## 📌 Slide 17 — Practical Assignment: Build a Contact Form Page

### 🎯 The Goal
Your assignment is to add a new public page to the application: a **Contact Us Page** (`ContactPage.jsx`). This page will feature a form that lets users type in their name, email, subject, and message. When they submit, the form must validate that all fields are filled, prevent page reload, and display a successful submission message.

### 📚 Concepts You Will Practice
1. **Routing:** Add a new route `/contact` to `App.jsx` and link to it from `Navbar.jsx` and `Footer.jsx`.
2. **Component Reuse:** Wrap your contact page in the `Navbar` and `Footer` layout components.
3. **Controlled Inputs:** Use `useState` to track input fields and keep React state synchronized with the form.
4. **Event Handling:** Prevent default HTML form submission behavior using `e.preventDefault()`.

---

### 📝 Step-by-Step Instructions

#### Step 1: Create the Page Component
Create a new file: `frontend/src/pages/ContactPage.jsx`.

#### Step 2: Set Up Form State
Inside `ContactPage.jsx`, initialize state variables for the inputs, errors, and success state.

#### Step 3: Wire Controlled Inputs
Create inputs for name, email, subject, and a `<textarea>` for the message. Tie each one's `value` to its corresponding state variable and update it via `onChange`.

#### Step 4: Handle Submit
Write a `handleSubmit(e)` function that calls `e.preventDefault()`, validates the inputs, sets success status, and resets the form.

#### Step 5: Wire the Route
Open `frontend/src/App.jsx`. Add a route for `/contact` and import the component. Then open `Navbar.jsx` and add a link to the contact page.

---

### 💻 Example Code Structure

Here is a partial skeleton to get you started:

```jsx
// File: frontend/src/pages/ContactPage.jsx
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      setError('All fields are required!');
      setSubmitted(false);
      return;
    }
    
    setError('');
    setSubmitted(true);
    console.log('Feedback submitted:', formData);
    // Clear inputs after successful submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="contact-main">
        <h1>Contact Us ✉️</h1>
        {error && <div className="error-alert">{error}</div>}
        {submitted && <div className="success-alert">Thank you! Your message has been sent.</div>}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
          <textarea 
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <button type="submit">Send Message</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default ContactPage;
```
