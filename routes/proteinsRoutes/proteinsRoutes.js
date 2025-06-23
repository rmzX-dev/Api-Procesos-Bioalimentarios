import { Router } from 'express';
import proteinsController from '../../controllers/proteinsControllers/proteinsControllers.js';
const router = Router();

router.get('/proteins', proteinsController.getAllProteins);
router.get('/proteins/:id', proteinsController.getProteinsById);
router.post('/proteins', proteinsController.createProteins);

export default router;
