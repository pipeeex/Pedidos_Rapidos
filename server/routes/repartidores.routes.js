const express = require('express');
const router = express.Router();
const {
  obtenerUbicacionesRepartidores
} = require('../controllers/repartidores.controller');

// Ruta: GET /api/repartidores/ubicaciones
router.get('/ubicaciones', obtenerUbicacionesRepartidores);

module.exports = router;