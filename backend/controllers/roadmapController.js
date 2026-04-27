import Roadmap from '../models/Roadmap.js';
import Progress from '../models/Progress.js';
import { generateRoadmapWithAI } from '../services/aiService.js';

// @desc    Get user's current roadmap
// @route   GET /api/roadmaps/me
// @access  Private
export const getMyRoadmap = async (req, res) => {
  const roadmap = await Roadmap.findOne({ user: req.user._id });
  if (roadmap) {
    res.json({ roadmap });
  } else {
    res.status(404);
    throw new Error('Roadmap not found');
  }
};

// @desc    Regenerate roadmap manually
// @route   POST /api/roadmaps/regenerate
// @access  Private
export const regenerateRoadmap = async (req, res) => {
  const { goal, level, weeklyHours } = req.body;
  
  if (!goal || !level) {
    res.status(400);
    throw new Error('Goal and level required to regenerate');
  }

  const roadmapData = await generateRoadmapWithAI(goal, level, weeklyHours || 5);
  
  let roadmap = await Roadmap.findOne({ user: req.user._id });
  if (roadmap) {
    roadmap.goal = roadmapData.goal;
    roadmap.level = roadmapData.level;
    roadmap.weeklyHours = roadmapData.weeklyHours;
    roadmap.steps = roadmapData.steps;
    roadmap.estimatedDuration = roadmapData.estimatedDuration;
    roadmap.aiGenerated = roadmapData.aiGenerated;
    await roadmap.save();
  } else {
    roadmap = await Roadmap.create({ user: req.user._id, ...roadmapData });
  }

  // Reset Progress
  let progress = await Progress.findOne({ user: req.user._id });
  if (progress) {
    progress.roadmap = roadmap._id;
    progress.completedSteps = [];
    progress.percentComplete = 0;
    await progress.save();
  } else {
    progress = await Progress.create({ user: req.user._id, roadmap: roadmap._id });
  }

  res.json({ roadmap, progress });
};
