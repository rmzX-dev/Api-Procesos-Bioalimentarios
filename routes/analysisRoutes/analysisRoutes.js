import { Router } from 'express';
import AnalisisController from '../../controllers/analysisController/analysisController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Analisis
 *   description: Endpoints para la gestión de análisis
 */

/**
 * @swagger
 * /api/analisis:
 *   get:
 *     summary: Obtener todos los análisis
 *     tags: [Analisis]
 */
router.get('/analisis', AnalisisController.getAll);

/**
 * @swagger
 * /api/analisis/{id}:
 *   get:
 *     summary: Obtener un análisis por ID
 *     tags: [Analisis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get('/analisis/:id', AnalisisController.getById);

/**
 * @swagger
 * /api/analisis:
 *   post:
 *     summary: Crear un nuevo análisis
 *     tags: [Analisis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idMuestra
 *               - tipo
 *             properties:
 *               idMuestra:
 *                 type: integer
 *               tipo:
 *                 type: string
 */
router.post('/analisis', AnalisisController.create);

/**
 * @swagger
 * /api/analisis/{id}:
 *   put:
 *     summary: Actualizar un análisis
 *     tags: [Analisis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idMuestra:
 *                 type: integer
 *               tipo:
 *                 type: string
 */
router.put('/analisis/:id', AnalisisController.update);

/**
 * @swagger
 * /api/analisis/{id}:
 *   delete:
 *     summary: Eliminar un análisis
 *     tags: [Analisis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete('/analisis/:id', AnalisisController.delete);

export default router;
