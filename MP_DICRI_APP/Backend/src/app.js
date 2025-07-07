const express = require('express');
const cors = require('cors');

const usuariosRoutes = require('../src/routes/usuarios.routes'); 
const expedientesRoutes = require('./routes/expedientes.routes');
const indiciosRoutes = require('./routes/indicios.routes');
const reportesRoutes = require('./routes/reportes.routes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/expedientes', expedientesRoutes);
app.use('/api/indicios', indiciosRoutes);
app.use('/api/reportes', reportesRoutes);

app.get('/', (req, res) => res.send('API DICRI funcionando'));

module.exports = app;
