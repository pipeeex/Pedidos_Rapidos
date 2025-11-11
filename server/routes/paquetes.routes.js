const express = require('express');
const router = express.Router();
const paquetesController = require('../controllers/paquetes.controller.js');


// Crear y listar
router.post('/', paquetesController.crearPaquete);
router.get('/', paquetesController.obtenerPaquetes);

// Buscar por número de guía (explícito)
router.get('/buscar/:numeroGuia', paquetesController.obtenerPaquetePorNumeroGuia);

// Obtener por _id (solo si es ObjectId válido)
router.get('/:id', paquetesController.obtenerPaquetePorId);

// Actualizar estado por número de guía
router.put('/:numeroGuia', paquetesController.actualizarEstadoPaquete);

module.exports = router;
