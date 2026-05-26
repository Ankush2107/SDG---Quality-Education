# 🚀 Masterclass 7: From Code to Cloud
### Deployment — Render, Vercel, CORS, Cross-Domain Cookies & Going Live
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — The Final Step

### Where We Are After 6 Masterclasses

After 6 masterclasses, SkillPath AI is a **complete, fully-integrated, production-quality application**:
- ✅ **Frontend (React)** — 14 pages, complete UI, wired to real backend APIs
- ✅ **Backend (Node/Express)** — REST API, JWT auth, all routes and controllers
- ✅ **Database (MongoDB Atlas)** — Already live in the cloud (we connected in MC5!)
- ✅ **AI Integration** — Groq/LLaMA 3.3 70B for roadmaps, chat, lessons, quizzes

**But there's one critical problem:** It only works on YOUR computer. The URL is `http://localhost:5001`. If you close your laptop, the app goes offline. Nobody else can access it.

### The Goal of MC7: Go Live
By the end of this masterclass, SkillPath AI will have a **real URL** that anyone in the world can visit 24/7 — on their phone, on their friend's computer, in another country.

### Three Deployments Needed

1. **MongoDB Atlas** — ✅ Already done in MC5! The database has always been in the cloud.
2. **Backend → Render** — Deploy the Node.js + Express server to Render's cloud platform
3. **Frontend → Vercel** — Deploy the React + Vite app to Vercel's global network

### Real World Restaurant Analogy
You've been cooking in your home kitchen (local development). You have a perfect recipe and the food tastes amazing. Now you're opening a real restaurant (deployment):
- 🏭 The **food warehouse** (MongoDB Atlas) has been running all along — suppliers have always been delivering ingredients
- 👨‍🍳 You need to rent a **commercial kitchen** (Render) with professional equipment where your chefs (Express server) work full-time
- 🏪 You need to open a **storefront** (Vercel) with a proper address where customers can walk in and see your menu (React app) at any time

---

## 📌 Slide 2 — Understanding the Deployment Architecture

### Before Deployment (Local Development)
```
Your Computer
├── Terminal 1: npm run dev  (React on port 5173)
├── Terminal 2: npm run dev  (Express on port 5001)
└── Both communicate via http://localhost:*
    (Only YOU can access this)
```

### After Deployment (Production)
```
Internet (Global)
├── Vercel Servers (100+ cities worldwide)
│   └── React app → https://skillpath-ai.vercel.app
│
├── Render Servers (United States)
│   └── Express API → https://skillpath-ai-backend.onrender.com
│       └── Connected to MongoDB Atlas (already cloud-hosted)
│
└── Any user, on any device, anywhere in the world can access both
```

### Why Two Different Platforms?

**Vercel** specializes in **frontend/static deployments**:
- Distributes files to 100+ locations globally (CDN — Content Delivery Network)
- Files are served from the nearest location to each user (fast loading)
- Free for static sites and React apps
- One-click GitHub integration

**Render** specializes in **backend server deployments**:
- Runs Node.js processes continuously (not just serving files)
- Manages environment variables, server scaling, and logs
- Free tier available (with a limitation we'll discuss)
- Automatic deployments from GitHub

---

## 📌 Slide 3 — Preparing the Backend for Deployment

### File: `backend/package.json` — Node Version Specification
Before deploying, we add one important field to `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```
This tells Render which version of Node.js to use. Without this, Render might use an outdated version that doesn't support modern JavaScript features (like ES Modules, `await` at the top level, etc.).

### Ensure the Port is Dynamic
In `server.js`, the port must come from the environment:
```javascript
// ✅ Correct — reads PORT from environment
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**Why?** Render assigns a random port to each service — it's never 5001 in production. Render injects the correct `PORT` via environment variable. If you hardcode `5001`, Render's load balancer can't reach your server and the deployment fails.

### Verify the `start` Script
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
Render uses `npm start` (not `npm run dev`) to launch production servers. Ensure this script exists and runs correctly.

### Step-by-Step: Deploy to Render

1. Go to [render.com](https://render.com) → Sign up with your GitHub account
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"** → Select your `SDG-Quality-Education` repository
4. Configure the service:
   - **Name:** `skillpath-backend` (or your choice)
   - **Root Directory:** `backend` ← Critical! Tells Render where your backend code lives
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (for our purposes)
5. **Add Environment Variables** (the same as your local `.env`):

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A long, random string (generate a new one for production!) |
| `GROQ_API_KEY` | Your Groq API key |
| `CLIENT_URL` | Leave blank for now (add after Vercel deployment) |

6. Click **"Create Web Service"**
7. Watch the build logs — you'll see `npm install` running, then "Server running on port ..."
8. **Copy your Render URL** (e.g., `https://skillpath-backend.onrender.com`)

### Important: Free Tier Behavior
Render's free tier **spins the server down after 15 minutes of inactivity**. The first request after sleeping takes 30–60 seconds to wake up the server. This is completely normal for the free tier — it's not a bug. Paid plans ($7/month) keep the server always awake.

---

## 📌 Slide 4 — Preparing the Frontend for Deployment

### File: `frontend/vercel.json`
This is a critical configuration file that must exist before deploying to Vercel:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Why This File Exists: The SPA Routing Problem

Vercel hosts static files. When you build the React app with `npm run build`, it generates:
```
frontend/dist/
├── index.html          ← The ONE HTML file for the entire app
├── assets/
│   ├── index-abc123.js ← Compiled JavaScript bundle
│   └── index-abc123.css ← Compiled CSS
```

When a user visits `https://your-app.vercel.app/dashboard`:
- **Without `vercel.json`:** Vercel looks for `dist/dashboard.html` → File doesn't exist → **404 Not Found**
- **With `vercel.json`:** Vercel reads the rewrite rule → Always serves `dist/index.html` → React Router reads `/dashboard` from the URL → Renders `DashboardPage` ✅

The `vercel.json` rule essentially says: **"No matter what URL someone requests, serve `index.html`. Let React Router sort out the rest."**

### File: `frontend/.env.production` (or set on Vercel Dashboard)
```
VITE_API_URL=https://skillpath-backend.onrender.com/api
```

This tells Axios where to send all API requests in production. It must point to your Render backend URL + `/api`.

### Step-by-Step: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with your GitHub account
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your `SDG-Quality-Education` repository
4. Configure the project:
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `frontend` ← Critical! Must point to the frontend subfolder
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Add Environment Variables:**

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://skillpath-backend.onrender.com/api` |

6. Click **"Deploy"**
7. Wait for the build (usually 1–2 minutes)
8. **Copy your Vercel URL** (e.g., `https://sdg-quality-education.vercel.app`)

---

## 📌 Slide 5 — The CORS Challenge: Connecting Two Different Domains

### Definition
**CORS** (Cross-Origin Resource Sharing) is a browser security mechanism that **blocks web pages from making requests to a different domain** than the one they came from — unless the server explicitly allows it.

### The Problem
After deployment:
- Frontend URL: `https://sdg-quality-education.vercel.app`
- Backend URL: `https://skillpath-backend.onrender.com`

These are **different domains**. By default, the browser blocks any request from the Vercel domain to the Render domain, with an error like:
```
Access to XMLHttpRequest at 'https://skillpath-backend.onrender.com/api/auth/login'
from origin 'https://sdg-quality-education.vercel.app' has been blocked by CORS policy.
```

### Who Enforces CORS?
**The browser** enforces CORS — NOT the server. The server just **declares** which origins are allowed. The browser reads this declaration and decides whether to allow the JavaScript on the page to access the response.

This is why CORS only affects browser JavaScript. A server making direct HTTP requests to another server (curl, Postman, Thunder Client) is never blocked by CORS.

### The Fix in `backend/server.js`
```javascript
app.use(cors({
  origin: function(origin, callback) {
    // Strip trailing slashes (a common gotcha!)
    const normalize = (url) => url?.replace(/\/$/, '');

    const allowedOrigins = [
      normalize(process.env.CLIENT_URL),
      'http://localhost:5173',   // Local development
      'http://localhost:3000',   // Alternative local port
    ].filter(Boolean);           // Remove any empty values

    const requestOrigin = normalize(origin);

    if (!origin || allowedOrigins.includes(requestOrigin)) {
      callback(null, true);   // ✅ Allow this request
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true,   // ESSENTIAL for cookies to work cross-origin
}));
```

### Update `CLIENT_URL` on Render
Now that you have the Vercel URL, go back to Render → Your service → Environment:
- `CLIENT_URL` → `https://sdg-quality-education.vercel.app` ← No trailing slash!

After saving, Render automatically redeploys the service with the new environment variable.

### The Trailing Slash Problem: A Real Production Bug
`https://skillpath.vercel.app` ≠ `https://skillpath.vercel.app/`

These look identical to humans but are technically different strings. If your `CLIENT_URL` has a trailing slash and the browser sends the origin without one (or vice versa), CORS silently fails — every API call is blocked. Our `normalize()` function strips trailing slashes before comparing.

---

## 📌 Slide 6 — The Cross-Domain Cookie Problem

### Why Cookies are Harder in Production
In local development, both the frontend (`localhost:5173`) and backend (`localhost:5001`) are on the same `localhost` domain. Cookies set by `localhost:5001` are automatically sent with requests to `localhost:5001`.

In production:
- Frontend: `sdg-quality-education.vercel.app` (Vercel's domain)
- Backend: `skillpath-backend.onrender.com` (Render's domain)

These are **completely different domains**. By default, browsers do NOT send cookies across different domains (this is the Same-Site cookie policy).

### The Solution: Three Settings Must ALL Be True

For cross-domain cookies to work, THREE conditions must all be met simultaneously:

| Setting | Where | Why It's Needed |
|---------|-------|----------------|
| `withCredentials: true` | Frontend Axios | Tells browser to send/accept cookies cross-origin |
| `sameSite: 'none'` | Backend cookie | Explicitly allows the cookie to be sent cross-site |
| `secure: true` | Backend cookie | Required by ALL browsers when `sameSite: 'none'` is set (cookies must be HTTPS-only) |

All three must be configured. If any one is missing, authentication breaks in production.

### The Cookie Configuration in `backend/utils/generateToken.js`
```javascript
export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

  res.cookie('jwt', token, {
    httpOnly: true,   // JS cannot read this cookie (XSS protection)
    
    // In PRODUCTION: secure: true + sameSite: 'none' enables cross-domain cookies
    // In DEVELOPMENT: secure: false + sameSite: 'strict' (same domain, no HTTPS needed)
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    
    maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
  });
};
```

### Debugging Cross-Domain Cookie Issues
If after deployment, login appears to succeed but then every page shows the user as logged out:
1. Open Chrome DevTools → Application → Cookies
2. Check if the `jwt` cookie exists after login
3. If it exists but gets ignored: check that Axios has `withCredentials: true`
4. If it doesn't exist: check that `secure: true` and `sameSite: 'none'` are set in the backend
5. Check that the backend is HTTPS (Render provides HTTPS by default on `.onrender.com` URLs)

---

## 📌 Slide 7 — Environment Variables: Local vs Production

### The Environment Variable Map

| Variable | Local (`.env`) | Render (backend) | Vercel (frontend) |
|----------|---------------|------------------|------------------|
| `NODE_ENV` | `development` | `production` | — |
| `MONGO_URI` | Your Atlas URI | Same Atlas URI | — |
| `JWT_SECRET` | Any string | New long random string | — |
| `GROQ_API_KEY` | Your key | Same key | — |
| `CLIENT_URL` | `http://localhost:5173` | `https://your-app.vercel.app` | — |
| `VITE_API_URL` | `http://localhost:5001/api` | — | `https://your-backend.onrender.com/api` |

### Security Upgrade for Production
When deploying to production, generate a **new, stronger JWT_SECRET**:
```bash
# Run in Node.js REPL:
require('crypto').randomBytes(64).toString('hex')
# Generates a 128-character hex string — much stronger than any manual secret
```

Use this new secret in Render. Your old development tokens will be instantly invalidated (which is good — no development tokens can be used in production).

### Why `.env` Files Are Never Committed to Git
```
Your local .env file contains:
MONGO_URI=mongodb+srv://ankush:MyActualPassword@cluster0.mongodb.net/skillpath
JWT_SECRET=MyDevelopmentSecret
GROQ_API_KEY=gsk_RealApiKeyHere123

If this is committed to GitHub:
→ Anyone who searches GitHub can find it
→ They can connect directly to YOUR MongoDB database
→ They can delete all user data, extract emails, crash the service
→ Groq bills YOUR credit card for their API usage
→ They can forge JWT tokens for any user account
```

The `.gitignore` file contains `.env` so it's NEVER accidentally committed.

---

## 📌 Slide 8 — MongoDB Atlas: Production Database Configuration

### What Was Already Set Up in MC5
- Cluster created on MongoDB Atlas
- Database user created with read/write permissions
- IP whitelist: your local IP was added during development

### What Needs to Change for Production

**Step 1: Allow Render's IP Addresses**
Render's servers use dynamic IP addresses — they change. The easiest solution for development/student projects:
1. Go to MongoDB Atlas → Security → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" → This adds `0.0.0.0/0`
4. Click Confirm

⚠️ **Security note:** `0.0.0.0/0` allows connections from any IP. For production projects with real users, you would whitelist only Render's specific IP ranges. For our student project, this is acceptable.

**Step 2: Verify the Connection String Format**
Your `MONGO_URI` should look like:
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/skillpath?retryWrites=true&w=majority
```
- Replace `username` and `password` with your Atlas database user credentials
- Replace `cluster0.abc123` with your actual cluster hostname
- Replace `skillpath` with your database name

---

## 📌 Slide 9 — End-to-End Testing Checklist

After both deployments are live, run through every feature systematically on the **live URLs**:

### Public Features (Not Logged In)
- [ ] Visit the live Vercel URL — landing page loads correctly
- [ ] Navigate to `/about` — no 404 error
- [ ] Navigate to `/login` and `/register` — forms appear
- [ ] Toggle dark/light mode — persists on refresh
- [ ] Navigate directly to `/dashboard` — redirected to `/login`

### Authentication Flow
- [ ] Register a new account on the **live site** → Check MongoDB Atlas → New user document appeared
- [ ] Login with that account → Redirected to dashboard
- [ ] Refresh the page while logged in → Still logged in
- [ ] Close browser, reopen → Still logged in (30-day cookie)
- [ ] Logout → Redirected to landing page
- [ ] Try to visit `/dashboard` while logged out → Redirected to login

### Core Features
- [ ] Complete the 3-step onboarding → Check Atlas for Profile and Roadmap documents
- [ ] View the roadmap → All AI-generated steps appear with correct titles
- [ ] Mark a step as complete → Progress bar updates, percentage updates
- [ ] Uncheck the step → Progress goes back down
- [ ] Click "Learn Now" → AI lesson generates in ~2 seconds and appears in modal
- [ ] Click "Test Knowledge" → Quiz with 3 questions appears and works
- [ ] Pass the quiz → "Mark Complete" button appears → clicking marks the step
- [ ] Send a chat message → AI responds (may be slow if Render was asleep)
- [ ] Close and reopen chat → Previous messages still there
- [ ] Visit Projects → 3 AI recommendations appear
- [ ] Save a project → Appears in Saved Projects section
- [ ] Browse Resources → Cards load with search and filter working
- [ ] Edit Profile → Changes save correctly

### Admin Features
- [ ] Set `role: "admin"` directly in MongoDB Atlas for a test user
- [ ] Login as admin → Admin section appears in sidebar
- [ ] Visit `/admin` → Platform stats show (real numbers)
- [ ] Visit `/admin/users` → All users listed
- [ ] Ban a test user → `isActive: false` in Atlas
- [ ] Unban → `isActive: true`
- [ ] Visit `/admin/resources` → Add, edit, delete a resource

---

## 📌 Slide 10 — The Complete Technology Stack: Final Overview

### Everything Used to Build SkillPath AI

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend Framework** | React | 19 | UI component library |
| **Build Tool** | Vite | 5.x | Development server + production bundler |
| **Routing** | React Router | v7 | Client-side navigation |
| **HTTP Client** | Axios | 1.x | API calls from frontend to backend |
| **Notifications** | React Hot Toast | 2.x | Success/error toast messages |
| **Icons** | React Icons | 5.x | Vector icon library |
| **Markdown Rendering** | React Markdown | 9.x | Render AI lesson content |
| **Backend Runtime** | Node.js | 18+ | JavaScript server runtime |
| **Web Framework** | Express.js | 4.x | REST API routing + middleware |
| **Authentication** | JWT + bcryptjs | — | Secure session tokens + password hashing |
| **Database** | MongoDB Atlas | — | Cloud NoSQL database |
| **ODM** | Mongoose | 7.x | Schema modeling for MongoDB |
| **AI Provider** | Groq API | — | LLaMA 3.3 70B model access |
| **Security** | Helmet, CORS | — | HTTP headers + origin control |
| **Logging** | Morgan | 1.x | HTTP request logging |
| **Frontend Hosting** | Vercel | — | Global CDN for static sites |
| **Backend Hosting** | Render | — | Node.js cloud server |
| **Database Cloud** | MongoDB Atlas | — | Managed cloud database |

---

## 📌 Slide 11 — The Complete Application at a Glance

### 14 Pages, Their Routes, and Access Levels

| Page | Route | Access Level |
|------|-------|-------------|
| Landing | `/` | 🌐 Public |
| About | `/about` | 🌐 Public |
| Login | `/login` | 🌐 Public |
| Register | `/register` | 🌐 Public |
| Onboarding | `/onboarding` | 🔒 Authenticated |
| Dashboard | `/dashboard` | 🔒 Authenticated |
| Roadmap | `/roadmap` | 🔒 Authenticated |
| AI Chat | `/chat` | 🔒 Authenticated |
| Projects | `/projects` | 🔒 Authenticated |
| Resources | `/resources` | 🔒 Authenticated |
| Profile | `/profile` | 🔒 Authenticated |
| Admin Dashboard | `/admin` | 👑 Admin Only |
| Admin Users | `/admin/users` | 👑 Admin Only |
| Admin Resources | `/admin/resources` | 👑 Admin Only |

### The Complete Request Journey (Final Summary)

```
Student types "What is useState?" in the AI Chat:

1. React (ChatPage.jsx)        — User types in input, clicks Send
2. useChat hook                — Optimistically adds user's message to screen
3. Axios                       — POST https://your-backend.onrender.com/api/chat
                                  Headers: Cookie: jwt=eyJhbG...
                                  Body: { "message": "What is useState?" }
4. Render (Express server)     — Receives the request
5. CORS middleware             — Validates Origin header against CLIENT_URL ✅
6. express.json()              — Parses JSON body → req.body.message
7. cookieParser()              — Parses Cookie header → req.cookies.jwt
8. protect() middleware        — jwt.verify() → User.findById() → req.user set
9. chatController              — ChatHistory.findOne() fetches conversation history
10. aiService.chatWithAI()     — Sends full history + new message to Groq API
11. Groq LLaMA 3.3 70B        — Generates contextual response to "What is useState?"
12. chatController             — ChatHistory.save() persists the new messages
13. Express                    — res.json({ message: "useState is a React Hook..." })
14. Axios                      — Receives the JSON response
15. useChat hook               — setMessages([...messages, aiMessage]) + setIsTyping(false)
16. React (ChatPage.jsx)       — Re-renders with the new AI message in the chat
17. Student sees               — The AI's explanation appears in the chat window ✅
```

---

## 📌 Slide 12 — Future Scope: What Can Be Added Next

After completing all 7 masterclasses, students who want to go further can extend SkillPath AI:

1. **Email Notifications** — Send a welcome email on registration using Nodemailer + Gmail SMTP
2. **"Forgot Password" Flow** — Email-based password reset using secure, expiring reset tokens
3. **OAuth Login** — "Login with Google" or "Login with GitHub" using Passport.js
4. **Roadmap Export** — Generate a downloadable PDF of the learning roadmap
5. **Real-Time Chat Streaming** — Stream AI responses word-by-word using Server-Sent Events (SSE)
6. **Resource Ratings** — Star rating system with average score display
7. **Shareable Roadmap Link** — Public read-only link for your learning roadmap
8. **Mobile App** — Convert the React web app to React Native for iOS/Android
9. **Community Forum** — Students post questions visible to other students
10. **Gamification** — XP points, levels, badges, and leaderboards

---

## 📌 Slide 13 — Homework for Students: Build Your Own Version

Using everything learned in the 7 masterclasses, every student should:

1. **Fork the repository** and create their own version with a different SDG theme:
   - **SDG 3 — Good Health:** A health education and habit tracking platform
   - **SDG 8 — Decent Work:** A career skills roadmap platform
   - **SDG 13 — Climate Action:** An environmental literacy app

2. **Customize the design** — Change the color palette (update CSS variables in `index.css`), typography (different Google Font), and branding (new name, logo)

3. **Add one meaningful new feature** — Something not in the original SkillPath AI:
   - A peer learning forum
   - A weekly study planner
   - A skill assessment test
   - A mentorship connection feature

4. **Deploy their own version** — Set up their own MongoDB Atlas cluster, Render service, and Vercel project

5. **Write a professional README** — Explain what it does, how to set it up locally, screenshots, tech stack, live links, and what they personally learned building it

---

## 📌 Slide 14 — GitHub Final Checkpoint: MC7

### Commit Message
> `MC7: Deployment — Render Backend, Vercel Frontend, CORS Config, Cross-Domain Cookies, Production Environment Variables, vercel.json SPA Routing`

### Tag the Final Release
```bash
git tag -a v1.0.0 -m "SkillPath AI v1.0.0 — Complete MERN Application"
git push origin v1.0.0
```

### What's in the Final Repository

| File | Purpose |
|------|---------|
| `frontend/vercel.json` | SPA routing config for Vercel |
| `frontend/.env.example` | Frontend env variables template |
| `backend/.env.example` | Backend env variables template |
| `backend/package.json` | `"engines": {"node": ">=18.0.0"}` for Render |
| All MC1–MC6 files | Complete application code |
| `README.md` | Project documentation with live links |

### The README Should Include
```markdown
# SkillPath AI — SDG 4: Quality Education

> An AI-powered personalized learning platform addressing the United Nations' 
> Sustainable Development Goal 4 — Quality Education.

## 🌐 Live Demo
- **Frontend:** https://sdg-quality-education.vercel.app
- **Backend API:** https://skillpath-backend.onrender.com/api/health
- **Database:** MongoDB Atlas

## 🛠 Tech Stack
React 19 • Node.js • Express.js • MongoDB • Groq AI (LLaMA 3.3 70B) • JWT

## ⚡ Quick Start
...
```

---

## ✅ By the End of MC7, Students Should Be Able To:

- ✅ Deploy a React + Vite SPA to Vercel with correct routing configuration (`vercel.json`)
- ✅ Deploy a Node.js + Express API to Render with environment variables
- ✅ Configure CORS to allow requests between two different production domains
- ✅ Understand and configure cross-domain cookies (`sameSite: none`, `secure: true`, `withCredentials: true`)
- ✅ Manage environment variables separately for local development vs. production
- ✅ Configure MongoDB Atlas for cloud access from Render's servers
- ✅ Test an entire full-stack application end-to-end in production
- ✅ Explain the complete request lifecycle from browser click to database and back
- ✅ Set up GitHub branches and tags for milestone-based releases
- ✅ Write a professional README and present a production-quality capstone project

---

## 🎮 Two Truths and One Lie — MC7

---

### 🔴 Round 1 — About CORS and the Browser

- 🟢 CORS is enforced by the browser — the browser reads the `Access-Control-Allow-Origin` header from the server and decides whether to let the page's JavaScript access the response.
- 🟢 Without `vercel.json`, any URL on the Vercel deployment except `/` returns a 404 — because Vercel looks for a corresponding HTML file in `/dist` that doesn't exist.
- 🔴 CORS affects ALL types of HTTP requests — including requests made from tools like Postman, Thunder Client, or `curl` on the command line.

> **🎯 The Lie:** CORS is a **browser-only** security mechanism. Postman, Thunder Client, curl, and any server-to-server requests are never blocked by CORS because CORS is enforced by the browser, not the server. Only browsers making cross-origin requests check CORS policies.

---

### 🔴 Round 2 — About Cross-Domain Cookies

- 🟢 For cross-domain cookies to work in production, THREE things must all be true simultaneously: `withCredentials: true` on Axios, `sameSite: 'none'` on the cookie, and `secure: true` on the cookie.
- 🟢 The `secure: true` cookie flag means the cookie will ONLY be sent over HTTPS connections — never over plain HTTP.
- 🔴 The `httpOnly: true` cookie flag prevents the cookie from being sent to cross-domain servers — that's why it's needed for CORS.

> **🎯 The Lie:** `httpOnly: true` prevents **JavaScript on the page from reading** the cookie — it has nothing to do with cross-domain behavior. The cross-domain behavior is controlled by `sameSite` and `secure`. `httpOnly` protects against XSS attacks (malicious scripts can't steal the token), but it doesn't restrict which servers the cookie is sent to.

---

### 🔴 Round 3 — About Vite and Deployment

- 🟢 Vite environment variables (like `VITE_API_URL`) are baked into the JavaScript bundle at build time — changing them on Vercel requires triggering a new build.
- 🟢 Render's free tier spins the server down after 15 minutes of inactivity — the first request after sleep can take 30–60 seconds to respond.
- 🔴 Because MongoDB Atlas is already on the cloud, it doesn't need any configuration changes to work with a Render backend — it will automatically accept connections from Render's servers.

> **🎯 The Lie:** MongoDB Atlas's default configuration only allows connections from specific, whitelisted IP addresses. Render uses dynamic (changing) IP addresses, so you must either whitelist all IPs (`0.0.0.0/0`) or configure Render's static IP feature (paid plan). Without this network access change, Render cannot connect to Atlas and the backend crashes on startup.

---

## 🙋 Mid-Class Questions — MC7

1. **"I've deployed the backend to Render. My frontend is on Vercel. I try to log in on the live site and get a CORS error. Name at least 3 things I should check."**
   *(Expected: 1) Is `CLIENT_URL` on Render set to the exact Vercel URL (no trailing slash)? 2) Is the Render service restarted after adding the env variable? 3) Does `cors()` in server.js use `credentials: true`? 4) Does the Vercel URL use the same origin as what the browser sends? 5) Is `vercel.json` causing any redirect issues?)*

2. **"Without `vercel.json`, what exactly happens when a user bookmarks `https://your-app.vercel.app/roadmap` and visits it later? Walk through exactly what Vercel does."**
   *(Expected: Vercel receives the request for `/roadmap`. It looks in the `dist/` folder for a file called `roadmap.html` or `roadmap/index.html`. No such file exists — only `dist/index.html`. Vercel returns 404. The user sees an error page, not the roadmap. With `vercel.json`, Vercel rewrites ALL paths to `index.html`, and React Router reads the `/roadmap` from the URL and renders the correct page.)*

3. **"The `secure: true` cookie flag means the cookie only works over HTTPS. Our Render backend URL is HTTPS. But during LOCAL development, we use `http://localhost`. Will the app break on localhost?"**
   *(Expected: No — that's why `secure` is conditional: `secure: process.env.NODE_ENV === 'production'`. In development, `NODE_ENV = 'development'` → `secure: false` → works over HTTP localhost. In production, `NODE_ENV = 'production'` → `secure: true` → requires HTTPS, which Render provides automatically.)*

4. **"You've been using the JWT_SECRET `'mySecret123'` during development. Why should you generate a brand new, stronger secret for production? What would happen if someone found your old dev secret?"**
   *(Expected: The dev secret is likely short and weak — easy to brute-force. More critically: if someone has your JWT_SECRET, they can forge any JWT token. They could create a token with any userId they choose and call any API endpoint as that user — full unauthorized access to everyone's accounts. A 128-character hex string is computationally infeasible to guess.)*

5. **"We've built SkillPath AI over 7 masterclasses. If you had to explain the ENTIRE application — from when a student types their roadmap goal to when they see the roadmap on screen — in under 2 minutes, what would you say?"**
   *(Expected: Allow students to attempt this end-to-end explanation. This is the capstone check — it demonstrates deep understanding of the full stack. Use the 14-step data flow from the previous slide as a reference for what a great answer looks like.)*

---

## 🎉 Congratulations — You've Built SkillPath AI!

> "In 7 masterclasses, you went from 'What is React?' to shipping a live, AI-powered, full-stack MERN application that addresses the United Nations' Sustainable Development Goal 4 — Quality Education. 
>
> This is not a tutorial project. This is not a fake demo. This is a production application with a real database, real AI integration, and a real live URL that anyone in the world can visit right now.
>
> You built the frontend. You built the backend. You connected them. You deployed them. You wrote the code that runs in the cloud every time someone generates a learning roadmap.
>
> This is your portfolio. This is your proof of work. This is what you can put on your resume and show at every interview from now on."

### 🌐 Your Live Application
- **Live App:** https://sdg-quality-education.vercel.app
- **Backend API Health:** https://skillpath-backend.onrender.com/api/health
- **GitHub Repository:** 7 milestone branches, clean commit history, professional README

### 📋 File Creation Flow — MC7 (Start Here, Follow This Order!)

> All application code is already written. MC7 is mostly configuration and deployment steps.

---

### 🟢 STEP 1 — Deployment Configuration Files

| Order | File/Action | Why |
|-------|------------|-----|
| 1️⃣ | Create `frontend/vercel.json` | SPA rewrite rule — must exist before deploying to Vercel |
| 2️⃣ | Update `backend/package.json` | Add `"engines": { "node": ">=18.0.0" }` for Render |
| 3️⃣ | Verify `backend/server.js` port | Ensure `process.env.PORT || 5001` — not hardcoded |

---

### 🟡 STEP 2 — MongoDB Atlas Production Setup

| Order | Action | Why |
|-------|--------|-----|
| 4️⃣ | Add `0.0.0.0/0` to Atlas Network Access | Allow connections from Render's dynamic IPs |
| 5️⃣ | Verify connection string format | Ensure MONGO_URI works from outside localhost |

---

### 🟠 STEP 3 — Deploy Backend to Render

| Order | Action | Why |
|-------|--------|-----|
| 6️⃣ | Create new Web Service on Render | Backend hosting |
| 7️⃣ | Set Root Directory: `backend` | Tells Render where to find server code |
| 8️⃣ | Add all environment variables to Render | Secrets for production |
| 9️⃣ | Copy Render URL | Needed for Vercel's `VITE_API_URL` |

---

### 🔵 STEP 4 — Deploy Frontend to Vercel

| Order | Action | Why |
|-------|--------|-----|
| 🔟 | Create new project on Vercel | Frontend hosting |
| 1️⃣1️⃣ | Set Root Directory: `frontend` | Tells Vercel where to find React code |
| 1️⃣2️⃣ | Add `VITE_API_URL` = Render URL + `/api` | Points Axios to the live backend |
| 1️⃣3️⃣ | Deploy and copy Vercel URL | Needed for Render's `CLIENT_URL` |

---

### 🟣 STEP 5 — Cross-Connect Both Services

| Order | Action | Why |
|-------|--------|-----|
| 1️⃣4️⃣ | Update `CLIENT_URL` on Render to Vercel URL | CORS whitelist — allows frontend to call backend |
| 1️⃣5️⃣ | Trigger Render redeploy | New env variable takes effect |

---

### 🔴 STEP 6 — End-to-End Testing

| Order | Action | What to Verify |
|-------|--------|----------------|
| 1️⃣6️⃣ | Visit live Vercel URL | Landing page loads correctly |
| 1️⃣7️⃣ | Register a new account | Check MongoDB Atlas for new user document |
| 1️⃣8️⃣ | Complete onboarding | Check Atlas for Profile + Roadmap documents |
| 1️⃣9️⃣ | Test all features | Follow the full End-to-End Testing Checklist |
| 2️⃣0️⃣ | Push to GitHub + tag v1.0.0 | `git tag -a v1.0.0 -m "Release"` + `git push --tags` |

---

### ✅ MC7 Creation Order — Quick Visual Summary

```
CONFIG FILES:
1. frontend/vercel.json        ← SPA rewrite rule (source: /(.*)  dest: /)
2. backend/package.json        ← Add engines.node: >=18.0.0
3. Verify server.js PORT       ← process.env.PORT || 5001

MONGODB ATLAS:
4. Allow 0.0.0.0/0 in Network Access

RENDER DEPLOYMENT:
5. New Web Service → backend/
6. Add all environment variables
7. Copy Render URL

VERCEL DEPLOYMENT:
8. New Project → frontend/
9. Add VITE_API_URL = [Render URL]/api
10. Deploy and copy Vercel URL

CROSS-CONNECT:
11. Set CLIENT_URL on Render = [Vercel URL]
12. Render redeploys automatically

TEST & SHIP:
13. Run full end-to-end test checklist
14. git tag -a v1.0.0 + git push --tags
```

> 💡 **Golden Rule for MC7:** Deploy the **backend first** — you need the Render URL before you can configure the Vercel frontend's `VITE_API_URL`. Then deploy the frontend and use its Vercel URL to update the backend's `CLIENT_URL`. It's a two-step handshake between the two deployments.
