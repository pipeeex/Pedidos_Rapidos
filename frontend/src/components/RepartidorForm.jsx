import React, { useState } from "react";

export default function RepartidorForm({ onSubmit }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    identificacion: "",
    lat: "",
    lng: "",
    repartidorAsignado: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación mínima
    if (!form.nombre.trim() || !form.telefono.trim()) {
      alert("⚠️ Ingresa nombre y teléfono del repartidor.");
      return;
    }

    // Construir payload cuidando identificacion (no enviarla si está vacía)
    const payload = {
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
    };

    if (form.identificacion && form.identificacion.trim() !== "") {
      payload.identificacion = form.identificacion.trim();
    }

    // Si lat/lng están vacíos, no es obligatorio enviarlos. Si quieres enviarlos siempre usa Number(...) || 0
    const latNum = form.lat === "" ? null : Number(form.lat);
    const lngNum = form.lng === "" ? null : Number(form.lng);

    // solo incluir ubicacion si el usuario puso algo (o si quieres, siempre incluir con 0)
    if (latNum !== null || lngNum !== null) {
      payload.ubicacion = {
        lat: isNaN(latNum) || latNum === null ? 0 : latNum,
        lng: isNaN(lngNum) || lngNum === null ? 0 : lngNum,
      };
    }

    onSubmit(payload);

    // limpiar form
    setForm({ nombre: "", telefono: "", identificacion: "", lat: "", lng: "" });
  };

  return (
    <div className="bg-neutral-900 p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-sky-400 text-center mb-6">
        Registrar nuevo repartidor
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del repartidor"
          value={form.nombre}
          onChange={handleChange}
          className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          required
        />

        <input
          type="text"
          name="identificacion"
          placeholder="Identificación (opcional, único)"
          value={form.identificacion}
          onChange={handleChange}
          className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="lat"
            placeholder="Lat (opcional)"
            value={form.lat}
            onChange={handleChange}
            className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
            step="any"
          />
          <input
            type="number"
            name="lng"
            placeholder="Lng (opcional)"
            value={form.lng}
            onChange={handleChange}
            className="p-3 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
            step="any"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-500 text-white py-3 rounded font-semibold transition-colors"
        >
          Crear repartidor
        </button>
      </form>
    </div>
  );
}
