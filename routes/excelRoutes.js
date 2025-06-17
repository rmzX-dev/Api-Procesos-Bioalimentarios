import express from 'express';
import upload from '../middlewares/uploadMiddleware.js'; // middleware con multer
import ExcelController from '../controllers/excel/excelController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Excel
 *   description: Subida y procesamiento de archivos Excel
 */

/**
 * @swagger
 * /api/excel/upload:
 *   post:
 *     summary: Subir múltiples archivos Excel
 *     tags: [Excel]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archivos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Archivos procesados correctamente
 *       400:
 *         description: Error al procesar los archivos
 */
router.post(
  '/excel/upload',
  upload.array('archivos', 6), // permite subir hasta 6 archivos Excel
  ExcelController.procesarMultiplesArchivos
);

export default router;
