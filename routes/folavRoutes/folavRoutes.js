import express from 'express';
import FolavController from '../../controllers/folavController/folavController.js';

const router = express.Router();

router.get('/folav', FolavController.getAllFolav);
router.get('/folav/:id', FolavController.getFolavById);
router.delete('/folav/:id', FolavController.deleteFolav);



export default router;