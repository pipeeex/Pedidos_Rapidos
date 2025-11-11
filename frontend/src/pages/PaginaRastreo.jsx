// src/pages/PaginaRastreo.jsx
import React, { useState } from "react";
import { buscarPaquete } from "../services/api";


export default function PaginaRastreo() {
  const [codigo, setCodigo] = useState("");
  const [paquete, setPaquete] = useState(null);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    try {
      setError("");
      const data = await buscarPaquete(codigo);
      setPaquete(data);
    } catch (err) {
      setPaquete(null);
      setError("❌ No se encontró el paquete.");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6 text-sky-400">Rastreo de Paquetes</h1>
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Número de guía"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="px-4 py-2 rounded bg-neutral-800 text-white border border-gray-600 focus:outline-none"
        />
        <button
          onClick={handleBuscar}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded text-white"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {paquete && (
        <div className="mt-6 bg-neutral-800 p-6 rounded-lg text-left max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-sky-300 mb-2">
            {paquete.nombreDestinatario}
          </h2>
          <p><b>Dirección:</b> {paquete.direccion}</p>
          <p><b>Estado:</b> {paquete.estado}</p>
          <p><b>Última actualización:</b> {new Date(paquete.updatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
