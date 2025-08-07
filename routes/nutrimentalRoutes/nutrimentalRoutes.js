import { Router } from 'express';
import NutrimentalController from '../../controllers/nutrimentalController/nutrimentalController.js';
const router = Router();


router.post('/informe', NutrimentalController.generateReportNutrimental);
router.get('/informe/:nombreArchivo', NutrimentalController.descargarWord);
router.get('/informe', NutrimentalController.getDocumentosNutricionales);
router.delete('/informe/:id', NutrimentalController.deleteNutrimentalDoc);

export default router;