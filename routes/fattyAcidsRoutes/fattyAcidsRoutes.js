import { Router } from 'express';
import fattyAcidsController from '../../controllers/fattyAcidsControllers/fattyAcidsControllers.js';
const router = Router();

router.get('/fattyAcids', fattyAcidsController.getAllAcids);
router.get('/fattyAcids/:id', fattyAcidsController.getAcidsById);
router.post('/fattyAcids', fattyAcidsController.createAcids);

export default router;
