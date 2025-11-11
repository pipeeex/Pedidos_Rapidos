const mongoose = require('mongoose');

const paqueteSchema = new mongoose.Schema({
  numeroGuia: {
    type: String,
    required: true,
    unique: true
  },
  remitente: {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true }
  },
  destinatario: {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true }
  },
  dimensiones: {
    alto: { type: Number, required: true },
    ancho: { type: Number, required: true },
    largo: { type: Number, required: true },
    peso: { type: Number, required: true }
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'En transito', 'Entregado'],
    default: 'Pendiente'
  },
  repartidorAsignado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repartidor'
  },
  historialUbicaciones: [
    {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
      fecha: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true // crea automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Paquete', paqueteSchema);