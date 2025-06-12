import express from "express";
import MuestraController from "../controllers/sampleController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Muestras
 *   description: Operaciones sobre las muestras
 */

/**
 * @swagger
 * /api/muestra:
 *   get:
 *     summary: Obtener todas las muestras
 *     tags: [Muestras]
 *     responses:
 *       200:
 *         description: Lista de todas las muestras
 *       500:
 *         description: Error en el servidor
 */
router.get("/muestra", MuestraController.getAll);

/**
 * @swagger
 * /api/muestra/{id}:
 *   get:
 *     summary: Obtener una muestra por ID
 *     tags: [Muestras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la muestra
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muestra encontrada
 *       404:
 *         description: Muestra no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/muestra/:id", MuestraController.getById);

/**
 * @swagger
 * /api/muestra:
 *   post:
 *     summary: Crear una nueva muestra
 *     tags: [Muestras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCliente
 *               - folio
 *               - descripcion
 *               - fechaMuestreo
 *               - fechaRecepcion
 *               - temperatura
 *             properties:
 *               idCliente:
 *                 type: integer
 *               folio:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fechaMuestreo:
 *                 type: string
 *                 format: date
 *               fechaRecepcion:
 *                 type: string
 *                 format: date
 *               temperatura:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Muestra creada exitosamente
 *       500:
 *         description: Error del servidor
 */
router.post("/muestra", MuestraController.create);

/**
 * @swagger
 * /api/muestra/{id}:
 *   put:
 *     summary: Actualizar una muestra por ID
 *     tags: [Muestras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la muestra a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCliente:
 *                 type: integer
 *               folio:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fechaMuestreo:
 *                 type: string
 *                 format: date
 *               fechaRecepcion:
 *                 type: string
 *                 format: date
 *               temperatura:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Muestra actualizada
 *       404:
 *         description: Muestra no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/muestra/:id", MuestraController.update);

/**
 * @swagger
 * /api/muestra/{id}:
 *   delete:
 *     summary: Eliminar una muestra por ID
 *     tags: [Muestras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la muestra
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muestra eliminada
 *       404:
 *         description: Muestra no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/muestra/:id", MuestraController.delete);

export default router;
