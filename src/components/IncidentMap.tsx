
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
import { Check, X } from 'lucide-react';

// Define custom marker icons for different incident statuses
const createCustomIcon = (status: string) => {
  return L.divIcon({
    html: `
      <div class="custom-marker-icon ${status === 'active' ? 'active' : 
                                       status === 'in_progress' ? 'in-progress' : 
                                       'resolved'}">
        <div class="marker-inner"></div>
      </div>
    `,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20]
  });
};

interface MapInteractionControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  recenter: () => void;
}

const MapInteractionControls: React.FC<MapInteractionControlsProps> = ({ 
  zoomIn, 
  zoomOut, 
  recenter 
}) => (
  <div className="absolute bottom-4 left-4 z-[400] flex flex-col gap-2">
    <button 
      onClick={zoomIn}
      className="w-10 h-10 bg-white rounded-lg shadow-subtle flex items-center justify-center text-vecino-gray-700 hover:bg-vecino-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-vecino-blue/30"
      aria-label="Zoom in"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3.33337V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
    <button 
      onClick={zoomOut}
      className="w-10 h-10 bg-white rounded-lg shadow-subtle flex items-center justify-center text-vecino-gray-700 hover:bg-vecino-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-vecino-blue/30"
      aria-label="Zoom out"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
    <button 
      onClick={recenter}
      className="w-10 h-10 bg-white rounded-lg shadow-subtle flex items-center justify-center text-vecino-gray-700 hover:bg-vecino-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-vecino-blue/30"
      aria-label="Recenter map"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 14.6667V14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8V8C14.6667 4.3181 11.6819 1.33337 8 1.33337V1.33337C4.31811 1.33337 1.33334 4.3181 1.33334 8V8C1.33334 11.6819 4.31811 14.6667 8 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 10.6667C9.47276 10.6667 10.6667 9.47276 10.6667 8C10.6667 6.52724 9.47276 5.33337 8 5.33337C6.52724 5.33337 5.33334 6.52724 5.33334 8C5.33334 9.47276 6.52724 10.6667 8 10.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </div>
);

interface MapControlsProps {
  position: [number, number];
}

const MapControls: React.FC<MapControlsProps> = ({ position }) => {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.zoomIn();
  };
  
  const handleZoomOut = () => {
    map.zoomOut();
  };
  
  const handleRecenter = () => {
    map.setView(position, 13);
  };
  
  return (
    <MapInteractionControls 
      zoomIn={handleZoomIn} 
      zoomOut={handleZoomOut} 
      recenter={handleRecenter} 
    />
  );
};

interface MapLegendProps {
  isVisible: boolean;
  toggleLegend: () => void;
}

const MapLegend: React.FC<MapLegendProps> = ({ isVisible, toggleLegend }) => (
  <div className={cn(
    "absolute bottom-4 right-4 z-[400] bg-white/90 backdrop-blur-sm rounded-lg shadow-subtle border border-vecino-gray-200 transition-transform duration-300 w-48",
    !isVisible && "translate-y-[calc(100%-40px)]"
  )}>
    <div className="flex items-center justify-between p-3 border-b border-vecino-gray-200">
      <h3 className="font-medium text-vecino-gray-900">Leyenda</h3>
      <button 
        onClick={toggleLegend}
        className="p-1 rounded-md text-vecino-gray-500 hover:text-vecino-gray-700 hover:bg-vecino-gray-100 transition-colors"
        aria-label={isVisible ? "Minimizar leyenda" : "Expandir leyenda"}
      >
        {isVisible ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
    
    <div className={cn(
      "overflow-hidden transition-all duration-300",
      isVisible ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0"
    )}>
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm text-vecino-gray-800">Activo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm text-vecino-gray-800">En progreso</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-vecino-gray-800">Resuelto</span>
        </div>
      </div>
    </div>
  </div>
);

interface IncidentMapProps {
  incidents: Incident[];
  initialPosition?: [number, number];
  initialZoom?: number;
  onIncidentClick?: (incident: Incident) => void;
  className?: string;
  showFilters?: boolean;
}

// Create a style element for CSS
const MapStyles = () => {
  return (
    <style>
      {`
        .custom-marker-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 0 0 4px white, 0 2px 4px rgba(0, 0, 0, 0.2);
          transform: translateY(-12px);
        }
        
        .custom-marker-icon.active {
          background-color: #FF453A;
        }
        
        .custom-marker-icon.in-progress {
          background-color: #0A84FF;
        }
        
        .custom-marker-icon.resolved {
          background-color: #30D158;
        }
        
        .marker-inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: white;
          transition: transform 0.2s ease;
        }
        
        .custom-marker-icon:hover .marker-inner {
          transform: scale(0.7);
        }
        
        .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .leaflet-popup-content {
          margin: 0;
          width: 280px !important;
        }
        
        .leaflet-popup-close-button {
          z-index: 10;
          font-size: 20px;
          margin: 5px;
        }
        
        .leaflet-popup-tip {
          background-color: white;
        }
      `}
    </style>
  );
};

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
  
  return (
    <div className={cn("relative rounded-xl overflow-hidden", className)}>
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
