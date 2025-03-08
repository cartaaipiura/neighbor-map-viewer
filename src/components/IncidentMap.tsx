
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Incident } from './incidents/types';
import MapFilters from './MapFilters';
import MapStyles from './map/MapStyles';
import LeafletLoader from './map/LeafletLoader';
import MapView from './map/MapView';
import MapLoadingIndicator from './map/MapLoadingIndicator';
import { useMapSetup } from './map/useMapSetup';

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
  initialPosition = [40.416775, -3.70379], // Madrid por defecto
  initialZoom = 13,
  onIncidentClick,
  className,
  showFilters = true
}) => {
  const [isClient, setIsClient] = useState(false);
  
  // Usar nuestro hook personalizado para configurar el estado y la lógica del mapa
  const {
    filteredIncidents,
    showLegend,
    isMapReady,
    handleFiltersChange,
    toggleLegend
  } = useMapSetup(incidents);
  
  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("IncidentMap: Detectado entorno cliente");
      const timer = setTimeout(() => {
        setIsClient(true);
        console.log("IncidentMap: Estado de cliente establecido a true");
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleIncidentClick = (incident: Incident) => {
    if (onIncidentClick) {
      onIncidentClick(incident);
    }
  };

  // Mostrar indicador de carga si el mapa no está listo o no estamos en el cliente
  if (!isClient || !isMapReady) {
    return <MapLoadingIndicator />;
  }
  
  return (
    <div className={cn("relative rounded-xl overflow-hidden", className)} 
         style={{ height: '100%', minHeight: '600px' }}>
      <LeafletLoader />
      
      {showFilters && (
        <MapFilters 
          onFiltersChange={handleFiltersChange}
          className="absolute top-4 left-4 z-[400] max-w-xs"
        />
      )}
      
      <MapStyles />
      
      <div className="absolute inset-0" style={{ height: '100%', minHeight: '600px' }}>
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
    </div>
  );
};

export default IncidentMap;
