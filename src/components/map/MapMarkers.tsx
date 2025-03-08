
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Incident } from '../incidents/types';
import IncidentCard from '../IncidentCard';
import { createCustomIcon } from './MapMarkerUtils';

interface MapMarkersProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
}

const MapMarkers: React.FC<MapMarkersProps> = ({ incidents, onIncidentClick }) => {
  return (
    <>
      {incidents.map((incident) => (
        <Marker
          key={`marker-${incident.id}`}
          position={[incident.latitude, incident.longitude]}
          icon={createCustomIcon(incident.status)}
          eventHandlers={{
            click: (e) => {
              // Prevent map from recentering by stopping propagation and preventing default
              if (e.originalEvent) {
                e.originalEvent.stopPropagation();
                e.originalEvent.preventDefault();
              }
              
              // Call the incident click handler
              onIncidentClick(incident);
              
              // Prevent the marker click from causing any map movement
              if (e.target && e.target._map) {
                const map = e.target._map;
                // Store current center and zoom
                const currentCenter = map.getCenter();
                const currentZoom = map.getZoom();
                
                // Immediately restore the view to prevent recentering
                setTimeout(() => {
                  map.setView(currentCenter, currentZoom, {
                    animate: false,
                    duration: 0
                  });
                }, 0);
              }
            }
          }}
        >
          <Popup 
            minWidth={280} 
            maxWidth={280} 
            closeButton={false}
            autoPan={false}
            autoClose={false}
            closeOnClick={false}
            className="no-autopan"
          >
            <div 
              onClick={(e) => {
                // Prevent event bubbling to map
                e.stopPropagation();
              }}
              onMouseDown={(e) => {
                // Also prevent mousedown events from bubbling
                e.stopPropagation();
              }}
            >
              <IncidentCard incident={incident} variant="map" />
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapMarkers;
