# ⚙️ Masterclass 4: Power Behind the Scenes
### Backend Fundamentals — Node.js, Express, REST APIs, JWT Authentication & Middleware
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — Welcome to the Backend

### The Shift: From UI to Logic
For the past 3 masterclasses, we built the entire user-facing interface — what users see, click, and interact with. Now we switch perspectives completely. In MC4, we build what users **never see** but always depend on: the **backend**.

### What is a Backend?
The **backend** is the part of a web application that runs on a **server** — not in the user's browser. Users never directly see or interact with it, but every meaningful action they take eventually reaches the backend:
- Clicking "Sign In" → backend validates credentials
- Generating a roadmap → backend calls the AI service
- Marking a step complete → backend updates the database

### The Big Picture

```
┌─────────────┐    HTTP Request     ┌─────────────┐    Mongoose     ┌─────────────┐
│   Frontend  │ ─────────────────→  │   Backend   │ ──────────────→ │  MongoDB    │
│   (React)   │    JSON Response    │  (Node.js + │    Queries      │   (Atlas)   │
│   Vercel    │ ←─────────────────  │   Express)  │ ←────────────── │   Cloud     │
└─────────────┘                     │   Render    │                  └─────────────┘
                                    └──────┬──────┘
                                           │ Groq API Calls
                                    ┌──────▼──────┐
                                    │   Groq AI   │
                                    │  (LLaMA 3.3)│
                                    └─────────────┘
```

### Frontend vs Backend: A Complete Comparison

| Aspect | Frontend (React) | Backend (Node/Express) |
|--------|-----------------|----------------------|
| **Runs on** | User's browser | A server (Render, AWS) |
| **Seen by** | Users | No one (hidden) |
| **Purpose** | Display data, handle interactions | Process requests, manage data, security |
| **Language** | JavaScript (React, JSX) | JavaScript (Node.js) |
| **Communicates via** | Axios HTTP requests | JSON responses + HTTP status codes |
| **Security** | Input validation UI | Password hashing, JWT, rate limiting |
| **Data** | Temporary (state, localStorage) | Persistent (database) |

### Real World Restaurant Analogy
- **Frontend** = The dining room and menu — what customers see and interact with
- **Backend** = The kitchen — where the actual cooking (logic) happens
- **API** = The waiter — carries orders from the dining room to the kitchen and brings food back
- **Database** = The pantry/cold storage — where all ingredients (data) are kept permanently

---

## 📌 Slide 2 — Node.js: JavaScript on the Server

### Definition
**Node.js** is a JavaScript **runtime environment** that allows JavaScript code to run outside the browser — specifically, on servers. Before Node.js (released in 2009), JavaScript was browser-only. Node.js changed the entire industry by enabling full-stack JavaScript.

### What Makes Node.js Special: Non-Blocking I/O

Traditional server languages (PHP, Java) are **synchronous/blocking**: when Server A needs to read from a database, it waits and does nothing else until the database responds. With many users, this creates a queue.

Node.js is **asynchronous/non-blocking**: when it starts a database read, it immediately moves on to process the next request. When the database responds, a callback handles it. This means Node.js can handle thousands of simultaneous connections with very little memory.

```javascript
// Blocking (Python/PHP style) — pseudocode
const user = database.find(userId);  // Waits here doing nothing
console.log(user);                   // Then runs

// Non-blocking (Node.js style)
database.find(userId, (error, user) => {
  console.log(user);  // Runs when DB responds, without blocking
});
// This line runs IMMEDIATELY, without waiting
console.log("This prints before the DB responds!");
```

### npm: The Package Manager
**npm** (Node Package Manager) is the world's largest software registry — like an app store for JavaScript packages. Instead of writing every utility from scratch, we install battle-tested packages:

```bash
npm install express          # Web framework
npm install mongoose         # MongoDB interaction
npm install bcryptjs         # Password hashing
npm install jsonwebtoken     # JWT creation/verification
npm install cookie-parser    # Cookie reading/writing
npm install cors             # Cross-Origin Resource Sharing
npm install helmet           # Security HTTP headers
npm install morgan           # Request logging
npm install dotenv           # Environment variable loading
npm install express-async-errors  # Async error forwarding
```

### File: `backend/package.json`
```json
{
  "name": "skillpath-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.3.1",
    "express-async-errors": "^3.1.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

---
## 🗳️ ZOOM POLL 1 — Node.js Fundamentals
> ⏱️ **Share this poll:** After Slide 2 (Node.js section). Opens up the backend world.

**Question: Before Node.js existed, JavaScript could only run in one place. Where was that?**
*(Single Choice)*

A) On a server, processing database requests
B) Inside the browser — it was exclusively a client-side language
C) Inside mobile apps as the native runtime
D) In terminal scripts on Linux servers

✅ **Correct Answer:** B

> 💬 **Instructor note:** Node.js was released in 2009 and changed everything — suddenly one language (JavaScript) could run both in the browser AND on the server. This is the key reason the MERN stack exists. Without Node.js, we'd need Python or Java for the backend.

---

## 📌 Slide 3 — Express.js: Building the Web Server

### Definition
**Express.js** is a minimal web framework for Node.js. It provides a structured, clean way to:
1. Listen for HTTP requests on a network port
2. Match requests to handler functions (routing)
3. Run processing logic (middleware, controllers)
4. Send back HTTP responses

### Real World Analogy
If Node.js is the raw engine of a car, Express.js is the steering wheel, dashboard, gear shifts, and all the controls — it takes the raw power and makes it practical and drivable.

### File: `backend/server.js`
This is the **entry point** of the entire backend. Everything starts here:

```javascript
import 'express-async-errors';     // Auto-forwards async errors to error handler
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import all route files
import authRoutes from './routes/authRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
// ... all other route files

// Load .env variables into process.env
dotenv.config();

// 1. Connect to MongoDB FIRST
await connectDB();

// 2. Create the Express application
const app = express();

// 3. Apply global middleware
app.use(helmet());                          // Security headers
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());                    // Parse JSON request bodies
app.use(cookieParser());                    // Parse cookies (for JWT)
app.use(morgan('dev'));                     // Log each request to console

// 4. Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/chat', chatRoutes);
// ... all other routes

// 5. Health check endpoint (used to verify the server is running)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SkillPath AI API is running' });
});

// 6. Error handling (MUST come last)
app.use(notFound);
app.use(errorHandler);

// 7. Start listening for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## 📌 Slide 4 — Environment Variables: Keeping Secrets Safe

### The Problem
Your code needs to connect to MongoDB — but the connection string contains a **username and password**. If you hardcode it in `server.js` and push to GitHub, your entire database is exposed to the world.

The same problem applies to API keys (Groq), JWT secrets, and any sensitive configuration.

### Definition
**Environment Variables** are key-value configuration settings stored **outside your code** — they are "injected" into the running application from the operating system or a `.env` file at startup.

### Real World Analogy
Imagine you're baking the same cake recipe for 3 different events — a birthday, a wedding, and a work party. The recipe (code) is identical, but the "flavor" (database URL, API keys) changes per event. Environment variables are the flavor setting — the recipe stays the same code, but the ingredients change per environment.

### File: `backend/.env` (NEVER committed to GitHub)
```
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb+srv://ankush:<password>@cluster0.mongodb.net/skillpath
JWT_SECRET=aVeryLongRandomSecretString123456789!@#
GROQ_API_KEY=gsk_your_groq_api_key_here
CLIENT_URL=http://localhost:5173
```

### File: `backend/.env.example` (COMMITTED to GitHub — safe template)
```
PORT=5001
NODE_ENV=development
MONGO_URI=
JWT_SECRET=
GROQ_API_KEY=
CLIENT_URL=
```

### The `.gitignore` Rule
```
# backend/.gitignore
.env                    # Never ever commit this
node_modules/           # Thousands of files, not needed in Git
```

### Variable Reference Guide

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Which port the server listens on | `5001` |
| `NODE_ENV` | Runtime environment | `development` or `production` |
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret for signing JWT tokens | Random 64-char string |
| `GROQ_API_KEY` | API key for Groq AI service | `gsk_...` |
| `CLIENT_URL` | Frontend URL for CORS whitelist | `http://localhost:5173` |

### How to Access Variables in Code
```javascript
// After dotenv.config() runs in server.js:
const port = process.env.PORT;         // "5001"
const secret = process.env.JWT_SECRET; // The long random string
```

---

## 📌 Slide 5 — Middleware: The Request Pipeline

### Definition
**Middleware** is a function that executes **between** the incoming HTTP request arriving at Express and the final response being sent back. Multiple middleware functions can be chained together. Each one can:
- Inspect/modify the request or response object
- End the request (send a response immediately)
- Call `next()` to pass control to the next middleware in the chain

```javascript
// Middleware function signature:
function myMiddleware(req, res, next) {
  // Do something with the request
  console.log(`${req.method} ${req.url}`);
  
  // Pass control to the next middleware or route handler
  next();
}

// Apply globally:
app.use(myMiddleware);

// Apply to specific route only:
app.get('/api/protected', myMiddleware, controllerFunction);
```

### Real World Analogy: Airport Security
When you fly, you pass through multiple security checkpoints:
1. **Ticket check** — Are you on the flight? (CORS check — is this request from an allowed origin?)
2. **Passport/ID check** — Are you who you say you are? (`protect` middleware — is the JWT valid?)
3. **Baggage X-ray scan** — Are you carrying anything dangerous? (JSON parsing — is the request body valid JSON?)
4. **Executive lounge check** — Are you VIP? (`admin` middleware — does the user have admin role?)
5. **Boarding gate** — You're cleared, get on the plane. (Controller function — process the request)

Each checkpoint runs in sequence. If any fails, you're stopped and sent back.

### Middleware Order in `server.js`
```javascript
// Request arrives ↓
app.use(helmet());        // 1st: Set security headers
app.use(cors(...));       // 2nd: Check if origin is allowed
app.use(express.json());  // 3rd: Parse JSON body (makes req.body available)
app.use(cookieParser());  // 4th: Parse cookies (makes req.cookies available)
app.use(morgan('dev'));   // 5th: Log the request to console

// Routes (each may have route-specific middleware inside)
app.use('/api/auth', authRoutes);
// ...

// Error handlers — ALWAYS LAST
app.use(notFound);
app.use(errorHandler);
// Response leaves ↑
```

### Global Middleware Deep Dive

**`helmet()`:**
Automatically sets over 11 HTTP security headers. For example:
- `X-Frame-Options: DENY` — Prevents your app from being embedded in iframes (stops clickjacking attacks)
- `X-XSS-Protection` — Enables the browser's built-in XSS filter
- `Content-Security-Policy` — Restricts what resources (scripts, styles) can be loaded

**`cors()`:**
```javascript
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:5173',
    ].map(url => url?.replace(/\/$/, '')); // Strip trailing slashes

    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      callback(null, true);  // Allow this origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent cross-origin
}));
```

**`express.json()`:**
Without this middleware, `req.body` is always `undefined`. This middleware reads the raw HTTP request body, parses it as JSON, and attaches the result to `req.body`.

**`cookieParser()`:**
Reads the `Cookie` header from incoming requests and parses it into a JavaScript object available as `req.cookies`. This is how we read the JWT token: `req.cookies.jwt`.

---

---
## 🗳️ ZOOM POLL 2 — Middleware Pipeline
> ⏱️ **Share this poll:** After Slide 5 (Middleware section). Airport analogy comprehension check.

**Question: A request arrives at our Express server. `express.json()` middleware runs but `protect()` middleware does NOT run on this route. What is the most likely reason?**
*(Single Choice)*

A) The request body contains invalid JSON
B) This is a public route (like `POST /api/auth/register`) — `protect()` is only added to protected routes
C) The server hasn't been restarted after adding `protect()`
D) `express.json()` and `protect()` cannot run on the same route

✅ **Correct Answer:** B

> 💬 **Instructor note:** Show the route file — `router.post('/register', registerUser)` has no `protect` middleware, but `router.get('/me', protect, getMe)` does. Middleware is additive and route-specific. Global middleware (like `express.json()`) runs on ALL routes.

---

## 📌 Slide 6 — Backend Folder Structure (MVC Pattern)

### Definition: MVC Architecture
**MVC** (Model-View-Controller) is a classic software architecture pattern that separates an application into 3 distinct responsibilities:
- **Model** — What data looks like and how it's stored (MongoDB schemas)
- **View** — The presentation layer (in MERN, this is the React frontend)
- **Controller** — The business logic (receives requests, processes them, sends responses)

### Why This Structure?
Without MVC separation, a single file would do everything: define data, validate it, process it, and send responses. That file becomes unmaintainably large quickly.

With MVC: each file has ONE job. Routes say "handle this URL". Controllers say "here's the logic". Models say "here's the data shape". Each is independently readable and testable.

### The Complete Backend Folder Structure
```
backend/
├── server.js               → Entry point — starts everything
├── .env                    → Secrets (NEVER in Git)
├── .env.example            → Template (committed to Git)
│
├── config/
│   └── db.js               → MongoDB connection logic
│
├── routes/                 → URL mapping only — no logic
│   ├── authRoutes.js       → /api/auth/* endpoints
│   ├── userRoutes.js       → /api/users/* endpoints
│   ├── roadmapRoutes.js    → /api/roadmaps/* endpoints
│   ├── progressRoutes.js   → /api/progress/* endpoints
│   ├── chatRoutes.js       → /api/chat/* endpoints
│   ├── projectRoutes.js    → /api/projects/* endpoints
│   ├── resourceRoutes.js   → /api/resources/* endpoints
│   ├── learningRoutes.js   → /api/learning/* endpoints
│   └── adminRoutes.js      → /api/admin/* endpoints
│
├── controllers/            → Business logic — reads req, writes res
│   ├── authController.js   → register, login, logout, getMe
│   ├── roadmapController.js→ getMyRoadmap, regenerateRoadmap
│   ├── progressController.js→ getProgress, updateStep
│   ├── chatController.js   → sendMessage, getHistory
│   ├── projectController.js→ getRecommendations, saveProject
│   ├── resourceController.js→ getResources
│   ├── learningController.js→ generateLesson, generateQuiz
│   └── adminController.js  → stats, users, resources CRUD
│
├── middleware/             → Reusable request/response processing
│   ├── authMiddleware.js   → protect() and admin() guards
│   └── errorMiddleware.js  → notFound and errorHandler
│
├── models/                 → MongoDB schemas (built in MC5)
│   ├── User.js
│   ├── Profile.js
│   ├── Roadmap.js
│   ├── Progress.js
│   ├── ChatHistory.js
│   ├── SavedProject.js
│   └── Resource.js
│
├── services/               → External service integrations (built in MC5)
│   ├── aiService.js        → Groq API (LLaMA 3.3 70B)
│   └── fallbackService.js  → Offline fallback content
│
└── utils/                  → Small, reusable helper functions
    ├── generateToken.js    → JWT creation + cookie setting
    └── validators.js       → Input validation functions
```

---

## 📌 Slide 7 — Routes: Defining the API

### Definition
A **Route** is a mapping between an HTTP method (GET, POST, PUT, DELETE) + a URL path, and a handler function. When a request arrives matching the method + path, Express executes the handler.

### HTTP Methods: The Vocabulary of the Web

| Method | Meaning | Real World Equivalent | SkillPath Example |
|--------|---------|-----------------------|-------------------|
| **GET** | Fetch/read data | "Show me the menu" | `GET /api/roadmaps/me` — get my roadmap |
| **POST** | Create new data | "Place an order" | `POST /api/auth/register` — create account |
| **PUT** | Update existing data | "Change my order" | `PUT /api/progress/step` — mark step done |
| **DELETE** | Remove data | "Cancel my order" | `DELETE /api/admin/resources/:id` — delete resource |

### HTTP Status Codes: The Response Language

| Code | Meaning | Used When |
|------|---------|-----------|
| `200 OK` | Success | GET/PUT returns data |
| `201 Created` | Created successfully | POST creates a new resource |
| `400 Bad Request` | Invalid input | Missing required fields |
| `401 Unauthorized` | Not authenticated | No JWT or expired token |
| `403 Forbidden` | Not authorized | Logged in but not admin |
| `404 Not Found` | Resource doesn't exist | User ID not in database |
| `500 Internal Server Error` | Backend crash | Unexpected error in controller |

### File: `backend/routes/authRoutes.js`
```javascript
import express from 'express';
import { registerUser, loginUser, logoutUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes — no authentication needed
router.post('/register', registerUser);    // POST /api/auth/register
router.post('/login', loginUser);          // POST /api/auth/login
router.post('/logout', logoutUser);        // POST /api/auth/logout

// Protected route — must be logged in
router.get('/me', protect, getMe);         // GET /api/auth/me

export default router;
```

### The Complete API Map

| Method | Endpoint | Purpose | Auth Required |
|--------|---------|---------|--------------|
| POST | `/api/auth/register` | Create new account | 🔓 Public |
| POST | `/api/auth/login` | Login | 🔓 Public |
| POST | `/api/auth/logout` | Logout | 🔓 Public |
| GET | `/api/auth/me` | Get current user | 🔒 Login |
| GET | `/api/roadmaps/me` | Get my roadmap | 🔒 Login |
| POST | `/api/roadmaps/regenerate` | Generate new roadmap | 🔒 Login |
| POST | `/api/chat` | Send AI chat message | 🔒 Login |
| GET | `/api/progress/me` | Get my progress | 🔒 Login |
| PUT | `/api/progress/step` | Mark step done/undone | 🔒 Login |
| GET | `/api/projects/recommendations` | AI project ideas | 🔒 Login |
| POST | `/api/projects/save` | Save a project | 🔒 Login |
| GET | `/api/resources` | All resources | 🔒 Login |
| POST | `/api/learning/lesson` | AI lesson generation | 🔒 Login |
| POST | `/api/learning/quiz` | AI quiz generation | 🔒 Login |
| GET | `/api/admin/stats` | Platform stats | 👑 Admin |
| GET | `/api/admin/users` | All users | 👑 Admin |
| PUT | `/api/admin/users/:id` | Ban/unban user | 👑 Admin |
| POST | `/api/admin/resources` | Add resource | 👑 Admin |
| PUT | `/api/admin/resources/:id` | Edit resource | 👑 Admin |
| DELETE | `/api/admin/resources/:id` | Delete resource | 👑 Admin |

---

---
## 🗳️ ZOOM POLL 3 — HTTP Methods
> ⏱️ **Share this poll:** After Slide 7 (Routes: Defining the API). Core REST vocabulary check.

**Question: A student marks a roadmap step as complete. Which HTTP method should the frontend use to send this update to the backend?**
*(Single Choice)*

A) `GET /api/progress/step` — to retrieve the current step status
B) `POST /api/progress/step` — to create a new step completion record
C) `PUT /api/progress/step` — to update an existing progress record
D) `DELETE /api/progress/step` — to remove the incomplete step

✅ **Correct Answer:** C

> 💬 **Instructor note:** Reinforce: GET = read, POST = create, PUT = update, DELETE = remove. The step already exists in the Progress document — we're updating its `completedSteps` array, not creating a new record. POST would imply creating something new.

---

## 📌 Slide 8 — Controllers: The Business Logic

### Definition
A **Controller** is a JavaScript function that handles ONE specific API action. It:
1. Reads the request (body, params, cookies, the logged-in user)
2. Processes the request (validates input, queries the database, calls external services)
3. Sends the response (JSON data with the correct status code)

### File: `backend/controllers/authController.js`

**`registerUser` — Step by Step:**
```javascript
export const registerUser = async (req, res) => {
  // 1. Extract data from request body
  const { name, email, password } = req.body;

  // 2. Validate inputs (client can't be trusted)
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email and password');
  }
  if (!isValidEmail(email)) {
    res.status(400);
    throw new Error('Please provide a valid email address');
  }
  if (!isValidPassword(password)) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }

  // 3. Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('A user with that email already exists');
  }

  // 4. Create the user (password auto-hashed by pre-save hook in MC5)
  const user = await User.create({ name, email, password });

  // 5. Generate JWT and set as HTTP-only cookie
  generateToken(res, user._id);

  // 6. Respond with user data (NEVER send password — even hashed)
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};
```

**`loginUser` — Step by Step:**
```javascript
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password'); // Vague on purpose — don't reveal which was wrong
  }

  // 2. Check if account is active (not banned)
  if (!user.isActive) {
    res.status(401);
    throw new Error('Your account has been suspended. Contact support.');
  }

  // 3. Compare entered password with stored hash (using bcrypt)
  const isMatch = await user.matchPassword(password); // Instance method on User model
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // 4. Generate JWT cookie and respond
  generateToken(res, user._id);
  res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
};
```

### Why "Invalid email or password" instead of "Email not found"?
Security: if we say "email not found", an attacker knows that email isn't registered and can try other emails. If we say "password incorrect", they know the email EXISTS and can now try to brute-force the password. Keeping the message vague reveals nothing to attackers.

---

## 📌 Slide 9 — Authentication Middleware: The Security Guard

### File: `backend/middleware/authMiddleware.js`

### The `protect` Middleware — Step by Step
```javascript
export const protect = async (req, res, next) => {
  // 1. Try to read the JWT from the cookie
  const token = req.cookies.jwt;

  // 2. If no cookie exists — the user is not logged in
  if (!token) {
    res.status(401);
    throw new Error('Not authorized — no token provided');
  }

  // 3. Verify the token's signature is valid and it hasn't expired
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // If token is tampered or expired, jwt.verify() throws an error
  // express-async-errors catches it and sends it to errorHandler

  // 4. Use the decoded userId to fetch the full user from MongoDB
  const user = await User.findById(decoded.userId).select('-password');
  // .select('-password') means: return everything EXCEPT the password field

  // 5. If the user was deleted after the token was issued
  if (!user) {
    res.status(401);
    throw new Error('Not authorized — user no longer exists');
  }

  // 6. Attach the user to the request so controllers can access it
  req.user = user;

  // 7. Pass control to the next middleware or controller
  next();
};
```

### The `admin` Middleware
```javascript
export const admin = (req, res, next) => {
  // This runs AFTER protect, so req.user is already set
  if (req.user && req.user.role === 'admin') {
    next(); // User is admin — allow them through
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
};
```

### Using Both Middlewares Together
```javascript
// In adminRoutes.js — BOTH protect AND admin must pass:
router.get('/stats', protect, admin, getAdminStats);
// Flow: protect() → admin() → getAdminStats() → response
```

---

## 📌 Slide 10 — JWT Authentication: The Complete Flow

### Definition
**JWT** (JSON Web Token) is an open standard for securely transmitting information as a compact, URL-safe string. It contains a payload (data) that is **digitally signed** with a secret key. Anyone can READ the payload, but only the server (with the secret key) can VERIFY it wasn't tampered with.

### JWT Structure: Three Parts
```
header.payload.signature

eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NWYzYTg...L2f4.xK3mNp...
```
1. **Header** — Algorithm used to sign (e.g., HS256)
2. **Payload** — The actual data (userId, expiry time) — base64 encoded, readable
3. **Signature** — HMAC of header+payload using the JWT_SECRET — verifiable

### The Full Authentication Flow

**Step 1: Login (Token Creation)**
```
User enters email + password
→ POST /api/auth/login
→ Server validates credentials in MongoDB
→ Server creates JWT: jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' })
→ Server sets HTTP-only cookie: res.cookie('jwt', token, { httpOnly: true, ... })
→ Client's browser stores the cookie automatically
```

**Step 2: Every Subsequent Request (Token Verification)**
```
User visits /dashboard in React
→ React's ProtectedRoute runs
→ React makes GET /api/auth/me (browser auto-sends cookie)
→ protect() middleware reads req.cookies.jwt
→ jwt.verify(token, JWT_SECRET) decodes the userId
→ User.findById(userId) fetches the user
→ req.user = user (attached to request)
→ next() → getMe() controller returns the user data
→ React AuthContext stores user
→ Dashboard renders
```

### File: `backend/utils/generateToken.js`
```javascript
import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
  // Create the JWT — expires in 30 days
  const token = jwt.sign(
    { userId },                          // Payload: what we embed in the token
    process.env.JWT_SECRET,              // Secret: only the server knows this
    { expiresIn: '30d' }                // Expiry: auto-invalidated after 30 days
  );

  // Set the token as a cookie
  res.cookie('jwt', token, {
    httpOnly: true,   // JS cannot access this cookie (XSS protection)
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    // 'none' required for cross-domain cookies (Vercel → Render)
    maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days in milliseconds
  });
};
```

### Why HTTP-Only Cookie Instead of localStorage?

| Feature | HTTP-Only Cookie | localStorage |
|---------|-----------------|-------------|
| Accessible by JavaScript | ❌ No | ✅ Yes |
| Stealable by XSS attack | ❌ No | ✅ Yes |
| Sent automatically with requests | ✅ Yes | ❌ Manual header needed |
| Security rating | 🔒 Higher | 🔓 Lower |

HTTP-only cookies cannot be read by any JavaScript running on the page — even malicious scripts injected by XSS attacks. This makes JWT in HTTP-only cookies significantly more secure than localStorage.

---

---
## 🗳️ ZOOM POLL 4 — JWT Security
> ⏱️ **Share this poll:** After Slide 10 (JWT Authentication Flow). Critical security concept.

**Question: Why do we store the JWT in an HTTP-only cookie instead of `localStorage`?**
*(Single Choice)*

A) HTTP-only cookies are faster to read than localStorage
B) localStorage has a 5MB size limit but JWTs can be larger
C) HTTP-only cookies cannot be accessed by JavaScript — they're invisible to XSS attacks that try to steal tokens
D) Cookies automatically refresh when they expire; localStorage values don't

✅ **Correct Answer:** C

> 💬 **Instructor note:** XSS (Cross-Site Scripting) is when malicious JavaScript gets injected into a page. If the JWT is in localStorage, that script can read it with `localStorage.getItem('token')` and steal it. An HTTP-only cookie is invisible to ALL JavaScript — even malicious scripts can't read it.

---

## 📌 Slide 11 — Global Error Handling

### File: `backend/middleware/errorMiddleware.js`

### Why Global Error Handling?
Without it, every controller would need its own try-catch block:
```javascript
// Without global error handler — repetitive and painful:
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// With global error handler + express-async-errors:
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user); // If findById throws, it's automatically forwarded to errorHandler
};
```

### The `express-async-errors` Package
This tiny package patches Express to automatically catch any error thrown (or rejected promise) inside an async route handler and forward it to the global error handler. Without it, unhandled async errors would crash the server.

### `notFound` Middleware
```javascript
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error); // Forward to errorHandler
};
```
Catches any request to a URL that doesn't exist (like `GET /api/banana`).

### `errorHandler` Middleware
```javascript
export const errorHandler = (error, req, res, next) => {
  // Status code: use the one set on res, or default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: error.message,
    // Only show the error stack trace in development — hide in production
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};
```

Every thrown error ends up here. This single function handles:
- 400 Bad Request errors (from validation)
- 401 Unauthorized errors (from JWT check)
- 403 Forbidden errors (from admin check)
- 404 Not Found errors (from notFound middleware)
- 500 Internal Server errors (from unexpected crashes)

### File: `backend/utils/validators.js`
```javascript
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (password) => {
  return password && password.length >= 6;
};
```

---

## 📌 Slide 12 — Testing the API Before the Frontend Exists

### Why Test the API Directly?
Before connecting React to the backend, you MUST verify each API endpoint works in isolation. This way, when you connect the frontend later, you know whether a bug is in the frontend or the backend.

### Tools: Thunder Client (VS Code Extension)
Thunder Client is a lightweight REST API client built directly into VS Code. Install the extension, then use it to send HTTP requests to your backend.

### Test Cases to Run

**Test 1: Register a New User**
```
Method: POST
URL:    http://localhost:5001/api/auth/register
Body (JSON):
{
  "name": "Test Student",
  "email": "student@test.com",
  "password": "password123"
}
Expected Response: 201 Created
{
  "_id": "65f3a...",
  "name": "Test Student",
  "email": "student@test.com",
  "role": "user"
}
```

**Test 2: Login**
```
Method: POST
URL:    http://localhost:5001/api/auth/login
Body (JSON):
{
  "email": "student@test.com",
  "password": "password123"
}
Expected: 200 OK + "Set-Cookie" header in the response (the JWT cookie)
```

**Test 3: Access Protected Route**
```
Method: GET
URL:    http://localhost:5001/api/auth/me
(Thunder Client automatically sends the cookie from Test 2)
Expected with cookie:    200 OK with user data
Expected without cookie: 401 Unauthorized
```

**Test 4: Invalid Login**
```
Body: { "email": "student@test.com", "password": "wrongpassword" }
Expected: 401 Unauthorized
{ "message": "Invalid email or password" }
```

**Test 5: Health Check**
```
Method: GET
URL:    http://localhost:5001/api/health
Expected: 200 OK
{ "status": "ok", "message": "SkillPath AI API is running" }
```

---

## 📌 Slide 13 — Files Built in Masterclass 4

| File | Purpose |
|------|---------|
| `backend/server.js` | Entry point — sets up Express, all middleware, all routes |
| `backend/.env` | All secret values (local only — never in Git) |
| `backend/.env.example` | Template with empty values (committed to Git) |
| `backend/config/db.js` | MongoDB connection logic |
| `backend/utils/validators.js` | `isValidEmail()` and `isValidPassword()` |
| `backend/utils/generateToken.js` | JWT creation + HTTP-only cookie setting |
| `backend/middleware/authMiddleware.js` | `protect()` and `admin()` guards |
| `backend/middleware/errorMiddleware.js` | `notFound` and global `errorHandler` |
| `backend/controllers/authController.js` | `registerUser`, `loginUser`, `logoutUser`, `getMe` |
| `backend/controllers/roadmapController.js` | `getMyRoadmap`, `regenerateRoadmap` (stub) |
| `backend/controllers/progressController.js` | `getProgress`, `updateStep` (stub) |
| `backend/controllers/chatController.js` | `sendMessage`, `getHistory` (stub) |
| `backend/controllers/projectController.js` | `getRecommendations`, `saveProject` (stub) |
| `backend/controllers/resourceController.js` | `getResources` (stub) |
| `backend/controllers/learningController.js` | `generateLesson`, `generateQuiz` (stub) |
| `backend/controllers/adminController.js` | `getStats`, `getAllUsers`, `updateUserStatus`, resources CRUD (stub) |
| `backend/routes/authRoutes.js` | Auth endpoint mappings |
| `backend/routes/roadmapRoutes.js` | Roadmap endpoint mappings |
| `backend/routes/progressRoutes.js` | Progress endpoint mappings |
| `backend/routes/chatRoutes.js` | Chat endpoint mappings |
| `backend/routes/projectRoutes.js` | Projects endpoint mappings |
| `backend/routes/resourceRoutes.js` | Resources endpoint mappings |
| `backend/routes/learningRoutes.js` | Learning (lesson/quiz) endpoint mappings |
| `backend/routes/adminRoutes.js` | Admin endpoint mappings |

---

## 📌 Slide 14 — GitHub Checkpoint: MC4

### Commit Message
> `MC4: Backend — Express Server, REST APIs, JWT Auth, Middleware, Controllers, Route Protection`

### Branch Naming
`masterclass-4/backend-apis`

### What's Intentionally Left for MC5
- Controllers return stub/mock data — no real database queries yet
- MongoDB models/schemas not defined yet
- Groq AI service not implemented yet
- All this gets completed in MC5 (Database & AI Integration)

---

## ✅ By the End of MC4, Students Should Be Able To:

- ✅ Explain what a backend is and how it differs from the frontend
- ✅ Create and run an Express.js server with npm scripts
- ✅ Use npm to install and manage Node.js packages
- ✅ Configure middleware (helmet, cors, express.json, cookieParser, morgan)
- ✅ Define REST API routes using `express.Router()` with correct HTTP methods
- ✅ Write controller functions that read requests and send JSON responses
- ✅ Implement JWT authentication with HTTP-only cookies
- ✅ Protect routes using custom `protect` and `admin` middleware functions
- ✅ Use environment variables to keep secrets out of source code
- ✅ Handle errors globally using the `notFound` + `errorHandler` pattern
- ✅ Test API endpoints using Thunder Client or Postman

---

## 🎮 Two Truths and One Lie — MC4

---

### 🔴 Round 1 — About HTTP and Security

- 🟢 `bcryptjs` is a one-way hashing algorithm — even if someone has the hashed password, they cannot reverse it to get the original plain text.
- 🟢 Storing the JWT in an HTTP-only cookie means JavaScript running on the page cannot access the token, making it safe from XSS attacks.
- 🔴 GET requests are more secure than POST requests for sending sensitive data like passwords, because GET requests are smaller and faster.

> **🎯 The Lie:** GET is **less** secure for sensitive data. GET parameters appear in the URL (visible in browser history, server logs, bookmarks). POST sends data in the request body — invisible in the URL. Passwords must always be sent via POST.

---

### 🔴 Round 2 — About Middleware Order

- 🟢 `express.json()` middleware is what makes `req.body` work — without it, all request bodies are `undefined`.
- 🟢 `helmet()` automatically sets over 11 HTTP security headers, including one that prevents your site from being embedded in iframes to prevent clickjacking.
- 🔴 You can place `app.use(notFound)` and `app.use(errorHandler)` at the TOP of `server.js`, before your routes, and it will catch errors from routes correctly.

> **🎯 The Lie:** Error-handling middleware **must be registered AFTER all routes**. If `notFound` is placed first, it intercepts every single request before any route gets a chance to handle it — every URL returns 404, including valid ones.

---

### 🔴 Round 3 — About JWT and Environment Variables

- 🟢 The `.env` file must NEVER be committed to GitHub because it contains real passwords, database credentials, and API keys that would expose your entire backend if public.
- 🟢 A JWT token's signature cannot be forged without the `JWT_SECRET` — if someone modifies the payload, the signature verification will fail and the token is rejected.
- 🔴 The JWT payload is encrypted — even if someone intercepts the token, they cannot read the userId or any other data stored inside it.

> **🎯 The Lie:** JWT payloads are **not encrypted — they are base64 encoded**. Anyone can decode the payload and read the data. Base64 is reversible, not encrypted. This is why you NEVER put sensitive data (passwords, credit cards) in a JWT payload. Only non-sensitive identifiers (userId, role) belong there.

---

## 🙋 Mid-Class Questions — MC4

1. **"When a user submits the login form — which HTTP method should it use? GET or POST? What would go wrong if it used GET?"**
   *(Expected: POST — sensitive data (email + password) must go in the request body. With GET, the password would appear in the URL and be stored in browser history, server access logs, and could be captured by network proxies.)*

2. **"We have three layers: Routes, Controllers, and Middleware. If I send a POST to `/api/auth/login`, what's the exact ORDER these three things execute?"**
   *(Expected: Global middleware (cors, json, cookieParser) first → Router matches the URL → No route-specific middleware for /login → `loginUser` controller runs → sends response.)*

3. **"A JWT token is stored in an HTTP-only cookie. What does 'HTTP-only' actually mean? Can a malicious browser extension read it?"**
   *(Expected: HTTP-only means the cookie cannot be accessed by JavaScript — `document.cookie` won't see it, XHR requests don't expose it. Even a malicious script injected by an XSS attack cannot steal it. However, browser extensions that intercept network traffic (not JS) could potentially see it.)*

4. **"Why do we have a `.env.example` file committed to GitHub, but NOT the `.env` file itself? What would happen if someone found your real `.env` file on GitHub?"**
   *(Expected: `.env.example` shows what variables are needed with empty values — safe as a template. The real `.env` with real values would give anyone full access to your MongoDB database, your Groq API (billing them money), and let them forge JWT tokens for any user.)*

5. **"The `protect` middleware attaches `req.user` to the request. Why does the controller need `req.user`? Give a specific example from SkillPath AI."**
   *(Expected: So the controller knows WHO is making the request. Example: `GET /api/roadmaps/me` — without `req.user`, the controller doesn't know which user's roadmap to return. With `req.user._id`, it queries MongoDB for that specific user's roadmap.)*

---

## 📋 File Creation Flow — MC4 (Start Here, Follow This Order!)

> This is the backend's turn. You're building a completely separate `backend/` project. Create files in this exact order — each depends on the ones above it.

---

### 🟢 STEP 1 — Project Setup

| Order | Action | Why First? |
|-------|--------|------------|
| 1️⃣ | Inside `backend/`: run `npm init -y` | Creates `package.json` — required before any packages can be installed |
| 2️⃣ | Run the full npm install command | Installs all packages — required before any `import` statements work |
| 3️⃣ | Run `npm install --save-dev nodemon` | Dev tool for auto-restart on file save |

---

### 🟡 STEP 2 — Configuration

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 4️⃣ | `backend/.env` | Must exist before server reads `process.env.*` variables |
| 5️⃣ | `backend/.env.example` | Safe template — commit this to Git |
| 6️⃣ | `backend/config/db.js` | MongoDB connection — called by server.js on startup |

---

### 🟠 STEP 3 — Utility Functions (Called by controllers and middleware)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 7️⃣ | `backend/utils/validators.js` | Email/password validation — called inside authController |
| 8️⃣ | `backend/utils/generateToken.js` | JWT + cookie generation — called at end of register/login |

---

### 🔵 STEP 4 — Middleware (Guards and error handlers)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 9️⃣ | `backend/middleware/authMiddleware.js` | `protect()` and `admin()` — applied to routes |
| 🔟 | `backend/middleware/errorMiddleware.js` | `notFound` and `errorHandler` — registered in server.js |

---

### 🟣 STEP 5 — Controllers (Business logic — called by routes)

| Order | File | Notes |
|-------|------|-------|
| 1️⃣1️⃣ | `backend/controllers/authController.js` | Fully implemented — uses validators + generateToken |
| 1️⃣2️⃣ | `backend/controllers/roadmapController.js` | STUB — returns mock data (real DB in MC5) |
| 1️⃣3️⃣ | `backend/controllers/progressController.js` | STUB |
| 1️⃣4️⃣ | `backend/controllers/chatController.js` | STUB |
| 1️⃣5️⃣ | `backend/controllers/projectController.js` | STUB |
| 1️⃣6️⃣ | `backend/controllers/resourceController.js` | STUB |
| 1️⃣7️⃣ | `backend/controllers/learningController.js` | STUB |
| 1️⃣8️⃣ | `backend/controllers/adminController.js` | STUB |

---

### 🔴 STEP 6 — Routes (URL mappings — point to controllers)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 1️⃣9️⃣ | `backend/routes/authRoutes.js` | Built last because it imports from controllers |
| 2️⃣0️⃣ | `backend/routes/userRoutes.js` | Same |
| 2️⃣1️⃣ | `backend/routes/roadmapRoutes.js` | Same |
| 2️⃣2️⃣ | `backend/routes/progressRoutes.js` | Same |
| 2️⃣3️⃣ | `backend/routes/chatRoutes.js` | Same |
| 2️⃣4️⃣ | `backend/routes/projectRoutes.js` | Same |
| 2️⃣5️⃣ | `backend/routes/resourceRoutes.js` | Same |
| 2️⃣6️⃣ | `backend/routes/learningRoutes.js` | Same |
| 2️⃣7️⃣ | `backend/routes/adminRoutes.js` | Same |

---

### ⚫ STEP 7 — Entry Point (Wires everything — always last)

| Order | File | Why Last? |
|-------|------|-----------|
| 2️⃣8️⃣ | `backend/server.js` | Imports config, middleware, all routes — can only be written after ALL of the above |

---

### ✅ MC4 Creation Order — Quick Visual Summary

```
SETUP:
1. npm init + npm install
2. .env                   ← Secrets
3. .env.example           ← Safe template

INFRASTRUCTURE:
4. config/db.js           ← MongoDB connection
5. utils/validators.js    ← Validation helpers
6. utils/generateToken.js ← JWT + cookie setup

MIDDLEWARE:
7. middleware/authMiddleware.js   ← protect() + admin()
8. middleware/errorMiddleware.js  ← Error handler

CONTROLLERS (write logic stubs first):
9.  controllers/authController.js   ← Fully implemented
10. controllers/roadmapController.js ← Stub
11. controllers/progressController.js ← Stub
12. controllers/chatController.js    ← Stub
13. controllers/projectController.js ← Stub
14. controllers/resourceController.js ← Stub
15. controllers/learningController.js ← Stub
16. controllers/adminController.js   ← Stub

ROUTES (URL mappers — after controllers):
17. routes/authRoutes.js
18. routes/userRoutes.js
19. routes/roadmapRoutes.js
20. routes/progressRoutes.js
21. routes/chatRoutes.js
22. routes/projectRoutes.js
23. routes/resourceRoutes.js
24. routes/learningRoutes.js
25. routes/adminRoutes.js

ENTRY POINT:
26. server.js            ← Ties everything together ← LAST
```

> 💡 **Golden Rule for MC4:** `server.js` is always the LAST file you create because it imports and registers everything else. Utilities → Middleware → Controllers → Routes → Server.
