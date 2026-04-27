import express from 'express';
import { 
  getAdminStats, getAllUsers, updateUserStatus, 
  addResource, updateResource, deleteResource 
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protect and admin middleware to all routes
router.use(protect, admin);

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUserStatus);

router.post('/resources', addResource);
router.put('/resources/:id', updateResource);
router.delete('/resources/:id', deleteResource);

export default router;
