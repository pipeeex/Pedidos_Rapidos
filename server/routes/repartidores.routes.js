const express = require('express');
const router = express.Router();
const {
  obtenerUbicacionesRepartidores
} = require('../controllers/repartidores.controller');

// Ruta original
router.get('/ubicaciones', obtenerUbicacionesRepartidores);

// 🔹 Nueva ruta compatible con el frontend
router.get('/', obtenerUbicacionesRepartidores);

module.exports = router;
