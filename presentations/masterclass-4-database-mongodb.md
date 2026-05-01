# 🗄️ Masterclass 4: Data That Works
### Database Design, MongoDB Operations, Schema Modeling & Backend Integration
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — Why Do We Need a Database?

### The Problem Without a Database
Imagine you run a school. Students register, fill in their details, and get their schedules. Now you shut the school for the night. When you open the next morning, without a file system or database, every student's record is completely gone — you'd have to start from scratch every single day.

In the same way, without a database:
- Every time the SkillPath AI backend server restarts, all user data disappears
- There's nowhere to store who registered, what roadmap they generated, or how far they've progressed
- Nothing persists between requests

### Definition
A **Database** is a persistent, organized system for storing, retrieving, and managing data. Data written to a database survives server restarts, crashes, and reboots.

### SQL vs NoSQL: Why MongoDB?

| Feature | SQL (MySQL/PostgreSQL) | MongoDB (NoSQL) |
|---------|----------------------|----------------|
| Data format | Tables with rows and columns | Documents (JSON-like objects) |
| Schema | Fixed and rigid — you must define columns before inserting data | Flexible — documents in the same collection can have different fields |
| Relationships | Foreign keys and JOINs | Object nesting and references |
| Scaling | Scale vertically (bigger server) | Scale horizontally (more servers) |
| JS Integration | Needs an ORM adapter | Native JSON = perfect fit with JavaScript |
| Best for | Highly relational, structured data | Hierarchical, document-like data |

### Why MongoDB is the Right Choice for SkillPath AI
- A user's roadmap contains a nested array of steps — perfectly modeled as a MongoDB document
- JavaScript is used everywhere (React, Node, Express) — MongoDB stores JSON natively
- Flexible schema means we can add new fields to a user profile without a complex database migration
- MongoDB Atlas provides a free, cloud-hosted database with zero infrastructure management

---

## 📌 Slide 2 — MongoDB: Key Concepts

### Real World Analogy
If SQL databases are like **spreadsheets** (rigid rows and columns, like Excel), MongoDB is like a **filing cabinet full of folders**.

- **Database** — The entire filing cabinet (`skillpath` database)
- **Collection** — A labeled folder in the cabinet (`users`, `roadmaps`, `progress`)
- **Document** — A single sheet of paper in a folder (one user's record, one roadmap)
- **Field** — A specific piece of information on the sheet (`name: "Ankush"`, `email: "..."`)

### MongoDB Atlas
We use **MongoDB Atlas** — the cloud-hosted version of MongoDB. Benefits:
- No installation required — just sign up at cloud.mongodb.com
- Free tier available (512MB — more than enough for our project)
- Automatic backups and monitoring
- Connect from anywhere using a connection string (URL)

### File: `backend/config/db.js`
This single file handles the MongoDB connection. It:
1. Uses Mongoose's `connect()` method with the `MONGO_URI` from the `.env` file
2. On success: logs "MongoDB Connected: [cluster host]" to the console
3. On failure: logs the error and exits the process (the server won't run without a DB connection)

Called at startup from `server.js` before any routes are registered.

---

## 📌 Slide 3 — Mongoose: The Bridge Between Node.js and MongoDB

### Definition
**Mongoose** is an ODM (Object-Document Mapper) — a library that sits between your Express controllers and the MongoDB database. It provides:
- **Schemas** — Define the structure and rules for your data
- **Models** — JavaScript classes based on schemas that let you interact with a collection
- **Validation** — Automatically validate data before saving
- **Methods** — Add custom functions to your data models
- **Hooks** — Run code automatically before or after database operations

### Real World Analogy
Mongoose is like a **smart HR department** between your company (controllers) and the employee database:
- It defines what format an employee record must be in (Schema)
- It enforces rules (email must be unique, password must exist)
- It runs checks before a record is saved (hash the password first)
- It provides tools to search, update, and delete records

### Without Mongoose vs With Mongoose

| Without Mongoose | With Mongoose |
|-----------------|---------------|
| Write raw MongoDB queries | Write simple JavaScript object operations |
| No validation — anything can be stored | Schema enforces data structure |
| Need to manually handle ObjectIds | Automatic ID generation and reference handling |
| No hooks | Pre/post hooks for automated operations |

---

## 📌 Slide 4 — Schema Design: User Model

### File: `backend/models/User.js`

The User model is the foundation of the entire application. Every piece of data in the system is eventually linked back to a user.

### Fields Defined

| Field | Type | Rules | Purpose |
|-------|------|-------|---------|
| `name` | String | Required | The user's full name (e.g., "Ankush Kumar") |
| `email` | String | Required, Unique | The unique identifier for login — no two users can share an email |
| `password` | String | Required | Stored as a bcrypt hash, NEVER as plain text |
| `role` | String | Only `'user'` or `'admin'` | Determines access level — regular student or platform admin |
| `isActive` | Boolean | Default: `true` | Admins can set this to `false` to ban a user |
| `createdAt` | Date | Auto | Automatically set by Mongoose timestamps |
| `updatedAt` | Date | Auto | Automatically updated on every save |

### Special Features of This Model

**Password Hashing (Pre-Save Hook):**
Before any new user is saved to the database, Mongoose automatically intercepts the save operation and replaces the plain text password with a bcrypt hash. This means plain text passwords are NEVER stored in the database — even if the database is breached, the passwords are unreadable.

**Password Comparison (Instance Method):**
A custom method `matchPassword(enteredPassword)` is added to every user document. When a user tries to login, this method compares what they typed with the stored hash using bcrypt. If they match, login succeeds.

### Real MongoDB Document (What's Actually Stored)
```
_id:       "65f3a8b2c4d1e2f3..."   (Auto-generated unique ID)
name:      "Ankush Kumar"
email:     "ankush@gmail.com"
password:  "$2a$10$WE..."           (bcrypt hash — unreadable)
role:      "user"
isActive:  true
createdAt: 2026-04-22T10:00:00Z
updatedAt: 2026-04-22T10:00:00Z
```

---

## 📌 Slide 5 — Schema Design: Profile Model

### File: `backend/models/Profile.js`

The Profile model stores the student's learning information — separate from the core User model. Keeping them separate follows the **Single Responsibility Principle** — the User model handles authentication, the Profile model handles learning preferences.

### Fields Defined

| Field | Type | Purpose |
|-------|------|---------|
| `user` | ObjectId (ref: User) | Links this profile to a specific user — the relationship |
| `currentLevel` | String | "beginner", "intermediate", or "advanced" |
| `learningGoal` | String | What the user wants to learn (e.g., "React Development") |
| `weeklyHours` | Number | How many hours/week the student can dedicate |
| `bio` | String | Short personal description shown on profile page |
| `skills` | [String] | Array of technologies the student knows (e.g., ["HTML", "CSS"]) |
| `linkedIn` | String | LinkedIn profile URL |
| `github` | String | GitHub profile URL |

### The Relationship
The `user` field stores the **ObjectId** of the linked User document. This is how MongoDB "joins" two collections. When the backend needs to fetch a user's profile, it queries `Profile.findOne({ user: userId })`. The `ref: 'User'` tells Mongoose which collection to look in when using `.populate()` to expand the reference.

### One-to-One Relationship
Each user has **exactly one** profile (enforced by `unique: true` on the `user` field). You can't create two profiles for the same user.

---

## 📌 Slide 6 — Schema Design: Roadmap Model

### File: `backend/models/Roadmap.js`

The Roadmap model stores the AI-generated learning path for a user. It contains the overall roadmap details AND all the individual steps inside it.

### Parent Schema Fields

| Field | Type | Purpose |
|-------|------|---------|
| `user` | ObjectId (ref: User) | Which user this roadmap belongs to |
| `goal` | String | The learning goal (e.g., "Full-Stack Web Development") |
| `level` | String | beginner / intermediate / advanced |
| `weeklyHours` | Number | Hours per week committed |
| `steps` | Array of Step objects | The actual learning steps |
| `estimatedDuration` | String | e.g., "12 weeks" |
| `aiGenerated` | Boolean | True if AI created it, False if it's a fallback |

### Embedded Step Sub-Schema
Each step inside `steps[]` contains:

| Field | Type | Purpose |
|-------|------|---------|
| `stepNumber` | Number | The order of the step (1, 2, 3...) |
| `title` | String | e.g., "JavaScript Fundamentals" |
| `description` | String | What to learn in this step |
| `duration` | String | e.g., "2 weeks" |
| `resources` | [String] | Keywords or links like ["MDN Docs", "freeCodeCamp"] |

### Embedded vs Referenced Documents
We chose to **embed** steps directly inside the Roadmap document (rather than creating a separate Steps collection) because:
- Steps are ALWAYS fetched together with the roadmap — they're meaningless alone
- Never need to query steps independently
- Embedding is faster (one DB read instead of two)

---

![SkillPath AI Roadmap Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\roadmap_1777288420155.png)
*The Roadmap Page — Each card is one "step" document embedded inside the Roadmap*

---

## 📌 Slide 7 — Schema Design: Progress Model

### File: `backend/models/Progress.js`

Tracks how far a user has come in their roadmap. Linked to both the User and the Roadmap.

### Fields Defined

| Field | Type | Purpose |
|-------|------|---------|
| `user` | ObjectId (ref: User) | Which user's progress |
| `roadmap` | ObjectId (ref: Roadmap) | Which roadmap this tracks |
| `completedSteps` | [Number] | Array of step numbers that have been checked off (e.g., [1, 2, 4]) |
| `percentComplete` | Number | 0–100. Calculated: completed/total × 100 |
| `lastActive` | Date | When the user last interacted with their roadmap |
| `streak` | Number | Consecutive days of activity |

### Instance Method: `updatePercent()`
A custom method added to every Progress document. When called:
1. Fetches the linked Roadmap from MongoDB
2. Calculates: (number of completed steps ÷ total steps) × 100
3. Updates `percentComplete` on the document
4. This is called automatically every time a step is marked complete or incomplete

### How Step Completion Works
- When a user checks "Mark done" on a step → `completedSteps.push(stepNumber)` → `updatePercent()` → save to DB → frontend re-renders with new progress %
- When a user unchecks → `completedSteps.filter(s => s !== stepNumber)` → same recalculation

---

## 📌 Slide 8 — Schema Design: ChatHistory Model

### File: `backend/models/ChatHistory.js`

Stores the entire conversation history between a user and the AI Doubt Assistant.

### Why Store Chat History?
The Groq AI API (LLaMA 3.3 model) is a **stateless API** — it doesn't remember previous messages. To provide a natural, contextual conversation experience, we must send the ENTIRE conversation history with every new message. The backend stores the history in MongoDB and loads it before each AI call.

### Fields Defined

| Field | Type | Purpose |
|-------|------|---------|
| `user` | ObjectId (ref: User) | Which user's chat history |
| `messages` | Array of message objects | The full conversation |

### Embedded Message Sub-Schema
Each message inside `messages[]` contains:

| Field | Type | Purpose |
|-------|------|---------|
| `role` | String | Either `'user'` (student) or `'assistant'` (AI) |
| `content` | String | The actual message text |
| `timestamp` | Date | When the message was sent |

---

![SkillPath AI Chat Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\chat_1777288422811.png)
*The AI Chat Page — Every message is stored as a ChatHistory document in MongoDB*

---

## 📌 Slide 9 — Schema Design: SavedProject Model

### File: `backend/models/SavedProject.js`

When a user finds an AI-recommended project they like, they can save it. This model stores those saved projects.

### Fields Defined

| Field | Type | Purpose |
|-------|------|---------|
| `user` | ObjectId (ref: User) | Which user saved this |
| `title` | String | Project name (e.g., "Todo App with Authentication") |
| `description` | String | What to build |
| `difficulty` | String | beginner / intermediate / advanced |
| `techStack` | [String] | Technologies used (e.g., ["React", "Node.js", "MongoDB"]) |
| `estimatedTime` | String | e.g., "5 days" |

### One-to-Many Relationship
Unlike the Profile (1:1 with User), this is a **one-to-many** relationship. One user can have many saved projects. Each SavedProject has a `user` reference but no `unique` constraint on it.

---

## 📌 Slide 10 — Schema Design: Resource Model

### File: `backend/models/Resource.js`

Learning resources that are curated and managed by admins. These are NOT user-specific — they're platform-wide resources available to all students.

### Fields Defined

| Field | Type | Purpose |
|-------|------|---------|
| `title` | String | Resource name |
| `description` | String | What this resource covers |
| `url` | String | The link to the external resource |
| `category` | String | e.g., "Web Development", "Data Science", "AI/ML" |
| `type` | String | "article", "video", "course", "book", "tool" |
| `difficulty` | String | beginner / intermediate / advanced |
| `tags` | [String] | Search tags |
| `addedBy` | ObjectId (ref: User) | Which admin added this resource |

---

![SkillPath AI Resources Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\resources_1777288440815.png)
*The Resources Page — Cards are Resource documents fetched from MongoDB*

---

## 📌 Slide 11 — All Collections at a Glance

### The Complete Database Relationship Map

```
User  ──────┬──── Profile       (One-to-One)
            ├──── Roadmap       (One-to-One)
            │       └─ steps[]  (Embedded array)
            ├──── Progress      (One-to-One)
            ├──── ChatHistory   (One-to-One)
            │       └─ messages[] (Embedded array)
            └──── SavedProject  (One-to-Many)

Resource  (Standalone — no direct user link except 'addedBy')
```

### Collection Summary Table

| Collection | File | Relationship | Key Purpose |
|------------|------|-------------|-------------|
| `users` | `models/User.js` | Root entity | Authentication and identity |
| `profiles` | `models/Profile.js` | 1:1 with User | Learning preferences |
| `roadmaps` | `models/Roadmap.js` | 1:1 with User | AI-generated learning path |
| `progress` | `models/Progress.js` | 1:1 with Roadmap | Step completion tracking |
| `chathistories` | `models/ChatHistory.js` | 1:1 with User | Conversation memory |
| `savedprojects` | `models/SavedProject.js` | Many:1 with User | User's bookmarked projects |
| `resources` | `models/Resource.js` | Standalone | Admin-curated learning links |

---

## 📌 Slide 12 — CRUD Operations in Action

### Definition
**CRUD** stands for **Create, Read, Update, Delete** — the 4 basic operations for any persistent data storage.

| Operation | Mongoose Method | HTTP Method |
|-----------|----------------|-------------|
| **Create** | `Model.create({...})` or `new Model({}).save()` | POST |
| **Read** | `Model.find({})` / `Model.findOne({filter})` / `Model.findById(id)` | GET |
| **Update** | `Model.findOneAndUpdate(filter, update, options)` | PUT |
| **Delete** | `Model.findOneAndDelete({filter})` | DELETE |
| **Create or Update** | `findOneAndUpdate + { upsert: true }` | POST/PUT |

### Real Example: Marking a Step Complete (Progress Controller)
**File:** `backend/controllers/progressController.js`

When a user clicks "Mark done" on a roadmap step:
1. **Find** the user's Progress document: `Progress.findOne({ user: req.user._id })`
2. **Update** the `completedSteps` array — add or remove the step number
3. **Calculate** the new percentage using `progress.updatePercent()`
4. **Save** the updated document: `progress.save()`
5. **Respond** with the updated progress data

### Real Example: Generating a Roadmap (Roadmap Controller)
**File:** `backend/controllers/roadmapController.js`

When a user completes onboarding and submits their goal:
1. **Call AI Service** → `generateRoadmapWithAI(goal, level, weeklyHours)` → returns roadmap JSON
2. **Upsert Roadmap** → `Roadmap.findOneAndUpdate({ user: userId }, data, { upsert: true, new: true })`
   - `upsert: true` means: "if no roadmap exists for this user, create one; if it does, update it"
   - `new: true` means: "return the updated document, not the old one"
3. **Reset Progress** → Create or reset the progress document for the new roadmap
4. **Respond** with the new roadmap

---

## 📌 Slide 13 — The Groq AI Service Layer

### File: `backend/services/aiService.js`

This is the "brain" of SkillPath AI — the layer that communicates with the Groq AI API to generate intelligent, personalized content.

### What is Groq?
Groq is an AI inference company that provides extremely fast access to open-source large language models (LLMs). SkillPath AI uses their API to run the **LLaMA 3.3 70B** model — a state-of-the-art language model with 70 billion parameters.

### Real World Analogy
Groq's API is like calling a genius consultant. You send them a detailed brief (the prompt), and they quickly reply with expert-level output (the generated content). You don't need to understand how they know what they know — you just send the right question and use the answer.

### 4 AI Functions in the Service

**1. `generateRoadmapWithAI(goal, level, weeklyHours)`**
Sends a carefully crafted prompt to the LLaMA model asking it to generate a structured JSON roadmap. The prompt includes the student's goal, current level, and available hours. The AI returns a JSON object with `estimatedDuration` and an array of `steps`. The service parses this JSON and saves it to MongoDB.

**2. `chatWithAI(messages)`**
Sends the ENTIRE conversation history (all previous messages) plus a system prompt to the AI. The system prompt tells the AI to behave as "SkillPath AI, a friendly and encouraging technical mentor." The AI returns a contextual, relevant response.

**3. `generateStepLesson(topic, description)`**
Given a roadmap step's title and description, asks the AI to generate a mini-lesson on that topic. The lesson includes a summary, key concepts, a practical example, and a pro tip. Returns formatted markdown text.

**4. `generateStepQuiz(topic, description)`**
Given a roadmap step, asks the AI to generate a 3-question multiple-choice quiz. Each question has 4 options, a correct answer index, and an explanation. Returns a JSON array.

### File: `backend/services/fallbackService.js`

**What's a Fallback Strategy?**
If the Groq API is unavailable (no API key configured, API is down, rate limit hit), the app shouldn't crash. The fallback service provides pre-written, rule-based responses so the app continues to work.

- **`generateFallbackRoadmap(goal, level)`** — Returns a generic 3-step roadmap based on the goal and level, without calling any AI
- **`generateFallbackProjects(difficulty)`** — Returns pre-written project ideas based on difficulty level

The `aiService.js` automatically checks: if no API key is configured, use the fallback. If an API call fails, catch the error and use the fallback.

---

## 📌 Slide 14 — Admin Controller: Platform Management

### File: `backend/controllers/adminController.js`

The admin controller provides platform-level operations that only admin users can perform.

### Functions

**`getAdminStats()`** — Returns aggregate counts across the entire platform:
- Total number of registered users
- Total number of generated roadmaps
- Total number of learning resources

Uses MongoDB's `countDocuments()` which counts all documents in a collection matching a filter.

**`getAllUsers()`** — Returns a list of all registered users (excluding their passwords). Used in the Admin Users page to let admins see and manage all accounts.

**`updateUserStatus()`** — Enables or disables a user account by setting `isActive: true` or `false`. A disabled user cannot login (checked in `loginUser` in the auth controller).

**`addResource()`**, **`updateResource()`**, **`deleteResource()`** — Full CRUD for the Resources collection. Admins can add new learning materials, edit existing ones, or remove outdated ones.

---

![SkillPath AI Admin Dashboard](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\admin_1777288480851.png)
*The Admin Dashboard — Shows platform stats fetched live from MongoDB*

---

## 📌 Slide 15 — Projects Page: AI-Powered Recommendations

### File: `backend/controllers/projectController.js`

**`getRecommendations()`** — When a student visits the Projects page:
1. Fetches the student's Profile to get their current skill level
2. Calls `generateProjectRecommendations(difficulty)` from the AI service
3. The AI returns 3 project ideas tailored to that difficulty level
4. Returns them to the frontend for display

---

![SkillPath AI Projects Page](C:\Users\ankus\.gemini\antigravity\brain\57785b6e-a971-4930-85b1-73674bd86be4\projects_1777288437708.png)
*The Projects Page — Each card is an AI-generated project recommendation*

---

## 📌 Slide 16 — MongoDB Atlas: Viewing Live Data

### Why Look at Atlas?
MongoDB Atlas provides a visual interface to browse your database's collections and documents. This is invaluable for:
- Debugging — see exactly what's stored after an API call
- Verification — confirm that data was saved correctly
- Learning — understand the real shape of your documents

### What to Look At in Atlas
After registering a user and generating a roadmap:
1. **users** collection → Your new user document with hashed password
2. **profiles** collection → The profile created during onboarding
3. **roadmaps** collection → The AI-generated roadmap with all steps
4. **progress** collection → The progress tracker (completedSteps: [], percentComplete: 0)
5. **chathistories** collection → Your conversation messages after chatting

---

## 📌 Slide 17 — GitHub Checkpoint: MC4

### Commit Message
> `MC4: Database — MongoDB Schemas, Mongoose Models, CRUD Operations, AI Integration (Groq + Fallback)`

### Branch Naming
`masterclass-4/database-mongodb`

### What Should Be in This Commit
- All 7 Mongoose models in `backend/models/`
- `backend/config/db.js` fully wired
- All controllers fully implemented with real MongoDB operations
- `backend/services/aiService.js` with all 4 AI functions
- `backend/services/fallbackService.js`
- Admin controller with stats, user management, resource CRUD

### What's Intentionally Left for MC5
- The frontend doesn't call any of these APIs yet — it's still using mock/console data
- No deployment — the app only runs locally
- All frontend-backend wiring happens in Masterclass 5

---

## 📌 Slide 18 — Homework for Students

1. **Explore Atlas** — Register a user on your local app, generate a roadmap, mark a step complete. Then open MongoDB Atlas and find all the documents that were created. Screenshot them.

2. **Understand upsert** — Research what "upsert" means in databases. Find the line in `roadmapController.js` where it's used and explain in your own words why it's needed there.

3. **Design a new schema** — Design a schema for a "Certificate" model. What fields would it need? How would it relate to the User? Would it be 1:1 or 1:many?

4. **Explore the AI service** — Change the system prompt in `chatWithAI()` to make the AI speak like a pirate. Test it in the chat page and observe how the system prompt controls the AI's personality.

---

## ✅ By the End of MC4, Students Should Be Able To:

- ✅ Explain what MongoDB is and why it's chosen for MERN apps
- ✅ Design MongoDB schemas with Mongoose including data types and validation rules
- ✅ Create relationships between collections using ObjectId references
- ✅ Perform all CRUD operations using Mongoose methods
- ✅ Add instance methods and pre-save hooks to schemas
- ✅ Integrate the Groq AI API into a Node.js backend
- ✅ Design a fallback strategy for graceful degradation when an API is unavailable
- ✅ View and understand live MongoDB documents in Atlas
- ✅ Build an admin system with role-based CRUD operations
