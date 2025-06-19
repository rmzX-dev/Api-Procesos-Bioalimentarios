import { Router } from 'express';
import carbohydratesController from '../../controllers/carbodydratesController/carbodydratesController';
const router = Router();

router.get('/carbohydrates', carbohydratesController.getAllCarbs);
router.get('/carbohydrates/:id', carbohydratesController.getCarbsById);
router.post('/carbohydrates', carbohydratesController.createCarbs);

export default router;
