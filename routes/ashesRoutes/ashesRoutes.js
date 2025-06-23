import { Router } from 'express';
import AshesController from '../../controllers/ashesController/ashesController.js';
const router = Router();

router.get('/ashes', AshesController.getAllAshes);
router.get('/ashes/:id', AshesController.getAshesById);
router.post('/ashes', AshesController.createAshes);

export default router;