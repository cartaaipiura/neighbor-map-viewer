import React, { Suspense, useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapMarkers from './MapMarkers';
import { Incident } from '../incidents/types';
import MapLoadingIndicator from './MapLoadingIndicator';

const MapEventHandler = () => {
  const map = useMapEvents({
    click: (e) => {
      e.originalEvent.stopPropagation();
      e.originalEvent.preventDefault();
      console.log("Click en el mapa en:", e.latlng);
    },
    dblclick: (e) => {
      e.originalEvent.stopPropagation();
      e.originalEvent.preventDefault();
    },
    mousedown: (e) => {
      e.originalEvent.stopPropagation();
    },
    popupopen: (e) => {
      console.log("Popup abierto, previniendo autopan");
      if (e.popup && typeof e.popup.options !== 'undefined') {
        e.popup.options.autoPan = false;
      }
      
      if (map) {
        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();
        
        setTimeout(() => {
          map.setView(currentCenter, currentZoom, {
            animate: false
          });
        }, 0);
      }
    },
    popupclose: (e) => {
      console.log("Popup closed, preventing default behavior");
    }
  });
  return null;
};

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
  const [mapKey, setMapKey] = useState(`map-${Date.now()}`);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  
  useEffect(() => {
    console.log("MapView montado con", filteredIncidents.length, "incidencias");
    console.log("Posición inicial:", initialPosition);
    
    if (!mapInstance) {
      const timer = setTimeout(() => {
        setMapKey(`map-${Date.now()}`);
        console.log("Mapa re-renderizado con clave:", `map-${Date.now()}`);
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    if (L.Popup) {
      L.Popup.prototype.options.autoPan = false;
      L.Popup.prototype.options.autoClose = false;
    }
  }, []);

  const handleMapReady = (map: L.Map) => {
    console.log("Mapa creado exitosamente");
    map.options.closePopupOnClick = false;
    map.options.inertia = false;
    map.options.zoomAnimation = false;
    map.options.fadeAnimation = false;
    map.options.markerZoomAnimation = false;
  };

  const setMapRef = useCallback((mapInstance: L.Map) => {
    if (!mapInstance) {
      console.log("Referencia de mapa es null");
      return;
    }
    
    console.log("Mapa referenciado correctamente");
    mapRef.current = mapInstance;
    setMapInstance(mapInstance);
    
    try {
      mapInstance.on('dragstart', () => {
        console.log("Inicio de arrastre del mapa");
        setIsDragging(true);
      });
      
      mapInstance.on('dragend', () => {
        console.log("Fin de arrastre del mapa");
        setIsDragging(false);
      });
      
      mapInstance.options.inertia = false;
      
      mapInstance.options.closePopupOnClick = false;
      
      mapInstance.options.zoomAnimation = false;
      mapInstance.options.fadeAnimation = false;
      mapInstance.options.markerZoomAnimation = false;
      
      if (L.Popup) {
        L.Popup.prototype.options.autoPan = false;
        L.Popup.prototype.options.autoClose = false;
      }
    } catch (error) {
      console.error("Error al configurar eventos del mapa:", error);
    }
  }, []);

  return (
    <div 
      className="w-full h-full relative" 
      style={{ height: '100%', minHeight: '600px' }}
      onClick={(e) => {
        e.stopPropagation();
        if (isDragging) {
          e.preventDefault();
        }
      }}
    >
      <Suspense fallback={<MapLoadingIndicator />}>
        <MapContainer
          key={mapKey}
          center={initialPosition}
          zoom={initialZoom}
          style={{ height: '100%', width: '100%', zIndex: 10 }}
          zoomControl={false}
          attributionControl={false}
          className="z-10 h-full w-full"
          whenReady={(map) => handleMapReady(map.target)}
          ref={mapRef}
          scrollWheelZoom={true}
          doubleClickZoom={false}
          dragging={true}
          inertia={false}
          closePopupOnClick={false}
          zoomAnimation={false}
          fadeAnimation={false}
          markerZoomAnimation={false}
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
          
          <MapEventHandler />
        </MapContainer>
      </Suspense>
    </div>
  );
};

export default MapView;
