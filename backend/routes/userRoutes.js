import { Router } from 'express';
import { home, profile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware); 

router.get('/', home);
router.get('/profile', profile);

export default router;