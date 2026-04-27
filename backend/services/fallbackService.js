import { fallbackRoadmaps, defaultRoadmap } from '../data/fallbackRoadmaps.js';

export const generateFallbackRoadmap = (goal, level, weeklyHours) => {
  const goalKey = goal.toLowerCase();
  const levelKey = level.toLowerCase();

  let roadmapData = defaultRoadmap;

  // Try to find a matching fallback roadmap
  for (const key in fallbackRoadmaps) {
    if (goalKey.includes(key) || key.includes(goalKey)) {
      if (fallbackRoadmaps[key][levelKey]) {
        roadmapData = fallbackRoadmaps[key][levelKey];
        break;
      }
    }
  }

  // Adjust duration slightly based on weekly hours
  let durationMultiplier = 1;
  if (weeklyHours < 5) durationMultiplier = 1.5;
  if (weeklyHours > 10) durationMultiplier = 0.7;

  // Add step numbers
  const steps = roadmapData.steps.map((step, index) => ({
    ...step,
    stepNumber: index + 1,
    duration: step.duration // keeping it simple for fallback
  }));

  return {
    goal,
    level,
    weeklyHours,
    estimatedDuration: roadmapData.estimatedDuration,
    steps,
    aiGenerated: false
  };
};

export const generateFallbackProjects = (difficulty) => {
  return [
    {
      title: 'Personal Portfolio Website',
      description: 'Build a responsive personal portfolio using HTML, CSS, and basic JavaScript to showcase your skills.',
      difficulty: 'beginner',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      estimatedTime: '1 week'
    },
    {
      title: 'Task Management App',
      description: 'Create a full-stack to-do application with user authentication and database storage.',
      difficulty: 'intermediate',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      estimatedTime: '2 weeks'
    },
    {
      title: 'E-commerce API',
      description: 'Build a robust RESTful API for an e-commerce platform including payment integration simulation.',
      difficulty: 'advanced',
      techStack: ['Node.js', 'Express', 'MongoDB', 'Stripe'],
      estimatedTime: '3 weeks'
    }
  ].filter(p => p.difficulty === difficulty || !difficulty);
};
