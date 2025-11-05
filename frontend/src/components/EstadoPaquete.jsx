export default function EstadoPaquete({ paquete }) {
  if (!paquete) return null;

  return (
    <div className="p-4 border rounded mt-4 bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Estado del Paquete</h3>
      <p><b>N° Guía:</b> {paquete.guia}</p>
      <p><b>Remitente:</b> {paquete.remitente}</p>
      <p><b>Destinatario:</b> {paquete.destinatario}</p>
      <p><b>Estado actual:</b> {paquete.estado}</p>
    </div>
  );
}
