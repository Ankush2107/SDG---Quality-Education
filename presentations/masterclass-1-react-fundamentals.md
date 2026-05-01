# 🎓 Masterclass 1: From Zero to UI Hero
### Introduction to React Fundamentals, Components, JSX & Props
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — Welcome & What We're Building

### The Project: SkillPath AI
SkillPath AI is a real-world, production-quality web application built using the MERN stack. It helps students learn better by:

- Generating a **personalized learning roadmap** powered by AI
- Providing a **24/7 AI Doubt Assistant** (like having a personal tutor at any hour)
- Recommending **real project ideas** based on your skill level
- Tracking **progress visually** on a beautiful dashboard

### Why This Project?
This is not a demo. This is the kind of project you would see in a real product team. By the end of all 5 masterclasses, you will have something that you can:
- Show on your **GitHub portfolio**
- Present at **interviews**
- Claim as a **capstone project**

### SDG 4 — Quality Education
The United Nations has defined 17 Sustainable Development Goals (SDGs). SDG 4 says:
> "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."

SkillPath AI directly addresses this by making personalized, AI-driven education accessible to any student with an internet connection — no paid tutors, no waiting in line.

---

![SkillPath AI Landing Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\landing_1777288296212.png)
*The SkillPath AI Landing Page — What a visitor sees when they first arrive*

---

## 📌 Slide 2 — The Problem We're Solving

### The Student's Real Pain Points

1. **"I want to learn coding but I don't know where to start."**
   - There are hundreds of languages, frameworks, and courses. Beginners feel overwhelmed and paralysed.

2. **"I found a roadmap but it's not made for me."**
   - Generic roadmaps don't account for your current level, time availability, or specific goal.

3. **"I get stuck on a concept at 11 PM and there's no one to ask."**
   - Forums take hours. YouTube tutorials are long. You need an instant, conversational answer.

4. **"I know theory but I don't know what to build."**
   - Projects are the best way to learn, but students don't know which project to pick.

5. **"I can't see how far I've come."**
   - Without progress tracking, learning feels endless and unmotivating.

### SkillPath AI Solves Every One of These

| Problem | SkillPath AI Feature |
|---------|---------------------|
| Don't know where to start | AI Roadmap Generator |
| Generic roadmaps | Personalized by goal + level + hours |
| Stuck at night | 24/7 AI Chat Doubt Assistant |
| Don't know what to build | AI Project Recommendations |
| Can't track progress | Visual Dashboard + Streak Tracking |

---

## 📌 Slide 3 — The 5 Masterclass Journey

| Class | Title | Focus |
|-------|-------|-------|
| **MC 1** | From Zero to UI Hero | React basics, components, JSX, routing ✅ |
| MC 2 | Make It Look WOW | Design system, context, advanced UI |
| MC 3 | Power Behind the Scenes | Node.js, Express, REST APIs |
| MC 4 | Data That Works | MongoDB, schemas, AI integration |
| MC 5 | From Code to Cloud | Full-stack connect + deploy live |

**By the end of MC1**, you will have built the entire public face of the website — the Landing Page, About Page, Login Page, and Register Page — all working with navigation between them.

---

## 📌 Slide 4 — What is React?

### Definition
React is a **JavaScript library** for building user interfaces. It was created by Meta (Facebook) in 2013 and is now used by companies like Airbnb, Netflix, Instagram, WhatsApp Web, and thousands more.

### The Core Idea
Instead of writing one massive HTML file, React lets you break your UI into **small, independent, reusable pieces** called **components**. Think of them like LEGO bricks — you build small bricks and then assemble them into a complete structure.

### Real World Analogy
Imagine you're building a house:
- Without React: You build the entire house in one massive blueprint. If you want to change a window, you have to find it somewhere in the 500-page blueprint.
- With React: Each room is a separate blueprint. The kitchen, bedroom, bathroom — each is designed independently. When you want to change the kitchen, you only touch the kitchen blueprint.

### Why Vite Instead of Create-React-App?
We use **Vite** to set up our React project. Vite is a modern tool that:
- Starts the development server in **under 1 second** (Create-React-App takes 30–60 seconds)
- Refreshes the browser **instantly** when you save a file (Hot Module Replacement)
- Produces a much smaller final build for deployment

### Files Created by Vite Setup
- **`frontend/package.json`** — The project's "identity card". Lists all dependencies (React, libraries), scripts to run the app, and project name.
- **`frontend/index.html`** — The single HTML file of the entire app. React mounts itself here.
- **`frontend/vite.config.js`** — Configuration for the Vite build tool.
- **`frontend/src/main.jsx`** — The entry point. This is the first JavaScript file that runs. It connects React to the HTML.
- **`frontend/src/App.jsx`** — The root React component. All pages are defined here.

---

## 📌 Slide 5 — Understanding JSX

### Definition
**JSX** (JavaScript XML) is a special syntax that lets you write HTML-like code inside a JavaScript file. React then converts this into real JavaScript behind the scenes.

### Why JSX Exists
Before JSX, developers had to write very complex JavaScript just to create a simple button. JSX makes the code look almost exactly like the HTML result, making it far easier to read and write.

### Real World Analogy
JSX is like writing a text message with emoji shortcuts. When you type `:)` in some apps, it automatically becomes 😊. You write in a human-friendly shorthand, and the system converts it to the real thing behind the scenes.

### Key Rules Every Student Must Know

1. **`className` instead of `class`**
   - In HTML you write `class="button"`. In JSX you write `className="button"`.
   - Why? Because `class` is a reserved word in JavaScript (it's used for JS classes).

2. **Self-closing tags are mandatory**
   - In HTML, `<img>` is fine. In JSX, you must write `<img />`.

3. **Every component must return ONE root element**
   - You cannot return two sibling elements directly. Wrap them in a `<div>` or use an empty `<>` wrapper (called a Fragment).

4. **JavaScript expressions go inside curly braces `{}`**
   - `<h1>Hello, {name}!</h1>` — the variable `name` is evaluated and inserted.
   - `<img src={imageUrl} />` — the variable `imageUrl` is used as the attribute value.

5. **Inline styles are objects, not strings**
   - HTML: `style="color: red; font-size: 16px"`
   - JSX: `style={{ color: 'red', fontSize: '16px' }}`

---

## 📌 Slide 6 — Components: The Building Blocks

### Definition
A **Component** in React is simply a JavaScript function that returns JSX. That's it. Nothing more complicated than that.

### Types of Components in SkillPath AI

**1. Layout Components** — Define the overall structure of pages
- **`frontend/src/components/layout/Navbar.jsx`** — The navigation bar shown at the top of every public page. Contains the logo, links (Home, About, Resources), and action buttons (Login, Get Started).
- **`frontend/src/components/layout/Footer.jsx`** — The footer at the bottom of public pages. Contains links, social media icons, and copyright.
- **`frontend/src/components/layout/DashboardLayout.jsx`** — The container for all logged-in pages. Wraps the sidebar and the main content area together.
- **`frontend/src/components/layout/Sidebar.jsx`** — The left navigation panel for logged-in users. Shows links to Dashboard, Roadmap, Chat, Projects, Resources, and Profile.

**2. Landing Page Components** — Sections on the home page
- **`frontend/src/components/landing/HeroSection.jsx`** — The very first section a visitor sees: the big headline, subtext, call-to-action buttons, and the animated roadmap card preview.
- **`frontend/src/components/landing/FeatureCard.jsx`** — A single card that shows one key feature (icon, title, description). Used 4 times on the landing page for the 4 core features.
- **`frontend/src/components/landing/TestimonialSection.jsx`** — A section showing student testimonials to build trust.
- **`frontend/src/components/landing/CTABanner.jsx`** — "Call To Action" — the bottom banner saying "Start Learning Free Today" with a button.

### Real World Analogy
Think of a newspaper:
- The **masthead** (newspaper name at top) is a component
- Each **article** is a component
- The **sidebar** with ads is a component
- The **footer** with contact info is a component

They're all independent pieces but assembled together to form one newspaper page.

---

## 📌 Slide 7 — Props: Passing Data to Components

### Definition
**Props** (short for Properties) are the way you pass data from a parent component down to a child component. Think of props as the "inputs" to a component — the information it needs to do its job.

### Real World Analogy
A component is like a **stamp machine**. The machine always stamps the same shape, but you insert different ink colors (props) to get different results. The `FeatureCard` component always renders the same card shape, but you pass it different `icon`, `title`, and `description` props to get 4 unique cards.

### Props in Action: The FeatureCard
**File:** `frontend/src/components/landing/FeatureCard.jsx`

This component receives 4 props:
- **`icon`** — An emoji like 🗺️ or 🤖
- **`title`** — The feature name like "AI Roadmap Generator"
- **`description`** — A short explanation of the feature
- **`color`** — A hex color code like `#6C63FF` for the card's accent

The **Landing Page** (`frontend/src/pages/LandingPage.jsx`) defines an array of 4 feature objects and then "maps" over them, passing each object's properties as props to a `FeatureCard`. Result: 4 different cards rendered from ONE component.

### Key Rule About Props
Props are **read-only**. A child component CANNOT modify the props it receives. It can only read them and display them. If a child needs to communicate back to the parent, it does so through a function that was passed as a prop.

---

## 📌 Slide 8 — State: Making Components Interactive

### Definition
**State** is data that a component **owns and manages itself**. Unlike props (which come from outside), state is internal to the component. When state changes, React automatically re-renders the component to show the new data.

### Real World Analogy
Imagine a light switch on a wall. The switch has two states: ON or OFF. When you flip it (an event), the state changes, and the room responds (re-renders) — lights go on or off. The switch owns and manages its own state. Nobody outside the switch decides if it's on or off; the switch itself tracks it.

### `useState` Hook
`useState` is a special React function (called a "Hook") that lets functional components have state.

It returns two things:
1. **The current value** of the state
2. **A setter function** to update the state

### Where State is Used in MC1

**File:** `frontend/src/components/layout/Navbar.jsx`
- **State:** `menuOpen` — a `true` or `false` value
- **When false:** The hamburger icon (☰) is shown on mobile
- **When true:** The close icon (✕) is shown and the menu expands
- **Event:** The button's `onClick` calls `setMenuOpen(!menuOpen)` to flip the state

**File:** `frontend/src/pages/LoginPage.jsx`
- **State:** `email` (the text in the email input field)
- **State:** `password` (the text in the password input field)
- Every time the user types a character, `onChange` updates the state, keeping React always in sync with what's in the box. This is called a **Controlled Input**.

### Controlled Inputs: The React Way
When an input field's `value` is connected to a state variable, React is in full control of what's displayed. This is the standard, recommended way to handle forms in React because you always know exactly what's in the input at any time — no need to "query the DOM" like in vanilla JavaScript.

---

## 📌 Slide 9 — The Landing Page: Composition in Action

**File:** `frontend/src/pages/LandingPage.jsx`

The Landing Page is the best example of **component composition** — assembling many smaller components into one larger screen.

### What the Page Contains (Top to Bottom)

1. **`<Navbar />`** — Sticky navigation bar at the top
2. **`<HeroSection />`** — Full-screen hero with headline, buttons, and animated preview card
3. **Features Section** — 4 `<FeatureCard />` components laid out in a grid
4. **"How It Works" Section** — 4 numbered step cards explaining the user journey
5. **Stats Section** — "10K+ Students", "500+ Roadmaps", "98% Satisfaction"
6. **`<TestimonialSection />`** — Student quote cards
7. **`<CTABanner />`** — Final call-to-action section
8. **`<Footer />`** — Page footer

### Teaching Point
Notice that `LandingPage.jsx` itself contains almost no logic. It just **assembles** components. This is the ideal pattern — pages are assemblers, components are workers.

---

![SkillPath AI Landing Page Features Section](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\landing_1777288296212.png)
*The Landing Page — Each feature card is a reusable FeatureCard component receiving different props*

---

## 📌 Slide 10 — React Router: Navigation Without Page Reload

### Definition
**React Router** is a library that adds **client-side routing** to a React app. In a traditional website, clicking a link sends a new request to the server which responds with a new HTML page. React Router intercepts that and instead swaps the React component being displayed — no full page reload.

### Real World Analogy
Think of a TV remote. When you change the channel, you don't buy a new TV — the same TV just displays different content. React Router is the remote control. The "TV" (the `<App />` shell with the navbar and layout) stays the same; only the "channel" (the page component) changes.

### File: `frontend/src/App.jsx`
This is the most important file for routing. It:
1. Imports all page components
2. Defines `<Route>` entries that map URL paths to components
3. Wraps protected routes with `<ProtectedRoute>` (users can't access if not logged in)
4. Wraps admin routes with `<AdminRoute>` (only admins can access)

### Routes Defined in MC1

| URL Path | Component Rendered | Who Can Access |
|----------|-------------------|----------------|
| `/` | `LandingPage` | Everyone |
| `/about` | `AboutPage` | Everyone |
| `/login` | `LoginPage` | Everyone |
| `/register` | `RegisterPage` | Everyone |
| `*` (anything else) | `NotFoundPage` | Everyone |

### Key Components
- **`<Link>`** — Used instead of `<a>` tag for navigation. Does NOT reload the page.
- **`<NavLink>`** — Same as `<Link>` but automatically adds an `"active"` class to the currently-visited link. Used in the Navbar to highlight which page you're on.
- **`<Routes>`** — The container that holds all `<Route>` definitions.
- **`<Route>`** — Maps a specific URL to a specific component.

---

## 📌 Slide 11 — Login & Register Pages

### File: `frontend/src/pages/LoginPage.jsx`

The Login page collects a user's email and password, validates them, and will (in MC5) send them to the backend API for authentication.

### What It Contains
- **Email input** — Controlled input, state updates on every keystroke
- **Password input** — Controlled input with a show/hide toggle button
- **Error message** — Shown when login fails (red alert box)
- **"Sign In" button** — Submits the form
- **Link to Register** — For users who don't have an account yet
- **SkillPath AI logo** — Brand consistency, shown at the top of the card

---

![SkillPath AI Login Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\login_1777288318859.png)
*The Login Page — Clean, centered auth card with brand logo*

---

### File: `frontend/src/pages/RegisterPage.jsx`

The Register page collects a user's name, email, and password to create a new account.

### What It Contains
- **Name input** — Controlled input
- **Email input** — Controlled input
- **Password input** — Controlled input with show/hide
- **Form validation** — Checks all fields are filled before allowing submit
- **"Create Account" button** — Submits the form
- **Link to Login** — For users who already have an account

---

![SkillPath AI Register Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\register_1777288321407.png)
*The Register Page — Identical clean style, creates a new account*

---

## 📌 Slide 12 — About Page

### File: `frontend/src/pages/AboutPage.jsx`

The About page explains the project's mission, the SDG 4 alignment, and the team behind it.

### What It Contains
- **Mission statement** — Why SkillPath AI was built
- **SDG 4 explanation** — The United Nations goal this project addresses
- **Tech stack display** — Shows the technologies used (React, Node, MongoDB, Groq AI)
- **Feature highlights** — Visual cards showing what makes the platform unique

---

![SkillPath AI About Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\about_1777288302797.png)
*The About Page — Explains the mission, SDG 4 alignment, and tech stack*

---

## 📌 Slide 13 — Component Hierarchy Map

This shows how all components relate to each other in MC1:

```
App.jsx (Root)
│
├── LandingPage.jsx
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── FeatureCard.jsx (×4 — same component, 4 different sets of props)
│   ├── TestimonialSection.jsx
│   ├── CTABanner.jsx
│   └── Footer.jsx
│
├── AboutPage.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
│
├── LoginPage.jsx (no Navbar — standalone auth page)
│
└── RegisterPage.jsx (no Navbar — standalone auth page)
```

### Key Insight
`Navbar.jsx` is used on multiple pages. We write it **once** and reuse it everywhere. If we ever want to change the logo or add a new link, we change it in ONE file and it updates everywhere automatically. This is the power of component-based architecture.

---

## 📌 Slide 14 — Files Built in Masterclass 1

| File | Purpose | Key Concepts Taught |
|------|---------|-------------------|
| `frontend/src/main.jsx` | Entry point — starts the React app | ReactDOM, BrowserRouter |
| `frontend/src/App.jsx` | Root component with all routes | Routes, Route, page imports |
| `frontend/src/pages/LandingPage.jsx` | The home page | Component composition |
| `frontend/src/pages/AboutPage.jsx` | About/mission page | Static page, JSX |
| `frontend/src/pages/LoginPage.jsx` | Login form | State, controlled inputs |
| `frontend/src/pages/RegisterPage.jsx` | Register form | State, form handling |
| `frontend/src/pages/NotFoundPage.jsx` | 404 error page | Catch-all route |
| `frontend/src/components/layout/Navbar.jsx` | Public navigation bar | useState, NavLink, events |
| `frontend/src/components/layout/Footer.jsx` | Page footer | Static component, links |
| `frontend/src/components/landing/HeroSection.jsx` | Landing page hero | JSX, inline styles |
| `frontend/src/components/landing/FeatureCard.jsx` | Reusable feature card | Props, destructuring |
| `frontend/src/components/landing/TestimonialSection.jsx` | Testimonials | Array mapping |
| `frontend/src/components/landing/CTABanner.jsx` | Call-to-action banner | Link, JSX |

---

## 📌 Slide 15 — GitHub Checkpoint: MC1

### What to Commit After This Class

After completing Masterclass 1, commit everything with this message:

> `MC1: React Fundamentals — Landing, About, Login, Register pages with routing and component architecture`

### Branch Naming
Create a dedicated branch:
`masterclass-1/react-fundamentals`

This allows teachers to always return to this exact point in the codebase for reference.

### What's Intentionally Left for MC2
- No styles beyond basic CSS — everything looks plain right now
- No dark/light mode
- Login button just logs to console — no real backend
- No dashboard, no sidebar, no logged-in experience
- These will come in Masterclass 2 (advanced UI) and Masterclass 3 (backend)

---

## 📌 Slide 16 — Homework for Students

1. **Explore and identify components** — Open the live site, right-click any element, and try to guess which component file it belongs to based on what you learned today.

2. **Add a new stat** — On the Landing Page, there are stats like "10K+ Students". Add a 4th stat of your choice (for example, "50+ Countries").

3. **Form validation exercise** — On the Login Page, add an error message that appears if the user tries to submit with an empty email field (without any backend — just check if the field is empty).

4. **Create a new page** — Create a simple `ContactPage.jsx` that shows a heading "Contact Us" and a paragraph with a fake email address. Add a route for `/contact` and a link in the Navbar.

---

## ✅ By the End of MC1, Students Should Be Able To:

- ✅ Explain what React is and why it replaced traditional JavaScript for building UIs
- ✅ Create a functional component and render JSX inside it
- ✅ Pass data from one component to another using Props
- ✅ Manage interactive state inside a component using `useState`
- ✅ Set up client-side page navigation using React Router
- ✅ Build a multi-page React website from scratch using Vite
- ✅ Identify real-world components in any website they visit
