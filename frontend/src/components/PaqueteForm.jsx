import { useState } from "react";

export default function PaqueteForm({ onAdd }) {
  const [form, setForm] = useState({ remitente: "", destinatario: "", dimensiones: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.remitente || !form.destinatario || !form.dimensiones) {
      alert("Todos los campos son obligatorios");
      return;
    }
    onAdd({
      id: Date.now(),
      guia: "G-" + Math.floor(Math.random() * 10000),
      estado: "En preparación",
      ...form,
    });
    setForm({ remitente: "", destinatario: "", dimensiones: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-gray-50 space-y-3">
      <h2 className="font-bold text-lg">Registrar Paquete</h2>
      <input
        name="remitente"
        placeholder="Remitente"
        value={form.remitente}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="destinatario"
        placeholder="Destinatario"
        value={form.destinatario}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="dimensiones"
        placeholder="Dimensiones"
        value={form.dimensiones}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar
      </button>
    </form>
  );
}
