export default function RepartidoresTable({ repartidores }) {
  if (!repartidores || repartidores.length === 0) {
    return <p className="text-gray-400 text-center">No hay repartidores registrados.</p>;
  }

  return (
    <table className="w-full bg-neutral-800 text-white rounded-lg overflow-hidden mt-4">
      <thead className="bg-emerald-600">
        <tr>
          <th className="px-4 py-2 text-left">Nombre</th>
          <th className="px-4 py-2 text-left">Teléfono</th>
          <th className="px-4 py-2 text-left">Identificación</th>
          <th className="px-4 py-2 text-left">Ubicación</th>
          <th className="px-4 py-2 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {repartidores.map((r) => (
          <tr key={r._id} className="border-b border-neutral-700">
            <td className="px-4 py-2">{r.nombre}</td>
            <td className="px-4 py-2">{r.telefono}</td>
            <td className="px-4 py-2">{r.identificacion || "—"}</td>
            <td className="px-4 py-2">
              {r.ubicacion
                ? `${r.ubicacion.lat}, ${r.ubicacion.lng}`
                : "Sin ubicación"}
            </td>

            <td className="px-4 py-2 text-center">
              <button
                onClick={() => onDelete(r.identificacion)}
                className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
