import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapaRastreo({ ubicacion }) {
  if (!ubicacion) return null;

  return (
    <div className="h-80 mt-4">
      <MapContainer center={ubicacion} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={ubicacion}>
          <Popup>Última ubicación del paquete</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
