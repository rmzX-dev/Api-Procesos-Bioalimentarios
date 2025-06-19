import { Router } from 'express';
import dietaryFiberController from '../../controllers/dietaryController/dietaryController';
const router = Router();

router.get('/dietaryFiber', dietaryFiberController.getAllFiber);
router.get('/dietaryFiber/:id', dietaryFiberController.getFiberById);
router.post('/dietaryFiber', dietaryFiberController.createFiber);

export default router;
