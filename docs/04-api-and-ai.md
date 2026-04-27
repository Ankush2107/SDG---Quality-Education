# SECTION 10–11: API Design & AI Integration Plan

---

# SECTION 10: COMPLETE API DESIGN

> Base URL: `http://localhost:5000/api` (dev) / `https://your-render-url.onrender.com/api` (prod)
> All protected routes require: `Authorization: Bearer <token>` OR valid HTTP-only cookie

---

## AUTH ROUTES (`/api/auth`) — MC3

### POST /api/auth/register
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | None (public) |
| **Purpose** | Create new user account |
| **Request Body** | `{ name, email, password }` |
| **Response** | `{ success: true, user: { id, name, email, role }, token }` + sets cookie |
| **MC** | MC3 |

### POST /api/auth/login
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | None (public) |
| **Purpose** | Authenticate user, return JWT |
| **Request Body** | `{ email, password }` |
| **Response** | `{ success: true, user: { id, name, email, role } }` + sets HTTP-only cookie |
| **MC** | MC3 |

### POST /api/auth/logout
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | Protected |
| **Purpose** | Clear auth cookie |
| **Request Body** | None |
| **Response** | `{ success: true, message: "Logged out" }` |
| **MC** | MC3 |

### GET /api/auth/me
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get currently logged-in user (used for AuthContext check on page load) |
| **Request Body** | None |
| **Response** | `{ success: true, user: { id, name, email, role } }` |
| **MC** | MC3 |

---

## USER ROUTES (`/api/users`) — MC3

### GET /api/users/me
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get full user profile info |
| **Response** | `{ user: { id, name, email, avatar, createdAt } }` |
| **MC** | MC3 |

### PUT /api/users/profile
| Field | Details |
|-------|---------|
| **Method** | PUT |
| **Auth** | Protected |
| **Purpose** | Update name, avatar |
| **Request Body** | `{ name, avatar }` |
| **Response** | `{ success: true, user: { updated fields } }` |
| **MC** | MC3 |

### PUT /api/users/password
| Field | Details |
|-------|---------|
| **Method** | PUT |
| **Auth** | Protected |
| **Purpose** | Change password |
| **Request Body** | `{ currentPassword, newPassword }` |
| **Response** | `{ success: true, message: "Password updated" }` |
| **MC** | MC3 |

---

## PROFILE ROUTES (`/api/profiles`) — MC4

### POST /api/profiles
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | Protected |
| **Purpose** | Save onboarding data (creates profile + triggers roadmap generation) |
| **Request Body** | `{ learningGoal, currentLevel, weeklyHours, preferredTopics }` |
| **Response** | `{ success: true, profile, roadmap }` |
| **MC** | MC4 |

### GET /api/profiles/me
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get user's profile data |
| **Response** | `{ profile: { learningGoal, currentLevel, weeklyHours, onboardingCompleted } }` |
| **MC** | MC4 |

### PUT /api/profiles/me
| Field | Details |
|-------|---------|
| **Method** | PUT |
| **Auth** | Protected |
| **Purpose** | Update learning goal or preferences |
| **Request Body** | `{ learningGoal, currentLevel, weeklyHours }` |
| **Response** | `{ success: true, profile }` |
| **MC** | MC4 |

---

## ROADMAP ROUTES (`/api/roadmaps`) — MC4

### POST /api/roadmaps/generate
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | Protected |
| **Purpose** | Generate AI roadmap using profile data |
| **Request Body** | `{ goal, level, weeklyHours }` (optional override) |
| **Response** | `{ success: true, roadmap: { steps: [...] } }` |
| **MC** | MC4 |

### GET /api/roadmaps/me
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get user's active roadmap |
| **Response** | `{ roadmap: { id, goal, steps, version, generatedAt } }` |
| **MC** | MC4 |

### POST /api/roadmaps/regenerate
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | Protected |
| **Purpose** | Regenerate roadmap (increments version) |
| **Request Body** | `{ goal, level, weeklyHours }` |
| **Response** | `{ success: true, roadmap }` |
| **MC** | MC4 |

---

## PROGRESS ROUTES (`/api/progress`) — MC4

### GET /api/progress/me
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get progress data |
| **Response** | `{ progress: { completedSteps, totalSteps, percentComplete, streak } }` |
| **MC** | MC4 |

### PUT /api/progress/step
| Field | Details |
|-------|---------|
| **Method** | PUT |
| **Auth** | Protected |
| **Purpose** | Mark a roadmap step complete or incomplete |
| **Request Body** | `{ stepNumber, completed: true/false }` |
| **Response** | `{ success: true, progress: { percentComplete } }` |
| **MC** | MC4 |

---

## AI CHAT ROUTES (`/api/chat`) — MC4

### POST /api/chat
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | Protected |
| **Purpose** | Send a message to AI doubt assistant |
| **Request Body** | `{ message, sessionId? }` |
| **Response** | `{ reply: "AI response text", sessionId }` |
| **MC** | MC4 |

### GET /api/chat/history
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get all past chat sessions |
| **Response** | `{ sessions: [{ id, sessionTitle, createdAt, lastMessage }] }` |
| **MC** | MC4 |

### GET /api/chat/history/:sessionId
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get full messages of a specific session |
| **Response** | `{ session: { messages: [...] } }` |
| **MC** | MC4 |

### DELETE /api/chat/history/:sessionId
| Field | Details |
|-------|---------|
| **Method** | DELETE |
| **Auth** | Protected |
| **Purpose** | Delete a chat session |
| **Response** | `{ success: true }` |
| **MC** | MC4 |

---

## PROJECT ROUTES (`/api/projects`) — MC4

### GET /api/projects/recommendations
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get AI-recommended projects for user's level |
| **Response** | `{ projects: [{ title, description, difficulty, techStack }] }` |
| **MC** | MC4 |

### POST /api/projects/save
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | Protected |
| **Purpose** | Save a project idea to user's list |
| **Request Body** | `{ title, description, difficulty, techStack, userNotes }` |
| **Response** | `{ success: true, savedProject }` |
| **MC** | MC4 |

### GET /api/projects/saved
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected |
| **Purpose** | Get user's saved projects |
| **Response** | `{ savedProjects: [...] }` |
| **MC** | MC4 |

---

## RESOURCE ROUTES (`/api/resources`) — MC4

### GET /api/resources
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Public |
| **Purpose** | Get all active resources (with optional topic filter) |
| **Query Params** | `?topic=React&type=video` |
| **Response** | `{ resources: [...] }` |
| **MC** | MC4 |

### GET /api/resources/:id
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Public |
| **Purpose** | Get single resource detail |
| **Response** | `{ resource }` |
| **MC** | MC4 |

---

## ADMIN ROUTES (`/api/admin`) — MC4

### GET /api/admin/stats
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected + isAdmin |
| **Purpose** | Get platform statistics |
| **Response** | `{ stats: { totalUsers, activeRoadmaps, totalChats, totalResources } }` |
| **MC** | MC4 |

### GET /api/admin/users
| Field | Details |
|-------|---------|
| **Method** | GET |
| **Auth** | Protected + isAdmin |
| **Purpose** | List all users |
| **Response** | `{ users: [{ id, name, email, role, isActive, createdAt }] }` |
| **MC** | MC4 |

### PUT /api/admin/users/:id
| Field | Details |
|-------|---------|
| **Method** | PUT |
| **Auth** | Protected + isAdmin |
| **Purpose** | Toggle user active status or change role |
| **Request Body** | `{ isActive }` |
| **Response** | `{ success: true, user }` |
| **MC** | MC4 |

### POST /api/admin/resources
| Field | Details |
|-------|---------|
| **Method** | POST |
| **Auth** | Protected + isAdmin |
| **Purpose** | Create a new resource |
| **Request Body** | `{ title, url, topic, type, description, tags }` |
| **Response** | `{ success: true, resource }` |
| **MC** | MC4 |

### PUT /api/admin/resources/:id
| Field | Details |
|-------|---------|
| **Method** | PUT |
| **Auth** | Protected + isAdmin |
| **Purpose** | Update a resource |
| **Request Body** | `{ title, url, topic, type, description }` |
| **Response** | `{ success: true, resource }` |
| **MC** | MC4 |

### DELETE /api/admin/resources/:id
| Field | Details |
|-------|---------|
| **Method** | DELETE |
| **Auth** | Protected + isAdmin |
| **Purpose** | Delete a resource |
| **Response** | `{ success: true }` |
| **MC** | MC4 |

---

# SECTION 11: AI INTEGRATION PLAN

## Overview

AI is integrated at **3 points** in SkillPath AI:
1. **Roadmap Generator** — Creates personalized learning paths
2. **Doubt Assistant** — Answers student questions in real-time
3. **Project Recommender** — Suggests project ideas based on level

All AI calls are made **server-side only** (in `services/aiService.js`) to protect the API key.

---

## AI Model Choice: Groq API

| Attribute | Details |
|-----------|---------|
| **Model** | `llama3-70b-8192` |
| **Why Groq** | Ultra-fast inference (10x faster than OpenAI), generous free tier |
| **SDK** | `groq-sdk` npm package |
| **API Key** | From `console.groq.com` — free account |
| **Compatibility** | OpenAI-compatible — easy to swap to GPT-4 later |

---

## Feature 1: AI Roadmap Generator

### Trigger
When a user completes onboarding and submits their profile, the backend calls the AI service.

### Prompt Design

```javascript
const prompt = `
You are an expert learning mentor. Create a structured learning roadmap for:
- Goal: ${goal}
- Current Level: ${level}
- Weekly Hours Available: ${weeklyHours} hours

Generate a JSON roadmap with exactly 8-12 steps. Each step must have:
- stepNumber (integer)
- title (string, brief topic name)
- description (string, 1-2 sentences explaining what to learn)
- duration (string, e.g., "1 week", "3 days")
- resources (array of 2-3 suggested resource topics, not URLs)

Respond ONLY with a valid JSON object in this format:
{
  "goal": "${goal}",
  "estimatedDuration": "X weeks",
  "steps": [...]
}
`;
```

### Response Processing
```javascript
const parsed = JSON.parse(completion.choices[0].message.content);
// Validate: check steps array exists and has content
// Save to MongoDB Roadmap collection
// Return to controller
```

---

## Feature 2: AI Doubt Assistant

### Trigger
When a student sends a message in the AI Chat page.

### Prompt Design

```javascript
const systemPrompt = `
You are SkillPath AI, a friendly and knowledgeable learning mentor.
The student is learning: ${userGoal} at ${userLevel} level.
Help them understand concepts clearly, encourage them, and give practical examples.
Keep responses concise (max 200 words) and beginner-friendly.
If asked about code, provide simple examples.
Never give harmful, inappropriate, or off-topic responses.
`;

const messages = [
  { role: "system", content: systemPrompt },
  ...previousMessages,  // Chat history for context
  { role: "user", content: currentMessage }
];
```

### Context Handling
- Up to **10 previous messages** sent as context (prevents token overflow)
- System prompt is dynamically personalized based on user's goal + level

---

## Feature 3: Project Recommender

### Trigger
When user visits `/projects` page — backend generates recommendations.

### Prompt Design

```javascript
const prompt = `
Generate 6 project ideas for a ${level} level ${goal} learner.
Each project should be practical and buildable in 1-2 weeks.

Return JSON array:
[{
  "title": "...",
  "description": "2-3 sentence description",
  "difficulty": "${level}",
  "techStack": ["tech1", "tech2"],
  "estimatedTime": "1-2 weeks",
  "learningOutcome": "What they will learn"
}]
`;
```

---

## Fallback Strategy (When Groq API is Unavailable)

### Detection
```javascript
try {
  return await callGroqAPI(prompt);
} catch (error) {
  console.warn('[AI Service] Groq API failed, using fallback:', error.message);
  return fallbackService.getRoadmap(goal, level);
}
```

### Fallback Roadmap Data (`data/fallbackRoadmaps.js`)
Pre-built roadmaps for common goals:
- Web Development (Beginner / Intermediate / Advanced)
- Data Science (Beginner / Intermediate)
- Machine Learning (Beginner / Intermediate)
- Mobile Development (Beginner)
- DevOps (Intermediate)

### Fallback Chat Response
```javascript
const fallbackResponses = {
  default: "Great question! I'm having trouble connecting right now. Please try again in a moment, or check the resource library for help on this topic.",
  code: "I'm temporarily offline. For code help, try the MDN Web Docs or Stack Overflow — both excellent resources!",
};
```

### Fallback Project Recommendations
Pre-built static lists of project ideas per level/goal combination.

---

## Backend AI Service Structure

```javascript
// services/aiService.js
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateRoadmap = async (goal, level, weeklyHours) => {
  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [{ role: "user", content: buildRoadmapPrompt(goal, level, weeklyHours) }],
    temperature: 0.7,
    max_tokens: 2000,
    response_format: { type: "json_object" }  // Ensures JSON output
  });
  return JSON.parse(completion.choices[0].message.content);
};

const chatWithAI = async (messages, userContext) => {
  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: buildChatMessages(messages, userContext),
    temperature: 0.8,
    max_tokens: 500
  });
  return completion.choices[0].message.content;
};

const generateProjectIdeas = async (goal, level) => {
  // Similar pattern
};

module.exports = { generateRoadmap, chatWithAI, generateProjectIdeas };
```

---

## Rate Limiting for AI Routes

```javascript
// middleware/rateLimiter.js
const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 10,              // 10 requests per user per minute
  message: { error: "Too many AI requests. Please wait a moment." }
});

// Applied specifically to AI routes
router.post('/chat', protect, aiRateLimiter, chatController);
router.post('/roadmaps/generate', protect, aiRateLimiter, generateRoadmap);
```

---

## Safety & Validation

| Check | Implementation |
|-------|---------------|
| **API key missing** | Check at startup, warn and use fallback mode |
| **Malformed AI JSON** | try-catch JSON.parse, fallback to template |
| **Offensive user input** | Groq's built-in moderation + system prompt guardrails |
| **Token overflow** | Limit chat history to last 10 messages |
| **Rate limiting** | 10 AI requests/minute per user |
| **Response validation** | Check required fields exist before saving to DB |

---

*Continue to [`05-structure-and-build.md`](./05-structure-and-build.md) for folder structure, build order, and GitHub checkpoint strategy.*
