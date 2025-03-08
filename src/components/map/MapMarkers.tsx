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
              // Prevent map from recentering
              e.originalEvent.stopPropagation();
              e.originalEvent.preventDefault();
              
              // Call the incident click handler
              onIncidentClick(incident);
            }
          }}
        >
          <Popup 
            minWidth={280} 
            maxWidth={280} 
            closeButton={false}
            // Prevent auto-panning (centering) when popup opens
            autoPan={false}
            // Additional options to prevent map movement
            className="no-autopan"
            // Keep popup open when clicking elsewhere
            autoClose={false}
          >
            <div 
              onClick={(e) => {
                // Prevent event bubbling to map
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
