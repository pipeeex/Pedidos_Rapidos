import { useState } from "react";

export default function PaqueteForm({ onCrearPaquete, repartidores }) {
  const [formData, setFormData] = useState({
    numeroGuia: "",
    remitente: { nombre: "", direccion: "", telefono: "" },
    destinatario: { nombre: "", direccion: "", telefono: "" },
    dimensiones: { peso: "", largo: "", ancho: "", alto: "" },
    descripcion: "",
    repartidor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Campos anidados
    if (name.includes(".")) {
      const [obj, key] = name.split(".");
      setFormData({
        ...formData,
        [obj]: { ...formData[obj], [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    const {
      numeroGuia,
      remitente,
      destinatario,
      dimensiones,
    } = formData;

    if (
      !numeroGuia ||
      !remitente.nombre ||
      !remitente.telefono ||
      !remitente.direccion ||
      !destinatario.nombre ||
      !destinatario.telefono ||
      !destinatario.direccion ||
      !dimensiones.peso ||
      !dimensiones.largo ||
      !dimensiones.ancho ||
      !dimensiones.alto
    ) {
      alert("⚠️ Completa todos los campos obligatorios.");
      return;
    }

    await onCrearPaquete(formData);

    // Reset form
    setFormData({
      numeroGuia: "",
      remitente: { nombre: "", direccion: "", telefono: "" },
      destinatario: { nombre: "", direccion: "", telefono: "" },
      dimensiones: { peso: "", largo: "", ancho: "", alto: "" },
      descripcion: "",
      repartidor: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-800 text-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-sky-400">
        Registrar nuevo paquete
      </h2>

      {/* Número de guía */}
      <div>
        <label className="block text-sm mb-1">Número de guía *</label>
        <input
          type="text"
          name="numeroGuia"
          value={formData.numeroGuia}
          onChange={handleChange}
          className="w-full p-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
      </div>

      {/* Remitente */}
      <div>
        <label className="block text-sm mb-1">Remitente *</label>
        <input
          type="text"
          name="remitente.nombre"
          placeholder="Nombre"
          value={formData.remitente.nombre}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
        <input
          type="text"
          name="remitente.telefono"
          placeholder="Teléfono"
          value={formData.remitente.telefono}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
        <input
          type="text"
          name="remitente.direccion"
          placeholder="Dirección"
          value={formData.remitente.direccion}
          onChange={handleChange}
          className="w-full p-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
      </div>

      {/* Destinatario */}
      <div>
        <label className="block text-sm mb-1">Destinatario *</label>
        <input
          type="text"
          name="destinatario.nombre"
          placeholder="Nombre"
          value={formData.destinatario.nombre}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
        <input
          type="text"
          name="destinatario.telefono"
          placeholder="Teléfono"
          value={formData.destinatario.telefono}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
        <input
          type="text"
          name="destinatario.direccion"
          placeholder="Dirección"
          value={formData.destinatario.direccion}
          onChange={handleChange}
          className="w-full p-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
      </div>

      {/* Dimensiones */}
      <div>
        <label className="block text-sm mb-1">Dimensiones *</label>
        <input
          type="number"
          name="dimensiones.peso"
          placeholder="Peso (kg)"
          value={formData.dimensiones.peso}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
        <input
          type="number"
          name="dimensiones.largo"
          placeholder="Largo (cm)"
          value={formData.dimensiones.largo}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
        <input
          type="number"
          name="dimensiones.ancho"
          placeholder="Ancho (cm)"
          value={formData.dimensiones.ancho}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
        <input
          type="number"
          name="dimensiones.alto"
          placeholder="Alto (cm)"
          value={formData.dimensiones.alto}
          onChange={handleChange}
          className="w-full p-2 rounded bg-neutral-700 border border-neutral-600"
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm mb-1">Descripción</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full p-2 rounded bg-neutral-700 border border-neutral-600"
        />
      </div>

      {/* Repartidor */}
      <div>
        <label className="block text-sm mb-1">Asignar repartidor</label>
        <select
          name="repartidor"
          value={formData.repartidor}
          onChange={handleChange}
          className="w-full p-2 rounded bg-neutral-700 border border-neutral-600"
        >
          <option value="">Sin asignar</option>
          {repartidores.map((r) => (
            <option key={r._id} value={r._id}>
              {r.nombre} — {r.telefono}
            </option>
          ))}
        </select>
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold w-full"
      >
        Crear paquete
      </button>
    </form>
  );
}
