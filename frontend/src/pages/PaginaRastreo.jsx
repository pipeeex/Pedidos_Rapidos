import { useState } from "react";
import { buscarPaquete } from "../services/api";

const handleBuscar = async () => {
  try {
    const data = await buscarPaquete(guia);
    console.log("Datos del paquete:", data);
  } catch (error) {
    alert("No se encontró el paquete");
  }
};

export default function PaginaRastreo() {
  const [guia, setGuia] = useState("");

  const handleBuscar = () => {
    if (!guia) return alert("Ingresa un número de guía");
    alert(`Buscando paquete con guía: ${guia}`);
  };

  return (
    <div className="text-white">
      <h1 className="text-5xl font-bold mb-6">Rastreo de Paquetes</h1>
      <p className="text-xl mb-6">Rastrea tu paquete</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={guia}
          onChange={(e) => setGuia(e.target.value)}
          placeholder="Número de guía"
          className="p-3 text-black rounded-md w-64"
        />
        <button
          onClick={handleBuscar}
          className="bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-md font-semibold"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
