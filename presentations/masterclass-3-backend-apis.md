# ⚙️ Masterclass 3: Power Behind the Scenes
### Backend Fundamentals — REST APIs, Routing, Controllers & Server-Side Logic
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — What is a Backend?

### Definition
The **backend** is the part of a web application that runs on a **server** — not in the browser. Users never see it directly, but everything they do in the frontend eventually talks to the backend to store, retrieve, or process data.

### Frontend vs Backend: A Simple Comparison

| | Frontend (React) | Backend (Node/Express) |
|--|--|--|
| **Runs on** | User's Browser | A Server (Render, AWS, etc.) |
| **Seen by** | User | No one (behind the scenes) |
| **Purpose** | Display data, handle interactions | Process requests, manage data, security |
| **Language** | JavaScript (React) | JavaScript (Node.js) |
| **Communicates via** | API calls (Axios) | HTTP responses (JSON) |

### Real World Analogy
A restaurant:
- The **frontend** is the dining room and menu — what customers see and interact with
- The **backend** is the kitchen — where the actual cooking (logic) happens
- The **API** is the waiter — carries requests from the dining room to the kitchen and brings responses back
- The **database** is the pantry/storage — where all ingredients (data) are kept

---

## 📌 Slide 2 — Node.js: JavaScript on the Server

### Definition
**Node.js** is a runtime environment that allows JavaScript to run outside the browser — on a server. Before Node.js, JavaScript was only for browsers. Node.js changed everything by letting developers use the same language (JavaScript) for both frontend AND backend.

### Why Node.js for SkillPath AI?
- **Same language as the frontend** — JavaScript throughout the entire stack (MERN)
- **Non-blocking / Event-driven** — Can handle many requests simultaneously without slowing down
- **Huge ecosystem** — Millions of packages available via npm (Node Package Manager)
- **Fast for APIs** — Especially good for I/O-heavy applications like reading from a database or calling an external API

### npm: The Package Manager
**npm** (Node Package Manager) is like an app store for JavaScript libraries. Instead of writing every utility from scratch, we install battle-tested packages. For example:
- `bcryptjs` — For securely hashing passwords
- `jsonwebtoken` — For creating and verifying JWTs
- `mongoose` — For interacting with MongoDB

**File: `backend/package.json`**
This file is the "identity card" of the backend project. It lists:
- All installed packages and their versions (`dependencies`)
- Development-only tools like `nodemon` (`devDependencies`)
- Scripts: `npm start` runs the server, `npm run dev` runs with auto-restart

---

## 📌 Slide 3 — Express.js: The Web Framework

### Definition
**Express.js** is a minimal, unopinionated web framework for Node.js. It provides a simple way to:
- Listen for incoming HTTP requests on a port
- Match those requests to the correct handler function (routing)
- Send back HTTP responses (JSON data, status codes, etc.)
- Run middleware between the request and the response

### Real World Analogy
If Node.js is the engine of a car, Express.js is the steering wheel, gear shifts, and dashboard — the controls that make it actually drivable for building web applications.

### File: `backend/server.js`
This is the **entry point** of the entire backend. When you run `npm start` or `npm run dev`, Node.js executes this file. It:
1. Loads environment variables from `.env`
2. Connects to MongoDB
3. Creates an Express app
4. Configures all middleware (security, CORS, logging)
5. Registers all API routes
6. Starts listening on the configured port

---

## 📌 Slide 4 — Environment Variables: Keeping Secrets Safe

### Definition
**Environment Variables** are configuration values stored outside the code. They are "injected" into the running process at startup. They are used for things that:
- Must be kept secret (API keys, database passwords)
- Change between environments (local development vs production)

### Real World Analogy
Imagine you're baking a cake for different events. The recipe is the same, but the "flavor" (chocolate, vanilla, lemon) changes per event. Environment variables are the flavor setting — the recipe (code) stays unchanged, but the behavior changes based on the variable values.

### File: `backend/.env`
This file contains all secret values. It is **NEVER committed to GitHub**. The `.gitignore` file explicitly excludes it.

### Variables Used in SkillPath Backend

| Variable | Purpose |
|----------|---------|
| `PORT` | Which port the server runs on (5001 locally) |
| `NODE_ENV` | `development` or `production` — changes server behavior |
| `MONGO_URI` | The connection string for MongoDB Atlas (includes password) |
| `JWT_SECRET` | A long random string used to sign and verify JWT tokens |
| `GROQ_API_KEY` | The API key for the Groq AI service |
| `CLIENT_URL` | The frontend URL (used for CORS whitelist) |

### File: `backend/.env.example`
A "template" version of `.env` with all variable names but **empty values**. This IS committed to GitHub so other developers know which variables they need to set up.

---

## 📌 Slide 5 — Middleware: The Request Pipeline

### Definition
**Middleware** is a function that executes **between** the incoming HTTP request and the outgoing response. Multiple middleware functions can be chained together. Each one can:
- Modify the request or response object
- End the request-response cycle (send a response)
- Call the next middleware in the chain using `next()`

### Real World Analogy
Think of airport security. When you fly, you go through multiple checkpoints:
1. **Ticket check** — Are you on the flight?
2. **ID check** — Are you who you say you are?
3. **Baggage scan** — Are you carrying anything dangerous?
4. **Boarding gate** — You're cleared, get on the plane.

Each checkpoint is a "middleware" — it checks something, and if everything is fine, it passes you to the next one. If a check fails, you're stopped and sent back.

### Middleware Used in `backend/server.js`

**Security Middleware:**
- **`helmet()`** — Sets over 11 security-related HTTP headers automatically. Prevents common web vulnerabilities like XSS (Cross-Site Scripting) and clickjacking.
- **`cors()`** — Cross-Origin Resource Sharing. Without this, browsers would block all requests from the frontend (Vercel) to the backend (Render) because they're different domains. We configure it to specifically allow our frontend's URL.

**Request Parsing Middleware:**
- **`express.json()`** — Parses the body of incoming requests that contain JSON data. Without this, `req.body` would always be undefined when a user submits a form.
- **`cookieParser()`** — Parses cookies sent with requests. Needed to read the JWT token that proves the user is logged in.

**Logging Middleware:**
- **`morgan('dev')`** — Logs every incoming request to the console (method, URL, status code, response time). Only active in development mode so production logs aren't flooded.

---

## 📌 Slide 6 — Backend Folder Structure (MVC Pattern)

### Definition: MVC Pattern
**MVC** stands for **Model-View-Controller** — a classic software architecture pattern that separates an application into 3 responsibilities:
- **Model** — The data layer. Defines what data looks like and how it's stored.
- **View** — The presentation layer. In a MERN app, this is the React frontend.
- **Controller** — The logic layer. Receives requests, processes them using models, and sends responses.

### The Backend Folder Structure

```
backend/
├── server.js           → The entry point — starts the server
├── .env                → Secrets (NEVER committed to Git)
├── .env.example        → Template (committed to Git)
├── config/
│   └── db.js           → MongoDB connection logic
├── routes/             → Define which URLs the server listens to
│   ├── authRoutes.js   → /api/auth/* endpoints
│   ├── userRoutes.js   → /api/users/* endpoints
│   ├── roadmapRoutes.js
│   ├── progressRoutes.js
│   ├── chatRoutes.js
│   ├── projectRoutes.js
│   ├── resourceRoutes.js
│   ├── learningRoutes.js
│   └── adminRoutes.js
├── controllers/        → The actual business logic
│   ├── authController.js
│   ├── roadmapController.js
│   └── ... (one per route file)
├── middleware/         → Reusable request/response functions
│   ├── authMiddleware.js   → protect() and admin()
│   └── errorMiddleware.js  → Global error handler
├── models/             → MongoDB schemas (MC4)
├── services/           → External service integrations
│   ├── aiService.js        → Groq AI integration
│   └── fallbackService.js  → Offline fallback logic
└── utils/              → Helper functions
    ├── generateToken.js    → JWT creation
    └── validators.js       → Input validation functions
```

---

## 📌 Slide 7 — Routes: Defining the API

### Definition
A **Route** is a combination of an HTTP method (GET, POST, PUT, DELETE) and a URL path that the server listens to. When a matching request arrives, the server executes the corresponding controller function.

### HTTP Methods Explained

| Method | Real World Equivalent | Used For |
|--------|----------------------|---------|
| **GET** | "Give me the menu" | Reading/fetching data |
| **POST** | "Take my order" | Creating new data |
| **PUT** | "Change my order" | Updating existing data |
| **DELETE** | "Cancel my order" | Removing data |

### File: `backend/routes/authRoutes.js`
Handles all authentication-related endpoints:
- `POST /api/auth/register` — Accepts name, email, password → creates a new user
- `POST /api/auth/login` — Accepts email, password → verifies and returns a JWT cookie
- `POST /api/auth/logout` — Clears the JWT cookie
- `GET /api/auth/me` → Returns the currently logged-in user's info (protected — requires being logged in)

### File: `backend/routes/roadmapRoutes.js`
- `GET /api/roadmaps/me` — Returns the logged-in user's current roadmap and progress
- `POST /api/roadmaps/regenerate` — Generates a new AI roadmap (replaces the old one)

### File: `backend/routes/chatRoutes.js`
- `POST /api/chat` — Accepts a message, sends to Groq AI, returns the AI's response, saves to chat history

### File: `backend/routes/progressRoutes.js`
- `GET /api/progress/me` — Returns progress data for the logged-in user
- `PUT /api/progress/step` — Marks a specific step as complete or incomplete

### File: `backend/routes/adminRoutes.js`
Admin-only endpoints. ALL routes here require BOTH login + admin role:
- `GET /api/admin/stats` — Returns platform-wide statistics (total users, roadmaps, resources)
- `GET /api/admin/users` — Returns a list of all registered users
- `PUT /api/admin/users/:id` — Enable or disable a specific user's account
- `POST /api/admin/resources` — Add a new learning resource
- `PUT /api/admin/resources/:id` — Edit an existing resource
- `DELETE /api/admin/resources/:id` — Remove a resource

### Complete API Map

| Method | Endpoint | Purpose | Auth |
|--------|---------|---------|------|
| POST | `/api/auth/register` | Register | Public |
| POST | `/api/auth/login` | Login | Public |
| POST | `/api/auth/logout` | Logout | Public |
| GET | `/api/auth/me` | Get current user | 🔒 Login |
| GET | `/api/roadmaps/me` | Get my roadmap | 🔒 Login |
| POST | `/api/roadmaps/regenerate` | Regenerate roadmap | 🔒 Login |
| POST | `/api/chat` | AI chat message | 🔒 Login |
| PUT | `/api/progress/step` | Mark step done | 🔒 Login |
| GET | `/api/projects/recommendations` | AI project ideas | 🔒 Login |
| POST | `/api/projects/save` | Save a project | 🔒 Login |
| GET | `/api/admin/stats` | Platform stats | 👑 Admin |
| GET | `/api/admin/users` | All users | 👑 Admin |

---

## 📌 Slide 8 — Controllers: The Business Logic

### Definition
A **Controller** is a JavaScript function that handles a specific API request. It receives the request (user's data), does the processing (validation, database operations, AI calls), and sends the response (JSON data with a status code).

### File: `backend/controllers/authController.js`
Contains 4 functions:

**`registerUser`** — Steps:
1. Extract `name`, `email`, `password` from the request body
2. Validate: check all fields exist, email format is valid, password is long enough
3. Check if a user with that email already exists in MongoDB
4. If not, create the new user (password gets auto-hashed by the model's pre-save hook)
5. Generate a JWT token and set it as an HTTP-only cookie
6. Respond with the new user's data (without the password)

**`loginUser`** — Steps:
1. Extract `email` and `password` from the request body
2. Find a user in MongoDB with that email
3. Check if the account is active (not banned by admin)
4. Use `bcrypt` to compare the entered password with the stored hash
5. If match, generate a JWT token and set as a cookie
6. Respond with the user's data

**`logoutUser`** — Simply overwrites the JWT cookie with an expired, empty cookie — effectively deleting it from the browser.

**`getMe`** — Returns the user object from `req.user` (which is attached by the `protect` middleware after verifying the JWT).

### File: `backend/controllers/roadmapController.js`
- **`getMyRoadmap`** — Finds the roadmap and progress documents linked to the logged-in user's ID. Returns both together.
- **`regenerateRoadmap`** — Takes the user's goal, level, and weekly hours. Calls `generateRoadmapWithAI()` from the AI service. Saves the returned roadmap to MongoDB (creating it if new, replacing it if it exists). Resets the progress tracker.

---

## 📌 Slide 9 — Authentication Middleware

### File: `backend/middleware/authMiddleware.js`
Contains two middleware functions:

### `protect` Middleware
This is the authentication guard. Any route tagged with `protect` runs this function first.

**How it works step by step:**
1. Read the `jwt` cookie from the incoming request
2. If there's no cookie → respond with `401 Unauthorized — No token`
3. If there IS a cookie → verify it using `jwt.verify()` and the `JWT_SECRET`
4. If the token is invalid or expired → respond with `401 — Token failed`
5. If the token is valid → decode it to get the `userId`
6. Look up the user in MongoDB using that `userId`
7. Attach the user object to `req.user` — now it's available to the controller
8. Call `next()` — proceed to the controller

### `admin` Middleware
A second guard that runs AFTER `protect` (so `req.user` is already set):
1. Check if `req.user.role === 'admin'`
2. If not → respond with `403 Forbidden — Not authorized as admin`
3. If yes → call `next()`

### Real World Analogy
The `protect` middleware is the security guard at a company's reception who checks your employee badge (JWT). The `admin` middleware is the additional check at the executive floor that verifies you have executive clearance (admin role). You need to pass BOTH to reach the admin panel.

---

## 📌 Slide 10 — JWT Authentication: The Full Flow

### Definition
**JWT** (JSON Web Token) is an open standard for securely transmitting information between parties as a compact, digitally-signed token. In SkillPath AI, we use JWT to prove that a user is logged in.

### How It Works (Step by Step)

**At Login:**
1. User submits email + password to `POST /api/auth/login`
2. Server verifies credentials against the database
3. Server creates a JWT: a string containing the user's ID, signed with a secret key
4. Server sends the JWT back as an **HTTP-only cookie** (not in the response body)

**On Every Subsequent Request:**
1. Browser automatically includes the cookie in every request to the same domain
2. Server's `protect` middleware reads the cookie
3. Verifies the JWT signature using the secret key
4. Extracts the user ID and attaches the user to `req.user`
5. Controller runs — it always knows who is making the request via `req.user`

### Why HTTP-Only Cookie? (Not localStorage)
- An HTTP-only cookie **cannot be accessed by JavaScript** — meaning even if a malicious script runs on the page (XSS attack), it cannot steal the token
- localStorage-stored tokens CAN be stolen by XSS attacks
- This makes our authentication significantly more secure

### File: `backend/utils/generateToken.js`
A utility function called after a successful login or registration. Creates the JWT and sets it as a cookie with:
- `httpOnly: true` — JavaScript can't read it
- `secure: true` in production — Only sent over HTTPS
- `sameSite: 'none'` in production — Required for cross-domain (Vercel + Render) cookie sharing
- `maxAge` — Cookie expires in 30 days

---

## 📌 Slide 11 — Global Error Handling

### File: `backend/middleware/errorMiddleware.js`
Contains two functions that are the **last middleware** registered in `server.js`:

### `notFound` Middleware
Catches any request to a route that doesn't exist (like `GET /api/something-random`). Creates a "Not Found" error and passes it to the error handler.

### `errorHandler` Middleware
The global catch-all for every error that occurs in the application. When any controller function throws an error, Express automatically passes it here.

It responds with:
- The **correct HTTP status code** (400, 401, 403, 404, 500, etc.)
- A JSON body with `{ message: "the error description" }`
- The error **stack trace** — but only in development mode (production hides it for security)

### The `express-async-errors` Package
Normally in Express, if an async controller throws an error, Express doesn't catch it — the server crashes or hangs. The `express-async-errors` package patches Express to automatically forward thrown errors from async functions to the global error handler.

This means controllers can simply `throw new Error("message")` instead of wrapping everything in try/catch blocks.

### File: `backend/utils/validators.js`
A small utility file with validation functions:
- **`isValidEmail(email)`** — Checks email format using a regex pattern
- **`isValidPassword(password)`** — Checks password is at least 6 characters long

These are used in `authController.js` before attempting to create a user.

---

## 📌 Slide 12 — Testing the API

### Why Test the API Directly?
Before connecting the frontend, it's essential to verify each API endpoint works correctly in isolation. Two popular tools for this:

- **Thunder Client** — A lightweight REST client extension inside VS Code
- **Postman** — A standalone, feature-rich API testing application

### What to Test in MC3

**Test 1: Registration**
- Method: POST
- URL: `http://localhost:5001/api/auth/register`
- Body: `{ "name": "Test Student", "email": "student@test.com", "password": "password123" }`
- Expected: `201 Created` with user data in response

**Test 2: Login**
- Method: POST
- URL: `http://localhost:5001/api/auth/login`
- Body: `{ "email": "student@test.com", "password": "password123" }`
- Expected: `200 OK` with user data + a `Set-Cookie` header in the response

**Test 3: Get Current User (Protected)**
- Method: GET
- URL: `http://localhost:5001/api/auth/me`
- Expected with cookie: `200 OK` with user data
- Expected without cookie: `401 Unauthorized`

**Test 4: Invalid Login**
- Body: `{ "email": "student@test.com", "password": "wrongpassword" }`
- Expected: `401 Unauthorized` with `{ "message": "Invalid email or password" }`

**Test 5: Health Check**
- Method: GET
- URL: `http://localhost:5001/api/health`
- Expected: `{ "status": "ok", "message": "SkillPath AI API is running" }`

---

## 📌 Slide 13 — Files Built in Masterclass 3

| File | Purpose |
|------|---------|
| `backend/server.js` | Main entry point — sets up Express, middleware, routes |
| `backend/.env` | Secret environment variables (local only) |
| `backend/.env.example` | Template for .env (committed to Git) |
| `backend/config/db.js` | MongoDB connection logic |
| `backend/routes/authRoutes.js` | Auth endpoints — register, login, logout, me |
| `backend/routes/userRoutes.js` | User profile endpoints |
| `backend/routes/roadmapRoutes.js` | Roadmap endpoints |
| `backend/routes/progressRoutes.js` | Progress tracking endpoints |
| `backend/routes/chatRoutes.js` | AI chat endpoint |
| `backend/routes/projectRoutes.js` | Project recommendation endpoints |
| `backend/routes/resourceRoutes.js` | Learning resources endpoints |
| `backend/routes/adminRoutes.js` | Admin-only endpoints |
| `backend/routes/learningRoutes.js` | AI lesson & quiz endpoints |
| `backend/controllers/authController.js` | Register, login, logout, getMe logic |
| `backend/controllers/roadmapController.js` | Roadmap fetch + AI regeneration |
| `backend/controllers/progressController.js` | Step marking logic |
| `backend/controllers/chatController.js` | AI chat + history management |
| `backend/middleware/authMiddleware.js` | protect() and admin() guards |
| `backend/middleware/errorMiddleware.js` | Global error handler |
| `backend/utils/generateToken.js` | JWT creation and cookie setting |
| `backend/utils/validators.js` | Email and password validation |

---

## 📌 Slide 14 — GitHub Checkpoint: MC3

### Commit Message
> `MC3: Backend — Express Server, REST APIs, JWT Auth, Middleware, Controllers, Route Protection`

### Branch Naming
`masterclass-3/backend-apis`

### What's Intentionally Left for MC4
- Controllers return mock data or empty responses — no real database yet
- Models/schemas are not defined yet
- AI service is imported but not implemented yet
- All of this gets completed in MC4 when we add MongoDB and Mongoose

---

## 📌 Slide 15 — Homework for Students

1. **Read an HTTP status code guide** — Look up what HTTP status codes 200, 201, 400, 401, 403, 404, 422, and 500 mean and find a real-life equivalent for each.

2. **Test every route** — Using Thunder Client or Postman, test all the auth routes. Try to trigger each error case (missing fields, wrong password, invalid email format).

3. **Design a new route** — Without writing code, design a route for a "Contact Us" feature. What HTTP method would it use? What URL? What would the request body contain? What would the response look like?

4. **Middleware order matters** — Think about why `app.use(notFound)` and `app.use(errorHandler)` must be placed AFTER all the route registrations in `server.js`. What would happen if they were placed first?

---

## ✅ By the End of MC3, Students Should Be Able To:

- ✅ Create and run an Express.js server with middleware
- ✅ Define REST API routes using `express.Router()`
- ✅ Write controller functions to handle HTTP requests
- ✅ Implement JWT authentication with HTTP-only cookies
- ✅ Protect routes using custom middleware (protect, admin)
- ✅ Handle errors globally using middleware
- ✅ Use environment variables for secrets and configuration
- ✅ Test API endpoints using Thunder Client or Postman
- ✅ Explain the difference between GET, POST, PUT, and DELETE
