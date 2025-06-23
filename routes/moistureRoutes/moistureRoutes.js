import { Router } from 'express';
import mouistureController from '../../controllers/moistureControllers/moistureControllers.js';
const router = Router();

router.get('/mouisture', mouistureController.getAllMouisture);
router.get('/mouisture/:id', mouistureController.getMouistureById);
router.post('/mouisture', mouistureController.createMoisture);

export default router;
