import { actualizarEstadoPaquete } from "../services/api";
import React from "react";

export default function PaquetesTable({ paquetes, onActualizarEstado, onEliminarPaquete }) {
  const handleEstadoChange = (numeroGuia, nuevoEstado) => {
    onActualizarEstado(numeroGuia, nuevoEstado);
  };

  return (
    <table className="w-full bg-neutral-800 text-white rounded-lg overflow-hidden">
      <thead className="bg-sky-600">
        <tr>
          <th className="px-4 py-2 text-left">Número de guía</th>
          <th className="px-4 py-2 text-left">Remitente</th>
          <th className="px-4 py-2 text-left">Destinatario</th>
          <th className="px-4 py-2 text-left">Estado</th>
        </tr>
      </thead>
      <tbody>
        {paquetes.map((p) => (
          <tr key={p.numeroGuia} className="border-b border-neutral-700">
            <td className="px-4 py-2">{p.numeroGuia}</td>
            <td className="px-4 py-2">{p.remitente?.nombre}</td>
            <td className="px-4 py-2">{p.destinatario?.nombre}</td>
            <td className="px-4 py-2">
              <select
                value={p.estado}
                onChange={(e) => onActualizarEstado(p.numeroGuia, e.target.value)}
                className="bg-neutral-700 text-white rounded px-2 py-1"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En tránsito">En tránsito</option>
                <option value="Entregado">Entregado</option>
              </select>
              <button
                onClick={() => onEliminarPaquete(p.numeroGuia)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                title="Eliminar paquete"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
