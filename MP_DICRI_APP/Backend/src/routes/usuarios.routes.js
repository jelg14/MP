const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.Controller');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');

// Solo admin puede crear usuarios (opcionalmente)
router.post('/register', authMiddleware, roleMiddleware(['Administrador']), usuariosController.registrarUsuario);

// Login 
router.post('/login', usuariosController.login);

// Todos los autenticados pueden ver su perfil
router.get('/:id', authMiddleware, usuariosController.buscarUsuarioPorId);

// Solo admin puede listar, actualizar o eliminar usuarios
router.get('/', authMiddleware, roleMiddleware(['Administrador']), usuariosController.listarUsuarios);
router.put('/:id', authMiddleware, roleMiddleware(['Administrador']), usuariosController.actualizarUsuario);
router.delete('/:id', authMiddleware, roleMiddleware(['Administrador']), usuariosController.desactivarUsuario);

module.exports = router;


// Este archivo define las rutas para la gestión de usuarios en la API.
// Incluye operaciones para crear, listar, desactivar, buscar y actualizar usuarios.        
// Utiliza el controlador 'usuariosController' para manejar la lógica de negocio.
// Las rutas están organizadas para facilitar la interacción con los recursos de usuario en la aplicación.
