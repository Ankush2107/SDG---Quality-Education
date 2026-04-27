export const fallbackRoadmaps = {
  'web development': {
    beginner: {
      estimatedDuration: '12 weeks',
      steps: [
        { title: 'HTML Basics', description: 'Learn the structure of web pages.', duration: '1 week', resources: ['MDN Web Docs', 'freeCodeCamp'] },
        { title: 'CSS Fundamentals', description: 'Learn to style your web pages.', duration: '2 weeks', resources: ['CSS Tricks', 'MDN CSS'] },
        { title: 'JavaScript Basics', description: 'Add interactivity to your sites.', duration: '3 weeks', resources: ['JavaScript.info', 'Eloquent JavaScript'] }
      ]
    },
    intermediate: {
      estimatedDuration: '16 weeks',
      steps: [
        { title: 'Advanced JavaScript', description: 'ES6+, async/await, closures.', duration: '2 weeks', resources: ['You Don\'t Know JS'] },
        { title: 'React.js', description: 'Component-based UI development.', duration: '4 weeks', resources: ['React Docs', 'Frontend Masters'] },
        { title: 'State Management', description: 'Redux, Context API, Zustand.', duration: '2 weeks', resources: ['Redux Docs'] }
      ]
    }
  },
  'data science': {
    beginner: {
      estimatedDuration: '14 weeks',
      steps: [
        { title: 'Python Basics', description: 'Learn core Python syntax and structures.', duration: '3 weeks', resources: ['Automate the Boring Stuff'] },
        { title: 'Pandas & NumPy', description: 'Data manipulation and analysis.', duration: '3 weeks', resources: ['Kaggle Learn'] },
        { title: 'Data Visualization', description: 'Matplotlib and Seaborn.', duration: '2 weeks', resources: ['DataCamp'] }
      ]
    }
  }
};

export const defaultRoadmap = {
  estimatedDuration: '12 weeks',
  steps: [
    { title: 'Introduction', description: 'Understand the basics of the field.', duration: '2 weeks', resources: ['Google Search', 'YouTube'] },
    { title: 'Core Concepts', description: 'Learn the fundamental tools and theories.', duration: '4 weeks', resources: ['Coursera', 'edX'] },
    { title: 'Hands-on Projects', description: 'Build starter projects to apply knowledge.', duration: '4 weeks', resources: ['GitHub'] },
    { title: 'Advanced Topics', description: 'Explore complex subjects.', duration: '2 weeks', resources: ['Medium', 'Dev.to'] }
  ]
};
