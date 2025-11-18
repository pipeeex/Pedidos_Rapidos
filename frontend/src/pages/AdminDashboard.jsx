import React, { useEffect, useState } from "react";
import {
  obtenerPaquetes,
  obtenerRepartidores,
  crearPaquete,
  crearRepartidor,
  actualizarEstadoPaquete,
  eliminarPaquete, 
  deleteRepartidor,
} from "../services/api.js";
import PaqueteForm from "../components/PaqueteForm.jsx";
import PaquetesTable from "../components/PaquetesTable.jsx";
import RepartidorForm from "../components/RepartidorForm.jsx";

export default function AdminDashboard() {
  const [paquetes, setPaquetes] = useState([]);
  const [repartidores, setRepartidores] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [paquetesData, repartidoresData] = await Promise.all([
        obtenerPaquetes(),
        obtenerRepartidores(),
      ]);
      setPaquetes(paquetesData);
      setRepartidores(repartidoresData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCrearPaquete = async (paquete) => {
    try {
      await crearPaquete(paquete);
      alert("✅ Paquete creado correctamente");
      cargarDatos();
    } catch (err) {
      console.error(err);
      alert("❌ Error al crear paquete: " + err.message);
    }
  };


  const handleCrearRepartidor = async (repartidor) => {
    try {
      await crearRepartidor(repartidor);
      alert("✅ Repartidor creado correctamente");
      cargarDatos();
    } catch (err) {
      console.error(err);
      alert("❌ Error al crear repartidor: " + err.message);
    }
  };

  const handleActualizarEstado = async (numeroGuia, nuevoEstado) => {
    try {
      await actualizarEstadoPaquete(numeroGuia, { estado: nuevoEstado });
      alert("🟢 Estado del paquete actualizado");
      cargarDatos();
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo actualizar el estado del paquete");
    }
  };

  // ✅ Nueva función para eliminar paquete
  const handleEliminarPaquete = async (numeroGuia) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este paquete?")) {
      try {
        await eliminarPaquete(numeroGuia);
        alert("🗑️ Paquete eliminado correctamente");
        cargarDatos();
      } catch (error) {
        console.error(error);
        alert("❌ Error al eliminar el paquete");
      }
    }
  };

      const handleDeleteRepartidor = async (identificacion) => {
    if (!confirm("¿Seguro que deseas eliminar este repartidor?")) return;

    try {
      await deleteRepartidor(identificacion);
      alert("🗑️ Repartidor eliminado correctamente");
      cargarDatos(); // recarga todo (paquetes y repartidores)
    } catch (error) {
      console.error(error);
      alert("❌ Error eliminando repartidor");
    }
  };


  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-950 text-white">
        <p className="text-xl text-sky-400 animate-pulse">
          Cargando datos del administrador...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10 flex flex-col gap-10">
      <h1 className="text-3xl font-bold text-center text-sky-400 mb-4">
        Panel de Administración
      </h1>

      {/* FORMULARIO DE PAQUETES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PaqueteForm
            onCrearPaquete={handleCrearPaquete}
            repartidores={repartidores}
          />
        </div>

        <div className="bg-neutral-900 rounded-2xl shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-3 text-sky-400 text-center">
            Paquetes registrados
          </h2>
          <div className="overflow-x-auto">
            <PaquetesTable
              paquetes={paquetes}
              onActualizarEstado={handleActualizarEstado}
              onEliminarPaquete={handleEliminarPaquete} // ✅ Pasa la función como prop
            />
          </div>
        </div>
      </div>

      {/* FORMULARIO Y LISTA DE REPARTIDORES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-neutral-900 p-6 rounded-2xl shadow-lg">
        {/* Formulario */}
        <div>
          <RepartidorForm onSubmit={handleCrearRepartidor} />
        </div>

        {/* Tabla */}
        <div>
          <h3 className="text-xl font-semibold text-center text-sky-400 mb-4">
            Lista de repartidores
          </h3>
          {repartidores.length === 0 ? (
            <p className="text-gray-400 text-center">
              No hay repartidores registrados.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-neutral-800 text-white rounded-lg overflow-hidden">
                <thead className="bg-sky-600">
                  <tr>
                    <th className="px-4 py-2 text-left">Nombre</th>
                    <th className="px-4 py-2 text-left">Teléfono</th>
                    <th className="px-4 py-2 text-left">Identificación</th>
                    <th className="px-4 py-2 text-left">Ubicación</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {repartidores.map((r) => (
                    <tr key={r._id} className="border-b border-neutral-700">
                      <td className="px-4 py-2">{r.nombre}</td>
                      <td className="px-4 py-2">{r.telefono}</td>
                      <td className="px-4 py-2">
                        {r.identificacion || (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-400">
                        lat: {r.ubicacion?.lat ?? 0}, lng: {r.ubicacion?.lng ?? 0}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleDeleteRepartidor(r.identificacion)}
                          className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 transition"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}