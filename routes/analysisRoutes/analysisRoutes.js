import { Router } from 'express';
import AnalisisController from '../../controllers/analysisController/analysisController';

const router = Router();

router.get('/analisis', AnalisisController.getAllAnalisis);
router.get('/analisis/:id', AnalisisController.getAnalisisById);
router.post('/analisis', AnalisisController.createAnalisis);

export default router;
