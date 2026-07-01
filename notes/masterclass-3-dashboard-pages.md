# 🖥️ Masterclass 3: Dashboard, Pages & Complete Frontend
### Dashboard, Roadmap, Chat, Projects, Resources, Profile & Admin Pages
**SkillPath AI — SDG 4: Quality Education**

---

## 📌 Slide 1 — What We're Completing in MC3

In MC1 we built the public pages (Landing, About, Login, Register). In MC2 we built the design system, UI components, and dashboard layout shell. In **MC3, we complete the entire frontend** — every logged-in page, every feature interface, every interactive element.

### MC3 Goals

1. Build the **Dashboard Page** — the user's home base with stats, progress ring, and roadmap preview
2. Build the **Roadmap Page** — the full timeline view of AI-generated learning steps (with Learn and Quiz buttons)
3. Build the **AI Chat Page** — the conversational doubt assistant interface
4. Build the **Projects Page** — AI-generated project idea cards
5. Build the **Resources Page** — admin-curated learning resources with search and filtering
6. Build the **Profile Page** — user's personal info with edit mode
7. Build the **Admin Pages** — Dashboard stats, User Management, Resource Management
8. Add **AI Learning Components** — LessonModal and QuizModal (the UI — data comes from API in MC6)

At the end of MC3, the frontend is **100% complete** — every page, every component, every interaction exists. The data will still be hardcoded/mocked. In MC6, we replace every piece of mock data with real API calls.

---

## 📌 Slide 2 — The Dashboard Page

### File: `frontend/src/pages/DashboardPage.jsx`

The Dashboard is the "home base" for logged-in users — the very first thing they see after logging in. It needs to give a complete overview of their learning status at a glance.

### What the Dashboard Shows

**1. Welcome Message**
```jsx
<h1>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
<p>You're on track to complete {roadmap?.goal}!</p>
```
The user's first name is extracted from their full name using `.split(' ')[0]`. This personalization makes users feel seen and motivated.

**2. Four Stat Cards — A Row of Key Numbers**

| Stat Card | Icon | Value | Where Data Comes From |
|-----------|------|-------|----------------------|
| Progress | 📈 | "67%" | progress.percentComplete |
| Steps Done | ✅ | "3 / 8" | completedSteps.length / total steps |
| Learning Streak | 🔥 | "5 days" | progress.streak |
| Current Goal | 🎯 | "React Dev" | roadmap.goal |

**3. Progress Ring — The Visual Center**
The large circular progress indicator (`<ProgressRing />`) is the visual hero of the dashboard. It shows the overall completion percentage as a filled arc.
- Below the ring: the goal name and skill level badge
- This gives users an emotionally satisfying visual of how far they've come

**4. Quick Actions — Navigation Shortcuts**
4 clickable cards that link directly to the main features:
```jsx
const quickActions = [
  { icon: '🗺️', label: 'My Roadmap', path: '/roadmap', sub: 'View your learning path' },
  { icon: '🤖', label: 'AI Chat', path: '/chat', sub: 'Ask your AI tutor' },
  { icon: '💡', label: 'Projects', path: '/projects', sub: 'Build something' },
  { icon: '📚', label: 'Resources', path: '/resources', sub: 'Curated learning links' },
];
```

**5. Roadmap Preview — First 4 Steps**
Shows the first 4 roadmap steps as compact cards. Each card shows:
- Step number
- Step title
- Duration badge
- A checkmark if completed

Below the preview: a "View Full Roadmap →" link.

### State Management in DashboardPage
```jsx
// In MC3, these use mock/hardcoded data
// In MC6, useProgress() hook replaces this with real API data
const [progress, setProgress] = useState({
  percentComplete: 67,
  completedSteps: [1, 2, 3],
  streak: 5,
});
const [roadmap, setRoadmap] = useState({
  goal: 'React Development',
  level: 'beginner',
  steps: [...mockSteps],
});
```

---

---
## 🗳️ ZOOM POLL 1 — Dashboard State Design
> ⏱️ **Share this poll:** After Slide 2 (Dashboard Page). Tests understanding of state before diving deeper.

**Question: The Dashboard shows "67% complete" and "5-day streak". In MC3 these are hardcoded. In MC6, where will this data actually come from?**
*(Single Choice)*

A) The browser's `localStorage` — stored from the last session
B) The React component itself calculates it from the `user` object in `AuthContext`
C) An API call to the backend, which reads the user's `Progress` document from MongoDB
D) A prop passed down from `App.jsx` when the app first loads

✅ **Correct Answer:** C

> 💬 **Instructor note:** This is a great moment to preview the MC6 payoff — "Right now it's fake. In MC6, every number on this dashboard will be real, live data from YOUR database."

---

## 📌 Slide 3 — The Roadmap Page

### File: `frontend/src/pages/RoadmapPage.jsx`

The Roadmap page is the most **feature-rich page** in the entire application. It's where students spend most of their time — working through their AI-generated learning path step by step.

### What the Page Contains

**Header Section:**
```jsx
<div className="roadmap-header">
  <h1>{roadmap.goal}</h1>
  <Badge variant={getLevelColor(roadmap.level)}>{roadmap.level}</Badge>
  {roadmap.aiGenerated && <Badge variant="accent">✨ AI Generated</Badge>}
  <Button variant="secondary" onClick={() => setShowRegenConfirm(true)}>
    🔄 Regenerate Roadmap
  </Button>
</div>
```

**Progress Section:**
```jsx
<ProgressBar value={progress.percentComplete} />
<p>{progress.completedSteps.length} of {roadmap.steps.length} steps completed · Est. {roadmap.estimatedDuration}</p>
```

**The Step Timeline — The Core of the Page:**
```jsx
{roadmap.steps.map((step, index) => {
  const isCompleted = progress.completedSteps.includes(step.stepNumber);
  
  return (
    <div key={step.stepNumber} className={`step-card ${isCompleted ? 'step-card--completed' : ''}`}>
      
      {/* Step Number or Checkmark */}
      <div className="step-number">
        {isCompleted ? '✅' : step.stepNumber}
      </div>
      
      {/* Step Content */}
      <div className="step-content">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        <div className="step-meta">
          <Badge variant="neutral">⏱ {step.duration}</Badge>
          {step.resources.map(r => <Badge key={r} variant="primary">📎 {r}</Badge>)}
        </div>
      </div>
      
      {/* Action Buttons — Only shown for incomplete steps */}
      {!isCompleted && (
        <div className="step-actions">
          <Button variant="ghost" size="sm" onClick={() => handleLearnNow(step)}>
            📖 Learn Now
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleTestKnowledge(step)}>
            🧠 Test Knowledge
          </Button>
        </div>
      )}
      
      {/* Mark Done Checkbox */}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleToggleStep(step.stepNumber, !isCompleted)}
      />
    </div>
  );
})}
```

### Event Handlers in RoadmapPage

**`handleToggleStep(stepNumber, completed)`:**
In MC3, this updates local state. In MC6, it calls `PUT /api/progress/step`.
```jsx
const handleToggleStep = (stepNumber, completed) => {
  setProgress(prev => ({
    ...prev,
    completedSteps: completed
      ? [...prev.completedSteps, stepNumber]
      : prev.completedSteps.filter(s => s !== stepNumber),
    percentComplete: calculatePercent(updatedCompleted, roadmap.steps.length)
  }));
};
```

**`handleLearnNow(step)`:**
Sets `selectedStep` state and opens the `LessonModal`. In MC6, this calls the AI lesson API.

**`handleTestKnowledge(step)`:**
Sets `selectedStep` state and opens the `QuizModal`. In MC6, this calls the AI quiz API.

---

## 📌 Slide 4 — AI Learning Components

### File: `frontend/src/components/learning/LessonModal.jsx`

Opens when a student clicks "📖 Learn Now" on a roadmap step.

### What the Lesson Modal Shows
```jsx
function LessonModal({ isOpen, onClose, step, lesson, isLoading }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`📖 ${step?.title}`}>
      {isLoading ? (
        <div className="loading-center">
          <Spinner size="lg" />
          <p>✨ Generating your personalized lesson...</p>
        </div>
      ) : (
        <div className="lesson-content">
          {/* In MC6, 'lesson' is Markdown text returned by Groq AI */}
          {/* In MC3, display mock lesson content */}
          <ReactMarkdown>{lesson || mockLessonContent}</ReactMarkdown>
        </div>
      )}
    </Modal>
  );
}
```

### What the AI Lesson Contains (Structure)
The AI is instructed to generate lessons with this exact structure:
```markdown
## Summary
A 1-sentence clear explanation of the concept.

## Core Concepts
- Key point 1
- Key point 2
- Key point 3

## Practical Example
A real code snippet or step-by-step walkthrough

## Pro Tip 💡
An advanced insight for going further
```

**Why Markdown?**
The lesson text from Groq AI comes back as Markdown-formatted text (with `##`, `**bold**`, code blocks). The `react-markdown` library renders this Markdown as proper HTML — so headings become `<h2>`, bullet points become `<ul><li>`, and code becomes syntax-highlighted `<code>` blocks.

### File: `frontend/src/components/learning/QuizModal.jsx`

Opens when a student clicks "🧠 Test Knowledge".

### How the Quiz Works — State Machine
```jsx
// Quiz states:
const [quiz, setQuiz] = useState([]); // Array of 3 questions
const [currentQuestion, setCurrentQuestion] = useState(0); // Index (0, 1, 2)
const [selectedAnswer, setSelectedAnswer] = useState(null); // Index of chosen option
const [showResult, setShowResult] = useState(false); // Show feedback after choosing
const [score, setScore] = useState(0); // Number of correct answers
const [quizFinished, setQuizFinished] = useState(false); // All 3 questions done

// Each question object structure:
{
  question: "What is JSX?",
  options: ["A CSS framework", "JavaScript XML", "A Node.js module", "A database"],
  correctIndex: 1,  // index 1 = "JavaScript XML"
  explanation: "JSX stands for JavaScript XML — it lets you write HTML-like..."
}
```

### Answer Flow — Step by Step

1. Student sees question + 4 option buttons
2. Student clicks an option → `setSelectedAnswer(index)` → `setShowResult(true)`
3. The clicked button turns **green** (correct) or **red** (wrong)
4. The correct answer is highlighted in green regardless
5. The explanation paragraph slides in below
6. A "Next Question →" button appears
7. After all 3 questions: show the final score and pass/fail

```jsx
// Pass/fail logic:
const passed = score >= 2; // 2/3 or 3/3 = pass (66%+)

{quizFinished && (
  <div className={`quiz-result ${passed ? 'quiz-result--pass' : 'quiz-result--fail'}`}>
    <p>You scored {score}/3</p>
    {passed ? (
      <>
        <p>🎉 Excellent! You've mastered this topic.</p>
        <Button variant="accent" onClick={() => onMarkComplete(step.stepNumber)}>
          ✅ Mark This Step Complete!
        </Button>
      </>
    ) : (
      <p>📖 Review the lesson and try again!</p>
    )}
  </div>
)}
```

---

---
## 🗳️ ZOOM POLL 2 — Quiz State Logic
> ⏱️ **Share this poll:** After Slide 4 (QuizModal). Tests the state machine pattern for the quiz.

**Question: A student answers Question 2 of 3 incorrectly. `score` is currently 1. What happens next in the QuizModal?**
*(Single Choice)*

A) The quiz ends immediately with a fail result
B) The wrong option turns red, the correct option turns green, an explanation shows, and a "Next Question" button appears
C) The score resets to 0 and the quiz restarts from Question 1
D) The modal closes and the student is sent back to the roadmap

✅ **Correct Answer:** B

> 💬 **Instructor note:** Walk through the state flow: `setSelectedAnswer(index)` → `setShowResult(true)` → UI shows colors + explanation → student clicks "Next" → `setCurrentQuestion(2)` → `setSelectedAnswer(null)` → `setShowResult(false)`. This is the state machine pattern.

---

## 📌 Slide 5 — The AI Chat Page

### File: `frontend/src/pages/ChatPage.jsx`

The AI Chat page is the **24/7 Doubt Assistant** — the most emotionally valuable feature for students who get stuck at night.

### Page Layout: Classic Chat UI Pattern
```
┌─────────────────────────────────────────────────┐
│  🤖 SkillPath AI — Your Personal Tutor          │  ← Header
│  Powered by Groq (LLaMA 3.3 70B)               │
├─────────────────────────────────────────────────┤
│                                                  │
│  [AI]: Hi! I'm your SkillPath AI tutor...       │  ← AI bubble (left)
│                                                  │
│                   [User]: What is useState? →   │  ← User bubble (right)
│                                                  │
│  [AI]: Great question! useState is a React...   │  ← AI bubble (left)
│                                                  │
│  [AI]: ●●● (typing animation)                  │  ← Typing indicator
│                                                  │
├─────────────────────────────────────────────────┤
│  [Type your question...        ] [Send →]       │  ← Input + Send button
└─────────────────────────────────────────────────┘
```

### State Management in ChatPage
```jsx
const [messages, setMessages] = useState([
  // Initial AI greeting
  {
    role: 'assistant',
    content: "Hi! I'm your SkillPath AI tutor 👋 Ask me anything about coding, your roadmap steps, or any tech concept you're struggling with!",
    timestamp: new Date()
  }
]);
const [inputText, setInputText] = useState('');
const [isTyping, setIsTyping] = useState(false); // AI "thinking" animation
```

### The Send Message Flow — Optimistic UI
```jsx
const handleSendMessage = async () => {
  if (!inputText.trim()) return;
  
  const userMessage = { role: 'user', content: inputText, timestamp: new Date() };
  
  // 1. Immediately add user's message to screen (don't wait for API)
  //    This is called "Optimistic UI" — show the result before it's confirmed
  setMessages(prev => [...prev, userMessage]);
  setInputText('');  // Clear the input field immediately
  
  // 2. Show the AI typing indicator
  setIsTyping(true);
  
  // 3. In MC6: await api.post('/api/chat', { message: inputText })
  // In MC3: simulate a 1.5-second delay, then show a mock response
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const aiMessage = {
    role: 'assistant',
    content: "That's a great question! In React, useState is a Hook that...",
    timestamp: new Date()
  };
  
  // 4. Add the AI response and hide typing indicator
  setMessages(prev => [...prev, aiMessage]);
  setIsTyping(false);
};
```

### The Typing Indicator Component
```jsx
{isTyping && (
  <div className="message message--ai">
    <div className="typing-indicator">
      <span className="typing-dot"></span>
      <span className="typing-dot"></span>
      <span className="typing-dot"></span>
    </div>
  </div>
)}
```

### Auto-Scroll to Latest Message
```jsx
const messagesEndRef = useRef(null);

useEffect(() => {
  // Scroll to the bottom whenever a new message is added
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, isTyping]);

// At the bottom of the messages list:
<div ref={messagesEndRef} />
```

**`useRef` deep dive:**
`useRef` creates a **mutable reference** to a DOM element. Unlike state, changing a `ref` does NOT cause a re-render. Here, we use it to get a direct reference to the invisible `<div>` at the bottom of the chat, then call `.scrollIntoView()` on it to scroll the chat window down.

---

---
## 🗳️ ZOOM POLL 3 — Optimistic UI
> ⏱️ **Share this poll:** After Slide 5 (Chat Page — Optimistic UI section). Core UX pattern check.

**Question: In our ChatPage, a user clicks "Send". Their message appears IMMEDIATELY in the chat BEFORE the AI responds. This pattern is called Optimistic UI. What is the main benefit?**
*(Single Choice)*

A) It reduces server costs because fewer API calls are made
B) The app FEELS instant and responsive — users see their action reflected immediately without waiting
C) It prevents the AI from giving wrong answers by checking the message first
D) It automatically retries failed messages without the user knowing

✅ **Correct Answer:** B

> 💬 **Instructor note:** Demo the difference — without optimistic UI there's an awkward 1.5-second pause after clicking send where nothing happens. With it, the message appears instantly and the typing indicator shows — the app feels alive.

---

## 📌 Slide 6 — The Projects Page

### File: `frontend/src/pages/ProjectsPage.jsx`

The Projects page shows **3 AI-generated project ideas** tailored to the student's current skill level. Projects are the best way for students to solidify their knowledge — but most students don't know where to start. This page solves that.

### Page Layout
```
┌──────────────────────────────────────────┐
│  💡 Project Recommendations              │
│  Based on your Beginner level            │
├──────────────────────────────────────────┤
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│ │ Todo App   │ │ Weather App│ │ Quiz App   │ │
│ │ React+CSS  │ │ React+API  │ │ React+Quiz │ │
│ │ 3 days     │ │ 5 days     │ │ 7 days     │ │
│ │ [Save] [↗] │ │ [Save] [↗]│ │ [Save] [↗]│ │
│ └────────────┘ └────────────┘ └────────────┘ │
├──────────────────────────────────────────┤
│  ⭐ Saved Projects                        │
│  (Your bookmarked project ideas)         │
└──────────────────────────────────────────┘
```

### Project Card Data Structure
```jsx
const mockProjects = [
  {
    _id: '1',
    title: 'Personal Todo App with Authentication',
    description: 'Build a full-featured todo list with user accounts, persistent storage, and category filtering.',
    difficulty: 'beginner',
    techStack: ['React', 'useState', 'CSS', 'localStorage'],
    estimatedTime: '3 days',
    isSaved: false,
  },
  // ... 2 more
];
```

### Save a Project Interaction
```jsx
const handleSaveProject = (projectId) => {
  // Toggle saved state
  setProjects(prev => 
    prev.map(p => p._id === projectId ? { ...p, isSaved: !p.isSaved } : p)
  );
  // In MC6: calls POST /api/projects/save
  toast.success('Project saved! 🎉');
};
```

### The "Saved Projects" Section
Below the recommendations: a separate section showing all saved projects (filtered from the projects list). If no projects are saved yet, shows the `<EmptyState />` component.

---

## 📌 Slide 7 — The Resources Page

### File: `frontend/src/pages/ResourcesPage.jsx`

A library of admin-curated learning resources — articles, videos, courses, and tools — organized by category with search and filtering.

### The Search & Filter Interaction

**How Search Works:**
```jsx
const [searchQuery, setSearchQuery] = useState('');
const [activeFilter, setActiveFilter] = useState('All');

// Client-side filtering:
const filteredResources = resources.filter(resource => {
  const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       resource.description.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesFilter = activeFilter === 'All' || resource.category === activeFilter;
  return matchesSearch && matchesFilter;
});
```

**The Filter Bar:**
```jsx
const categories = ['All', 'Web Development', 'Data Science', 'AI/ML', 'Mobile', 'DevOps'];

<FilterBar
  categories={categories}
  activeFilter={activeFilter}
  onFilterChange={setActiveFilter}
/>
```

### Resource Card Structure
```jsx
<Card key={resource._id}>
  <div className="resource-type">
    {resource.type === 'video' ? '🎥' : resource.type === 'course' ? '🎓' : '📄'}
    <span>{resource.type}</span>
  </div>
  <h3>{resource.title}</h3>
  <p>{truncate(resource.description, 120)}</p>
  <Badge variant={getDifficultyColor(resource.difficulty)}>
    {resource.difficulty}
  </Badge>
  <Button variant="ghost" size="sm" onClick={() => window.open(resource.url, '_blank')}>
    Open Resource ↗
  </Button>
</Card>
```

---

## 📌 Slide 8 — The Profile Page

### File: `frontend/src/pages/ProfilePage.jsx`

The Profile page allows users to view and update their personal information and learning preferences.

### View Mode vs Edit Mode: The Toggle Pattern
```jsx
const [isEditing, setIsEditing] = useState(false);
const [formData, setFormData] = useState({
  name: user?.name || '',
  bio: profile?.bio || '',
  currentLevel: profile?.currentLevel || 'beginner',
  skills: profile?.skills || [],
  linkedin: profile?.linkedin || '',
  github: profile?.github || '',
});

// The same page renders differently based on isEditing:
{isEditing ? (
  <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
) : (
  <h2>{user?.name}</h2>
)}

<Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
  {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
</Button>
```

### Skills Tags — Add & Remove
```jsx
const [newSkill, setNewSkill] = useState('');

const addSkill = () => {
  if (newSkill && !formData.skills.includes(newSkill)) {
    setFormData({ ...formData, skills: [...formData.skills, newSkill] });
    setNewSkill('');
  }
};

const removeSkill = (skillToRemove) => {
  setFormData({
    ...formData,
    skills: formData.skills.filter(s => s !== skillToRemove)
  });
};

// Skills rendered as removable tags:
{formData.skills.map(skill => (
  <span key={skill} className="skill-tag">
    {skill}
    {isEditing && <button onClick={() => removeSkill(skill)}>✕</button>}
  </span>
))}
```

---

## 📌 Slide 9 — Admin Pages

### The Admin Panel: 3 Pages

Only users with `role === 'admin'` can access these pages. They're all wrapped in `<AdminRoute>` in `App.jsx`.

### File: `frontend/src/pages/AdminDashboardPage.jsx`

Shows platform-wide statistics:
```jsx
const stats = [
  { label: 'Total Users', value: 1247, icon: '👥', color: '#6C63FF' },
  { label: 'Roadmaps Generated', value: 892, icon: '🗺️', color: '#00D4AA' },
  { label: 'Learning Resources', value: 156, icon: '📚', color: '#FFD93D' },
  { label: 'Active Today', value: 89, icon: '🔥', color: '#FF6B6B' },
];
```

In MC6, these come from `GET /api/admin/stats`.

### File: `frontend/src/pages/AdminUsersPage.jsx`

A table of all registered users with ban/unban controls:
```jsx
// User table row:
<tr key={user._id}>
  <td><Avatar name={user.name} size="sm" /></td>
  <td>{user.name}</td>
  <td>{user.email}</td>
  <td><Badge variant={user.role === 'admin' ? 'primary' : 'neutral'}>{user.role}</Badge></td>
  <td>
    <Badge variant={user.isActive ? 'success' : 'error'}>
      {user.isActive ? 'Active' : 'Banned'}
    </Badge>
  </td>
  <td>
    <Button
      variant={user.isActive ? 'danger' : 'accent'}
      size="sm"
      onClick={() => handleToggleUser(user._id, !user.isActive)}
    >
      {user.isActive ? 'Ban User' : 'Unban User'}
    </Button>
  </td>
</tr>
```

### File: `frontend/src/pages/AdminResourcesPage.jsx`

Full CRUD (Create, Read, Update, Delete) for the resources collection:
- **List view** — All resources in a table with Edit and Delete buttons
- **Add Resource** — Opens a modal with a form to add a new resource
- **Edit Resource** — Opens a pre-filled modal to update an existing resource
- **Delete Resource** — Shows a confirmation dialog before deleting

```jsx
const [showAddModal, setShowAddModal] = useState(false);
const [editingResource, setEditingResource] = useState(null);

// Form state:
const [resourceForm, setResourceForm] = useState({
  title: '', description: '', url: '', category: '', type: 'article', difficulty: 'beginner', tags: []
});
```

---

---
## 🗳️ ZOOM POLL 4 — Role-Based Access
> ⏱️ **Share this poll:** After Slide 9 (Admin Pages). Tests the AdminRoute concept.

**Question: A regular user (role: "user") is logged in and types `/admin` in the browser. What happens?**
*(Single Choice)*

A) They see the Admin Dashboard — any logged-in user can access admin pages
B) The page shows a blank white screen with no error
C) `AdminRoute` checks `user.role`, finds it's not 'admin', and redirects to `/dashboard`
D) The backend blocks the request and returns a 403 Forbidden error

✅ **Correct Answer:** C

> 💬 **Instructor note:** Clarify that this is the FRONTEND guard. The backend ALSO has `admin` middleware protecting admin API routes. Both layers work together. Even if someone bypasses the frontend guard, the backend will reject their API calls.

---

## 📌 Slide 10 — The Complete Component & Page Map

This is the full picture of every file that exists in the frontend at the end of MC3:

```
frontend/src/
├── main.jsx                        ← App entry point (MC1)
├── App.jsx                         ← All routes (updated each MC)
│
├── context/
│   ├── ThemeContext.jsx            ← Dark/light mode (MC2)
│   └── AuthContext.jsx             ← User auth state (MC2)
│
├── routes/
│   ├── ProtectedRoute.jsx          ← Auth guard (MC2)
│   └── AdminRoute.jsx              ← Admin guard (MC2)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx              ← Public nav (MC1)
│   │   ├── Footer.jsx              ← Public footer (MC1)
│   │   ├── DashboardLayout.jsx     ← Logged-in shell (MC2)
│   │   └── Sidebar.jsx             ← Left nav panel (MC2)
│   │
│   ├── landing/
│   │   ├── HeroSection.jsx         ← Landing hero (MC1)
│   │   ├── FeatureCard.jsx         ← Feature card (MC1)
│   │   ├── TestimonialSection.jsx  ← Testimonials (MC1)
│   │   └── CTABanner.jsx           ← CTA section (MC1)
│   │
│   ├── ui/
│   │   ├── Button.jsx              ← (MC2)
│   │   ├── Badge.jsx               ← (MC2)
│   │   ├── Card.jsx                ← (MC2)
│   │   ├── Modal.jsx               ← (MC2)
│   │   ├── InputField.jsx          ← (MC2)
│   │   ├── Spinner.jsx             ← (MC2)
│   │   ├── EmptyState.jsx          ← (MC2)
│   │   ├── ProgressBar.jsx         ← (MC2)
│   │   ├── ProgressRing.jsx        ← (MC2)
│   │   ├── Avatar.jsx              ← (MC2)
│   │   ├── SearchBar.jsx           ← (MC2)
│   │   ├── FilterBar.jsx           ← (MC2)
│   │   └── ThemeToggle.jsx         ← (MC2)
│   │
│   └── learning/
│       ├── LessonModal.jsx         ← AI lesson popup (MC3)
│       └── QuizModal.jsx           ← Interactive quiz popup (MC3)
│
└── pages/
    ├── LandingPage.jsx             ← (MC1)
    ├── AboutPage.jsx               ← (MC1)
    ├── LoginPage.jsx               ← (MC1)
    ├── RegisterPage.jsx            ← (MC1)
    ├── NotFoundPage.jsx            ← (MC1)
    ├── OnboardingPage.jsx          ← (MC2)
    ├── DashboardPage.jsx           ← (MC3) ← NEW
    ├── RoadmapPage.jsx             ← (MC3) ← NEW
    ├── ChatPage.jsx                ← (MC3) ← NEW
    ├── ProjectsPage.jsx            ← (MC3) ← NEW
    ├── ResourcesPage.jsx           ← (MC3) ← NEW
    ├── ProfilePage.jsx             ← (MC3) ← NEW
    ├── AdminDashboardPage.jsx      ← (MC3) ← NEW
    ├── AdminUsersPage.jsx          ← (MC3) ← NEW
    └── AdminResourcesPage.jsx      ← (MC3) ← NEW
```

---

## 📌 Slide 11 — 14 Routes: The Complete Route Map

At the end of MC3, `App.jsx` has all 14 routes wired up:

| URL Path | Component | Access Level |
|----------|-----------|-------------|
| `/` | `LandingPage` | Public |
| `/about` | `AboutPage` | Public |
| `/login` | `LoginPage` | Public |
| `/register` | `RegisterPage` | Public |
| `/onboarding` | `OnboardingPage` | 🔒 Authenticated |
| `/dashboard` | `DashboardPage` | 🔒 Authenticated |
| `/roadmap` | `RoadmapPage` | 🔒 Authenticated |
| `/chat` | `ChatPage` | 🔒 Authenticated |
| `/projects` | `ProjectsPage` | 🔒 Authenticated |
| `/resources` | `ResourcesPage` | 🔒 Authenticated |
| `/profile` | `ProfilePage` | 🔒 Authenticated |
| `/admin` | `AdminDashboardPage` | 👑 Admin Only |
| `/admin/users` | `AdminUsersPage` | 👑 Admin Only |
| `/admin/resources` | `AdminResourcesPage` | 👑 Admin Only |
| `*` | `NotFoundPage` | Public |

---

## 📌 Slide 12 — Key React Concepts Reinforced in MC3

### `useRef` — For DOM Access Without Re-renders
Used in `ChatPage` to:
1. Auto-scroll to the latest message
2. Focus the input field after sending a message

```jsx
const inputRef = useRef(null);
const messagesEndRef = useRef(null);

// Focus input after send:
const handleSend = () => {
  sendMessage(inputText);
  setInputText('');
  inputRef.current?.focus(); // Direct DOM access — no state needed
};
```

### Array Spread & Immutable State Updates
When adding a message to the chat:
```jsx
// ❌ Wrong — mutating state directly
messages.push(newMessage); // Never do this!

// ✅ Correct — create a new array with the spread operator
setMessages(prev => [...prev, newMessage]);
```
React's state must be treated as **immutable** — never directly modify it. Always create a new value/array/object. React compares the new state to the old state (by reference) to decide if a re-render is needed.

### Conditional Rendering Patterns
```jsx
// Pattern 1: Short-circuit (&&)
{isTyping && <TypingIndicator />}

// Pattern 2: Ternary
{isEditing ? <EditForm /> : <DisplayView />}

// Pattern 3: Early return
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage />;
return <MainContent />;
```

---

## 📌 Slide 13 — GitHub Checkpoint: MC3

### Commit Message
> `MC3: Complete Frontend — Dashboard, Roadmap, Chat, Projects, Resources, Profile, Admin pages, LessonModal, QuizModal`

### Branch Naming
`masterclass-3/dashboard-pages`

### What's Intentionally Left for MC4–MC6
- All pages use hardcoded mock data — no real backend calls yet
- Login/Register don't connect to a server yet
- The roadmap content is a fake JSON array
- Chat AI responses are simulated with setTimeout
- Project recommendations are hardcoded
- Everything gets replaced with real API calls in MC6

---

## 📌 Slide 14 — Homework for Students

1. **Mock vs Real Data** — Look at `DashboardPage.jsx`. Find every piece of hardcoded data and mark it with a comment `// TODO: Replace with API call`. This is what a real developer does when building a frontend before the backend is ready.

2. **Quiz UX improvement** — In the QuizModal, add a "progress tracker" like "Question 2 of 3" at the top. Use the `currentQuestion` state variable.

3. **Empty states everywhere** — Find 3 places in the app where you show an empty list or no-data state. Replace each with the `<EmptyState />` component you built in MC2.

4. **Admin page add** — Design a 4th admin page: `AdminAnalyticsPage` at `/admin/analytics`. It can show fake charts for now. Add the route and add a link to it in the Sidebar's admin section.

---

## ✅ By the End of MC3, Students Should Be Able To:

- ✅ Build complex, multi-feature pages with multiple pieces of state
- ✅ Implement optimistic UI — update the interface before server confirmation
- ✅ Use `useRef` to access DOM elements directly without triggering re-renders
- ✅ Build a view/edit mode toggle pattern (Profile page pattern)
- ✅ Implement client-side search and filtering on a list
- ✅ Build CRUD UI with add/edit/delete using modals and form state
- ✅ Construct interactive quiz logic with state machine pattern
- ✅ Use all conditional rendering patterns appropriately
- ✅ Build a full 14-route React application with protected and public pages

---

## 🎮 Two Truths and One Lie — MC3

---

### 🔴 Round 1 — About useRef and State

- 🟢 `useRef` gives you a direct reference to a DOM element — you can call real browser methods like `.scrollIntoView()` or `.focus()` on it.
- 🟢 When you call a state setter (like `setMessages(newArray)`), React re-renders the component — but only if the new value is different from the current one by reference.
- 🔴 You can safely directly push items into a state array (`messages.push(newItem)`) as long as you call `setMessages` afterward to trigger the re-render.

> **🎯 The Lie:** You must NEVER mutate state arrays directly. `messages.push(newItem)` changes the existing array object — React's comparison sees the same array reference and may skip re-rendering. Always create a **new array**: `setMessages(prev => [...prev, newItem])`.

---

### 🔴 Round 2 — About Component Architecture

- 🟢 `DashboardLayout.jsx` uses the `{children}` prop to render whatever content is placed between its opening and closing tags — this is the "children prop pattern."
- 🟢 The LessonModal and QuizModal both use the `Modal` component from MC2 as their base — this is why we built Modal as a reusable component.
- 🔴 It's best practice to put all page state (like `messages`, `isTyping`, `selectedStep`) directly into `App.jsx` so it's centrally managed and all pages can access it easily.

> **🎯 The Lie:** Putting all state in `App.jsx` is called "lifting state too high" and is an anti-pattern. Each piece of state should live in the **closest common ancestor** that needs it. `messages` is only used in `ChatPage` — it belongs there, not in `App.jsx`.

---

### 🔴 Round 3 — About Forms and Editing

- 🟢 The view/edit mode toggle in ProfilePage uses a boolean `isEditing` state to switch between showing static text and showing input fields.
- 🟢 Using `setFormData({...formData, name: e.target.value})` creates a new object with all existing fields plus the updated `name` — this is the correct way to update one field in an object state.
- 🔴 When a user edits the profile form, changes should be immediately reflected in the real user data shown across the app, so we should update `AuthContext` user data on every keystroke.

> **🎯 The Lie:** You should update `AuthContext` (or any global state) ONLY after the user saves and the API confirms the change. Updating global state on every keystroke would cause unnecessary re-renders across the entire app and data inconsistencies if the user cancels their edits.

---

## 🙋 Mid-Class Questions — MC3

1. **"In the ChatPage, we add the user's message to the chat BEFORE the API responds. This is called 'Optimistic UI'. What could go wrong with this approach, and how might we handle it?"**
   *(Expected: If the API fails, the user's message appears in the chat but no AI response comes. We'd need to catch the error and remove the user's message or show an error state. Optimistic UI trades UX speed for complexity.)*

2. **"The QuizModal has a `score` state and a `currentQuestion` state. These are both managed INSIDE QuizModal, not in RoadmapPage. Why is this the right place for them?"**
   *(Expected: Because `score` and `currentQuestion` are only relevant to the quiz. RoadmapPage doesn't need to know about the quiz's internal progress — it just opens the modal. This keeps RoadmapPage clean and QuizModal self-contained.)*

3. **"In ProfilePage, we have `isEditing` state. When `isEditing` is true, we show inputs. When false, we show plain text. The same `formData` state is used in both modes. What happens to unsaved changes if the user clicks 'Cancel'?"**
   *(Expected: The formData would still have the edited values. We need to add a 'Cancel' button that resets `formData` back to the original user data from `AuthContext` and sets `isEditing` to false.)*

4. **"We use `useRef` in ChatPage to auto-scroll the chat. Why didn't we just use `useState` for this? What's the key difference between `useRef` and `useState`?"**
   *(Expected: `useState` triggers a re-render when it changes. `useRef` does NOT trigger re-renders — it's just a mutable reference box. We don't need the component to re-render to scroll; we just need to call a DOM method directly.)*

5. **"At the end of MC3, every page shows hardcoded/mock data. What's the advantage of building the UI separately from the API integration?"**
   *(Expected: You can test and perfect the UI without needing the backend to be ready. Frontend and backend teams can work in parallel. You can show a working demo to stakeholders before the API is built.)*

---

## 📋 File Creation Flow — MC3 (Start Here, Follow This Order!)

This section provides a clear, step-by-step walkthrough of the files you need to create, modify, or update during Masterclass 3. Click on the file name links to open the files directly on your screen.

---

### 🟢 STEP 1 — AI Learning Components (Build before pages)

#### 1️⃣ File: [frontend/src/components/learning/LessonModal.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/learning/LessonModal.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Explain markdown parsing. We use the third-party `<ReactMarkdown>` component to parse the lesson content dynamically.
- **Code to Write:**
```jsx
import ReactMarkdown from 'react-markdown';
import { FiX } from 'react-icons/fi';
import Button from '../ui/Button';

const LessonModal = ({ isOpen, onClose, topic, lesson }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box animate-fade-up" style={{ maxWidth: '700px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Learn: {topic}</h2>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>
        
        <div className="lesson-content" style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: 'var(--space-2)' }}>
          <ReactMarkdown>{lesson}</ReactMarkdown>
        </div>

        <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" onClick={onClose}>Got it!</Button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
```

#### 2️⃣ File: [frontend/src/components/learning/QuizModal.jsx](file:///e:/SDG-Quality-Education/frontend/src/components/learning/QuizModal.jsx)
- **Action:** Create this new file.
- **Instructor Note:** Manage multiple state variables (`currentStep`, `selectedOption`, `isAnswered`, `score`, `showResult`) to handle the quiz flow. Triggers `onPass()` when the score meets the threshold (e.g., $\ge 60\%$).
- **Code to Write:**
```jsx
import { useState } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import Button from '../ui/Button';

const QuizModal = ({ isOpen, onClose, topic, quiz, onPass }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = quiz[currentStep];

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < quiz.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    if (score >= quiz.length * 0.6) {
      onPass();
    }
    onClose();
    setTimeout(() => {
      setCurrentStep(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setShowResult(false);
    }, 300);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{showResult ? 'Quiz Results' : `Quiz: ${topic}`}</h2>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>

        {!showResult ? (
          <div>
            <div style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              Question {currentStep + 1} of {quiz.length}
            </div>
            
            <h3 style={{ marginBottom: 'var(--space-6)', lineHeight: 1.4 }}>{currentQuestion.question}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {currentQuestion.options.map((option, index) => {
                let className = 'quiz-option';
                if (selectedOption === index) className += ' quiz-option--selected';
                if (isAnswered) {
                  if (index === currentQuestion.correctIndex) className += ' quiz-option--correct';
                  else if (selectedOption === index) className += ' quiz-option--wrong';
                }

                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() => handleSelect(index)}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={`quiz-feedback ${selectedOption === currentQuestion.correctIndex ? 'quiz-feedback--success' : 'quiz-feedback--error'}`}>
                <div style={{ fontWeight: 700, marginBottom: 'var(--space-1)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {selectedOption === currentQuestion.correctIndex ? <><FiCheckCircle /> Correct!</> : <><FiAlertCircle /> Incorrect</>}
                </div>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'flex-end' }}>
              {!isAnswered ? (
                <Button variant="primary" disabled={selectedOption === null} onClick={handleSubmit}>Check Answer</Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  {currentStep === quiz.length - 1 ? 'See Results' : 'Next Question'} <FiArrowRight />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>
              {score >= quiz.length * 0.6 ? '🎉' : '📚'}
            </div>
            <h3>{score >= quiz.length * 0.6 ? 'Congratulations!' : 'Good Effort!'}</h3>
            <p style={{ margin: 'var(--space-4) 0 var(--space-8)' }}>
              You scored {score} out of {quiz.length} correctly.
              {score >= quiz.length * 0.6 ? " You've mastered this topic!" : " Try reviewing the lesson and taking the quiz again."}
            </p>
            <Button variant="primary" size="lg" onClick={handleFinish}>
              {score >= quiz.length * 0.6 ? 'Complete Step' : 'Back to Roadmap'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
```

---

### 🟡 STEP 2 — Dashboard Page (The Hub)

#### 3️⃣ File: [frontend/src/pages/DashboardPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/DashboardPage.jsx)
- **Action:** Create this new page.
- **Instructor Note:** Standard user landing view. We render static mock values for roadmap details, overall progress ring elements, and quick action navigations. Wire up local state to support the Study Goal Tracker assignment checklist.
- **Code to Write:**
```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMap, FiMessageSquare, FiFolder, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProgressRing from '../components/ui/ProgressRing';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

const StatCard = ({ icon, label, value, color = 'var(--color-primary)' }) => (
  <div className="stat-card">
    <div className="stat-card__icon" style={{ background: `${color}22`, color }}>{icon}</div>
    <div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  
  // Weekly goals state (Practical Assignment)
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete React Fundamentals lesson', completed: false },
    { id: 2, text: 'Take the JSX Syntax Quiz', completed: true },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    const newGoal = { id: Date.now(), text: newGoalText, completed: false };
    setGoals([...goals, newGoal]);
    setNewGoalText('');
    setIsModalOpen(false);
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        {/* Welcome */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-1)' }}>
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0] || 'Student'}</span> 👋
          </h1>
          <p>Here's your learning overview for today.</p>
        </div>

        {/* Stats Row */}
        <div className="grid-4" style={{ marginBottom: 'var(--space-8)' }}>
          <StatCard icon="📈" label="Progress" value="40%" color="#6C63FF" />
          <StatCard icon="✅" label="Steps Done" value="4/10" color="#10B981" />
          <StatCard icon="🔥" label="Streak" value={`${user?.streak || 1}d`} color="#F59E0B" />
          <StatCard icon="🎯" label="Goal" value={user?.learningGoal || 'Web Development'} color="#00D4AA" />
        </div>

        <div className="grid-2" style={{ marginBottom: 'var(--space-8)' }}>
          {/* Progress Ring Widget */}
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Overall Progress</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
              <ProgressRing value={40} size={140} />
              <div>
                <p style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  You've completed <strong style={{ color: 'var(--color-accent)' }}>4 topics</strong> out of 10.
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  Goal: {user?.learningGoal || 'Web Development'} · Level: {user?.currentLevel || 'beginner'}
                </p>
                <Link to="/roadmap" style={{ marginTop: 'var(--space-4)', display: 'inline-flex' }}>
                  <Button variant="primary" size="sm">View Roadmap <FiArrowRight /></Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { to: '/roadmap', icon: <FiMap />, label: 'Continue Roadmap', sub: 'Pick up where you left off', color: '#6C63FF' },
                { to: '/chat', icon: <FiMessageSquare />, label: 'Ask AI Mentor', sub: 'Get instant doubt resolution', color: '#00D4AA' },
                { to: '/projects', icon: <FiFolder />, label: 'Find a Project', sub: 'Build something real', color: '#F59E0B' },
                { to: '/resources', icon: <FiBookOpen />, label: 'Browse Resources', sub: 'Curated learning materials', color: '#3B82F6' },
              ].map(({ to, icon, label, sub, color }) => (
                <Link key={to} to={to} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', transition: 'var(--transition)', border: '1px solid transparent' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--color-bg-elevated)'; e.currentTarget.style.borderColor = 'var(--color-border)' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: `${color}22`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{label}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{sub}</div>
                  </div>
                  <FiArrowRight style={{ marginLeft: 'auto', color: 'var(--color-text-muted)' }} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Goals Checklist card */}
        <Card className="goals-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
            <h2>🎯 Weekly Study Goals</h2>
            <Button onClick={() => setIsModalOpen(true)} size="sm">Add Goal</Button>
          </div>

          {goals.length === 0 ? (
            <EmptyState title="No Goals Set" description="Add your first study goal to stay on track!" />
          ) : (
            <ul className="goals-list" style={{ listStyle: 'none', padding: 0 }}>
              {goals.map(goal => (
                <li key={goal.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-md)', marginBottom: 8, border: '1px solid var(--color-border)' }}>
                  <input 
                    type="checkbox" 
                    checked={goal.completed} 
                    onChange={() => toggleGoal(goal.id)} 
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                  <span style={{ textDecoration: goal.completed ? 'line-through' : 'none', color: goal.completed ? 'var(--color-text-secondary)' : 'var(--color-text)', fontSize: 'var(--text-sm)', flex: 1 }}>{goal.text}</span>
                  <button onClick={() => deleteGoal(goal.id)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: 'var(--text-sm)' }}>✕</button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Set New Study Goal">
        <form onSubmit={handleAddGoal} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <input 
            type="text" 
            placeholder="e.g. Learn useEffect hooks" 
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            className="input-field"
            required
            autoFocus
          />
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Add Goal</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default DashboardPage;
```

---

### 🟠 STEP 3 — Core Feature Pages

#### 4️⃣ File: [frontend/src/pages/RoadmapPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/RoadmapPage.jsx)
- **Action:** Create this new page.
- **Instructor Note:** Displays the student's learning timeline. Integrate `<LessonModal>` and `<QuizModal>` toggling.
- **Code to Write:**
```jsx
import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import LessonModal from '../components/learning/LessonModal';
import QuizModal from '../components/learning/QuizModal';

const initialSteps = [
  { stepNumber: 1, title: 'Introduction to HTML & CSS', description: 'Understand layouts, tags, and CSS styles.', duration: '2 hours', completed: true, content: '# HTML & CSS Basics\n\nHTML provides structure, CSS provides layout styling.', quiz: [{ question: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets'], correctIndex: 1, explanation: 'CSS stands for Cascading Style Sheets.' }] },
  { stepNumber: 2, title: 'JavaScript Fundamentals', description: 'Variables, loops, and conditional statements.', duration: '3 hours', completed: false, content: '# JavaScript Basics\n\nJavaScript is the programming language of the web.', quiz: [{ question: 'Which keyword defines a block variable?', options: ['var', 'let', 'const'], correctIndex: 1, explanation: 'let defines block-scoped local variables.' }] },
  { stepNumber: 3, title: 'React Basics', description: 'Functional components and props.', duration: '4 hours', completed: false, content: '# React Components\n\nReact builds components that represent UIs.', quiz: [{ question: 'What returns JSX from components?', options: ['Render function', 'Standard variables', 'Functions'], correctIndex: 2, explanation: 'React functional components return JSX.' }] },
];

const RoadmapPage = () => {
  const [steps, setSteps] = useState(initialSteps);
  const [lessonData, setLessonData] = useState({ open: false, topic: '', content: '' });
  const [quizData, setQuizData] = useState({ open: false, topic: '', content: null });

  const handleToggle = (stepNumber) => {
    setSteps(steps.map(s => s.stepNumber === stepNumber ? { ...s, completed: !s.completed } : s));
  };

  const doneCount = steps.filter(s => s.completed).length;
  const pct = (doneCount / steps.length) * 100;

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Your <span className="gradient-text">Roadmap</span></h1>
            <div style={{ display: 'flex', gap: 8 }}><Badge variant="primary">Web Development</Badge><Badge variant="neutral">Beginner</Badge></div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontWeight: 600 }}>Overall Progress</span>
            <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{Math.round(pct)}%</span>
          </div>
          <ProgressBar value={pct} height={10} />
          <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>{doneCount} of {steps.length} steps completed</p>
        </div>

        <div className="roadmap-timeline">
          {steps.map((step) => (
            <div key={step.stepNumber} className={`roadmap-step ${step.completed ? 'roadmap-step--completed' : ''}`}>
              <div className="roadmap-step__number">{step.completed ? <FiCheck /> : step.stepNumber}</div>
              <div className="roadmap-step__body">
                <div className="roadmap-step__title" style={{ textDecoration: step.completed ? 'line-through' : 'none', color: step.completed ? 'var(--color-text-secondary)' : 'var(--color-text)' }}>{step.title}</div>
                <div className="roadmap-step__desc">{step.description}</div>
                <div className="roadmap-step__meta">
                  <Badge variant="neutral">⏱ {step.duration}</Badge>
                  <label className="roadmap-step__checkbox">
                    <input type="checkbox" checked={step.completed} onChange={() => handleToggle(step.stepNumber)} />
                    {step.completed ? 'Completed' : 'Mark done'}
                  </label>
                </div>
                {!step.completed && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    <Button variant="secondary" size="sm" onClick={() => setLessonData({ open: true, topic: step.title, content: step.content })}>📖 Learn Now</Button>
                    <Button variant="ghost" size="sm" onClick={() => setQuizData({ open: true, topic: step.title, content: step.quiz })}>🧠 Test Knowledge</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <LessonModal isOpen={lessonData.open} onClose={() => setLessonData({ open: false, topic: '', content: '' })} topic={lessonData.topic} lesson={lessonData.content} />
        <QuizModal isOpen={quizData.open} onClose={() => setQuizData({ open: false, topic: '', content: null })} topic={quizData.topic} quiz={quizData.content || []} onPass={() => handleToggle(steps.find(s => s.title === quizData.topic).stepNumber)} />
      </div>
    </DashboardLayout>
  );
};

export default RoadmapPage;
```

#### 5️⃣ File: [frontend/src/pages/ChatPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/ChatPage.jsx)
- **Action:** Create this new page.
- **Instructor Note:** AI mentorship chat simulator. We use `useRef` to auto-scroll the dialogue thread down to the bottom when new message objects are appended.
- **Code to Write:**
```jsx
import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import DashboardLayout from '../components/layout/DashboardLayout';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Mentor. Ask me any question about your current learning path.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `I received your message about "${text}". That is a vital topic in Web Development! In React, we use functional components and state parameters to handle state logic.`
      }]);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 4 }}>AI Doubt <span className="gradient-text">Assistant</span></h1>
          <p style={{ fontSize: 'var(--text-sm)' }}>Ask anything about your learning journey — available 24/7</p>
        </div>

        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', maxWidth: '80%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: msg.role === 'user' ? 'var(--color-accent)' : 'var(--color-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {msg.role === 'user' ? 'U' : '🤖'}
                </div>
                <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-elevated)', color: msg.role === 'user' ? '#fff' : 'var(--color-text)' }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && <div style={{ alignSelf: 'flex-start', color: 'var(--color-text-secondary)', fontSize: 'var(--text-xs)' }}>🤖 AI is typing...</div>}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: 16, borderTop: '1px solid var(--color-border)', display: 'flex', gap: 12 }}>
            <input className="input-field" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask a doubt..." style={{ flex: 1 }} />
            <button className="btn btn--primary" onClick={handleSend} disabled={!input.trim()}>Send</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
```

#### 6️⃣ File: [frontend/src/pages/ProjectsPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/ProjectsPage.jsx)
- **Action:** Create this new page.
- **Instructor Note:** Renders project ideas cards. Integrates `<FilterBar>` to filter list arrays.
- **Code to Write:**
```jsx
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import FilterBar from '../components/ui/FilterBar';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const mockProjects = [
  { title: 'Personal Portfolio', description: 'Create a clean, semantic web portfolio displaying your skills.', difficulty: 'beginner', techStack: ['HTML', 'CSS'], estimatedTime: '5 hours' },
  { title: 'Task Manager Dashboard', description: 'Build a dashboard to add, filter, and track weekly schedules.', difficulty: 'intermediate', techStack: ['React', 'CSS Variables'], estimatedTime: '12 hours' },
  { title: 'AI-Powered Doubt Helper', description: 'A MERN stack portal featuring deep learning response models.', difficulty: 'advanced', techStack: ['React', 'Node.js', 'MongoDB'], estimatedTime: '25 hours' },
];

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? mockProjects : mockProjects.filter(p => p.difficulty === filter);

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1>Project <span className="gradient-text">Ideas</span></h1>
          <p>AI-recommended projects matched to your skill level. Build a real portfolio.</p>
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}><FilterBar options={filterOptions} active={filter} onChange={setFilter} /></div>

        <div className="grid-3">
          {filtered.map((p, i) => (
            <Card key={i} hover>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <Badge variant={p.difficulty === 'beginner' ? 'success' : p.difficulty === 'intermediate' ? 'warning' : 'error'}>{p.difficulty}</Badge>
              </div>
              <h3 style={{ marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 16 }}>{p.description}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {p.techStack.map(t => <Badge key={t} variant="info">{t}</Badge>)}
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>⏱ {p.estimatedTime}</span>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;
```

#### 7️⃣ File: [frontend/src/pages/ResourcesPage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/ResourcesPage.jsx)
- **Action:** Create this new page.
- **Instructor Note:** Search and filter combined queries. Triggers query filter changes with every search keystroke.
- **Code to Write:**
```jsx
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';

const mockResources = [
  { title: 'MDN Web Docs: CSS Basics', topic: 'CSS', type: 'documentation', url: 'https://developer.mozilla.org' },
  { title: 'React Documentation: Thinking in React', topic: 'React', type: 'documentation', url: 'https://react.dev' },
  { title: 'Javascript Crash Course for Beginners', topic: 'Javascript', type: 'video', url: 'https://youtube.com' },
];

const typeFilters = [
  { value: 'all', label: 'All' },
  { value: 'video', label: '🎬 Video' },
  { value: 'documentation', label: '📚 Docs' },
];

const ResourcesPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockResources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.topic.toLowerCase().includes(search.toLowerCase());
    const matchType = filter === 'all' || r.type === filter;
    return matchSearch && matchType;
  });

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1>Resource <span className="gradient-text">Library</span></h1>
          <p>Curated learning materials handpicked by our instructors.</p>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}><SearchBar value={search} onChange={e => setSearch(e.target.value)} /></div>
          <FilterBar options={typeFilters} active={filter} onChange={setFilter} />
        </div>

        <div className="grid-3">
          {filtered.map((r, i) => (
            <Card key={i}>
              <Badge variant="accent">{r.type}</Badge>
              <h3 style={{ margin: '12px 0 8px' }}>{r.title}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Topic: {r.topic}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12, display: 'inline-flex' }}>
                <Button variant="primary" size="sm">Visit Resource</Button>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResourcesPage;
```

---

### 🔵 STEP 4 — User Pages

#### 8️⃣ File: [frontend/src/pages/ProfilePage.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/ProfilePage.jsx)
- **Action:** Create this new page.
- **Instructor Note:** Manage account profile name settings. Email values are disabled to protect user account data security.
- **Code to Write:**
```jsx
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || 'Demo Student');

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ name });
    alert('Profile updated!');
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-up" style={{ maxWidth: 600 }}>
        <div style={{ marginBottom: 24 }}><h1>Your <span className="gradient-text">Profile</span></h1></div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
          <Avatar name={name} size={70} />
          <div>
            <h3>{name}</h3>
            <p>{user?.email || 'student@example.com'}</p>
          </div>
        </div>

        <div className="card">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InputField label="Full Name" id="p-name" value={name} onChange={e => setName(e.target.value)} required />
            <Button type="submit" style={{ alignSelf: 'flex-start' }}>Save Profile</Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
```

---

### 🟣 STEP 5 — Admin Pages

#### 9️⃣ File: [frontend/src/pages/admin/AdminDashboard.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/admin/AdminDashboard.jsx)
- **Action:** Create this new page inside folder `frontend/src/pages/admin/`.
- **Instructor Note:** Restrict access to admin roles using `AdminRoute`. Renders statistical panels and shortcut paths to admin resources.
- **Code to Write:**
```jsx
import DashboardLayout from '../../components/layout/DashboardLayout';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ marginBottom: 24 }}>
          <h1>Admin <span className="gradient-text">Dashboard</span></h1>
          <p>Platform overview and management tools.</p>
        </div>

        <div className="grid-4" style={{ marginBottom: 24 }}>
          <div className="stat-card"><div className="stat-card__value">150</div><div className="stat-card__label">Total Users</div></div>
          <div className="stat-card"><div className="stat-card__value">120</div><div className="stat-card__label">Active Path Roadmaps</div></div>
          <div className="stat-card"><div className="stat-card__value">850</div><div className="stat-card__label">AI Doubt Queries</div></div>
          <div className="stat-card"><div className="stat-card__value">25</div><div className="stat-card__label">Curated Resources</div></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
```

#### 🔟 File: [frontend/src/pages/admin/AdminUsers.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/admin/AdminUsers.jsx)
- **Action:** Create this new page inside folder `frontend/src/pages/admin/`.
- **Instructor Note:** Manage student profile states. Renders custom checkboxes to set status active/inactive.
- **Code to Write:**
```jsx
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';

const initialUsers = [
  { id: 1, name: 'Ankush Mishra', email: 'ankush@example.com', role: 'admin', isActive: true },
  { id: 2, name: 'Demo Student', email: 'student@example.com', role: 'student', isActive: true },
  { id: 3, name: 'Banned User', email: 'banned@example.com', role: 'student', isActive: false },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ marginBottom: 24 }}>
          <h1>Manage <span className="gradient-text">Users</span></h1>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Avatar name={u.name} size={28} /><strong>{u.name}</strong></div></td>
                  <td>{u.email}</td>
                  <td><Badge variant={u.role === 'admin' ? 'primary' : 'neutral'}>{u.role}</Badge></td>
                  <td><Badge variant={u.isActive ? 'success' : 'error'}>{u.isActive ? 'Active' : 'Inactive'}</Badge></td>
                  <td>
                    <button onClick={() => toggleUserStatus(u.id)} className="btn btn--secondary btn--sm">
                      {u.isActive ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
```

#### 1️⃣1️⃣ File: [frontend/src/pages/admin/AdminResources.jsx](file:///e:/SDG-Quality-Education/frontend/src/pages/admin/AdminResources.jsx)
- **Action:** Create this new page inside folder `frontend/src/pages/admin/`.
- **Instructor Note:** Standard resource CRUD model. Displays add/edit popups inside the custom overlay Modal component.
- **Code to Write:**
```jsx
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Modal from '../../components/ui/Modal';

const initialResources = [
  { id: 1, title: 'React Documentation', topic: 'React', type: 'documentation', url: 'https://react.dev' },
  { id: 2, title: 'CSS Variables Tutorial', topic: 'CSS', type: 'video', url: 'https://youtube.com' },
];

const AdminResources = () => {
  const [resources, setResources] = useState(initialResources);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', topic: '', type: 'documentation', url: '' });

  const handleSave = (e) => {
    e.preventDefault();
    const newRes = { id: Date.now(), ...form };
    setResources([...resources, newRes]);
    setModalOpen(false);
    setForm({ title: '', topic: '', type: 'documentation', url: '' });
  };

  const handleDelete = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h1>Manage <span className="gradient-text">Resources</span></h1>
          <Button onClick={() => setModalOpen(true)}>Add Resource</Button>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Title</th><th>Topic</th><th>Type</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {resources.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.title}</strong></td>
                  <td>{r.topic}</td>
                  <td>{r.type}</td>
                  <td>
                    <button onClick={() => handleDelete(r.id)} style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Resource">
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <InputField label="Title" id="res-t" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <InputField label="Topic" id="res-top" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} required />
          <InputField label="URL" id="res-u" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} required />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default AdminResources;
```

---

### 🔴 STEP 6 — Update App Router Routing

#### 1️⃣2️⃣ File: [frontend/src/App.jsx](file:///e:/SDG-Quality-Education/frontend/src/App.jsx) (Update Router Paths)
- **Action:** Open and update this file.
- **Instructor Note:** Import all the new feature and admin views. Wrap pages in `ProtectedRoute` or `AdminRoute` guard wrappers to implement user authentication redirection logic.
- **Code to Write:**
```jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import ChatPage from './pages/ChatPage';
import ProjectsPage from './pages/ProjectsPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminResources from './pages/admin/AdminResources';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Student Protected Pages */}
      <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* Admin Protected Pages */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
      <Route path="/admin/resources" element={<AdminRoute><AdminResources /></AdminRoute>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
```

---

### ✅ MC3 Creation Order Summary

```
LEARNING COMPONENTS:
1. LessonModal.jsx          ← Renders markdown text topics
2. QuizModal.jsx            ← Assembles quiz options checklists

STUDENT CORE PAGES:
3. DashboardPage.jsx        ← Grid statistics overview and Goal Tracker (Practical Assignment)
4. RoadmapPage.jsx          ← Renders steps timeline and wires popups
5. ChatPage.jsx             ← Chat Mentor thread with auto-scrolling
6. ProjectsPage.jsx         ← Portfolio grid filtered by level
7. ResourcesPage.jsx        ← Resource search and categorization
8. ProfilePage.jsx          ← Personal settings form fields

ADMIN PAGES:
9.  AdminDashboard.jsx      ← Stat panels grid and routing shortcuts
10. AdminUsers.jsx          ← Manage user accounts lists
11. AdminResources.jsx      ← Resources CRUD modal interface

ROUTING WIREUP:
12. App.jsx (update)        ← Register routes and wrap path route guards (LAST ALWAYS)
```


---

## 📌 Slide 15 — Practical Assignment: Build a Study Goal Tracker

### 🎯 The Goal
Your assignment is to build a **Study Goal Tracker** inside the `DashboardPage`. Students will be able to click a button, open a modal (reusing the custom `Modal` and `Button` components built in MC2), add a study goal (e.g., "Complete 2 lessons today"), and see their goals listed on the dashboard as a checklist.

### 📚 Concepts You Will Practice
1. **Component Reuse:** Utilize the reusable custom `Modal`, `Button`, and `Card` components you built in Masterclass 2.
2. **State Arrays:** Manage a dynamic list of items (`goals`) in React state.
3. **Immutable Updates:** Append new goals to the state array and toggle/remove goals immutably using the spread operator (`...`) and `.filter()` or `.map()`.
4. **Conditional Rendering:** Render different states for empty lists vs. populated lists.

---

### 📝 Step-by-Step Instructions

#### Step 1: Open the Dashboard Page
Edit `frontend/src/pages/DashboardPage.jsx`.

#### Step 2: Set Up Goals State
Create a new state variable: `const [goals, setGoals] = useState([]);` and another boolean state `isModalOpen` to toggle the modal's visibility.

#### Step 3: Integrate the Reusable Modal
Import the custom `Modal` component and add it to your return JSX. Wire `isOpen={isModalOpen}` and `onClose={() => setIsModalOpen(false)}`.

#### Step 4: Implement Add Goal Logic
Inside the modal, add a form with a text input. Write a function `handleAddGoal(text)` that appends a new goal object to the `goals` state:
`{ id: Date.now(), text, completed: false }`

#### Step 5: Render the Checklist
On the dashboard layout, render a list of the current goals. Each item should have a checkbox to toggle completion and a delete button. If the goals array is empty, render the `<EmptyState>` component with a message: "No goals set for this week."

---

### 💻 Example Code Structure

Here is a partial skeleton to guide your implementation:

```jsx
// Within frontend/src/pages/DashboardPage.jsx
import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

// Inside DashboardPage component:
const [goals, setGoals] = useState([
  { id: 1, text: 'Complete Masterclass 3 assignment', completed: false }
]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [newGoalText, setNewGoalText] = useState('');

const handleAddGoal = (e) => {
  e.preventDefault();
  if (!newGoalText.trim()) return;

  const newGoal = {
    id: Date.now(),
    text: newGoalText,
    completed: false
  };

  // Immutably append to state array
  setGoals([...goals, newGoal]);
  setNewGoalText('');
  setIsModalOpen(false);
};

const toggleGoal = (id) => {
  setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
};

const deleteGoal = (id) => {
  setGoals(goals.filter(g => g.id !== id));
};

// Inside the returned JSX:
return (
  <div className="dashboard-content">
    {/* ... other dashboard widgets ... */}
    
    <Card className="goals-card">
      <div className="card-header">
        <h2>🎯 Weekly Study Goals</h2>
        <Button onClick={() => setIsModalOpen(true)}>Add Goal</Button>
      </div>

      {goals.length === 0 ? (
        <EmptyState title="No Goals Set" description="Add your first study goal to stay on track!" />
      ) : (
        <ul className="goals-list">
          {goals.map(goal => (
            <li key={goal.id} className={goal.completed ? 'goal--completed' : ''}>
              <input 
                type="checkbox" 
                checked={goal.completed} 
                onChange={() => toggleGoal(goal.id)} 
              />
              <span>{goal.text}</span>
              <button className="btn-delete" onClick={() => deleteGoal(goal.id)}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </Card>

    {/* Custom reusable modal */}
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Set New Study Goal">
      <form onSubmit={handleAddGoal}>
        <input 
          type="text" 
          placeholder="e.g. Learn useEffect hooks" 
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button type="submit">Add Goal</Button>
        </div>
      </form>
    </Modal>
  </div>
);
```
