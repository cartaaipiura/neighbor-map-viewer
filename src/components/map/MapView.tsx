
import React, { Suspense } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapMarkers from './MapMarkers';
import { Incident } from '../IncidentCard';

// Loading placeholder
const MapLoadingIndicator = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="text-vecino-gray-600 text-center">
      <div className="mb-4">
        <svg className="animate-spin h-8 w-8 mx-auto text-vecino-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p className="font-medium">Cargando componentes del mapa...</p>
    </div>
  </div>
);

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
  return (
    <Suspense fallback={<MapLoadingIndicator />}>
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
        className="z-0"
        key="incident-map-container"
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
  );
};

export default MapView;
