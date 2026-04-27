import Profile from '../models/Profile.js';
import Roadmap from '../models/Roadmap.js';
import Progress from '../models/Progress.js';
import { generateRoadmapWithAI } from '../services/aiService.js';

// @desc    Create profile and generate initial roadmap
// @route   POST /api/profiles
// @access  Private
export const createProfile = async (req, res) => {
  const { learningGoal, currentLevel, weeklyHours } = req.body;

  // 1. Create or Update Profile
  let profile = await Profile.findOne({ user: req.user._id });
  
  if (profile) {
    profile.learningGoal = learningGoal;
    profile.currentLevel = currentLevel;
    profile.weeklyHours = weeklyHours;
    await profile.save();
  } else {
    profile = await Profile.create({
      user: req.user._id,
      learningGoal,
      currentLevel,
      weeklyHours
    });
  }

  // 2. Generate Roadmap via AI
  const roadmapData = await generateRoadmapWithAI(learningGoal, currentLevel, weeklyHours);
  
  // 3. Save Roadmap
  // If user already has an active roadmap, we might want to archive it, but for simplicity we'll overwrite or create new
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
    roadmap = await Roadmap.create({
      user: req.user._id,
      ...roadmapData
    });
  }

  // 4. Initialize Progress
  let progress = await Progress.findOne({ user: req.user._id });
  if (progress) {
    progress.roadmap = roadmap._id;
    progress.completedSteps = [];
    progress.percentComplete = 0;
    await progress.save();
  } else {
    progress = await Progress.create({
      user: req.user._id,
      roadmap: roadmap._id,
      completedSteps: [],
      percentComplete: 0
    });
  }

  res.status(201).json({ profile, roadmap, progress });
};

// @desc    Get user profile
// @route   GET /api/profiles/me
// @access  Private
export const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });
  if (profile) {
    res.json({ profile });
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
};
