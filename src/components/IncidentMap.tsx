
import React from 'react';
import { cn } from '@/lib/utils';
import { Incident } from './IncidentCard';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import MapFilters from './MapFilters';
import MapStyles from './map/MapStyles';
import LeafletLoader from './map/LeafletLoader';
import MapView from './map/MapView';
import MapLoadingIndicator from './map/MapLoadingIndicator';
import { useMapSetup } from './map/useMapSetup';

// Import React Leaflet components with lazy loading (moved to MapView)
const MapContainer = React.lazy(() => 
  import('react-leaflet').then(module => ({ default: module.MapContainer }))
);
const TileLayer = React.lazy(() => 
  import('react-leaflet').then(module => ({ default: module.TileLayer }))
);
const Marker = React.lazy(() => 
  import('react-leaflet').then(module => ({ default: module.Marker }))
);
const Popup = React.lazy(() => 
  import('react-leaflet').then(module => ({ default: module.Popup }))
);

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
  // Use our custom hook to setup map state and logic
  const {
    filteredIncidents,
    showLegend,
    isMapReady,
    handleFiltersChange,
    toggleLegend
  } = useMapSetup(incidents);
  
  const handleIncidentClick = (incident: Incident) => {
    if (onIncidentClick) {
      onIncidentClick(incident);
    }
  };

  // Show loading indicator if map is not ready
  if (!isMapReady) {
    return <MapLoadingIndicator />;
  }
  
  return (
    <div className={cn("relative rounded-xl overflow-hidden", className)}>
      <LeafletLoader />
      
      {showFilters && (
        <MapFilters 
          onFiltersChange={handleFiltersChange}
          className="absolute top-4 left-4 z-[400] max-w-xs"
        />
      )}
      
      <MapStyles />
      
      <MapView 
        incidents={incidents}
        filteredIncidents={filteredIncidents}
        initialPosition={initialPosition}
        initialZoom={initialZoom}
        showLegend={showLegend}
        toggleLegend={toggleLegend}
        onIncidentClick={handleIncidentClick}
      />
    </div>
  );
};

export default IncidentMap;
