
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Incident } from './IncidentCard';
import IncidentCard from './IncidentCard';
import { cn } from '@/lib/utils';
import MapFilters from './MapFilters';
import MapStyles from './map/MapStyles';
import MapLegend from './map/MapLegend';
import { createCustomIcon } from './map/MapMarkerUtils';

// Importar los componentes de react-leaflet con lazy
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

// Cargar el componente de controles de mapa con lazy
const MapControls = React.lazy(() => import('./map/MapControls'));

interface IncidentMapProps {
  incidents: Incident[];
  initialPosition?: [number, number];
  initialZoom?: number;
  onIncidentClick?: (incident: Incident) => void;
  className?: string;
  showFilters?: boolean;
}

// Asegurar que los estilos de Leaflet estén cargados
if (typeof window !== 'undefined') {
  // Verificar si ya existe el CSS de Leaflet
  const linkId = 'leaflet-css';
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.rel = 'stylesheet';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);
  }
}

const IncidentMap: React.FC<IncidentMapProps> = ({
  incidents,
  initialPosition = [40.416775, -3.70379], // Madrid por defecto
  initialZoom = 13,
  onIncidentClick,
  className,
  showFilters = true
}) => {
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(incidents);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showLegend, setShowLegend] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  // Inicializar el mapa solo en el lado del cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dar tiempo para que los estilos de Leaflet se carguen correctamente
      const timer = setTimeout(() => {
        setIsMapReady(true);
        console.log("Mapa listo para renderizar:", true);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Aplicar filtros cuando cambien
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

  // Mostrar estado de carga si el mapa no está listo
  if (!isMapReady) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-vecino-gray-100 rounded-xl">
        <div className="text-vecino-gray-600 text-center">
          <div className="mb-4">
            <svg className="animate-spin h-8 w-8 mx-auto text-vecino-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="font-medium">Cargando mapa...</p>
        </div>
      </div>
    );
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
      
      <React.Suspense fallback={
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
      }>
        <MapContainer
          center={initialPosition}
          zoom={initialZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
          className="z-0"
          key="incident-map-container"
          whenCreated={(mapInstance) => {
            mapInstanceRef.current = mapInstance;
            console.log("Mapa creado exitosamente");
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredIncidents.map((incident) => (
            <Marker
              key={`marker-${incident.id}`}
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
      </React.Suspense>
    </div>
  );
};

export default IncidentMap;
