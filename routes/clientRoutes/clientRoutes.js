import { Router } from 'express';
import ClienteController from '../../controllers/clientController/clientController.js';

const router = Router();

router.get('/clientes', ClienteController.getClientes);
router.get('/clientes/:id', ClienteController.getClienteById);
router.post('/clientes', ClienteController.createCliente);

export default router;