import express from 'express';
import { getRecommendations, saveProject, getSavedProjects } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/recommendations', protect, getRecommendations);
router.post('/save', protect, saveProject);
router.get('/saved', protect, getSavedProjects);

export default router;
