const express = require('express');
const router = express.Router();
const paquetesController = require('../controllers/paquetes.controller');

router.post('/', paquetesController.crearPaquete);
router.get('/', paquetesController.obtenerPaquetes);
router.get('/:id', paquetesController.obtenerPaquetePorId);
router.put('/:id', paquetesController.actualizarEstadoPaquete);

module.exports = router;