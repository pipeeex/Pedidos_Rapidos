import { useState } from "react";

export default function FormularioRastreo({ onBuscar }) {
  const [guia, setGuia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guia) return alert("Ingrese un número de guía");
    onBuscar(guia);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-50 space-y-3">
      <h2 className="font-bold text-lg">Rastrea tu paquete</h2>
      <input
        type="text"
        value={guia}
        onChange={(e) => setGuia(e.target.value)}
        placeholder="Número de guía"
        className="border p-2 w-full"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Buscar
      </button>
    </form>
  );
}
