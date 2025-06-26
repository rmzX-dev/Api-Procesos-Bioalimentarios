import express from 'express';
import upload from '../../middlewares/uploadMiddleware.js'; // middleware con multer
import ExcelController from '../../controllers/excelController/excelController.js';

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
 *     summary: Subir archivos Excel y generar un PDF con los resultados
 *     tags: [Excel]
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/pdf
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
 *         description: PDF generado y descargable
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: No se enviaron archivos válidos
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  '/excel/upload',
  upload.array('archivos', 7),
  ExcelController.procesarMultiplesArchivos
);

export default router;
