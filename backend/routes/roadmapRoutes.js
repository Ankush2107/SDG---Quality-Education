import express from 'express';
import { getMyRoadmap, regenerateRoadmap } from '../controllers/roadmapController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getMyRoadmap);
router.post('/regenerate', protect, regenerateRoadmap);

export default router;
