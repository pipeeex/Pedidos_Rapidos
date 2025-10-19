require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crear la aplicación de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Variables de entorno
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const paqueteRoutes = require('./routes/paquetes.routes');
app.use('/api/paquetes', paqueteRoutes);
const repartidorRoutes = require('./routes/repartidores.routes');
app.use('/api/repartidores', repartidorRoutes);
