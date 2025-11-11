const Repartidor = require('../models/repartidor.model');

/**
 * Obtener todas las ubicaciones de los repartidores
 */
const obtenerUbicacionesRepartidores = async (req, res) => {
  try {
    const repartidores = await Repartidor.find({}, 'nombre ubicacionActual');

    if (!repartidores || repartidores.length === 0) {
      return res.status(404).json({ message: 'No se encontraron repartidores' });
    }

    res.status(200).json(repartidores);
  } catch (error) {
    console.error('Error al obtener las ubicaciones de los repartidores:', error);
    res.status(500).json({
      message: 'Error al obtener las ubicaciones de los repartidores',
      error
    });
  }
};

module.exports = {
  obtenerUbicacionesRepartidores
};