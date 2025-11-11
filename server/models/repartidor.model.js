const mongoose = require('mongoose');

const RepartidorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  identificacion: { type: String, unique: true, sparse: true }, // opcional/único
  ubicacion: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
}, { timestamps: true });

const Repartidor = mongoose.model('Repartidor', RepartidorSchema);

module.exports = Repartidor; // <- IMPORTANTÍSIMO: module.exports (no "modules" ni "export")
