export default function PaquetesTable({ paquetes, onChangeEstado }) {
  return (
    <table className="w-full mt-4 border text-center">
      <thead className="bg-gray-200">
        <tr>
          <th>N° Guía</th>
          <th>Remitente</th>
          <th>Destinatario</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {paquetes.map((p) => (
          <tr key={p.id} className="border-t">
            <td>{p.guia}</td>
            <td>{p.remitente}</td>
            <td>{p.destinatario}</td>
            <td>{p.estado}</td>
            <td>
              <button
                onClick={() => onChangeEstado(p.id)}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                Cambiar Estado
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
