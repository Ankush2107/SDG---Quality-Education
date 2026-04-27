import express from 'express';
import { createProfile, getProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createProfile);
router.get('/me', protect, getProfile);

export default router;
