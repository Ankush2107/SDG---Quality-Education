import Progress from '../models/Progress.js';

// @desc    Get user progress
// @route   GET /api/progress/me
// @access  Private
export const getMyProgress = async (req, res) => {
  const progress = await Progress.findOne({ user: req.user._id });
  if (progress) {
    res.json({ progress });
  } else {
    res.status(404);
    throw new Error('Progress record not found');
  }
};

// @desc    Mark a step as complete/incomplete
// @route   PUT /api/progress/step
// @access  Private
export const updateStepProgress = async (req, res) => {
  const { stepNumber, completed } = req.body; // completed is boolean

  const progress = await Progress.findOne({ user: req.user._id });
  if (!progress) {
    res.status(404);
    throw new Error('Progress record not found');
  }

  if (completed) {
    // Add to array if not present
    if (!progress.completedSteps.includes(stepNumber)) {
      progress.completedSteps.push(stepNumber);
    }
  } else {
    // Remove from array
    progress.completedSteps = progress.completedSteps.filter(s => s !== stepNumber);
  }

  // Check streak logic (simple daily streak)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActiveDay = new Date(progress.lastActive);
  lastActiveDay.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today - lastActiveDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1 && completed) {
    progress.streak += 1;
  } else if (diffDays > 1) {
    progress.streak = completed ? 1 : 0;
  }
  
  progress.lastActive = new Date();

  await progress.updatePercent();
  await progress.save();

  res.json({ progress });
};
