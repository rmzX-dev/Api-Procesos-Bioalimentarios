import { Router } from 'express';
import AnalisisController from '../controllers/analysisController.js';

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
 *     responses:
 *       200:
 *         description: Lista de análisis
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
 *         description: ID del análisis
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Análisis encontrado
 *       404:
 *         description: No encontrado
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
 *               - idAnalista
 *               - tipoAnalisis
 *               - resultado
 *               - unidad
 *             properties:
 *               idMuestra:
 *                 type: integer
 *               idAnalista:
 *                 type: integer
 *               tipoAnalisis:
 *                 type: string
 *               resultado:
 *                 type: number
 *               unidad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Análisis creado exitosamente
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
 *         description: ID del análisis
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
 *               idAnalista:
 *                 type: integer
 *               tipoAnalisis:
 *                 type: string
 *               resultado:
 *                 type: number
 *               unidad:
 *                 type: string
 *     responses:
 *       200:
 *         description: Análisis actualizado
 *       404:
 *         description: No encontrado
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
 *     responses:
 *       200:
 *         description: Análisis eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/analisis/:id', AnalisisController.delete);

export default router;
