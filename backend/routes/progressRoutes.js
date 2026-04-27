import express from 'express';
import { getMyProgress, updateStepProgress } from '../controllers/progressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getMyProgress);
router.put('/step', protect, updateStepProgress);

export default router;
