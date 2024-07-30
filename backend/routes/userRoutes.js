import { Router } from 'express';
import { home } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware); 

router.get('/', home);

export default router;