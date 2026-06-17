# 🗄️ Masterclass 5: Data That Works
### MongoDB, Mongoose Schemas, CRUD Operations & Groq AI Integration
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — Why We Need a Database

### The Problem Without a Database
Imagine you run a school. Students arrive in the morning, fill in their details, and get their schedules. At night, you shut the school. The next morning, without any record-keeping system, **every student's information is completely gone** — you'd have to start fresh every day.

In the same way, without a database, our SkillPath AI backend:
- Loses all user accounts every time the server restarts
- Has nowhere to save generated roadmaps
- Cannot track anyone's progress
- Forgets every chat message instantly

### Definition
A **Database** is a persistent, organized system for storing, retrieving, and managing data. Data written to a database **survives server restarts, crashes, and power outages**.

### What We Already Have
After MC4, our backend accepts and processes API requests perfectly — but the controllers return mock/stub data. In MC5, we replace every stub with **real MongoDB operations**. When a user registers, their account is written to MongoDB. When they generate a roadmap, it's stored in MongoDB. Everything becomes real.

---

## 📌 Slide 2 — SQL vs NoSQL: Why MongoDB?

### The Two Main Database Families

**SQL Databases** (MySQL, PostgreSQL):
- Store data in **tables** — like spreadsheets with rows and columns
- Rigid schema — you must define all columns before inserting data
- Relationships via foreign keys and JOIN operations
- ACID transactions — rock-solid consistency for financial data

**NoSQL Databases** (MongoDB, Firebase, Redis):
- Store data as **documents** — JSON-like objects
- Flexible schema — documents in the same collection can have different fields
- Nested objects and arrays instead of JOINs
- Scales horizontally — add more servers instead of bigger servers

### Detailed Comparison

| Feature | SQL (PostgreSQL) | MongoDB (NoSQL) |
|---------|-----------------|----------------|
| Data format | Tables with fixed columns | JSON documents (flexible) |
| Schema | Rigid — must define upfront | Flexible — add fields anytime |
| Relationships | Foreign keys + JOINs | ObjectId references + .populate() |
| Nested data | Complex (multiple tables) | Natural (nested objects/arrays) |
| Scaling | Vertically (bigger server) | Horizontally (more servers) |
| JS Integration | Needs ORM adapter (Sequelize) | Native JSON = perfect JS fit |
| Learning curve | SQL query language | JavaScript-like API |

### Why MongoDB is Perfect for SkillPath AI

1. **Nested data is natural**: A user's roadmap contains an array of steps. In MongoDB, we embed the steps array directly inside the roadmap document. In SQL, this would require a separate `steps` table with a foreign key.

2. **Flexible schema for iteration**: As we add features, we might add new fields to user profiles. MongoDB handles this without migration scripts.

3. **JavaScript native**: Our entire stack is JavaScript (React, Node.js, Express). MongoDB stores and returns JSON natively — no type conversion needed.

4. **MongoDB Atlas**: Free tier, cloud-hosted, zero infrastructure management — perfect for a student project that needs to work reliably.

---

---
## 🗳️ ZOOM POLL 1 — Why MongoDB?
> ⏱️ **Share this poll:** After Slide 2 (SQL vs NoSQL comparison). Critical architectural decision check.

**Question: In MongoDB, how would you store a user's roadmap with 8 steps?**
*(Single Choice)*

A) Create a separate `steps` table with a foreign key linking back to the `roadmaps` table — like SQL
B) Embed the steps array directly inside the roadmap document as a nested JSON array
C) Store each step as a separate collection with no relationship to the roadmap
D) Store the steps as a comma-separated string in a single `steps` field

✅ **Correct Answer:** B

> 💬 **Instructor note:** This is MongoDB's biggest advantage over SQL for our use case. Steps are always fetched WITH the roadmap — they're meaningless alone. Embedding means ONE database query gets both. In SQL you'd need a JOIN across two tables.

---

## 📌 Slide 3 — MongoDB: Key Concepts with Real Examples

### The Vocabulary

| SQL Term | MongoDB Equivalent | SkillPath AI Example |
|----------|-------------------|---------------------|
| Database | Database | `skillpath` database |
| Table | Collection | `users`, `roadmaps`, `progress` |
| Row | Document | One user's complete record |
| Column | Field | `name`, `email`, `password` |
| Primary Key | `_id` (ObjectId) | Auto-generated unique ID |
| Foreign Key | ObjectId reference | `user: ObjectId('65f3a...')` |
| JOIN | `.populate()` | Expand ObjectId ref to full document |

### A Real MongoDB Document
```json
// One document in the 'users' collection:
{
  "_id": "65f3a8b2c4d1e2f3a4b5c6d7",
  "name": "Ankush Kumar",
  "email": "ankush@gmail.com",
  "password": "$2a$10$WE8uXvHJIo...",
  "role": "user",
  "isActive": true,
  "createdAt": "2026-04-22T10:00:00.000Z",
  "updatedAt": "2026-04-22T10:00:00.000Z"
}
```

### MongoDB Atlas Setup
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **free cluster** (M0 tier — 512MB, perfect for our project)
3. Create a **database user** with username and password
4. Add your **IP address** to the whitelist (or use 0.0.0.0/0 to allow all)
5. Click **"Connect"** → **"Connect your application"** → Copy the connection string
6. Paste the connection string into your `.env` as `MONGO_URI`

### File: `backend/config/db.js`
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1); // Exit process with failure — server shouldn't run without DB
  }
};

export default connectDB;
```

---

## 📌 Slide 4 — Mongoose: The Bridge Between Node.js and MongoDB

### Definition
**Mongoose** is an **ODM (Object-Document Mapper)** — a library that sits between your Express controllers and MongoDB. It provides:
- **Schemas**: Define the shape and validation rules for your data
- **Models**: JavaScript classes based on schemas that represent a MongoDB collection
- **Validation**: Automatically validates data before saving (prevents bad data from entering the DB)
- **Methods**: Add custom functions to your documents
- **Hooks**: Run code automatically before/after database operations

### Real World Analogy
Mongoose is like a **smart HR department** between your company (controllers) and the employee database (MongoDB):
- It defines the required format for an employee record (Schema — `name` required, `email` unique)
- It enforces rules (you can't save a user without an email)
- It runs automated checks before saving (hash the password before storing)
- It provides easy tools to find, update, and delete records

### Without Mongoose vs With Mongoose

| Without Mongoose | With Mongoose |
|-----------------|---------------|
| `db.collection('users').insertOne({ name, email, password })` | `User.create({ name, email, password })` |
| No validation — ANY data can be inserted | Schema enforces `required`, `unique`, `enum` |
| Manual error handling for duplicates | Automatic duplicate key error |
| No pre-save hooks | `userSchema.pre('save', async function() { ... })` |
| Manual ObjectId management | Automatic `_id` generation and reference population |

---

---
## 🗳️ ZOOM POLL 2 — Mongoose Basics
> ⏱️ **Share this poll:** After Slide 4 (Mongoose). Tests the ODM concept before schemas are introduced.

**Question: What does Mongoose's schema validation actually prevent?**
*(Single Choice)*

A) SQL injection attacks on the database
B) Saving a document to MongoDB that is missing required fields or has wrong data types
C) Duplicate database connections being opened simultaneously
D) Users from accessing the API without a valid JWT token

✅ **Correct Answer:** B

> 💬 **Instructor note:** Without Mongoose, MongoDB accepts ANY object you throw at it — even `{ banana: true }` into the users collection. Mongoose's schema defines the contract: if `email` is required and you try to save a user without one, Mongoose throws an error BEFORE the data reaches the database.

---

## 📌 Slide 5 — Schema Design: User Model

### File: `backend/models/User.js`

The User model is the **foundation of the entire application**. Every other model references a User document. It handles identity and authentication.

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,  // Remove leading/trailing whitespace automatically
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,  // MongoDB creates an index — duplicate emails throw an error
    lowercase: true,  // Store emails in lowercase for consistent comparison
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Only these two values are allowed
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,  // New accounts are active by default
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});
```

### The Pre-Save Hook: Automatic Password Hashing
```javascript
// This runs BEFORE every .save() call on a User document
userSchema.pre('save', async function(next) {
  // Only hash if the password field was modified (prevents re-hashing on other saves)
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a "salt" — random data added to the password before hashing
  // 10 = cost factor (determines how computationally expensive hashing is)
  const salt = await bcrypt.genSalt(10);

  // Replace plain text password with the hash
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

**Why salt?** Without salt, if two users have the same password, their hashes would be identical — an attacker could compare hashes to find users with the same password. The salt is a unique random string added to each password before hashing, making every hash unique even for identical passwords.

### Instance Method: Password Comparison
```javascript
// An "instance method" is a function available on every document fetched from MongoDB
userSchema.methods.matchPassword = async function(enteredPassword) {
  // bcrypt.compare() hashes the entered password with the stored salt and compares
  return await bcrypt.compare(enteredPassword, this.password);
};
```

Used in the login controller:
```javascript
const isMatch = await user.matchPassword(password); // Returns true or false
```

### The Actual Document Stored in MongoDB
```json
{
  "_id": "65f3a8b2c4d1e2f3a4b5c6d7",
  "name": "Ankush Kumar",
  "email": "ankush@gmail.com",
  "password": "$2a$10$WE8uXvHJIoR4KiM4vIX3..",  ← Unreadable hash
  "role": "user",
  "isActive": true,
  "createdAt": "2026-04-22T10:00:00.000Z",
  "updatedAt": "2026-04-22T10:00:00.000Z"
}
```

---

## 📌 Slide 6 — Schema Design: Profile Model

### File: `backend/models/Profile.js`

The Profile model stores learning preferences — separate from the User model. This separation follows the **Single Responsibility Principle**: one model handles authentication data, another handles learning data.

```javascript
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // The type is a MongoDB ID
    ref: 'User',                            // Which collection to reference
    required: true,
    unique: true,  // Each user has exactly ONE profile (1:1 relationship)
  },
  currentLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  learningGoal: {
    type: String,
    default: '',
  },
  weeklyHours: {
    type: Number,
    default: 10,
    min: 1,
    max: 168,  // Maximum hours in a week
  },
  bio: String,
  skills: [String],   // Array of strings: ['JavaScript', 'React', 'CSS']
  linkedin: String,
  github: String,
}, { timestamps: true });
```

### ObjectId References: How MongoDB "Joins" Collections
```javascript
// Fetching a profile by userId:
const profile = await Profile.findOne({ user: req.user._id });
// Returns: { user: "65f3a...", currentLevel: "beginner", goal: "React Dev", ... }

// Fetching profile WITH user data expanded (using .populate()):
const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'name email');
// Returns: { user: { name: "Ankush", email: "..." }, currentLevel: "beginner", ... }
```

`.populate('user', 'name email')` means: "replace the `user` ObjectId with the actual User document, but only include the `name` and `email` fields."

---

## 📌 Slide 7 — Schema Design: Roadmap Model

### File: `backend/models/Roadmap.js`

The Roadmap model stores the AI-generated learning path. It uses **embedded subdocuments** for the steps — a key MongoDB design decision.

```javascript
// Sub-schema for individual roadmap steps
const stepSchema = new mongoose.Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },      // e.g., "2 weeks"
  resources: [String],                              // e.g., ["MDN Docs", "freeCodeCamp"]
}, { _id: false });  // Don't auto-generate _id for each step

const roadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,  // One roadmap per user (will be replaced on regeneration)
  },
  goal: { type: String, required: true },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  weeklyHours: { type: Number, required: true },
  steps: [stepSchema],          // Embedded array of step sub-documents
  estimatedDuration: String,    // e.g., "12 weeks"
  aiGenerated: { type: Boolean, default: true },
}, { timestamps: true });
```

### Embedded vs Referenced Documents

This is one of the most important design decisions in MongoDB schema design:

**Embed (what we do for steps):**
- Steps are ALWAYS fetched with the roadmap — they're meaningless alone
- We never need to query "give me just step #3 from all roadmaps"
- One database query fetches the roadmap AND all steps
- Best rule: **embed if always fetched together**

**Reference (what we do for user → roadmap):**
- Users exist independently — you might fetch a user without needing their roadmap
- Avoids storing a huge roadmap document inside every user document
- Best rule: **reference if queried independently**

---

---
## 🗳️ ZOOM POLL 3 — Embedded vs Referenced
> ⏱️ **Share this poll:** After Slide 7 (Roadmap model — Embedded vs Referenced). Core MongoDB design decision.

**Question: We embed steps INSIDE the Roadmap document instead of creating a separate `Steps` collection. Which reason best explains this decision?**
*(Single Choice)*

A) Embedded documents are always faster to save than referenced documents
B) Steps are always loaded WITH the roadmap and are meaningless without it — embedding avoids a second database query
C) MongoDB has a strict limit on the number of collections allowed per database
D) The steps would take too much storage space in a separate collection

✅ **Correct Answer:** B

> 💬 **Instructor note:** The golden rule: **"Embed if always fetched together, reference if queried independently."** A roadmap without its steps is useless. But a User can be fetched independently (for profile) without needing the roadmap. So User → Roadmap is referenced.

---

## 📌 Slide 8 — Schema Design: Progress Model

### File: `backend/models/Progress.js`

Tracks how far a user has progressed in their roadmap.

```javascript
const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  roadmap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true,
  },
  completedSteps: {
    type: [Number],  // Array of step numbers: [1, 2, 4] means steps 1, 2, 4 are done
    default: [],
  },
  percentComplete: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  streak: {
    type: Number,
    default: 0,  // Consecutive days of activity
  },
}, { timestamps: true });
```

### Instance Method: `updatePercent()`
```javascript
progressSchema.methods.updatePercent = async function() {
  // Fetch the linked roadmap to know the total number of steps
  const roadmap = await mongoose.model('Roadmap').findById(this.roadmap);
  if (!roadmap || roadmap.steps.length === 0) {
    this.percentComplete = 0;
    return;
  }

  // Calculate percentage: completed / total × 100
  this.percentComplete = Math.round(
    (this.completedSteps.length / roadmap.steps.length) * 100
  );
};

// In the progressController — called whenever a step is toggled:
const progress = await Progress.findOne({ user: req.user._id });
progress.completedSteps = updatedCompleted;
await progress.updatePercent();  // Calculate new percentage
progress.lastActive = new Date();
await progress.save();           // Write the updated document to MongoDB
```

### How Step Completion Works End-to-End
```
User checks "Mark Done" on Step 3
→ PUT /api/progress/step { stepNumber: 3, completed: true }
→ protect middleware (verifies JWT)
→ progressController.updateStep()
→ Find Progress document: Progress.findOne({ user: req.user._id })
→ Add 3 to completedSteps: [...completedSteps, 3]
→ progress.updatePercent() recalculates percentComplete
→ progress.save() writes to MongoDB
→ Respond with updated progress data
→ Frontend updates progress bar immediately
```

---

## 📌 Slide 9 — Schema Design: ChatHistory Model

### File: `backend/models/ChatHistory.js`

Stores the full conversation history between a user and the AI.

```javascript
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],  // 'user' = student, 'assistant' = AI
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { _id: false });

const chatHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,  // One chat history per user
  },
  messages: [messageSchema],  // Embedded array of all messages
}, { timestamps: true });
```

### Why We Store the Entire History: The Stateless API Problem
The Groq API is **completely stateless** — every API call starts fresh with no memory of previous calls. To maintain a natural conversation:

1. User sends a new message: "Explain closures in JavaScript"
2. Backend fetches the ENTIRE chat history from MongoDB: all previous messages
3. Backend builds the request to Groq: system prompt + all previous messages + the new message
4. Groq sees the full context and gives a contextually relevant answer
5. Backend adds both the user's message and the AI's response to the history
6. Save the updated history to MongoDB

Without this pattern, every AI response would be completely disconnected from the previous conversation.

```javascript
// In chatController.js — building the AI request:
const chatHistory = await ChatHistory.findOne({ user: req.user._id });
const messages = chatHistory ? chatHistory.messages : [];

// Send full history to AI:
const aiResponse = await chatWithAI([
  ...messages,
  { role: 'user', content: newMessage }  // Add the new message at the end
]);

// Append both user message and AI response to history:
chatHistory.messages.push(
  { role: 'user', content: newMessage },
  { role: 'assistant', content: aiResponse }
);
await chatHistory.save();
```

---

## 📌 Slide 10 — Additional Schema Designs

### File: `backend/models/SavedProject.js`
```javascript
const savedProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // NOTE: No 'unique: true' here — one user can save MANY projects (one-to-many)
  },
  title: { type: String, required: true },
  description: String,
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  techStack: [String],       // ["React", "Node.js", "MongoDB"]
  estimatedTime: String,     // "5 days"
}, { timestamps: true });
```

**Relationship type:** One user → many saved projects. There is NO `unique: true` on the `user` field — the same user can save multiple project documents.

### File: `backend/models/Resource.js`
```javascript
const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  url: { type: String, required: true },
  category: {
    type: String,
    enum: ['Web Development', 'Data Science', 'AI/ML', 'Mobile', 'DevOps', 'Other'],
    required: true,
  },
  type: {
    type: String,
    enum: ['article', 'video', 'course', 'book', 'tool'],
    default: 'article',
  },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  tags: [String],
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Which admin added it
}, { timestamps: true });
```

Resources are **not user-specific** — they're platform-wide content curated by admins. Any logged-in user can browse them.

---

## 📌 Slide 11 — The Complete Database Relationship Map

```
User (Foundation — every model links here)
│
├── Profile         (One-to-One with User)
│   └── Fields: currentLevel, learningGoal, weeklyHours, bio, skills, linkedin, github
│
├── Roadmap         (One-to-One with User)
│   └── steps[]     (Embedded array — NOT a separate collection)
│       └── stepNumber, title, description, duration, resources[]
│
├── Progress        (One-to-One with Roadmap)
│   └── Fields: completedSteps[], percentComplete, lastActive, streak
│
├── ChatHistory     (One-to-One with User)
│   └── messages[]  (Embedded array)
│       └── role ('user' | 'assistant'), content, timestamp
│
└── SavedProject    (One-to-Many with User)
    └── Fields: title, description, difficulty, techStack[], estimatedTime

Resource          (Standalone — no direct user dependency except addedBy)
└── Fields: title, description, url, category, type, difficulty, tags[], addedBy
```

### Collection Summary

| Collection | File | Relationship | Key Purpose |
|------------|------|-------------|-------------|
| `users` | `User.js` | Root entity | Authentication + identity |
| `profiles` | `Profile.js` | 1:1 with User | Learning preferences |
| `roadmaps` | `Roadmap.js` | 1:1 with User | AI-generated learning path |
| `progress` | `Progress.js` | 1:1 with Roadmap | Step completion tracking |
| `chathistories` | `ChatHistory.js` | 1:1 with User | Conversation memory |
| `savedprojects` | `SavedProject.js` | Many:1 with User | User's bookmarked projects |
| `resources` | `Resource.js` | Standalone | Platform-curated learning links |

---

## 📌 Slide 12 — CRUD Operations in Action

### The 5 Mongoose Operations You'll Use Most

| Operation | Mongoose Method | Returns |
|-----------|----------------|---------|
| **Create** | `User.create({ name, email, password })` | The created document |
| **Read All** | `User.find({})` | Array of all documents |
| **Read One** | `User.findOne({ email })` | Single document or null |
| **Read by ID** | `User.findById(id)` | Single document or null |
| **Update** | `Roadmap.findOneAndUpdate(filter, update, options)` | Updated document |
| **Upsert** | `findOneAndUpdate({ upsert: true })` | Create if not exists, update if exists |
| **Delete** | `Resource.findOneAndDelete({ _id: id })` | Deleted document |
| **Count** | `User.countDocuments({})` | Number |

### Real Example 1: Generating a Roadmap (Upsert)
```javascript
// roadmapController.js
export const regenerateRoadmap = async (req, res) => {
  const { goal, level, weeklyHours } = req.body;
  const userId = req.user._id;

  // Call Groq AI to generate the roadmap structure
  const generatedRoadmap = await generateRoadmapWithAI(goal, level, weeklyHours);

  // Upsert: "If this user already has a roadmap, replace it. If not, create one."
  const roadmap = await Roadmap.findOneAndUpdate(
    { user: userId },         // Filter: find the roadmap for this user
    {                          // Update: replace with new data
      goal,
      level,
      weeklyHours,
      steps: generatedRoadmap.steps,
      estimatedDuration: generatedRoadmap.estimatedDuration,
      aiGenerated: true,
    },
    {
      new: true,     // Return the UPDATED document (not the old one)
      upsert: true,  // CREATE if no roadmap exists for this user
    }
  );

  // Reset progress (new roadmap = start from 0)
  await Progress.findOneAndUpdate(
    { user: userId },
    { roadmap: roadmap._id, completedSteps: [], percentComplete: 0 },
    { upsert: true, new: true }
  );

  res.json({ roadmap });
};
```

### Real Example 2: Marking a Step Complete
```javascript
// progressController.js
export const updateStep = async (req, res) => {
  const { stepNumber, completed } = req.body;
  const userId = req.user._id;

  // 1. Find the user's progress document
  const progress = await Progress.findOne({ user: userId });
  if (!progress) {
    res.status(404);
    throw new Error('Progress not found — complete onboarding first');
  }

  // 2. Update the completedSteps array immutably
  if (completed) {
    // Add stepNumber if not already in the array
    if (!progress.completedSteps.includes(stepNumber)) {
      progress.completedSteps.push(stepNumber);
    }
  } else {
    // Remove the stepNumber from the array
    progress.completedSteps = progress.completedSteps.filter(s => s !== stepNumber);
  }

  // 3. Recalculate the percentage
  await progress.updatePercent();

  // 4. Update the lastActive timestamp and streak
  progress.lastActive = new Date();

  // 5. Save the updated document back to MongoDB
  await progress.save();

  // 6. Respond with the updated progress
  res.json({
    completedSteps: progress.completedSteps,
    percentComplete: progress.percentComplete,
    streak: progress.streak,
  });
};
```

---

## 📌 Slide 13 — The Groq AI Service Layer

### File: `backend/services/aiService.js`

This is the "brain" of SkillPath AI — the layer that communicates with the Groq AI API to generate personalized educational content.

### What is Groq?
Groq is an AI inference company that provides extremely fast access to powerful, open-source large language models (LLMs). SkillPath AI uses their API to run the **LLaMA 3.3 70B** model — 70 billion parameter language model from Meta.

**LLaMA 3.3 70B in numbers:**
- 70 billion parameters (the "knobs" that were tuned during training)
- Trained on trillions of words of text from the internet, books, and code
- Capable of generating coherent, contextual text on any technical topic
- Groq's hardware runs it at ~500 tokens/second — nearly instant for our use cases

### Setting Up the Groq SDK
```javascript
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// The model we use:
const MODEL = 'llama-3.3-70b-versatile';
```

### AI Function 1: `generateRoadmapWithAI(goal, level, weeklyHours)`
```javascript
export const generateRoadmapWithAI = async (goal, level, weeklyHours) => {
  const prompt = `
    Create a structured learning roadmap for someone who wants to learn: ${goal}
    Current skill level: ${level}
    Available time: ${weeklyHours} hours per week

    Return a JSON object (no markdown, just pure JSON) with this exact structure:
    {
      "estimatedDuration": "X weeks",
      "steps": [
        {
          "stepNumber": 1,
          "title": "Step Title",
          "description": "Detailed description of what to learn in this step",
          "duration": "X weeks",
          "resources": ["Resource 1", "Resource 2"]
        }
      ]
    }

    Important guidelines:
    - Create between 5-10 steps appropriate for the level
    - Each step should be achievable within the given weekly hours
    - Progress logically from fundamentals to advanced topics
    - Keep descriptions practical and actionable
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: MODEL,
    temperature: 0.7,    // Controls creativity (0 = deterministic, 1 = very creative)
    max_tokens: 2000,    // Maximum length of the response
  });

  const responseText = completion.choices[0].message.content;

  // Parse the JSON response from the AI
  try {
    const roadmapData = JSON.parse(responseText);
    return roadmapData;
  } catch {
    // AI sometimes adds markdown fences — strip them and try again
    const cleaned = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  }
};
```

### AI Function 2: `chatWithAI(messages)` — The Chat System
```javascript
export const chatWithAI = async (messages) => {
  const systemPrompt = `You are SkillPath AI, a friendly, encouraging, and knowledgeable technical mentor. 
  Your role is to help students understand coding concepts, debug their code, and stay motivated on their learning journey.

  Guidelines:
  - Explain concepts clearly with real examples and analogies
  - Be encouraging — students are learning and making mistakes is normal
  - When showing code, use proper formatting with code blocks
  - Keep responses concise but complete — no unnecessary padding
  - If a student seems frustrated, acknowledge their effort before explaining
  - Always relate answers back to practical, real-world applications`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,  // Full conversation history
    ],
    model: MODEL,
    temperature: 0.8,   // Slightly higher creativity for conversational tone
    max_tokens: 1000,
  });

  return completion.choices[0].message.content;
};
```

### AI Function 3: `generateStepLesson(topic, description)`
```javascript
export const generateStepLesson = async (topic, description) => {
  const prompt = `
    Create a focused mini-lesson on: "${topic}"
    Context: ${description}

    Structure the lesson exactly like this (use markdown):
    ## Summary
    [One clear sentence explaining what this topic is]

    ## Core Concepts
    - [Key concept 1 with brief explanation]
    - [Key concept 2]
    - [Key concept 3]
    - [Key concept 4 if applicable]

    ## Practical Example
    [A real code example or concrete step-by-step walkthrough]

    ## Pro Tip 💡
    [One advanced insight or common mistake to avoid]

    Keep the total lesson under 400 words. Be specific and practical.
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: MODEL,
    temperature: 0.6,
    max_tokens: 800,
  });

  return completion.choices[0].message.content;
};
```

### AI Function 4: `generateStepQuiz(topic, description)`
```javascript
export const generateStepQuiz = async (topic, description) => {
  const prompt = `
    Create exactly 3 multiple-choice questions to test understanding of: "${topic}"
    Context: ${description}

    Return a JSON array (no markdown) in this exact format:
    [
      {
        "question": "The question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctIndex": 0,
        "explanation": "Clear explanation of why the correct answer is right"
      }
    ]

    Guidelines:
    - Questions should test understanding, not just memorization
    - Make incorrect options plausible (not obviously wrong)
    - Explanations should reinforce the learning objective
    - Mix conceptual and practical questions
  `;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: MODEL,
    temperature: 0.5,
    max_tokens: 1000,
  });

  const responseText = completion.choices[0].message.content;
  const cleaned = responseText.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
};
```

---

## 📌 Slide 14 — The Fallback Service: Graceful Degradation

### File: `backend/services/fallbackService.js`

**What's a Fallback Strategy?**
The Groq API might be unavailable (network issue, API is down, rate limit exceeded, no API key configured). Without a fallback, the app would crash or show errors for its core features.

The fallback service provides **pre-written, rule-based content** so the app continues to work even without AI.

```javascript
// Fallback roadmaps — rule-based, not AI-generated
export const generateFallbackRoadmap = (goal, level) => {
  const roadmaps = {
    beginner: {
      estimatedDuration: "12 weeks",
      steps: [
        {
          stepNumber: 1,
          title: `${goal} — Foundations`,
          description: `Start with the fundamental concepts of ${goal}. Build a strong base before moving forward.`,
          duration: "3 weeks",
          resources: ["Official Documentation", "freeCodeCamp", "YouTube tutorials"]
        },
        // ... more steps
      ]
    },
    intermediate: { /* ... */ },
    advanced: { /* ... */ }
  };

  return roadmaps[level] || roadmaps.beginner;
};
```

### How the AI Service Uses the Fallback
```javascript
// In aiService.js:
export const generateRoadmapWithAI = async (goal, level, weeklyHours) => {
  // If no API key is configured, use fallback immediately
  if (!process.env.GROQ_API_KEY) {
    console.log('⚠️ No Groq API key — using fallback roadmap');
    return generateFallbackRoadmap(goal, level);
  }

  try {
    // Try the AI generation
    const completion = await groq.chat.completions.create({ ... });
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    // AI failed — fall back gracefully
    console.error('Groq API error, using fallback:', error.message);
    return generateFallbackRoadmap(goal, level);
  }
};
```

---

## 📌 Slide 15 — Updating Controllers: Stubs → Real Database

### The Transition from MC4 to MC5
In MC4, all controllers (except auth) returned mock data. Now we replace every stub with real Mongoose operations.

### Updated `roadmapController.js`
```javascript
import Roadmap from '../models/Roadmap.js';
import Progress from '../models/Progress.js';
import { generateRoadmapWithAI } from '../services/aiService.js';

export const getMyRoadmap = async (req, res) => {
  // Real database query — no more mock data
  const roadmap = await Roadmap.findOne({ user: req.user._id });
  const progress = await Progress.findOne({ user: req.user._id });

  if (!roadmap) {
    return res.json({ roadmap: null, progress: null });
  }

  res.json({ roadmap, progress });
};
```

### The Admin Stats Controller
```javascript
// adminController.js
export const getAdminStats = async (req, res) => {
  // MongoDB's countDocuments() efficiently counts records without loading them all
  const [totalUsers, totalRoadmaps, totalResources] = await Promise.all([
    User.countDocuments({}),
    Roadmap.countDocuments({}),
    Resource.countDocuments({}),
  ]);

  // Promise.all() runs all 3 queries in PARALLEL — much faster than sequential
  res.json({ totalUsers, totalRoadmaps, totalResources });
};
```

---

## 📌 Slide 16 — Viewing Data in MongoDB Atlas

### Why Look at Atlas During Development?
MongoDB Atlas provides a web-based interface to browse your database. This is invaluable for:
- **Debugging**: See exactly what's stored after each API call
- **Verification**: Confirm that data was saved with the correct shape
- **Learning**: Understand the real structure of your documents vs. your schema definition

### What to Look For After Testing

After registering a user and generating a roadmap:
1. **`users` collection** → Your new user document — notice the password is a hash like `$2a$10$WE...`
2. **`profiles` collection** → Created during onboarding — check the `user` ObjectId matches
3. **`roadmaps` collection** → The AI-generated roadmap — expand the `steps` array to see all steps
4. **`progress` collection** → `completedSteps: []`, `percentComplete: 0` — starts empty
5. **`chathistories` collection** → After sending a chat message, see the embedded messages array

---

## 📌 Slide 17 — GitHub Checkpoint: MC5

### Commit Message
> `MC5: Database — MongoDB Schemas, Mongoose Models, CRUD Operations, Groq AI Integration, Fallback Service`

### Branch Naming
`masterclass-5/database-mongodb`

### What Should Be in This Commit
- All 7 Mongoose models in `backend/models/`
- `backend/config/db.js` fully wired to Atlas
- All controllers updated from stubs to real Mongoose operations
- `backend/services/aiService.js` with all 4 AI functions
- `backend/services/fallbackService.js`
- Admin controller with real stats and CRUD

### What's Intentionally Left for MC6
- The frontend is still showing mock data — no real API calls from React yet
- Login on the frontend doesn't actually authenticate against the database
- Dashboard shows hardcoded numbers
- All frontend-backend connection happens in MC6

---

## ✅ By the End of MC5, Students Should Be Able To:

- ✅ Explain the difference between SQL and NoSQL databases and why MongoDB was chosen
- ✅ Set up and connect to MongoDB Atlas from a Node.js application
- ✅ Design Mongoose schemas with data types, validation rules, and relationships
- ✅ Differentiate between embedded subdocuments and referenced ObjectIds — and know when to use each
- ✅ Implement all CRUD operations using Mongoose methods
- ✅ Add pre-save hooks for automated operations (password hashing)
- ✅ Add instance methods to schemas (password comparison, percent calculation)
- ✅ Integrate the Groq AI API to generate roadmaps, lessons, quizzes, and chat responses
- ✅ Design a fallback strategy so the app works even when the AI API is unavailable
- ✅ View and understand live MongoDB documents in Atlas

---

## 🎮 Two Truths and One Lie — MC5

---

### 🔴 Round 1 — About MongoDB

- 🟢 MongoDB stores data as JSON-like documents, making it a natural fit for JavaScript apps that already work with JSON objects.
- 🟢 MongoDB Atlas provides a free tier with 512MB storage — more than enough to run the entire SkillPath AI project with hundreds of users.
- 🔴 MongoDB has a rigid schema — once you define your collection and insert documents, you cannot add new fields to future documents without running a migration script.

> **🎯 The Lie:** MongoDB has a **flexible schema**. You can add new fields to any document at any time — new documents can have fields that old documents don't have, and old documents still work fine. This is one of MongoDB's biggest advantages for evolving products.

---

### 🔴 Round 2 — About Mongoose Hooks and Methods

- 🟢 The `pre('save')` hook in the User model runs automatically before every `.save()` call — we use it to hash the password so plain text passwords are never stored.
- 🟢 The `isModified('password')` check in the pre-save hook prevents re-hashing an already-hashed password when the user updates their name or bio (which also trigger `.save()`).
- 🔴 An "instance method" added to a Mongoose schema is only available if you call it immediately after creating a document with `User.create()` — it's not available on documents fetched with `User.findOne()`.

> **🎯 The Lie:** Instance methods are available on **any document fetched from MongoDB** — whether created with `.create()`, `.findOne()`, `.findById()`, or any other method. Mongoose attaches instance methods to every document object it creates, regardless of how it was fetched.

---

### 🔴 Round 3 — About the AI Service

- 🟢 The Groq AI API is stateless — it has no memory between API calls, which is why we must send the entire conversation history with every new chat message.
- 🟢 The fallback service prevents the app from crashing when the Groq API is unavailable — it returns pre-written roadmaps and project ideas based on the user's level.
- 🔴 The `temperature` parameter in the Groq API request makes the responses generate faster — a higher temperature means quicker response time.

> **🎯 The Lie:** `temperature` controls **creativity/randomness**, NOT speed. `temperature: 0` = very deterministic (same input almost always gives same output). `temperature: 1` = very creative/random. Speed is determined by the model size, hardware (Groq's specialized chips), and the length of the prompt/response.

---

## 🙋 Mid-Class Questions — MC5

1. **"Look at our User model — the password is stored as `$2a$10$WE...`. If a student forgets their password, can you as the admin look at this and tell them what their password is? Why or why not?"**
   *(Expected: No — bcrypt is a one-way hash. It cannot be reversed. The only correct solution is a "Forgot Password" flow that sends a reset link via email. This is why even database admins can't see user passwords.)*

2. **"The Roadmap model embeds steps as an array inside the document. The SavedProject model stores each project as a SEPARATE document with a user reference. What rule determines which approach to use?"**
   *(Expected: Steps are always fetched WITH the roadmap and never queried alone — embed them. Projects are many-per-user and might be queried independently — reference them. Rule: if you always fetch them together, embed. If queried independently, reference.)*

3. **"We send the ENTIRE chat history to the Groq API with every new message. Why can't we just send the latest message to save tokens?"**
   *(Expected: The API is stateless — it has zero memory of previous requests. If you only send the latest message, the AI has no context: "What's wrong with my code?" — the AI doesn't know what code was shown two messages ago. The full history is the only way to maintain conversational context.)*

4. **"The `Promise.all()` in `getAdminStats` runs 3 database queries simultaneously. What would happen if we ran them sequentially? How much slower would it be?"**
   *(Expected: Sequential: query1 waits for response → query2 runs → waits → query3 runs. If each takes 50ms, total = 150ms. Parallel with Promise.all: all 3 run simultaneously, total ≈ 50ms (the longest one). 3x faster for independent queries.)*

5. **"What is `upsert: true` in Mongoose's `findOneAndUpdate`? Give me a real scenario from SkillPath AI where it's essential."**
   *(Expected: Upsert means "update if exists, create if not." Example: when a user generates their FIRST roadmap, there's no document to update. With upsert, Mongoose creates a new document. When they regenerate, it updates the existing one. Without upsert, the first-time generation would fail with "document not found.")*

---

## 📋 File Creation Flow — MC5 (Start Here, Follow This Order!)

> You already have all MC4 backend files (with controller stubs). In MC5, you fill in the real data layer. Create model files first — controllers can't query what doesn't exist.

---

### 🟢 STEP 1 — MongoDB Models (Create ALL models FIRST)

| Order | File | Why This First? |
|-------|------|-----------------|
| 1️⃣ | `backend/models/User.js` | Foundation — every other model references this. Auth controller needs it immediately. |
| 2️⃣ | `backend/models/Profile.js` | Linked to User via ObjectId. Created during onboarding. |
| 3️⃣ | `backend/models/Roadmap.js` | Linked to User. Created by roadmapController. |
| 4️⃣ | `backend/models/Progress.js` | Linked to both User and Roadmap. Created alongside Roadmap. |
| 5️⃣ | `backend/models/ChatHistory.js` | Linked to User. Created on first chat message. |
| 6️⃣ | `backend/models/SavedProject.js` | Linked to User. Created when user saves a project. |
| 7️⃣ | `backend/models/Resource.js` | Standalone. Created by admin controllers. |

---

### 🟡 STEP 2 — AI Service Layer (Build before controllers that call AI)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 8️⃣ | `backend/services/fallbackService.js` | Build FALLBACK first — aiService imports it when AI fails |
| 9️⃣ | `backend/services/aiService.js` | 4 AI functions — controllers import this |

---

### 🟠 STEP 3 — Update Controllers (Stubs → Real Mongoose Operations)

| Order | File | What Changes |
|-------|------|-------------|
| 🔟 | `backend/controllers/authController.js` | `User.create()`, `User.findOne()`, `bcrypt.compare()`, `generateToken()` |
| 1️⃣1️⃣ | `backend/controllers/roadmapController.js` | `Roadmap.findOneAndUpdate({ upsert: true })`, `aiService.generateRoadmapWithAI()` |
| 1️⃣2️⃣ | `backend/controllers/progressController.js` | `Progress.findOne()`, update `completedSteps[]`, `progress.updatePercent()`, `progress.save()` |
| 1️⃣3️⃣ | `backend/controllers/chatController.js` | `ChatHistory.findOne()`, append messages, `aiService.chatWithAI()`, save |
| 1️⃣4️⃣ | `backend/controllers/projectController.js` | `Profile.findOne()` for level, `aiService.generateProjectRecommendations()`, `SavedProject.create()` |

---

## 🗳️ ZOOM POLL 4 — Groq AI Integration
> ⏱️ **Share this poll:** After Slide 13 (Groq AI Service). Tests understanding of the AI layer.

**Question: The Groq API is "stateless" — every call starts fresh with no memory. How does our AI Chat remember previous messages?**
*(Single Choice)*

A) Groq automatically stores conversation history in its own database
B) The frontend sends the entire conversation history with every new message via Axios
C) We store the entire chat history in MongoDB and send ALL previous messages to Groq with every new API call
D) JWT tokens contain the conversation history so Groq can decode it

✅ **Correct Answer:** C

> 💬 **Instructor note:** Show the code: `const messages = chatHistory.messages` and then spreading them into the Groq call: `[...messages, { role: 'user', content: newMessage }]`. Groq sees the full conversation every time — that's what makes it context-aware. Without this, every answer would be disconnected from the previous question.

---

## 📌 Slide 14 — AI Function 4: `generateProjectRecommendations(level)`, `SavedProject.create()` |
| 1️⃣5️⃣ | `backend/controllers/resourceController.js` | `Resource.find()` with optional category filter |
| 1️⃣6️⃣ | `backend/controllers/learningController.js` | `aiService.generateStepLesson()`, `aiService.generateStepQuiz()` |
| 1️⃣7️⃣ | `backend/controllers/adminController.js` | `countDocuments()`, `User.find()`, Resource CRUD |

---

### ✅ MC5 Creation Order — Quick Visual Summary

```
MODELS (all 7 — foundation of everything):
1. models/User.js            ← Everyone links to this
2. models/Profile.js         ← Learning preferences
3. models/Roadmap.js         ← AI roadmap + embedded steps
4. models/Progress.js        ← Step completion tracker
5. models/ChatHistory.js     ← Conversation memory
6. models/SavedProject.js    ← User's saved projects
7. models/Resource.js        ← Platform-wide resources

AI SERVICES:
8. services/fallbackService.js  ← Pre-written content
9. services/aiService.js        ← Groq API + 4 AI functions

UPDATE CONTROLLERS (stubs → real code):
10. controllers/authController.js       ← Real User CRUD
11. controllers/roadmapController.js    ← Real Roadmap upsert + AI
12. controllers/progressController.js   ← Real completedSteps update
13. controllers/chatController.js       ← Real ChatHistory + AI
14. controllers/projectController.js    ← Real Profile + AI + SavedProject
15. controllers/resourceController.js   ← Real Resource.find()
16. controllers/learningController.js   ← Real AI lesson + quiz generation
17. controllers/adminController.js      ← Real countDocuments + CRUD
```

> 💡 **Golden Rule for MC5:** Models come FIRST because everything depends on them. Think of models as the database "blueprint" — you can't query data without a schema that defines what the data looks like. Build `User.js` before any other model, since all other models reference it via ObjectId.

---

## 📌 Slide 18 — Practical Assignment: Build a Saved Projects Database Layer

### 🎯 The Goal
Your assignment is to implement a new database-backed feature on the backend: a **Bookmark/Saved Resource System**. Currently, resources are loaded platform-wide, but students cannot bookmark them. You will create a Mongoose schema and Express controllers/routes to save, retrieve, and delete a user's bookmarked resources.

### 📚 Concepts You Will Practice
1. **Schema Design:** Define a Mongoose schema (`Bookmark.js`) that references the `User` model using ObjectIds.
2. **MongoDB CRUD:** Use Mongoose methods like `.create()`, `.find()`, and `.findOneAndDelete()` to manipulate database documents.
3. **Route Protection:** Wire up Express router routes and guard them with the `protect` authentication middleware so only logged-in users can manage bookmarks.

---

### 📝 Step-by-Step Instructions

#### Step 1: Design the Model
Create a new file: `backend/models/Bookmark.js`. Define a schema with:
- `user`: ObjectId referencing `'User'` (required).
- `resourceId`: ObjectId referencing `'Resource'` (required).
- `title`: String (required).
- `url`: String (required).
- Timestamps enabled.

#### Step 2: Implement Controller Functions
Create a new controller: `backend/controllers/bookmarkController.js` containing:
- `addBookmark`: Saves a new bookmark document linked to `req.user._id`.
- `getMyBookmarks`: Fetches all bookmark documents matching `{ user: req.user._id }`.
- `removeBookmark`: Deletes a bookmark document by its ID, ensuring it belongs to `req.user._id`.

#### Step 3: Set Up Routes
Create `backend/routes/bookmarkRoutes.js`. Define endpoints:
- `GET /` calls `getMyBookmarks`
- `POST /` calls `addBookmark`
- `DELETE /:id` calls `removeBookmark`
Wrap all routes in the `protect` middleware.

#### Step 4: Register the Route in server.js
Import the new router in `backend/server.js` and mount it at `app.use('/api/bookmarks', bookmarkRoutes)`. Test the API endpoints using Postman.

---

### 💻 Example Code Structure

Here is a template to guide your implementation:

```javascript
// File: backend/models/Bookmark.js
import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Bookmark', bookmarkSchema);
```

```javascript
// File: backend/controllers/bookmarkController.js
import Bookmark from '../models/Bookmark.js';

// @desc    Get user bookmarks
// @route   GET /api/bookmarks
// @access  Private
export const getMyBookmarks = async (req, res) => {
  const bookmarks = await Bookmark.find({ user: req.user._id });
  res.json(bookmarks);
};

// @desc    Add a bookmark
// @route   POST /api/bookmarks
// @access  Private
export const addBookmark = async (req, res) => {
  const { resourceId, title, url } = req.body;

  // Check if already bookmarked
  const exists = await Bookmark.findOne({ user: req.user._id, resourceId });
  if (exists) {
    res.status(400);
    throw new Error('Resource already bookmarked');
  }

  const bookmark = await Bookmark.create({
    user: req.user._id,
    resourceId,
    title,
    url
  });

  res.status(201).json(bookmark);
};

// @desc    Delete a bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
export const removeBookmark = async (req, res) => {
  const bookmark = await Bookmark.findOne({ _id: req.params.id, user: req.user._id });
  
  if (!bookmark) {
    res.status(404);
    throw new Error('Bookmark not found or unauthorized');
  }

  await bookmark.deleteOne();
  res.json({ message: 'Bookmark removed successfully' });
};
```
