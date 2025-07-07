const express = require('express');
const router = express.Router();
const indiciosController = require('../controllers/indicios.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');

// Solo técnicos pueden crear, editar y eliminar indicios
router.post('/', authMiddleware, roleMiddleware(['tecnico']), indiciosController.crearIndicio);
router.put('/:id', authMiddleware, roleMiddleware(['tecnico']), indiciosController.actualizarIndicio);
router.delete('/:id', authMiddleware, roleMiddleware(['tecnico']), indiciosController.eliminarIndicio);

// Todos los autenticados pueden consultar
router.get('/expediente/:id_expediente', authMiddleware, indiciosController.listarIndiciosPorExpediente);
router.get('/:id', authMiddleware, indiciosController.buscarIndicioPorId);

module.exports = router;
// Este archivo define las rutas para manejar los indicios en la API.
// Incluye operaciones para crear, listar por expediente, buscar por ID, actualizar y eliminar indicios.
// Utiliza el controlador 'indiciosController' para manejar la lógica de negocio.   