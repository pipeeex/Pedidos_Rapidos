export async function buscarPaquete(numeroGuia) {
  const res = await fetch(`https://pedidos-rapidos.onrender.com/api/paquetes/buscar/${numeroGuia}`);
  if (!res.ok) throw new Error("Paquete no encontrado");
  return await res.json();
}

export async function obtenerPaquetes() {
  const res = await fetch("https://pedidos-rapidos.onrender.com/api/paquetes");
  if (!res.ok) throw new Error("Error al obtener paquetes");
  return await res.json();
}

export const eliminarPaquete = async (numeroGuia) => {
  const response = await fetch(`https://pedidos-rapidos.onrender.com/api/paquetes/${numeroGuia}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Error al eliminar el paquete');
  }
  
  return response.json();
};

export async function deleteRepartidor(identificacion) {
  const res = await fetch(`https://pedidos-rapidos.onrender.com/api/repartidores/${identificacion}`, {
    method: "DELETE",
  });

if (!res.ok) {
    throw new Error('Error al eliminar el paquete');
  }

  return res.json();
}


export async function crearPaquete(data) {
  const res = await fetch("https://pedidos-rapidos.onrender.com/api/paquetes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error al crear paquete: ${error}`);
  }
  return await res.json();
}

export async function obtenerRepartidores() {
  const res = await fetch("https://pedidos-rapidos.onrender.com/api/repartidores");
  if (!res.ok) throw new Error("Error al obtener repartidores");
  return await res.json();
}

export async function crearRepartidor(data) {
  const res = await fetch("https://pedidos-rapidos.onrender.com/api/repartidores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error al crear repartidor: ${error}`);
  }
  return await res.json();
}
export async function actualizarEstadoPaquete(numeroGuia, data) {
  const res = await fetch(`https://pedidos-rapidos.onrender.com/api/paquetes/${numeroGuia}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error("Error al actualizar estado del paquete: " + msg);
  }
  return await res.json();
}



