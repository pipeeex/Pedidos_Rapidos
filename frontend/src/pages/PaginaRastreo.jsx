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

      if (!data) throw new Error("No se encontró el paquete");
      setPaquete(data);
    } catch (err) {
      setPaquete(null);
      setError("❌ No se encontró el paquete.");
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6 text-sky-400">
        Rastreo de Paquetes
      </h1>

      {/* Input de búsqueda */}
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

      {/* Error */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Datos del paquete */}
      {paquete && (
        <div className="mt-6 bg-neutral-800 p-6 rounded-lg text-left max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-sky-300 mb-4">
            📦 Información del Paquete
          </h2>

          <p><b>Número de guía:</b> {paquete.numeroGuia}</p>
          <p><b>Estado:</b> {paquete.estado || "En tránsito"}</p>
          <p>
            <b>Última actualización:</b>{" "}
            {new Date(paquete.updatedAt).toLocaleString()}
          </p>

          <hr className="my-4 border-gray-600" />

          {/* Datos del remitente */}
          {paquete.remitente && (
            <div className="mb-3">
              <h3 className="text-sky-400 font-semibold mb-1">Remitente</h3>
              <p><b>Nombre:</b> {paquete.remitente.nombre}</p>
              <p><b>Teléfono:</b> {paquete.remitente.telefono}</p>
              <p><b>Dirección:</b> {paquete.remitente.direccion}</p>
            </div>
          )}

          <hr className="my-4 border-gray-600" />

          {/* Datos del destinatario */}
          {paquete.destinatario && (
            <div className="mb-3">
              <h3 className="text-sky-400 font-semibold mb-1">Destinatario</h3>
              <p><b>Nombre:</b> {paquete.destinatario.nombre}</p>
              <p><b>Teléfono:</b> {paquete.destinatario.telefono}</p>
              <p><b>Dirección:</b> {paquete.destinatario.direccion}</p>
            </div>
          )}

          <hr className="my-4 border-gray-600" />

          {/* Dimensiones */}
          {paquete.dimensiones && (
            <div className="mb-3">
              <h3 className="text-sky-400 font-semibold mb-1">Dimensiones</h3>
              <p><b>Peso:</b> {paquete.dimensiones.peso} kg</p>
              <p>
                <b>Tamaño:</b> {paquete.dimensiones.largo} ×{" "}
                {paquete.dimensiones.ancho} × {paquete.dimensiones.alto} cm
              </p>
            </div>
          )}

          {/* Descripción */}
          {paquete.descripcion && (
            <div className="mt-4">
              <h3 className="text-sky-400 font-semibold mb-1">Descripción</h3>
              <p>{paquete.descripcion}</p>
            </div>
          )}

          <hr className="my-4 border-gray-600" />

          {/* Información del RepartidorAsignado */}
          {paquete.repartidorAsignado && (
            <div className="mt-4">
              <h3 className="text-sky-400 font-semibold mb-1">
                 Información del repartidor asignado
              </h3>
              <p><b>Nombre:</b> {paquete.repartidorAsignado.nombre}</p>
              <p><b>Teléfono:</b> {paquete.repartidorAsignado.telefono}</p>
              {paquete.repartidorAsignado.identificacion && (
                <p><b>Identificación:</b> {paquete.repartidorAsignado.identificacion}</p>
              )}
              {paquete.repartidorAsignado.ubicacion && (
                <p>
                  <b>Ubicación actual:</b>{" "}
                  Lat {paquete.repartidorAsignado.ubicacion.lat}, Lng{" "}
                  {paquete.repartidorAsignado.ubicacion.lng}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
