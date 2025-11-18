const Paquete = require('../models/paquete.model');

/**
 * Crear un nuevo paquete
 */
const crearPaquete = async (req, res) => {
  try {
    const nuevoPaquete = new Paquete(req.body);
    const paqueteGuardado = await nuevoPaquete.save();
    const paqueteConRepartidor = await paqueteGuardado.populate("repartidorAsignado"); // 👈 Para que lo devuelva con info del repartidor
    res.status(201).json(paqueteConRepartidor);
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

const eliminarPaquete = async (req, res) => {
  try {
    const { numeroGuia } = req.params;

    console.log("👉 Intentando eliminar paquete con númeroGuia:", numeroGuia);

    const eliminado = await Paquete.findOneAndDelete({ numeroGuia });

    if (!eliminado) {
      console.log("❌ No existe un paquete con ese númeroGuia");
      return res.status(404).json({ message: "Paquete no encontrado" });
    }

    console.log("✅ Paquete eliminado:", eliminado);

    res.json({ message: "Paquete eliminado correctamente", eliminado });

  } catch (error) {
    console.error("❌ Error al eliminar paquete:", error);
    res.status(500).json({ message: "Error al eliminar el paquete" });
  }
};

const eliminarRepartidor = async (req, res) => {
  try {
    const { identificacion } = req.params;

    console.log("👉 Intentando eliminar repartidor con identificación:", identificacion);

    const eliminado = await Repartidor.findOneAndDelete({ identificacion });

    if (!eliminado) {
      console.log("❌ No existe un repartidor con esa identificación");
      return res.status(404).json({ message: "Repartidor no encontrado" });
    }

    console.log("✅ Repartidor eliminado:", eliminado);

    res.json({ message: "Repartidor eliminado correctamente", eliminado });

  } catch (error) {
    console.error("❌ Error al eliminar repartidor:", error);
    res.status(500).json({ message: "Error al eliminar el repartidor" });
  }
};

module.exports = {
  crearPaquete,
  obtenerPaquetes,
  obtenerPaquetePorId,
  actualizarEstadoPaquete,
  obtenerPaquetePorNumeroGuia,
  eliminarPaquete,
  eliminarRepartidor
};