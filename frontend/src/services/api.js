
const PORT = process.env.PORT;
const API_URL = "http://localhost:"+PORT; // URL del backend local

export async function buscarPaquete(numeroGuia) {
  const res = await fetch(`${API_URL}/api/paquetes/${numeroGuia}`);
  if (!res.ok) throw new Error("Error al obtener el paquete");
  return res.json();
}
