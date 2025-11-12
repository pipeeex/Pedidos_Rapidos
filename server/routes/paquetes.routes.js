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

// routes/paquetes.js (o donde tengas tus rutas)
router.delete('/paquetes/:numeroGuia', async (req, res) => {
  try {
    const { numeroGuia } = req.params;
    
    const resultado = await Paquete.findOneAndDelete({ numeroGuia });
    
    if (!resultado) {
      return res.status(404).json({ error: 'Paquete no encontrado' });
    }
    
    res.json({ message: 'Paquete eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar paquete:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
