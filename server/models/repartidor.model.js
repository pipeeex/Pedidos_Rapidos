const mongoose = require('mongoose');

const repartidorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
      },
      identificacion: {
        type: String,
        required: true,
        unique: true
      },
      ubicacionActual: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,
          default: 'Point'
        },
        coordinates: {
          type: [Number], // [longitud, latitud]
          required: true
        }
      }
    }, {
      timestamps: true
});

repartidorSchema.index({ ubicacionActual: '2dsphere' });

module.exports = mongoose.model('Repartidor', repartidorSchema);