import express from 'express';
import { handleChatMessage, getChatHistory, getChatSession } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, handleChatMessage);
router.get('/history', protect, getChatHistory);
router.get('/history/:id', protect, getChatSession);

export default router;
