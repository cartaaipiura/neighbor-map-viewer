
import React, { Suspense, useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapMarkers from './MapMarkers';
import { Incident } from '../incidents/types';
import MapLoadingIndicator from './MapLoadingIndicator';

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
  
  useEffect(() => {
    console.log("MapView montado con", filteredIncidents.length, "incidencias");
    console.log("Posición inicial:", initialPosition);
    
    // Forzar re-renderizado del mapa después de 500ms
    const timer = setTimeout(() => {
      setMapKey(`map-${Date.now()}`);
      console.log("Mapa re-renderizado con clave:", `map-${Date.now()}`);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
          whenReady={() => {
            console.log("Mapa creado exitosamente");
          }}
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
        </MapContainer>
      </Suspense>
    </div>
  );
};

export default MapView;
