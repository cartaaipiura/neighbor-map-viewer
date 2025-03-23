
import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Incident } from '../incidents/types';
import IncidentCard from '../IncidentCard';
import { createCustomIcon } from './MapMarkerUtils';
import { useNavigate } from 'react-router-dom';

interface MapMarkersProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
}

const MapMarkers: React.FC<MapMarkersProps> = ({ incidents, onIncidentClick }) => {
  const navigate = useNavigate();
  const [openPopupId, setOpenPopupId] = useState<number | null>(null);

  const handleIncidentCardClick = (incident: Incident) => {
    // Primero llamamos al controlador de clics original
    onIncidentClick(incident);
    
    // Luego navegamos a la página de detalle
    navigate(`/incident/${incident.id}`);
  };

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
              
              // Open this popup
              setOpenPopupId(incident.id);
              
              // Call the incident click handler
              onIncidentClick(incident);
              
              // We'll skip trying to manipulate the map view to prevent errors
              // This was causing the "_leaflet_pos" undefined error
            }
          }}
        >
          <Popup 
            minWidth={280} 
            maxWidth={280} 
            closeButton={true}
            autoPan={false}
            autoClose={false}
            closeOnClick={false}
            className="no-autopan"
            eventHandlers={{
              remove: () => {
                setOpenPopupId(null);
              }
            }}
          >
            <div 
              onClick={(e) => {
                // Prevent event bubbling to map
                e.stopPropagation();
                
                // Navigate to incident detail
                handleIncidentCardClick(incident);
              }}
              onMouseDown={(e) => {
                // Also prevent mousedown events from bubbling
                e.stopPropagation();
              }}
              className="cursor-pointer"
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
