import { useState } from "react";

export default function PaqueteForm({ onAdd }) {
  const [form, setForm] = useState({ remitente: "", destinatario: "", dimensiones: "" });
  const [ultimoPaquete, setUltimoPaquete] = useState(null); 

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.remitente || !form.destinatario || !form.dimensiones) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevoPaquete = {

      guia: "G-" + Math.floor(Math.random() * 10000),
      estado: "En preparación",
      ...form,
    };

    onAdd(nuevoPaquete);
    setUltimoPaquete(nuevoPaquete); // 👈 Guardamos para mostrarlo
    setForm({ remitente: "", destinatario: "", dimensiones: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-gray-50 space-y-3 shadow-md">
      <h2 className="font-bold text-lg text-gray-800">Registrar Paquete</h2>

      <input
        name="remitente"
        placeholder="Remitente"
        value={form.remitente}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring focus:ring-blue-300"
      />
      <input
        name="destinatario"
        placeholder="Destinatario"
        value={form.destinatario}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring focus:ring-blue-300"
      />
      <input
        name="dimensiones"
        placeholder="Dimensiones"
        value={form.dimensiones}
        onChange={handleChange}
        className="border p-2 w-full rounded focus:ring focus:ring-blue-300"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full font-semibold"
      >
        Guardar
      </button>

      {/* 👇 Mostramos confirmación si hay paquete recién creado */}
      {ultimoPaquete && (
        <div className="mt-3 p-3 border rounded bg-green-50 text-green-700 text-sm">
          <p><strong>✅ Paquete registrado correctamente</strong></p>
          <p><strong>ID:</strong> {ultimoPaquete.id}</p>
          <p><strong>N° Guía:</strong> {ultimoPaquete.guia}</p>
        </div>
      )}
    </form>
  );
}