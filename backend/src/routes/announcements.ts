import { Router } from 'express';
import { getActiveAnnouncements } from '../controllers/announcementController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

//TODO: WHY DOES THIS HAVE A LINTER ERROR?!!!!!
router.get('/', authenticateToken, getActiveAnnouncements);

export default router; 