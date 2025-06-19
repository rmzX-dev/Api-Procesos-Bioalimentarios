import { Router } from 'express';
import sodiumController from '../../controllers/sodiumController/sodiumController';
const router = Router();

router.get('/sodium', sodiumController.getAllSodium);
router.get('/sodium/:id', sodiumController.getSodiumById);
router.post('/sodium', sodiumController.createSodium);

export default router;
