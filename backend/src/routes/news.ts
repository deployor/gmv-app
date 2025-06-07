import { Router } from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getRecentNews,
} from '../controllers/newsController';
import { authenticateToken, requireTeacherOrAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllNews);
router.get('/recent', getRecentNews);
router.get('/:id', getNewsById);

// Protected routes (require authentication and teacher/admin role)
router.post('/', authenticateToken, requireTeacherOrAdmin, createNews);
router.put('/:id', authenticateToken, requireTeacherOrAdmin, updateNews);
router.delete('/:id', authenticateToken, requireTeacherOrAdmin, deleteNews);

export default router; 