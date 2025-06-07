import { Router } from 'express';
import { microsoftLogin, getUserProfile, logout } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

//TODO: WHY DOES THIS HAVE A LINTER ERROR TIMES 2?!!!!!
router.post('/microsoft-login', microsoftLogin);

router.get('/profile', authenticateToken, getUserProfile);
router.post('/logout', authenticateToken, logout);

export default router; 