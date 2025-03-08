
import React, { Suspense, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapMarkers from './MapMarkers';
import { Incident } from '../incidents/types';
import MapLoadingIndicator from './MapLoadingIndicator';

// Componente para prevenir recargas innecesarias al hacer clic
const MapEventHandler = () => {
  const map = useMapEvents({
    click: (e) => {
      // Evitamos la propagación del evento para que no cause recargas
      e.originalEvent.stopPropagation();
      console.log("Click en el mapa en:", e.latlng);
    }
  });
  return null;
};

interface MapViewProps {
  incidents: Incident[];
  filteredIncidents: Incident[];
  initialPosition: [number, number];
  initialZoom: number;
  showLegend: boolean;
  toggleLegend: () => void;
  onIncidentClick: (incident: Incident) => void;
}

const MapView: React.FC<MapViewProps> = ({
  incidents,
  filteredIncidents,
  initialPosition,
  initialZoom,
  showLegend,
  toggleLegend,
  onIncidentClick
}) => {
  const [mapKey, setMapKey] = useState(`map-${Date.now()}`);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  
  useEffect(() => {
    console.log("MapView montado con", filteredIncidents.length, "incidencias");
    console.log("Posición inicial:", initialPosition);
    
    // Solo forzamos el re-renderizado del mapa si es necesario y solo una vez
    if (!mapInstance) {
      const timer = setTimeout(() => {
        setMapKey(`map-${Date.now()}`);
        console.log("Mapa re-renderizado con clave:", `map-${Date.now()}`);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Función para capturar la instancia del mapa cuando esté lista
  const handleMapReady = () => {
    console.log("Mapa creado exitosamente");
  };

  // Función separada para cuando el mapa está listo y configurar la instancia
  const setMapRef = (map: L.Map) => {
    console.log("Mapa referenciado correctamente");
    setMapInstance(map);
  };

  return (
    <div className="w-full h-full relative" style={{ height: '100%', minHeight: '600px' }}>
      <Suspense fallback={<MapLoadingIndicator />}>
        <MapContainer
          key={mapKey}
          center={initialPosition}
          zoom={initialZoom}
          style={{ height: '100%', width: '100%', zIndex: 10 }}
          zoomControl={false}
          attributionControl={false}
          className="z-10 h-full w-full"
          whenReady={handleMapReady}
          ref={setMapRef}
          // Desactivar eventos que puedan causar recargas innecesarias
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapMarkers 
            incidents={filteredIncidents} 
            onIncidentClick={onIncidentClick} 
          />
          
          <MapControls position={initialPosition} />
          
          <MapLegend 
            isVisible={showLegend} 
            toggleLegend={toggleLegend} 
          />
          
          {/* Componente para manejar eventos del mapa */}
          <MapEventHandler />
        </MapContainer>
      </Suspense>
    </div>
  );
};

export default MapView;
