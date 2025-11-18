import { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { obtenerRepartidores } from "../services/api"; // << tu función API

export default function MapaRepartidores() {
  const [repartidores, setRepartidores] = useState([]);

  // === Cargar Google Maps ===
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  // === Función que carga ubicaciones ===
  const cargarUbicaciones = useCallback(async () => {
    try {
      const data = await obtenerRepartidores();
      setRepartidores(data);
    } catch (error) {
      console.error("Error cargando ubicaciones:", error);
    }
  }, []);

  // === Polling cada 5 segundos ===
  useEffect(() => {
    cargarUbicaciones(); // primera llamada inmediata

    const intervalo = setInterval(() => {
      cargarUbicaciones();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [cargarUbicaciones]);

  if (!isLoaded) return <p className="text-white">Cargando mapa...</p>;

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: 20.6736, lng: -103.344 }} // centro inicial (México ejemplo)
        zoom={12}
      >
        {repartidores.map((r) =>
          r.ubicacion ? (
            <Marker
              key={r._id}
              position={{
                lat: r.ubicacion.lat,
                lng: r.ubicacion.lng,
              }}
              label={r.nombre}
            />
          ) : null
        )}
      </GoogleMap>
    </div>
  );
}
