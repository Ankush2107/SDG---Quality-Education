import { generateStepLesson, generateStepQuiz } from '../services/aiService.js';

// @desc    Get an AI-generated lesson for a topic
// @route   POST /api/learning/lesson
// @access  Private
export const getStepLesson = async (req, res) => {
  const { topic, description } = req.body;

  if (!topic) {
    res.status(400);
    throw new Error('Topic is required');
  }

  const lesson = await generateStepLesson(topic, description || '');
  res.json({ lesson });
};

// @desc    Generate a quiz for a topic
// @route   POST /api/learning/quiz
// @access  Private
export const getStepQuiz = async (req, res) => {
  const { topic, description } = req.body;

  if (!topic) {
    res.status(400);
    throw new Error('Topic is required');
  }

  const quiz = await generateStepQuiz(topic, description || '');
  
  if (!quiz) {
    res.status(500);
    throw new Error('Failed to generate quiz');
  }

  res.json({ quiz });
};
