import { Router } from 'express';
import ClienteController from '../controllers/clientController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API para gestionar clientes del laboratorio
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/clientes', ClienteController.getClientes);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/clientes/:id', ClienteController.getClienteById);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 */
router.post('/clientes', ClienteController.createCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/clientes/:id', ClienteController.updateCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/clientes/:id', ClienteController.deleteCliente);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         idcliente:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Juan
 *         apellidoPaterno:
 *           type: string
 *           example: Pérez
 *         apellidoMaterno:
 *           type: string
 *           example: López
 *         razonSocial:
 *           type: string
 *           example: Laboratorio XYZ
 *         direccion:
 *           type: string
 *           example: Calle Falsa 123
 *         telefono:
 *           type: string
 *           example: "5551234567"
 *         metodo:
 *           type: string
 *           example: Metodo A
 *         acreditacion:
 *           type: string
 *           example: Certificado ISO 9001
 *     ClienteInput:
 *       type: object
 *       required:
 *         - nombre
 *         - apellidoPaterno
 *         - razonSocial
 *         - direccion
 *         - telefono
 *         - metodo
 *         - acreditacion
 *       properties:
 *         nombre:
 *           type: string
 *           example: Juan
 *         apellidoPaterno:
 *           type: string
 *           example: Pérez
 *         apellidoMaterno:
 *           type: string
 *           example: López
 *         razonSocial:
 *           type: string
 *           example: Laboratorio XYZ
 *         direccion:
 *           type: string
 *           example: Calle Falsa 123
 *         telefono:
 *           type: string
 *           example: "5551234567"
 *         metodo:
 *           type: string
 *           example: Metodo A
 *         acreditacion:
 *           type: string
 *           example: Certificado ISO 9001
 */
