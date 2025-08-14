import { Router } from 'express';
import ClienteController from '../../controllers/clientController/clientController.js';

const router = Router();

router.get('/clientes', ClienteController.getClientes);
router.get('/clientes/:id', ClienteController.getClienteById);
router.post('/clientes', ClienteController.createCliente);
router.put('/clientes/:id', ClienteController.updateCliente);
router.delete('/clientes/:id', ClienteController.deleteCliente);

export default router;