import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function MapaRepartidorUnico({ ubicacion, nombre }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded) return <p className="text-white">Cargando mapa...</p>;

  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-lg mt-4">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: ubicacion.lat, lng: ubicacion.lng }}
        zoom={14}
      >
        <Marker
          position={{ lat: ubicacion.lat, lng: ubicacion.lng }}
          label={nombre || "Repartidor"}
        />
      </GoogleMap>
    </div>
  );
}
