# 🗳️ ZOOM POLLS — Master Reference Guide
### SkillPath AI Masterclass Series · All 8 Sessions
**SkillPath AI | SDG 4: Quality Education | MERN Stack + Groq AI**

---

> **How to use this guide:**
> - Keep this file open alongside your masterclass slides during every Zoom session
> - Each poll is numbered and labeled with the exact moment to share it
> - Copy the question + options into Zoom's poll builder **before the session starts**
> - Type `(Single Choice)` = single answer · `(Multiple Choice)` = checkboxes in Zoom
> - ✅ marks the correct answer — reveal AFTER students vote, not before

---

## 🗓️ HOW TO SET UP POLLS IN ZOOM BEFORE THE SESSION

1. Go to **zoom.us** → Sign in → **Meetings**
2. Click your scheduled meeting → Scroll down to **Polls**
3. Click **Add** → Enter question + options → Save
4. During the session: **Polls** button in host toolbar → Launch → Share Results

> **Pro Tip:** Pre-create all 4 polls for each session before it starts. During the session, just click Launch.

---
---

## 📅 DAY 0 — ORIENTATION SESSION
### *"Welcome to the AI-Driven Web App & Product Development Masterclass"*

---

### 🗳️ POLL 1 — Ice Breaker: Know Your Audience
> ⏱️ **WHEN TO SHARE:** Immediately after opening slide (Slide 1). First thing — gets everyone engaged.

**Question:** Which best describes you right now?
*(Single Choice)*

- A) I know HTML & CSS but JavaScript feels shaky
- B) I'm comfortable with JavaScript but never built a full project
- C) I've built small projects but never deployed anything live
- D) I'm here to understand AI — coding is secondary

> 💬 **After results:** Read out the percentages live. Say: *"Perfect — this course is designed for exactly this mix. Wherever you are, by Masterclass 7 you'll have a live app online."*

---

### 🗳️ POLL 2 — Tech Awareness Check
> ⏱️ **WHEN TO SHARE:** After Slide 2 (Old Way vs New Way table). About 10–12 minutes in.

**Question:** Which of these technologies have you heard of before today?
*(Multiple Choice — students can pick all that apply)*

- A) React.js
- B) Node.js / Express
- C) MongoDB
- D) Groq / Any LLM API (ChatGPT, Gemini, etc.)

> 💬 **After results:** *"Great snapshot of the room. By the end of this series, every one of these will feel like an old friend."* If few pick D, spend extra time on the AI slides.

---

### 🗳️ POLL 3 — Stack Knowledge Check
> ⏱️ **WHEN TO SHARE:** After Slide 5 (Tech Stack diagram). About 30 minutes in.

**Question:** In the MERN stack, what does the "R" stand for and what does it do?
*(Single Choice)*

- A) Redux — manages global state across the whole app
- B) React.js — the frontend library that builds the user interface in the browser ✅
- C) REST — the style of API design used for communication
- D) Render — the cloud platform where the backend is hosted

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"React is ONLY responsible for what you SEE. The server, database, and AI are completely separate layers. This separation is what makes our architecture clean and maintainable."*

---

### 🗳️ POLL 4 — Setup Readiness Check
> ⏱️ **WHEN TO SHARE:** After Slide 16 (Action Items checklist). Right before closing.

**Question:** How many of the 7 setup steps have you already completed?
*(Single Choice)*

- A) 0 — starting fresh after this session
- B) 1–2 steps done (Node.js or VS Code installed)
- C) 3–5 steps done (mostly ready)
- D) All 7 done — I'm fully ready for Masterclass 1! 🚀

> 💬 **After results:** Offer direct help to everyone who picked A or B. Share the setup guide link in chat. *"Don't come to MC1 without completing setup — the first thing we do is run our first React app live."*

---
---

## 📅 MASTERCLASS 1 — React Fundamentals
### *"From Zero to UI Hero"*

---

### 🗳️ POLL 1 — JSX Rules Check
> ⏱️ **WHEN TO SHARE:** After Slide 5 (5 Golden Rules of JSX). About 25 minutes in.

**Question:** Which of the following is VALID JSX?
*(Single Choice)*

- A) `<div class="card">Hello</div>`
- B) `<img src="photo.jpg">`
- C) `<div style={{ color: 'red', fontSize: '16px' }}>Hello</div>` ✅
- D) `return (<h1>Title</h1><p>Text</p>)`

> ✅ **Correct Answer: C**
> 💬 **After reveal:** Walk through each wrong answer:
> - A: `class` is a reserved JS keyword — use `className`
> - B: Missing self-closing slash — needs `<img src="photo.jpg" />`
> - D: Two sibling root elements — needs a `<>` Fragment wrapper

---

### 🗳️ POLL 2 — Props vs State
> ⏱️ **WHEN TO SHARE:** After Slide 7 (Props section). About 45 minutes in.

**Question:** A `FeatureCard` component receives a `title` prop from `LandingPage`. What can `FeatureCard` do with this prop?
*(Single Choice)*

- A) Display it in JSX — that's it. Props are read-only inside the child. ✅
- B) Modify it directly using `title = "New Title"` — React will re-render
- C) Store it in localStorage so it persists across sessions
- D) Pass it back to the parent using `return title` inside the component

> ✅ **Correct Answer: A**
> 💬 **After reveal:** *"Props flow ONE way — from parent to child, and the child can never change them. This is called unidirectional data flow and it's one of React's most important principles."*

---

### 🗳️ POLL 3 — useState Deep Dive
> ⏱️ **WHEN TO SHARE:** After Slide 8 (State section). About 60 minutes in.

**Question:** We have `const [menuOpen, setMenuOpen] = useState(false)`. A user clicks the hamburger button. Which line correctly toggles the menu open/closed?
*(Single Choice)*

- A) `menuOpen = true`
- B) `setMenuOpen(!menuOpen)` ✅
- C) `useState(!menuOpen)`
- D) `menuOpen.toggle()`

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"Never directly change the state variable — `menuOpen = true` will not trigger a re-render. React watches the setter function, not the variable itself. C and D simply don't exist."*

---

### 🗳️ POLL 4 — React Router vs HTML Links
> ⏱️ **WHEN TO SHARE:** After Slide 9 (React Router). About 75 minutes in.

**Question:** In our Navbar, which code should we use to link to the About page?
*(Single Choice)*

- A) `<a href="/about">About</a>`
- B) `<Link to="/about">About</Link>` ✅
- C) `<button onClick={() => window.location.href='/about'}>About</button>`
- D) `<Route path="/about" />`

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"A and C both cause a FULL page reload — the browser fetches a new HTML file and reloads the entire React app from scratch. B intercepts the click and just swaps which component renders — instant, no reload. D defines routes, not navigation links."*

---
---

## 📅 MASTERCLASS 2 — Advanced UI & Design System
### *"Make It Look WOW"*

---

### 🗳️ POLL 1 — CSS Design System
> ⏱️ **WHEN TO SHARE:** After Slide 2 (Design System / CSS Variables). About 15 minutes in.

**Question:** Our entire app uses `--color-primary: #6C63FF`. If we want to change the brand color from purple to orange across EVERY component, how many files do we edit?
*(Single Choice)*

- A) Every component file that uses a button, card, or badge — could be 20+ files
- B) Just `index.css` — change the one `:root` variable and every component updates instantly ✅
- C) We need to re-run `npm install` to reload the styles
- D) We change it in `App.jsx` and it propagates down through props

> ✅ **Correct Answer: B**
> 💬 **After reveal:** Demo it live in DevTools! Open any page → DevTools → select `:root` → change `--color-primary` to `orange`. Watch the entire app shift color in real time.

---

### 🗳️ POLL 2 — Context API vs Prop Drilling
> ⏱️ **WHEN TO SHARE:** After Slide 3 (ThemeContext). About 30 minutes in.

**Question:** The dark/light mode toggle is inside the Navbar. Without React Context, how would `Button.jsx` — nested deep inside the app — know the current theme?
*(Single Choice)*

- A) It would use `localStorage.getItem('sp-theme')` directly — no props needed
- B) The theme would be passed as a prop through every parent component all the way down — prop drilling ✅
- C) React automatically shares all state between siblings and children
- D) The `Button` would fetch the theme from the backend API

> ✅ **Correct Answer: B**
> 💬 **After reveal:** Act it out: *"App passes theme → LandingPage passes theme → HeroSection passes theme → Button FINALLY uses theme. Every middle component is just a courier. Context creates a direct line — no couriers needed."*

---

### 🗳️ POLL 3 — Protected Routes
> ⏱️ **WHEN TO SHARE:** After Slide 6 (Protected Routes & Admin Routes). About 65 minutes in.

**Question:** A user is NOT logged in. They type `/dashboard` directly into the browser address bar. What happens?
*(Single Choice)*

- A) The dashboard loads normally — the URL is public
- B) The browser shows a generic 403 Forbidden error page
- C) `ProtectedRoute` checks `user` from `AuthContext`, finds it null, and redirects to `/login` ✅
- D) The backend rejects the page request with a 401 status

> ✅ **Correct Answer: C**
> 💬 **After reveal:** *"This is a UX guard, not a security guard. The REAL security is on the backend — JWT middleware rejects any API call without a valid token. ProtectedRoute just prevents showing a broken, empty UI to unauthenticated users."*

---

### 🗳️ POLL 4 — useEffect Timing
> ⏱️ **WHEN TO SHARE:** After Slide 8 (Animations / Micro-Interactions). About 85 minutes in.

**Question:** In `ThemeContext`, a `useEffect` saves the theme to `localStorage` every time `theme` changes. When does this `useEffect` actually run?
*(Single Choice)*

- A) Before the component renders — so localStorage is updated before the UI appears
- B) Only once when the app first loads
- C) After the component renders, every time the `theme` state value changes ✅
- D) Only when the user manually calls `toggleTheme()`

> ✅ **Correct Answer: C**
> 💬 **After reveal:** *"useEffect ALWAYS fires AFTER rendering — never before. The `[theme]` dependency array means 'run whenever theme changes'. An empty `[]` runs only once on first render."*

---
---

## 📅 MASTERCLASS 3 — Dashboard & Complete Frontend
### *"Dashboard, Pages & Complete Frontend"*

---

### 🗳️ POLL 1 — Dashboard State Design
> ⏱️ **WHEN TO SHARE:** After Slide 2 (Dashboard Page). About 15 minutes in.

**Question:** The Dashboard shows "67% complete" and "5-day streak". In MC3 these are hardcoded. In MC6, where will this data actually come from?
*(Single Choice)*

- A) The browser's `localStorage` — stored from the last session
- B) The React component itself calculates it from the `user` object in `AuthContext`
- C) An API call to the backend, which reads the user's `Progress` document from MongoDB ✅
- D) A prop passed down from `App.jsx` when the app first loads

> ✅ **Correct Answer: C**
> 💬 **After reveal:** *"Right now it's fake data — placeholder numbers. In MC6, every number on this dashboard will be REAL data from YOUR database, for YOUR user, updated every time they mark a step complete."*

---

### 🗳️ POLL 2 — Quiz State Logic
> ⏱️ **WHEN TO SHARE:** After Slide 4 (QuizModal). About 40 minutes in.

**Question:** A student answers Question 2 of 3 incorrectly. `score` is currently 1. What happens next in the QuizModal?
*(Single Choice)*

- A) The quiz ends immediately with a fail result
- B) The wrong option turns red, the correct option turns green, an explanation appears, and a "Next Question" button shows up ✅
- C) The score resets to 0 and the quiz restarts from Question 1
- D) The modal closes and the student is sent back to the roadmap

> ✅ **Correct Answer: B**
> 💬 **After reveal:** Walk through the state machine: `setSelectedAnswer(index)` → `setShowResult(true)` → colors + explanation render → "Next" clicked → `setCurrentQuestion(2)` → `setSelectedAnswer(null)` → `setShowResult(false)` → fresh question appears.

---

### 🗳️ POLL 3 — Optimistic UI
> ⏱️ **WHEN TO SHARE:** After Slide 5 (Chat Page — Optimistic UI). About 55 minutes in.

**Question:** In our ChatPage, a user clicks "Send". Their message appears IMMEDIATELY in the chat BEFORE the AI responds. This pattern is called Optimistic UI. What is the main benefit?
*(Single Choice)*

- A) It reduces server costs because fewer API calls are made
- B) The app FEELS instant and responsive — users see their action reflected immediately without waiting ✅
- C) It prevents the AI from giving wrong answers by checking the message first
- D) It automatically retries failed messages without the user knowing

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"Without optimistic UI: user clicks send → nothing happens for 1.5 seconds → message + response appear together. With it: message appears instantly, typing dots show, then AI responds. The app feels ALIVE."*

---

### 🗳️ POLL 4 — Role-Based Access
> ⏱️ **WHEN TO SHARE:** After Slide 9 (Admin Pages). About 80 minutes in.

**Question:** A regular user (role: "user") is logged in and types `/admin` in the browser. What happens?
*(Single Choice)*

- A) They see the Admin Dashboard — any logged-in user can access admin pages
- B) The page shows a blank white screen with no error
- C) `AdminRoute` checks `user.role`, finds it's not 'admin', and redirects to `/dashboard` ✅
- D) The backend blocks the page request and returns a 403 Forbidden error

> ✅ **Correct Answer: C**
> 💬 **After reveal:** *"Both frontend AND backend have their own guards. `AdminRoute` stops the UI from rendering. Backend `admin` middleware stops any API call from succeeding. Both layers protect admin features."*

---
---

## 📅 MASTERCLASS 4 — Backend & REST APIs
### *"Power Behind the Scenes"*

---

### 🗳️ POLL 1 — Node.js Fundamentals
> ⏱️ **WHEN TO SHARE:** After Slide 2 (Node.js section). About 15 minutes in.

**Question:** Before Node.js was created in 2009, JavaScript could only run in ONE place. Where?
*(Single Choice)*

- A) On a server, processing database requests
- B) Inside the browser — it was exclusively a client-side language ✅
- C) Inside mobile apps as the native runtime
- D) In terminal scripts on Linux servers

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"Node.js was revolutionary. One language — JavaScript — suddenly ran EVERYWHERE: in the browser, on the server, in build tools, in scripts. This is why the MERN stack is all JavaScript. Without Node.js, we'd need Python or Java for the backend."*

---

### 🗳️ POLL 2 — Middleware Pipeline
> ⏱️ **WHEN TO SHARE:** After Slide 5 (Middleware section). About 50 minutes in.

**Question:** A request arrives at our Express server. `express.json()` middleware runs but `protect()` middleware does NOT run on this route. What is the most likely reason?
*(Single Choice)*

- A) The request body contains invalid JSON
- B) This is a public route (like `POST /api/auth/register`) — `protect()` is only added to protected routes ✅
- C) The server hasn't been restarted after adding `protect()`
- D) `express.json()` and `protect()` cannot run on the same route

> ✅ **Correct Answer: B**
> 💬 **After reveal:** Show the routes file: `router.post('/register', registerUser)` — no protect. vs `router.get('/me', protect, getMe)` — has protect. Global middleware runs on everything; route-specific middleware only on what you explicitly add it to.

---

### 🗳️ POLL 3 — HTTP Methods
> ⏱️ **WHEN TO SHARE:** After Slide 7 (Routes: Defining the API). About 65 minutes in.

**Question:** A student marks a roadmap step as complete. Which HTTP method should the frontend use?
*(Single Choice)*

- A) `GET /api/progress/step` — to retrieve the current step status
- B) `POST /api/progress/step` — to create a new step completion record
- C) `PUT /api/progress/step` — to update an existing progress record ✅
- D) `DELETE /api/progress/step` — to remove the incomplete step

> ✅ **Correct Answer: C**
> 💬 **After reveal:** *"The step already EXISTS in the Progress document — we're updating the `completedSteps` array, not creating a new record. POST means 'create something new'. PUT means 'update something that already exists'."*

---

### 🗳️ POLL 4 — JWT Security
> ⏱️ **WHEN TO SHARE:** After Slide 10 (JWT Authentication Flow). About 85 minutes in.

**Question:** Why do we store the JWT in an HTTP-only cookie instead of `localStorage`?
*(Single Choice)*

- A) HTTP-only cookies are faster to read than localStorage
- B) localStorage has a 5MB size limit but JWTs can be larger
- C) HTTP-only cookies cannot be accessed by JavaScript — they're invisible to XSS attacks that try to steal tokens ✅
- D) Cookies automatically refresh when they expire; localStorage values don't

> ✅ **Correct Answer: C**
> 💬 **After reveal:** *"XSS = Cross-Site Scripting. Malicious JavaScript injected into a page could do `localStorage.getItem('token')` and steal it. An HTTP-only cookie is INVISIBLE to all JavaScript — even the malicious kind. It's one of the simplest and most effective security improvements you can make."*

---
---

## 📅 MASTERCLASS 5 — MongoDB & AI Integration
### *"Data That Works"*

---

### 🗳️ POLL 1 — Why MongoDB?
> ⏱️ **WHEN TO SHARE:** After Slide 2 (SQL vs NoSQL). About 20 minutes in.

**Question:** In MongoDB, how would you store a user's roadmap with 8 steps?
*(Single Choice)*

- A) Create a separate `steps` table with a foreign key linking back to the `roadmaps` table — like SQL
- B) Embed the steps array directly inside the roadmap document as a nested JSON array ✅
- C) Store each step as a separate collection with no relationship to the roadmap
- D) Store the steps as a comma-separated string in a single `steps` field

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"Steps are ALWAYS needed with the roadmap — they're meaningless alone. Embedding = one query gets everything. In SQL you'd need a JOIN. MongoDB's document model fits our data's natural shape perfectly."*

---

### 🗳️ POLL 2 — Mongoose Basics
> ⏱️ **WHEN TO SHARE:** After Slide 4 (Mongoose). About 35 minutes in.

**Question:** What does Mongoose's schema validation actually prevent?
*(Single Choice)*

- A) SQL injection attacks on the database
- B) Saving a document to MongoDB that is missing required fields or has wrong data types ✅
- C) Duplicate database connections being opened simultaneously
- D) Users from accessing the API without a valid JWT token

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"Without Mongoose, MongoDB accepts ANYTHING you throw at it — you could save `{ banana: true }` to the users collection and it would work. Mongoose's schema defines the contract and validates BEFORE the data ever reaches the database."*

---

### 🗳️ POLL 3 — Embedded vs Referenced
> ⏱️ **WHEN TO SHARE:** After Slide 7 (Roadmap Model). About 60 minutes in.

**Question:** We embed steps INSIDE the Roadmap document instead of creating a separate `Steps` collection. Which reason best explains this design decision?
*(Single Choice)*

- A) Embedded documents are always faster to save than referenced documents
- B) Steps are always loaded WITH the roadmap and are meaningless without it — embedding avoids a second database query ✅
- C) MongoDB has a strict limit on the number of collections allowed per database
- D) The steps would take too much storage space in a separate collection

> ✅ **Correct Answer: B**
> 💬 **After reveal:** Golden rule to write down: *"Embed if always fetched together. Reference if queried independently."* Steps = always with roadmap → embed. User ↔ Roadmap = sometimes fetch user alone → reference.

---

### 🗳️ POLL 4 — Groq AI Integration
> ⏱️ **WHEN TO SHARE:** After Slide 13 (Groq AI Service Layer). About 85 minutes in.

**Question:** The Groq API is "stateless" — every call starts fresh with no memory. How does our AI Chat remember previous messages in a conversation?
*(Single Choice)*

- A) Groq automatically stores conversation history in its own database
- B) The frontend sends the entire conversation history with every new message via Axios
- C) We store the entire chat history in MongoDB and send ALL previous messages to Groq with every new API call ✅
- D) JWT tokens contain the conversation history so Groq can decode it

> ✅ **Correct Answer: C**
> 💬 **After reveal:** Show the code pattern: fetch history from MongoDB → spread `...messages` + new message → send the ENTIRE array to Groq every time. Groq sees the full conversation → gives a contextual answer. Without this, every reply would be completely disconnected.

---
---

## 📅 MASTERCLASS 6 — Full-Stack Wiring
### *"Connecting the Dots"*

---

### 🗳️ POLL 1 — How Frontend & Backend Communicate
> ⏱️ **WHEN TO SHARE:** After Slide 2 (Communication Pattern). About 10 minutes in.

**Question:** A user clicks "Login" on the React app. Put these events in the CORRECT order:
*(Single Choice)*

- A) Axios sends HTTP request → Express validates → JWT cookie set → React updates state → User sees dashboard ✅
- B) React updates state → Axios sends request → JWT is created → MongoDB is queried → User sees dashboard
- C) MongoDB stores the token → Express sends it to React → Axios receives it → Dashboard renders
- D) JWT is created in React → Sent to Express for verification → MongoDB confirms → Dashboard renders

> ✅ **Correct Answer: A**
> 💬 **After reveal:** Walk through the 10-step flow from the slides together. Say: *"Every feature you build for the rest of your career as a full-stack developer follows this exact same pattern. Internalize it."*

---

### 🗳️ POLL 2 — Axios Interceptors
> ⏱️ **WHEN TO SHARE:** After Slide 3 (Axios setup). About 25 minutes in.

**Question:** Our Axios instance has a response interceptor that redirects to `/login` on a 401 error. Without this interceptor, what would we need to do?
*(Single Choice)*

- A) Nothing — browsers automatically redirect to login when a 401 is received
- B) Add a 401 check inside EVERY hook and component that makes an API call ✅
- C) Set a global variable `isLoggedIn = false` and check it on every page
- D) The JWT cookie would automatically handle the redirect

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"Count the API calls in our app — useAuth, useRoadmap, useChat, useProgress, Projects, Resources, Profile, Admin — that's 15+ places. One interceptor handles ALL of them. This is the DRY principle: Don't Repeat Yourself."*

---

### 🗳️ POLL 3 — Custom Hooks
> ⏱️ **WHEN TO SHARE:** After Slide 6 (useRoadmap hook). About 55 minutes in.

**Question:** `RoadmapPage` uses `const { roadmap, markStep, getLesson } = useRoadmap()`. What is the main benefit of this pattern?
*(Single Choice)*

- A) It makes the code run faster because hooks are compiled by React
- B) `RoadmapPage` stays clean with only JSX — all the loading/error/API logic is hidden inside the hook ✅
- C) It prevents other pages from accidentally accessing the roadmap data
- D) Custom hooks are required by React Router to work with protected routes

> ✅ **Correct Answer: B**
> 💬 **After reveal:** Show the before/after from the slides. Without hooks: 150+ lines of state + API code mixed in the component. With hooks: 3 lines to get all data, and the rest is pure JSX. This is the Single Responsibility Principle.

---

### 🗳️ POLL 4 — End-to-End Wiring
> ⏱️ **WHEN TO SHARE:** After Slide 9 (Wiring Remaining Pages). About 80 minutes in.

**Question:** After MC6 wiring, a student completes onboarding. Their profile + roadmap now exist in MongoDB. The NEXT time they open the app, how does React know to show their roadmap data?
*(Single Choice)*

- A) React saves the roadmap to `localStorage` during onboarding and reads it on startup
- B) On app load, `AuthContext` verifies the JWT cookie → `useRoadmap` calls `GET /api/roadmaps/me` → backend reads MongoDB → data returned to React ✅
- C) The browser caches the roadmap automatically after the first API call
- D) The roadmap is embedded inside the JWT token and decoded on every page load

> ✅ **Correct Answer: B**
> 💬 **After reveal:** Trace the full chain: app loads → verifyAuth confirms JWT → user state set → RoadmapPage mounts → useRoadmap's useEffect fires → GET request → backend reads MongoDB → JSON returned → React state updated → roadmap renders. THAT is full-stack.

---
---

## 📅 MASTERCLASS 7 — Deployment
### *"From Code to Cloud"*

---

### 🗳️ POLL 1 — Why Two Platforms?
> ⏱️ **WHEN TO SHARE:** After Slide 2 (Deployment Architecture). About 15 minutes in.

**Question:** We deploy the React frontend to Vercel and the Node.js backend to Render. Why don't we deploy both to the same platform?
*(Single Choice)*

- A) It's a legal requirement — frontends and backends must be on different servers
- B) Vercel specializes in static/CDN hosting for frontends; Render specializes in running persistent Node.js server processes — each is optimized for its use case ✅
- C) They can't communicate if they're on the same server
- D) Deploying to different platforms saves money compared to using one platform

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"Vercel serves static files from 100+ global CDN locations in milliseconds. Render keeps a Node.js process running 24/7. These are fundamentally different operations. You wouldn't use a file cabinet to run a kitchen, or a kitchen to store files."*

---

### 🗳️ POLL 2 — The vercel.json Mystery
> ⏱️ **WHEN TO SHARE:** After Slide 4 (Preparing Frontend for Deployment). About 35 minutes in.

**Question:** A user bookmarks `https://yourapp.vercel.app/roadmap` and visits it later. WITHOUT `vercel.json`, what happens?
*(Single Choice)*

- A) React Router reads the URL and renders the Roadmap page correctly
- B) Vercel looks for `dist/roadmap.html` — that file doesn't exist — returns a 404 Not Found error ✅
- C) The user is automatically redirected to the homepage `/`
- D) Vercel prompts the user to log in before accessing the page

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"The entire React app lives in ONE file: `dist/index.html`. Vercel doesn't know this. `vercel.json` tells it: 'No matter what URL arrives, serve index.html and let React Router sort it out.' Without it, every direct URL except `/` returns 404 in production."*

---

### 🗳️ POLL 3 — CORS Enforcement
> ⏱️ **WHEN TO SHARE:** After Slide 5 (CORS Challenge). About 55 minutes in.

**Question:** You get a CORS error in the browser when the frontend calls the backend. Your friend opens the same API URL in Postman and it works perfectly. Why?
*(Single Choice)*

- A) Postman uses a different port that is whitelisted in CORS
- B) CORS is enforced by the BROWSER, not the server — Postman and curl bypass it because they're not browsers ✅
- C) The API key is automatically included in Postman requests but not browser requests
- D) Postman caches the CORS approval from a previous successful request

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"CORS is 100% a browser security feature. The SERVER just declares which origins are allowed — the BROWSER reads that declaration and decides whether to let JavaScript see the response. Postman, curl, and server-to-server calls are never blocked by CORS. Period."*

---

### 🗳️ POLL 4 — Cross-Domain Cookies
> ⏱️ **WHEN TO SHARE:** After Slide 6 (Cross-Domain Cookie Problem). About 70 minutes in.

**Question:** After deploying, login appears to work but every page refresh shows the user as logged out. The JWT cookie EXISTS in DevTools but is being ignored. Which setting is most likely the culprit?
*(Single Choice)*

- A) The `JWT_SECRET` on Render is different from the one used during development
- B) Axios is missing `withCredentials: true` — so the browser never sends the cookie with cross-domain API requests ✅
- C) The `VITE_API_URL` points to the wrong Render URL
- D) MongoDB Atlas is not allowing connections from Render's IP address

> ✅ **Correct Answer: B**
> 💬 **After reveal:** *"The cookie exists but Axios is not sending it with requests. Check: DevTools → Network → any API request → Request Headers → look for the `Cookie` header. If it's missing, `withCredentials: true` is your fix. All 3 conditions must be true: withCredentials on Axios + sameSite: none + secure: true on the cookie."*

---
---

## 📊 POLL SCHEDULE SUMMARY

| Session | Poll 1 | Poll 2 | Poll 3 | Poll 4 |
|---------|--------|--------|--------|--------|
| **Day 0** | Ice breaker (0 min) | Tech awareness (10 min) | MERN stack check (30 min) | Setup readiness (end) |
| **MC 1** | JSX rules (25 min) | Props vs State (45 min) | useState toggle (60 min) | React Router (75 min) |
| **MC 2** | CSS variables (15 min) | Context vs Drilling (30 min) | Protected Routes (65 min) | useEffect timing (85 min) |
| **MC 3** | Dashboard state (15 min) | Quiz state machine (40 min) | Optimistic UI (55 min) | Role-based access (80 min) |
| **MC 4** | Node.js history (15 min) | Middleware pipeline (50 min) | HTTP methods (65 min) | JWT security (85 min) |
| **MC 5** | Why MongoDB (20 min) | Mongoose basics (35 min) | Embedded vs Ref (60 min) | Groq + stateless AI (85 min) |
| **MC 6** | Login flow order (10 min) | Axios interceptors (25 min) | Custom hooks (55 min) | End-to-end wiring (80 min) |
| **MC 7** | Vercel vs Render (15 min) | vercel.json 404 (35 min) | CORS enforcement (55 min) | Cross-domain cookies (70 min) |

---

*SkillPath AI · SDG 4: Quality Education · MERN + Groq AI · 7-Masterclass Series*
*Total Polls: 32 · Single Choice: 30 · Multiple Choice: 2*
