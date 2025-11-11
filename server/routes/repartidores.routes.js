const express = require('express');
const Repartidor = require('../models/repartidor.model'); // sin .js está bien también

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const repartidores = await Repartidor.find();
    res.json(repartidores);
  } catch (error) {
    console.error('Error al obtener repartidores:', error);
    res.status(500).json({ message: 'Error al obtener repartidores', error });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Datos recibidos crear repartidor:', req.body);
    const nuevo = new Repartidor(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear repartidor:', error);
    res.status(400).json({ message: 'Error al crear repartidor', error });
  }
});

module.exports = router;
