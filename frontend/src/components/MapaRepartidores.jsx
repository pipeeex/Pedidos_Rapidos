import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mockRepartidores = [
  { nombre: "Carlos", ubicacion: [4.65, -74.1] },
  { nombre: "Ana", ubicacion: [4.67, -74.09] },
];

export default function MapaRepartidores() {
  return (
    <div className="h-80 mt-4">
      <MapContainer center={[4.65, -74.1]} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {mockRepartidores.map((r, i) => (
          <Marker key={i} position={r.ubicacion}>
            <Popup>{r.nombre}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
