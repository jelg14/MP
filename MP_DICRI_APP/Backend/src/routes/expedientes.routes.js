const express = require('express');
const router = express.Router();
const expedientesController = require('../controllers/expedientes.controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');

// Todos los usuarios autenticados pueden ver expedientes
router.get('/', authMiddleware, expedientesController.listarExpedientes);

// Solo técnicos pueden crear expedientes
router.post('/', authMiddleware, roleMiddleware(['tecnico']), expedientesController.crearExpediente);

// Solo coordinadores pueden aprobar/rechazar
router.put('/:id/aprobar', authMiddleware, roleMiddleware(['coordinador']), expedientesController.aprobarExpediente);
router.put('/:id/rechazar', authMiddleware, roleMiddleware(['coordinador']), expedientesController.rechazarExpediente);

// Solo técnicos pueden editar expedientes
router.put('/:id', authMiddleware, roleMiddleware(['tecnico']), expedientesController.actualizarExpediente);

// Solo técnicos pueden eliminar (desactivar) expedientes
router.delete('/:id', authMiddleware, roleMiddleware(['tecnico']), expedientesController.desactivarExpediente);

// Reporte: cualquier usuario autenticado
router.get('/reporte', authMiddleware, expedientesController.reporteExpedientesPorEstadoYFecha);

// Buscar expediente por ID (cualquier usuario autenticado)
router.get('/:id', authMiddleware, expedientesController.buscarExpedientePorId);

module.exports = router;

// Este archivo define las rutas para manejar los expedientes en la API.
// Incluye operaciones para crear, listar, buscar por ID, actualizar, aprobar, rechazar y desactivar expedientes.
// Utiliza el controlador 'expedientesController' para manejar la lógica de negocio.