import { Router } from 'express';
import { createRoom } from '../controllers/roomController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware); // Apply authentication middleware to all routes under /api/rooms

router.post('/create', createRoom);
/*router.post('/join', joinRoom);
router.get('/:roomId', getRoom);
*/
export default router;
