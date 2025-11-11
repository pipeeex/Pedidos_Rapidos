// src/services/api.js
const API_URL = "http://localhost:5000/api"; // Ajusta si tu backend corre en otro puerto

// --- PAQUETES ---
export async function obtenerPaquetes() {
  const res = await fetch(`${API_URL}/paquetes`);
  if (!res.ok) throw new Error("Error al obtener paquetes");
  return await res.json();
}

export async function crearPaquete(paquete) {
  const res = await fetch(`${API_URL}/paquetes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paquete),
  });
  if (!res.ok) throw new Error("Error al crear paquete");
  return await res.json();
}

export async function buscarPaquete(numeroGuia) {
  const res = await fetch(`${API_URL}/paquetes/${numeroGuia}`);
  if (!res.ok) throw new Error("Paquete no encontrado");
  return await res.json();
}

// --- REPARTIDORES ---
export async function obtenerRepartidores() {
  const res = await fetch(`${API_URL}/repartidores/ubicaciones`);
  if (!res.ok) throw new Error("Error al obtener repartidores");
  return await res.json();
}
