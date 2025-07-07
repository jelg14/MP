const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');
const { authMiddleware } = require('../middlewares/auth');

// POST: Reporte por estado y fechas (SP)
router.post('/expedientes', authMiddleware, reportesController.reporteExpedientes);

// GET: Vista de expedientes con indicios
router.get('/expedientes-con-indicios', authMiddleware, reportesController.vistaExpedientesConIndicios);

// GET: Vista de estadísticas
router.get('/estadisticas-expedientes', authMiddleware, reportesController.vistaEstadisticasExpedientes);

module.exports = router;
// Este archivo define las rutas para los reportes, incluyendo la generación de reportes por estado y fechas,
// la vista de expedientes con indicios y la vista de estadísticas de expedientes.