const Paquete = require('../models/paquete.model');

/**
 * Crear un nuevo paquete
 */
const crearPaquete = async (req, res) => {
  try {
    const nuevoPaquete = new Paquete(req.body);
    const paqueteGuardado = await nuevoPaquete.save();
    res.status(201).json(paqueteGuardado);
  } catch (error) {
    console.error('❌ Error al crear el paquete:', error);
    res.status(400).json({ message: 'Error al crear el paquete', error });
  }
};

/**
 * Obtener todos los paquetes
 */
const obtenerPaquetes = async (req, res) => {
  try {
    const paquetes = await Paquete.find().populate('repartidorAsignado');
    res.status(200).json(paquetes);
  } catch (error) {
    console.error('❌ Error al obtener los paquetes:', error);
    res.status(500).json({ message: 'Error al obtener los paquetes', error });
  }
};

/**
 * Obtener un paquete por _id o numeroGuia
 */
const obtenerPaquetePorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido para ObjectId' });
    }

    const paquete = await Paquete.findById(id).populate('repartidorAsignado');

    if (!paquete) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    res.status(200).json(paquete);
  } catch (error) {
    console.error('Error al obtener el paquete:', error);
    res.status(500).json({ message: 'Error al obtener el paquete', error });
  }
};

const actualizarEstadoPaquete = async (req, res) => {
  try {
    const { numeroGuia } = req.params;
    const { estado } = req.body;

    const paqueteActualizado = await Paquete.findOneAndUpdate(
      { numeroGuia },
      { estado },
      { new: true, runValidators: true }
    );

    if (!paqueteActualizado) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    res.status(200).json(paqueteActualizado);
  } catch (error) {
    console.error('Error al actualizar el estado del paquete:', error);
    res.status(400).json({ message: 'Error al actualizar el estado', error });
  }
};


const obtenerPaquetePorNumeroGuia = async (req, res) => {
  try {
    const { numeroGuia } = req.params;
    const paquete = await Paquete.findOne({ numeroGuia }).populate('repartidorAsignado');

    if (!paquete) {
      return res.status(404).json({ message: 'Paquete no encontrado' });
    }

    res.json(paquete);
  } catch (error) {
    console.error('Error al buscar el paquete:', error);
    res.status(500).json({ message: 'Error al buscar el paquete', error });
  }
};

module.exports = {
  crearPaquete,
  obtenerPaquetes,
  obtenerPaquetePorId,
  actualizarEstadoPaquete,
  obtenerPaquetePorNumeroGuia
};