
import React, { Suspense, useEffect } from 'react';
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
  useEffect(() => {
    console.log("MapView mounted with", filteredIncidents.length, "incidents");
    console.log("Initial position:", initialPosition);
    
    // Force reflow to ensure the container is correctly sized
    const mapContainers = document.querySelectorAll('.leaflet-container');
    mapContainers.forEach(container => {
      console.log("Found Leaflet container:", container);
    });
  }, [filteredIncidents, initialPosition]);

  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<MapLoadingIndicator />}>
        <MapContainer
          center={initialPosition}
          zoom={initialZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
          className="z-0 h-full w-full"
          key={`incident-map-container-${Date.now()}`}
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
