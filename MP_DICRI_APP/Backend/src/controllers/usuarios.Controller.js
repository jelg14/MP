const { poolPromise } = require('../config/db');
const bcrypt = require('bcryptjs');
// Importar el módulo de JSON Web Token
const jwt = require('jsonwebtoken');
// Cargar variables de entorno
const SECRET = process.env.JWT_SECRET || 'supersecreto';

// Iniciar sesión
// Este controlador maneja la autenticación de usuarios, incluyendo el inicio de sesión y la generación de tokens JWT.
// Utiliza bcrypt para comparar contraseñas y JSON Web Token para generar tokens de sesión.
exports.login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('usuario', usuario)
      .query('SELECT * FROM Usuarios WHERE usuario = @usuario AND usuario_activo = 1');
    if (!result.recordset.length) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    const user = result.recordset[0];
    const passwordValida = await bcrypt.compare(password, user.password_hash);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    // Genera token
    const token = jwt.sign({
      id_usuario: user.id_usuario,
      usuario: user.usuario,
      tipo: user.tipo_de_usuario
    }, SECRET, { expiresIn: '8h' }); // duración del token de 8 horas, puede ser ajustada según sea necesario
    res.json({ token, user: { id_usuario: user.id_usuario, usuario: user.usuario, tipo: user.tipo_de_usuario } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Registrar usuario
// Este controlador maneja el registro de nuevos usuarios en la base de datos.
exports.registrarUsuario = async (req, res) => {
  try {
    const { usuario, nombres_de_usuario, apellidos_de_usuario, email, telefono, tipo_de_usuario, password } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    await pool.request()
      .input('usuario', usuario)
      .input('nombres', nombres_de_usuario)
      .input('apellidos', apellidos_de_usuario)
      .input('email', email)
      .input('telefono', telefono)
      .input('tipo', tipo_de_usuario)
      .input('password_hash', password_hash)
      .execute('sp_InsertarUsuario');
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().execute('sp_ConsultarUsuarios');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar usuario por ID
exports.buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id_usuario', id)
      .execute('sp_buscarUsuario');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, nombres_de_usuario, apellidos_de_usuario, email, telefono, tipo_de_usuario } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id_usuario', id)
      .input('usuario', usuario)
      .input('nombres', nombres_de_usuario)
      .input('apellidos', apellidos_de_usuario)
      .input('email', email)
      .input('telefono', telefono)
      .input('tipo', tipo_de_usuario)
      .execute('sp_actualizarUsuario');
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Desactivar usuario (borrado lógico)
exports.desactivarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id_usuario', id)
      .execute('sp_DesactivarUsuario');
    res.json({ message: 'Usuario desactivado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
