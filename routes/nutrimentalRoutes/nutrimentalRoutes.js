import { Router } from 'express';
import NutrimentalController from '../../controllers/nutrimentalController/nutrimentalController.js';
const router = Router();


router.post('/informe', NutrimentalController.generateReportNutrimental);

export default router;