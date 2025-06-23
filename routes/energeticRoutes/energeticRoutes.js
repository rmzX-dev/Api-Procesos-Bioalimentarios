import { Router } from 'express';
import energeticController from '../../controllers/energeticController/energeticController.js';
const router = Router();

router.get('/energetic', energeticController.getAllEnergetic);
router.get('/energetic/:id', energeticController.getAllEnergetic);
router.post('/energetic', energeticController.createEnergetic);

export default router;
