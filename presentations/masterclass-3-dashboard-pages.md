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

> **How to use this:** You already have all MC1 and MC2 files. Now add the remaining pages and components in this order.

---

### 🟢 STEP 1 — AI Learning Components (Build before Roadmap Page which uses them)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 1️⃣ | `frontend/src/components/learning/LessonModal.jsx` | Uses `Modal` from MC2 — Modal must exist first |
| 2️⃣ | `frontend/src/components/learning/QuizModal.jsx` | Uses `Modal` from MC2, references `markStep` concept |

---

### 🟡 STEP 2 — Dashboard Page (The Hub)

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 3️⃣ | `frontend/src/pages/DashboardPage.jsx` | Uses DashboardLayout, ProgressRing, Card, Badge, Avatar — all built in MC2 |

---

### 🟠 STEP 3 — Core Feature Pages

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 4️⃣ | `frontend/src/pages/RoadmapPage.jsx` | Uses LessonModal + QuizModal (Step 1 above) + ProgressBar, Badge |
| 5️⃣ | `frontend/src/pages/ChatPage.jsx` | Uses Spinner, Button, InputField — all from MC2 |
| 6️⃣ | `frontend/src/pages/ProjectsPage.jsx` | Uses Card, Badge, Button, EmptyState |
| 7️⃣ | `frontend/src/pages/ResourcesPage.jsx` | Uses SearchBar, FilterBar, Card, Badge — all from MC2 |

---

### 🔵 STEP 4 — User Pages

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 8️⃣ | `frontend/src/pages/ProfilePage.jsx` | Uses Avatar, Button, InputField, Badge — all from MC2 |

---

### 🟣 STEP 5 — Admin Pages

| Order | File | Why at This Stage? |
|-------|------|--------------------|
| 9️⃣ | `frontend/src/pages/AdminDashboardPage.jsx` | Uses Card, Badge — all from MC2 |
| 🔟 | `frontend/src/pages/AdminUsersPage.jsx` | Uses Avatar, Badge, Button, Modal — all from MC2 |
| 1️⃣1️⃣ | `frontend/src/pages/AdminResourcesPage.jsx` | Uses Modal (for add/edit form), Button, Badge |

---

### 🔴 STEP 6 — Update App.jsx (Add all new routes — LAST)

| Order | File | What to Add |
|-------|------|-------------|
| 1️⃣2️⃣ | `frontend/src/App.jsx` (update) | Add routes for all new pages with correct ProtectedRoute and AdminRoute wrapping |

---

### ✅ MC3 Creation Order — Quick Visual Summary

```
AI LEARNING COMPONENTS:
1. components/learning/LessonModal.jsx
2. components/learning/QuizModal.jsx

DASHBOARD:
3. pages/DashboardPage.jsx

CORE FEATURE PAGES:
4. pages/RoadmapPage.jsx      ← Most complex page
5. pages/ChatPage.jsx         ← Optimistic UI + useRef
6. pages/ProjectsPage.jsx     ← Grid of AI project cards
7. pages/ResourcesPage.jsx    ← Search + filter

USER PAGES:
8. pages/ProfilePage.jsx      ← View/edit mode toggle

ADMIN PAGES:
9.  pages/AdminDashboardPage.jsx
10. pages/AdminUsersPage.jsx
11. pages/AdminResourcesPage.jsx

ROUTING:
12. App.jsx (final update)    ← All 14 routes wired ← LAST
```

> 💡 **Golden Rule for MC3:** Always build **components before pages that use them**. LessonModal and QuizModal must exist before RoadmapPage because RoadmapPage imports and renders them. After all pages are built, `App.jsx` is always updated last.
