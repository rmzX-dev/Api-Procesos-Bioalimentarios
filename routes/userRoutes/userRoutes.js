import express from 'express';
import UserController from '../../controllers/userController/userController.js';

const router = express.Router();

router.get('/user', UserController.findAllUsers);
router.get('/user/:id', UserController.getUserById);
router.post('/user', UserController.createUser);
router.put('/user/:id', UserController.updateUser);
router.post('/login', UserController.loginUser);

export default router;
