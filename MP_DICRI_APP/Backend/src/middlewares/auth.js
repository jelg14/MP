const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecreto';

// Middleware para verificar JWT
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware para verificar roles
exports.roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.tipo)) {
    return res.status(403).json({ error: 'No autorizado para esta acción' });
  }
  next();
};
