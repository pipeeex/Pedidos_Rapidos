// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import PaquetesTable from "../components/PaquetesTable";
import MapaRepartidores from "../components/MapaRepartidores";
import PaqueteForm from "../components/PaqueteForm";
import {
  obtenerPaquetes,
  crearPaquete,
  obtenerRepartidores,
} from "../services/api";

export default function AdminDashboard() {
  
  const [paquetes, setPaquetes] = useState([
    {guia: "PKG001", remitente: "Juan Pérez", destinatario: "María López", estado: "En ruta" },
    {guia: "PKG002", remitente: "Carlos Ruiz", destinatario: "Ana Torres", estado: "Entregado" },
    {guia: "PKG003", remitente: "Laura Gómez", destinatario: "Pedro Sánchez", estado: "Pendiente" },
  ]);
  const [repartidores, setRepartidores] = useState([]);
  const [nuevoPaquete, setNuevoPaquete] = useState({
    destinatario: "",
    remitente: "",
    estado: "En tránsito",
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const [p, r] = await Promise.all([
      obtenerPaquetes(),
      obtenerRepartidores(),
    ]);
    setPaquetes(p);
    setRepartidores(r);
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    await crearPaquete(nuevoPaquete);
    setNuevoPaquete({ destinatario: "", remitente: "", estado: "En tránsito" });
    await cargarDatos();
    if (!nuevoPaquete.remitente || !nuevoPaquete.destinatario) {
      alert("Por favor completa todos los campos");
      return;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-sky-400 mb-6 text-center">
        Panel de Administración
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleCrear}
        className="bg-neutral-800 p-6 rounded-lg max-w-lg mx-auto mb-8"
      >
        

        <input
          type="text"
          placeholder="Nombre destinatario"
          value={nuevoPaquete.nombreDestinatario}
          onChange={(e) =>
            setNuevoPaquete({ ...nuevoPaquete, nombreDestinatario: e.target.value })
          }
          className="w-full mb-3 px-3 py-2 rounded bg-neutral-700 text-white"
        />

        <input
          type="text"
          placeholder="Remitente"
          value={nuevoPaquete.remitente}
          onChange={(e) =>
            setNuevoPaquete({ ...nuevoPaquete, remitente: e.target.value })
          }
          className="w-full mb-3 px-3 py-2 rounded bg-neutral-700 text-white"
        />
        <select
          value={nuevoPaquete.estado}
          onChange={(e) =>
            setNuevoPaquete({ ...nuevoPaquete, estado: e.target.value })
          }
          className="w-full mb-3 px-3 py-2 rounded bg-neutral-700 text-white"
        >
          <option>En tránsito</option>
          <option>Entregado</option>
          <option>Pendiente</option>
        </select>
        <button
          type="submit"
          className="w-full py-2 bg-sky-600 hover:bg-sky-500 rounded text-white"
        >
          Crear paquete
        </button>
      </form>

      {/* Tabla de paquetes */}
      <PaquetesTable paquetes={paquetes} />


      {/* Repartidores */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-sky-400 mb-3">
          Repartidores activos
        </h2>
        <ul className="bg-neutral-800 p-4 rounded-lg">
          {repartidores.map((r) => (
            <li key={r._id} className="border-b border-neutral-700 py-2">
              {r.nombre} — 📍 {r.ubicacion?.lat}, {r.ubicacion?.lng}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
