# SECTION 1–4: Project Overview, Features, Tech Stack & User Flow

---

# SECTION 1: PROJECT OVERVIEW

## Project Title
**SkillPath AI** – AI-Powered Personalized Learning & Project Guidance Platform

## SDG Alignment
**SDG 4 – Quality Education**
> *Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.*

Specific targets addressed:
- **4.4** – Increase the number of youth and adults with relevant technical skills for employment and entrepreneurship
- **4.b** – Expand the number of scholarships and learning pathways available globally

---

## Problem Statement

Millions of students and self-learners today face a critical gap:
- They **don't know what to learn** or in what order
- They feel **overwhelmed by unstructured internet resources**
- They have **no personalized guidance** matching their current skill level
- They struggle to **find real project ideas** relevant to their stage
- They have **no single platform** to chat with an AI mentor when they're stuck

The result? They start learning, get confused, lose motivation, and quit.

---

## Why This Problem Matters

- Over **800 million youth** globally lack digital and employable skills (UNESCO)
- Most free learning platforms are **one-size-fits-all** — not personalized
- Access to quality **mentorship and structured roadmaps** is reserved for paid programs
- Without structured learning paths, dropout rates in self-learning exceed **90%**

---

## Proposed Solution

**SkillPath AI** is a full-stack, AI-powered learning platform that:

1. Lets students set a **learning goal** (e.g., "Become a Web Developer")
2. Assesses their **current skill level** via an onboarding quiz or self-assessment
3. Generates a **personalized learning roadmap** using Groq AI
4. Provides an **AI chat assistant** for doubts and explanations at any time
5. Recommends **project ideas** matching their skill level
6. Tracks **progress** visually on a personal dashboard
7. Provides **curated resources** managed by admins

---

## Target Users

| User Type | Description |
|-----------|-------------|
| **Students** | College/school students learning programming or tech skills |
| **Career Switchers** | Professionals looking to reskill into tech |
| **Self-Learners** | Anyone pursuing skills independently |
| **Trainers/Admins** | Educators who curate resources and manage the platform |

---

## Core Value Proposition

> "SkillPath AI gives every learner a **personal AI mentor** — one that builds their unique learning roadmap, answers their doubts, suggests projects to build, and tracks their journey — all in one platform."

---

## Why This is a Strong Capstone/Masterclass Project

| Criteria | SkillPath AI |
|----------|-------------|
| **Real-World Relevance** | Solves an actual, recognized problem |
| **Full MERN Coverage** | Touches every layer of the stack |
| **AI Integration** | Modern and marketable skill (Groq API) |
| **Portfolio-Ready** | Looks impressive, solves a real SDG problem |
| **Teachable Complexity** | Gradually increases — perfect for 5 classes |
| **Modular Build** | Each class delivers a standalone checkpoint |
| **GitHub-Friendly** | Clean milestones, meaningful commits |
| **Deployment-Ready** | Can be live by end of MC5 |

---

# SECTION 2: COMPLETE FEATURE LIST

## Public Features (No Login Required)

| Feature | What It Does | Why It Exists | Layer |
|---------|-------------|---------------|-------|
| **Landing Page** | Hero section, features overview, testimonials | First impression, conversion | Frontend |
| **About Page** | Project mission, SDG alignment | Builds trust and context | Frontend |
| **Public Demo Roadmap** | Shows a sample AI roadmap without logging in | Encourages sign-up | Frontend + AI |
| **Login / Register** | Email + password auth, Google OAuth option | Entry gate to platform | Frontend + Backend |

---

## Student / User Features

| Feature | What It Does | Why It Exists | Layer |
|---------|-------------|---------------|-------|
| **Onboarding Quiz** | Captures goal, current skills, time available | Feeds into AI roadmap generation | Frontend + Backend |
| **Personal Dashboard** | Shows roadmap, progress, recent activity | Central hub for the student | Frontend + Backend |
| **AI Roadmap View** | Displays personalized step-by-step roadmap | Core value feature | Frontend + Backend + AI |
| **Roadmap Regeneration** | Re-generates roadmap if goal changes | Flexibility for users | Frontend + Backend + AI |
| **Progress Tracker** | Check off topics, view % completion | Motivates students | Frontend + Backend + DB |
| **Project Ideas Page** | AI-recommended or curated project ideas | Helps apply knowledge | Frontend + Backend + AI |
| **AI Doubt Chat** | Real-time chat with AI for questions | 24/7 mentorship | Frontend + Backend + AI |
| **Resource Library** | Browse curated learning links/videos | Supports roadmap | Frontend + Backend + DB |
| **Profile Page** | Update name, avatar, goals | Personalization | Frontend + Backend |
| **Chat History** | View past AI conversations | Reference past sessions | Frontend + Backend + DB |

---

## AI-Powered Features

| Feature | What It Does | Why It Exists | Layer |
|---------|-------------|---------------|-------|
| **AI Roadmap Generator** | Generates step-by-step learning plan using Groq | Core personalization engine | Backend + AI (Groq) |
| **AI Doubt Assistant** | Answers student questions via conversational AI | 24/7 mentor replacement | Backend + AI (Groq) |
| **Project Recommender** | Suggests project ideas based on level | Bridges theory to practice | Backend + AI (Groq) |
| **Fallback Logic Engine** | Rule-based roadmap if Groq API is down | Reliability | Backend |

---

## Admin Features

| Feature | What It Does | Why It Exists | Layer |
|---------|-------------|---------------|-------|
| **Admin Dashboard** | View platform stats, user counts | Platform oversight | Frontend + Backend |
| **Resource Management** | Add/edit/delete learning resources | Curates content library | Frontend + Backend + DB |
| **User Management** | View users, toggle active/inactive | Platform control | Frontend + Backend + DB |
| **Roadmap Monitoring** | See what roadmaps are being generated | Analytics | Backend + DB |

---

## Future Scope Features

| Feature | Why Deferred |
|---------|-------------|
| **Peer Learning Groups** | Complex real-time architecture |
| **Gamification / Badges** | Can be added post-MVP |
| **Video Lesson Embedding** | Content licensing complexity |
| **Job Board Integration** | Requires third-party API |
| **Certificate Generation** | PDF rendering complexity |
| **Mobile App (React Native)** | Out of scope for MERN series |

---

# SECTION 3: TECH STACK AND TOOLS

## Frontend

| Tool | Why Used |
|------|----------|
| **React.js 18** | Component-based UI, fast re-renders, industry standard |
| **React Router DOM v6** | Client-side routing with nested layouts |
| **Axios** | Clean HTTP client for API calls |
| **React Context API** | Global state (auth, user data) — no Redux complexity |
| **CSS Modules / Custom CSS** | Scoped styling, beginner-friendly |
| **React Icons** | Comprehensive, lightweight icon library |
| **Recharts** | Progress visualizations (charts for dashboard) |
| **Framer Motion** | Micro-animations for premium feel |
| **React Hot Toast** | Elegant notification system |

---

## Backend

| Tool | Why Used |
|------|----------|
| **Node.js 20 LTS** | JavaScript runtime — same language as frontend |
| **Express.js 4** | Minimal, flexible REST API framework |
| **express-async-errors** | Clean async error handling |
| **cors** | Enable cross-origin requests from React |
| **helmet** | Security headers |
| **morgan** | HTTP request logging for development |
| **express-rate-limit** | Protect AI routes from abuse |
| **dotenv** | Environment variable management |

---

## Database

| Tool | Why Used |
|------|----------|
| **MongoDB Atlas** | Cloud-hosted NoSQL, free tier available |
| **Mongoose 8** | Schema modeling, validation, relationship handling |

---

## Authentication

| Tool | Why Used |
|------|----------|
| **bcryptjs** | Password hashing |
| **jsonwebtoken (JWT)** | Stateless auth tokens |
| **HTTP-only cookies** | Secure token storage |

---

## AI Integration

| Tool | Why Used |
|------|----------|
| **Groq API (llama3-70b-8192)** | Ultra-fast inference, free tier, OpenAI-compatible |
| **groq-sdk** | Official Node.js client |
| **Custom fallback engine** | Rule-based roadmap if AI is unavailable |

---

## Deployment

| Tool | Why Used |
|------|----------|
| **Vercel** | Frontend deployment — automatic, free, CI/CD |
| **Render.com** | Backend deployment — free tier, easy Node.js |
| **MongoDB Atlas** | Cloud database — already in use |
| **GitHub Actions** (optional) | CI pipeline for MC5 bonus content |

---

## Development Tools

| Tool | Why Used |
|------|----------|
| **VS Code** | Industry-standard editor |
| **Postman** | API testing |
| **Git + GitHub** | Version control and milestone checkpoints |
| **npm** | Package management |
| **Vite** | Fast React project scaffolding |
| **ESLint + Prettier** | Code quality and formatting |
| **Thunder Client** (VS Code) | Lightweight Postman alternative in-editor |

---

# SECTION 4: COMPLETE USER FLOW

## Student Journey

```
1. LANDING PAGE
   └── Sees hero section, feature highlights, CTA button "Start Learning Free"

2. REGISTER
   └── Enters name, email, password
   └── Account created → redirect to Onboarding

3. ONBOARDING WIZARD (3 steps)
   ├── Step 1: Choose Learning Goal (e.g., Web Dev, Data Science, ML)
   ├── Step 2: Self-assess current skill level (Beginner / Intermediate / Advanced)
   └── Step 3: Set weekly time availability (2h / 5h / 10h+)

4. AI ROADMAP GENERATION
   └── Groq AI generates a personalized, step-by-step roadmap
   └── Roadmap saved to DB and displayed on dashboard

5. DASHBOARD (Home)
   ├── Roadmap progress overview (% complete)
   ├── Today's recommended topic
   ├── Recent AI chat
   └── Quick access cards

6. ROADMAP PAGE
   ├── Full roadmap displayed as timeline/steps
   ├── Each step can be marked complete
   └── Regenerate button if goal changes

7. AI CHAT PAGE
   ├── Student types a question
   ├── Groq AI responds in real-time
   └── Conversation saved to history

8. PROJECT IDEAS PAGE
   ├── AI recommends projects based on roadmap stage
   └── Student can "Save" a project idea

9. RESOURCE LIBRARY
   ├── Browse resources by topic/tag
   └── Admin-curated links, articles, videos

10. PROFILE PAGE
    ├── Update personal info
    └── View account stats

11. LOGOUT
    └── JWT cleared, redirect to landing
```

---

## Admin Flow

```
1. LOGIN (admin credentials)
   └── Redirected to Admin Dashboard

2. ADMIN DASHBOARD
   ├── Total users, active roadmaps, chat count
   └── Recent activity log

3. RESOURCE MANAGEMENT
   ├── Add new resource (title, URL, topic, type)
   ├── Edit existing resource
   └── Delete resource

4. USER MANAGEMENT
   ├── View all users
   ├── Toggle user active/inactive
   └── View user's goal and roadmap summary

5. LOGOUT
```

---

*Continue to [`02-masterclass-division.md`](./02-masterclass-division.md) for the class-by-class teaching plan.*
