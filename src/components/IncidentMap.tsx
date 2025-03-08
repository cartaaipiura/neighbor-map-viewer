
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Incident } from './IncidentCard';
import IncidentCard from './IncidentCard';
import { cn } from '@/lib/utils';
import MapFilters from './MapFilters';
import MapStyles from './map/MapStyles';
import MapControls from './map/MapControls';
import MapLegend from './map/MapLegend';
import { createCustomIcon } from './map/MapMarkerUtils';

interface IncidentMapProps {
  incidents: Incident[];
  initialPosition?: [number, number];
  initialZoom?: number;
  onIncidentClick?: (incident: Incident) => void;
  className?: string;
  showFilters?: boolean;
}

const IncidentMap: React.FC<IncidentMapProps> = ({
  incidents,
  initialPosition = [40.416775, -3.70379], // Madrid by default
  initialZoom = 13,
  onIncidentClick,
  className,
  showFilters = true
}) => {
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(incidents);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showLegend, setShowLegend] = useState(true);
  const mapRef = useRef(null);
  
  // Apply filters when they change
  useEffect(() => {
    let filtered = [...incidents];
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((incident) => 
        selectedCategories.includes(incident.category)
      );
    }
    
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((incident) => 
        selectedStatuses.includes(incident.status)
      );
    }
    
    setFilteredIncidents(filtered);
  }, [incidents, selectedCategories, selectedStatuses]);
  
  const handleFiltersChange = (categories: string[], statuses: string[]) => {
    setSelectedCategories(categories);
    setSelectedStatuses(statuses);
  };
  
  const handleIncidentClick = (incident: Incident) => {
    if (onIncidentClick) {
      onIncidentClick(incident);
    }
  };

  // Ensure Leaflet is initialized only in browser
  useEffect(() => {
    // This is required because Leaflet expects a window object
    console.log("Map component mounted, window exists:", typeof window !== 'undefined');
  }, []);
  
  if (typeof window === 'undefined') {
    return <div className="loading">Loading map...</div>;
  }
  
  return (
    <div className={cn("relative rounded-xl overflow-hidden", className)} ref={mapRef}>
      {showFilters && (
        <MapFilters 
          onFiltersChange={handleFiltersChange}
          className="absolute top-4 left-4 z-[400] max-w-xs"
        />
      )}
      
      <MapStyles />
      
      <MapContainer
        center={initialPosition}
        zoom={initialZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {filteredIncidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.latitude, incident.longitude]}
            icon={createCustomIcon(incident.status)}
            eventHandlers={{
              click: () => handleIncidentClick(incident)
            }}
          >
            <Popup minWidth={280} maxWidth={280} closeButton={false}>
              <IncidentCard incident={incident} variant="map" />
            </Popup>
          </Marker>
        ))}
        
        <MapControls position={initialPosition} />
        <MapLegend 
          isVisible={showLegend} 
          toggleLegend={() => setShowLegend(!showLegend)} 
        />
      </MapContainer>
    </div>
  );
};

export default IncidentMap;
