require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Conexión Mongo
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// Rutas
const paquetesRoutes = require('./routes/paquetes.routes');
const repartidoresRoutes = require('./routes/repartidores.routes');

 app.use('/api/paquetes', paquetesRoutes);
app.use('/api/repartidores', repartidoresRoutes);

app.get('/', (req, res) => res.send('Servidor funcionando correctamente'));

app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
