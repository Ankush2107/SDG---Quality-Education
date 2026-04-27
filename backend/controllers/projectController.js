import SavedProject from '../models/SavedProject.js';
import Profile from '../models/Profile.js';
import { generateProjectRecommendations } from '../services/aiService.js';

// @desc    Get AI project recommendations based on user level
// @route   GET /api/projects/recommendations
// @access  Private
export const getRecommendations = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  const difficulty = profile ? profile.currentLevel : 'beginner';

  const projects = await generateProjectRecommendations(difficulty);
  res.json({ projects });
};

// @desc    Save a project to profile
// @route   POST /api/projects/save
// @access  Private
export const saveProject = async (req, res) => {
  const { title, description, difficulty, techStack, estimatedTime } = req.body;

  const project = await SavedProject.create({
    user: req.user._id,
    title,
    description,
    difficulty,
    techStack,
    estimatedTime
  });

  res.status(201).json({ project });
};

// @desc    Get user's saved projects
// @route   GET /api/projects/saved
// @access  Private
export const getSavedProjects = async (req, res) => {
  const projects = await SavedProject.find({ user: req.user._id });
  res.json({ projects });
};
