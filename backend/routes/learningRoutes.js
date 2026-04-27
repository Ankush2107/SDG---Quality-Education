import express from 'express';
import { getStepLesson, getStepQuiz } from '../controllers/learningController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/lesson', protect, getStepLesson);
router.post('/quiz', protect, getStepQuiz);

export default router;
