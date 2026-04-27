# SECTION 6–9: Pages, Component Architecture, Backend Architecture & Database Design

---

# SECTION 6: PAGE-BY-PAGE APPLICATION PLAN

## Public Pages

### 1. Landing Page (`/`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Convert visitors to sign-ups |
| **Components** | `Navbar`, `HeroSection`, `FeatureCard x4`, `TestimonialSection`, `CTABanner`, `Footer` |
| **Data** | Hardcoded marketing content |
| **Static/Dynamic** | Mostly static, animated hero |
| **Masterclass** | MC1 (structure) → MC2 (polish + animation) |

### 2. About Page (`/about`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Explain the platform mission and SDG alignment |
| **Components** | `Navbar`, `MissionSection`, `SDGBadge`, `TeamSection`, `Footer` |
| **Data** | Hardcoded |
| **Static/Dynamic** | Static |
| **Masterclass** | MC1 |

### 3. Login Page (`/login`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Authenticate existing users |
| **Components** | `AuthCard`, `InputField`, `Button`, `SocialLoginButton` |
| **Data** | Email + password form input |
| **Static/Dynamic** | Dynamic (MC5 — API connected) |
| **Masterclass** | MC1 (UI) → MC5 (API wired) |

### 4. Register Page (`/register`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Create new user account |
| **Components** | `AuthCard`, `InputField`, `Button` |
| **Data** | Name, email, password |
| **Static/Dynamic** | Dynamic (MC5) |
| **Masterclass** | MC1 (UI) → MC5 (API wired) |

---

## Protected Student Pages

### 5. Onboarding Page (`/onboarding`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Collect learning goal, skill level, time availability |
| **Components** | `StepIndicator`, `GoalSelector`, `LevelSelector`, `TimeSelector`, `Button` |
| **Data** | User preferences → POST to `/api/profiles` |
| **Static/Dynamic** | Dynamic form |
| **Masterclass** | MC2 (UI) → MC5 (API) |

### 6. Dashboard Page (`/dashboard`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Central hub — overview of all student activity |
| **Components** | `WelcomeCard`, `ProgressRing`, `RoadmapPreview`, `RecentChatCard`, `QuickActions`, `StatCard` |
| **Data** | User profile, roadmap, progress stats — GET from APIs |
| **Static/Dynamic** | Dynamic |
| **Masterclass** | MC2 (UI) → MC5 (API) |

### 7. Roadmap Page (`/roadmap`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Show full AI-generated roadmap; allow step completion |
| **Components** | `RoadmapTimeline`, `RoadmapStep`, `ProgressBar`, `RegenerateButton`, `Badge` |
| **Data** | GET `/api/roadmaps/me`, PUT `/api/progress/:stepId` |
| **Static/Dynamic** | Dynamic |
| **Masterclass** | MC2 (UI) → MC4 (AI gen) → MC5 (wired) |

### 8. AI Chat Page (`/chat`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | AI-powered doubt assistant — real-time Q&A |
| **Components** | `ChatWindow`, `ChatBubble`, `MessageInput`, `TypingIndicator`, `ChatHistorySidebar` |
| **Data** | POST `/api/chat`, GET `/api/chat/history` |
| **Static/Dynamic** | Fully dynamic |
| **Masterclass** | MC2 (UI) → MC4 (Groq integration) → MC5 (wired) |

### 9. Project Ideas Page (`/projects`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Show AI-recommended and saved project ideas |
| **Components** | `ProjectCard`, `FilterBar`, `SaveButton`, `DifficultyBadge` |
| **Data** | GET `/api/projects/recommendations` |
| **Static/Dynamic** | Dynamic |
| **Masterclass** | MC2 (UI) → MC4 (AI) → MC5 (wired) |

### 10. Resource Library Page (`/resources`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Browse curated learning resources by topic |
| **Components** | `ResourceCard`, `TopicFilter`, `SearchBar`, `TypeBadge` |
| **Data** | GET `/api/resources` |
| **Static/Dynamic** | Dynamic |
| **Masterclass** | MC2 (UI) → MC4 (DB) → MC5 (wired) |

### 11. Profile Page (`/profile`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | View and edit user profile and settings |
| **Components** | `AvatarUploader`, `ProfileForm`, `GoalCard`, `AccountStats` |
| **Data** | GET/PUT `/api/users/me` |
| **Static/Dynamic** | Dynamic |
| **Masterclass** | MC2 (UI) → MC5 (wired) |

---

## Admin Pages

### 12. Admin Dashboard (`/admin`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Platform overview for admin users |
| **Components** | `StatCard x4`, `UserGrowthChart`, `RecentActivity` |
| **Data** | GET `/api/admin/stats` |
| **Static/Dynamic** | Dynamic |
| **Masterclass** | MC2 (UI) → MC4 (DB queries) → MC5 (wired) |

### 13. Admin Resource Manager (`/admin/resources`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | Add, edit, delete learning resources |
| **Components** | `ResourceTable`, `ResourceModal`, `DeleteConfirm`, `Button` |
| **Data** | GET/POST/PUT/DELETE `/api/admin/resources` |
| **Static/Dynamic** | Dynamic CRUD |
| **Masterclass** | MC2 (UI) → MC4 (backend) → MC5 (wired) |

### 14. Admin User Manager (`/admin/users`)
| Attribute | Details |
|-----------|---------|
| **Purpose** | View users, toggle active status |
| **Components** | `UserTable`, `StatusToggle`, `UserDetailModal` |
| **Data** | GET `/api/admin/users`, PUT `/api/admin/users/:id` |
| **Static/Dynamic** | Dynamic |
| **Masterclass** | MC2 (UI) → MC4 (backend) → MC5 (wired) |

---

# SECTION 7: COMPONENT ARCHITECTURE

## Layout Components (MC1–MC2)
```
src/components/layout/
├── Navbar.jsx          # Top navigation, auth-aware
├── Footer.jsx          # Site footer
├── Sidebar.jsx         # Dashboard left sidebar (MC2)
├── DashboardLayout.jsx # Wrapper: Sidebar + main content area
├── AdminLayout.jsx     # Admin-specific layout wrapper
└── AuthLayout.jsx      # Centered card layout for login/register
```

## Shared UI Components (MC1–MC2)
```
src/components/ui/
├── Button.jsx          # Primary, secondary, ghost, danger variants
├── InputField.jsx      # Label + input + error message
├── Card.jsx            # Generic card wrapper with shadow/hover
├── Modal.jsx           # Overlay modal with backdrop
├── Spinner.jsx         # Loading spinner
├── Badge.jsx           # Status/type labels
├── ProgressBar.jsx     # Horizontal progress bar
├── ProgressRing.jsx    # Circular progress indicator
├── Tooltip.jsx         # Hover tooltip
├── Avatar.jsx          # User avatar with fallback initials
├── SearchBar.jsx       # Input with search icon
├── FilterBar.jsx       # Category filter tabs
├── Toast.jsx           # (via react-hot-toast wrapper)
└── EmptyState.jsx      # Empty list placeholder with illustration
```

## Page-Level Components (MC1–MC2)
```
src/components/landing/
├── HeroSection.jsx
├── FeatureCard.jsx
├── TestimonialSection.jsx
└── CTABanner.jsx

src/components/auth/
├── AuthCard.jsx
└── SocialLoginButton.jsx

src/components/onboarding/
├── GoalSelector.jsx
├── LevelSelector.jsx
├── TimeSelector.jsx
└── StepIndicator.jsx
```

## Dashboard Components (MC2)
```
src/components/dashboard/
├── WelcomeCard.jsx
├── RoadmapPreview.jsx    # Shows first 3 roadmap steps
├── ProgressRing.jsx      # % complete circle
├── RecentChatCard.jsx    # Last AI conversation snippet
├── QuickActions.jsx      # Shortcut buttons
└── StatCard.jsx          # Number + label cards
```

## Roadmap & Progress Components (MC2)
```
src/components/roadmap/
├── RoadmapTimeline.jsx   # Full roadmap container
├── RoadmapStep.jsx       # Individual step with complete checkbox
└── RegenerateButton.jsx

src/components/progress/
└── ProgressBar.jsx
```

## Chat Components (MC2)
```
src/components/chat/
├── ChatWindow.jsx
├── ChatBubble.jsx        # User vs AI bubble styles
├── MessageInput.jsx
├── TypingIndicator.jsx
└── ChatHistorySidebar.jsx
```

## Project & Resource Components (MC2)
```
src/components/projects/
├── ProjectCard.jsx
└── DifficultyBadge.jsx

src/components/resources/
├── ResourceCard.jsx
└── TypeBadge.jsx
```

## Admin Components (MC2)
```
src/components/admin/
├── ResourceTable.jsx
├── ResourceModal.jsx     # Add/Edit form in modal
├── UserTable.jsx
├── StatusToggle.jsx
├── UserGrowthChart.jsx   # Recharts line chart
└── DeleteConfirm.jsx     # Confirmation dialog
```

---

## Component Creation Timeline

| MC | Components Created |
|----|-------------------|
| **MC1** | Navbar, Footer, HeroSection, FeatureCard, Button, InputField, AuthCard |
| **MC2** | ALL remaining components (Card, Modal, Spinner, Dashboard, Chat, Admin, etc.) |
| **MC3–MC4** | No new components (backend focus) |
| **MC5** | Minor updates — loading states, error boundaries wired to real data |

---

# SECTION 8: BACKEND ARCHITECTURE

## Folder Structure
```
skillpath-backend/
├── server.js                 # Entry point
├── .env                      # Secrets (gitignored)
├── .gitignore
├── package.json
│
├── config/
│   └── db.js                 # Mongoose connection
│
├── routes/
│   ├── authRoutes.js         # MC3
│   ├── userRoutes.js         # MC3
│   ├── profileRoutes.js      # MC4
│   ├── roadmapRoutes.js      # MC4
│   ├── progressRoutes.js     # MC4
│   ├── chatRoutes.js         # MC4
│   ├── projectRoutes.js      # MC4
│   ├── resourceRoutes.js     # MC4
│   └── adminRoutes.js        # MC4
│
├── controllers/
│   ├── authController.js     # MC3
│   ├── userController.js     # MC3
│   ├── profileController.js  # MC4
│   ├── roadmapController.js  # MC4
│   ├── progressController.js # MC4
│   ├── chatController.js     # MC4
│   ├── projectController.js  # MC4
│   ├── resourceController.js # MC4
│   └── adminController.js    # MC4
│
├── models/
│   ├── User.js               # MC3 (basic), MC4 (full)
│   ├── Profile.js            # MC4
│   ├── Roadmap.js            # MC4
│   ├── Progress.js           # MC4
│   ├── ChatHistory.js        # MC4
│   ├── Resource.js           # MC4
│   └── SavedProject.js       # MC4
│
├── middleware/
│   ├── authMiddleware.js     # protect, isAdmin — MC3
│   ├── errorMiddleware.js    # Global error handler — MC3
│   └── rateLimiter.js        # Rate limit AI routes — MC4
│
├── services/
│   ├── aiService.js          # Groq API calls — MC4
│   └── fallbackService.js    # Rule-based fallback — MC4
│
├── utils/
│   ├── generateToken.js      # JWT sign utility — MC3
│   └── validators.js         # Input validation helpers — MC3
│
└── data/
    └── fallbackRoadmaps.js   # Pre-built roadmaps for fallback — MC4
```

## Route Structure

| Route File | Base Path | Introduced |
|-----------|-----------|------------|
| `authRoutes.js` | `/api/auth` | MC3 |
| `userRoutes.js` | `/api/users` | MC3 |
| `profileRoutes.js` | `/api/profiles` | MC4 |
| `roadmapRoutes.js` | `/api/roadmaps` | MC4 |
| `progressRoutes.js` | `/api/progress` | MC4 |
| `chatRoutes.js` | `/api/chat` | MC4 |
| `projectRoutes.js` | `/api/projects` | MC4 |
| `resourceRoutes.js` | `/api/resources` | MC4 |
| `adminRoutes.js` | `/api/admin` | MC4 |

## Auth Flow (JWT in HTTP-only Cookie)

```
1. User submits login form
2. Backend verifies credentials (bcrypt compare)
3. Backend signs JWT: { id, role } with 7-day expiry
4. JWT sent as HTTP-only cookie: Set-Cookie header
5. All subsequent requests include cookie automatically
6. protect middleware verifies cookie JWT on each request
7. Logout: clear cookie on server
```

## Middleware Chain (server.js)

```javascript
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
// routes
app.use(notFound)
app.use(errorHandler)
```

---

# SECTION 9: DATABASE DESIGN

## Collection 1: `users` (MC3 base → MC4 full)

```javascript
{
  _id: ObjectId,
  name: String (required, trim),
  email: String (required, unique, lowercase),
  password: String (required, min 6, hashed),
  role: String (enum: ['student', 'admin'], default: 'student'),
  isActive: Boolean (default: true),
  avatar: String (URL, optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```
**Relationships:** Referenced by Profile, Roadmap, Progress, ChatHistory, SavedProject

---

## Collection 2: `profiles` (MC4)

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required, unique),
  learningGoal: String (required),        // "Web Development", "Data Science"
  goalDescription: String,               // Optional personal note
  currentLevel: String (enum: ['beginner', 'intermediate', 'advanced']),
  weeklyHours: Number (enum: [2, 5, 10]),
  preferredTopics: [String],             // Optional tags
  onboardingCompleted: Boolean (default: false),
  updatedAt: Date (auto)
}
```
**Why:** Separates user credentials from learning preferences for clean architecture

---

## Collection 3: `roadmaps` (MC4)

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  goal: String,
  level: String,
  generatedAt: Date,
  aiGenerated: Boolean (default: true),
  steps: [{
    stepNumber: Number,
    title: String,
    description: String,
    duration: String,       // "1 week"
    resources: [String],    // URLs
    completed: Boolean (default: false)
  }],
  version: Number (default: 1),  // increments on regeneration
  isActive: Boolean (default: true)
}
```
**Why:** Core feature — stores the AI-generated roadmap per user

---

## Collection 4: `progress` (MC4)

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  roadmap: ObjectId (ref: 'Roadmap', required),
  completedSteps: [Number],     // Array of completed stepNumbers
  totalSteps: Number,
  percentComplete: Number,      // Calculated field: (completedSteps.length / totalSteps) * 100
  lastUpdated: Date,
  streak: Number (default: 0)   // Consecutive days with activity
}
```
**Why:** Tracks student progress — powers dashboard ring and motivation

---

## Collection 5: `chathistories` (MC4)

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  sessionTitle: String,          // Auto-generated from first message
  messages: [{
    role: String (enum: ['user', 'assistant']),
    content: String,
    timestamp: Date (default: now)
  }],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```
**Why:** Persists AI conversations so students can reference past sessions

---

## Collection 6: `resources` (MC4)

```javascript
{
  _id: ObjectId,
  title: String (required),
  url: String (required),
  topic: String (required),        // "JavaScript", "React", "MongoDB"
  type: String (enum: ['article', 'video', 'course', 'documentation', 'tool']),
  description: String,
  tags: [String],
  addedBy: ObjectId (ref: 'User'), // Admin who added it
  isActive: Boolean (default: true),
  createdAt: Date (auto)
}
```
**Why:** Admin-managed content library — core resource library feature

---

## Collection 7: `savedprojects` (MC4)

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  title: String (required),
  description: String,
  difficulty: String (enum: ['beginner', 'intermediate', 'advanced']),
  techStack: [String],
  aiGenerated: Boolean (default: false),
  userNotes: String,
  savedAt: Date (default: now)
}
```
**Why:** Lets students save AI-recommended or bookmarked project ideas

---

## Schema Introduction Timeline

| Schema | Introduced In |
|--------|--------------|
| `User` (basic: name, email, password, role) | MC3 |
| `User` (full: avatar, isActive) | MC4 |
| `Profile` | MC4 |
| `Roadmap` | MC4 |
| `Progress` | MC4 |
| `ChatHistory` | MC4 |
| `Resource` | MC4 |
| `SavedProject` | MC4 |

---

*Continue to [`04-api-and-ai.md`](./04-api-and-ai.md) for full API design and AI integration plan.*
