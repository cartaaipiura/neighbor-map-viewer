
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import MapControls from './MapControls';
import MapLegend from './MapLegend';
import MapMarkers from './MapMarkers';
import { Incident } from '../incidents/types';
import MapLoadingIndicator from './MapLoadingIndicator';

// Componente para prevenir recargas innecesarias al hacer clic
const MapEventHandler = () => {
  const map = useMapEvents({
    click: (e) => {
      // Evitamos la propagación del evento para que no cause recargas
      e.originalEvent.stopPropagation();
      e.originalEvent.preventDefault();
      console.log("Click en el mapa en:", e.latlng);
    },
    // Evitar que otros eventos causen recentrado o recarga
    dblclick: (e) => {
      e.originalEvent.stopPropagation();
      e.originalEvent.preventDefault();
    },
    mousedown: (e) => {
      // También detenemos la propagación del mousedown para evitar comportamientos inesperados
      e.originalEvent.stopPropagation();
    },
    // Deshabilitar el autopan de popups
    popupopen: (e) => {
      console.log("Popup abierto, previniendo autopan");
      // Desactivar explícitamente el autopan
      if (e.popup && typeof e.popup.options !== 'undefined') {
        e.popup.options.autoPan = false;
      }
      
      // Mantener la vista del mapa estable
      if (map) {
        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();
        
        // Usar setTimeout para asegurar que esto ocurre después del evento de apertura del popup
        setTimeout(() => {
          map.setView(currentCenter, currentZoom, {
            animate: false
          });
        }, 0);
      }
    },
    // También prevenir el cierre automático de popups
    popupclose: (e) => {
      // PopupEvent doesn't have originalEvent property, so we don't use it here
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
    
    // Solo forzamos el re-renderizado del mapa si es necesario y solo una vez
    if (!mapInstance) {
      const timer = setTimeout(() => {
        setMapKey(`map-${Date.now()}`);
        console.log("Mapa re-renderizado con clave:", `map-${Date.now()}`);
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // Aplicar configuraciones globales de Leaflet
    if (L.Popup) {
      L.Popup.prototype.options.autoPan = false;
      L.Popup.prototype.options.autoClose = false;
    }
  }, []);

  // Función para cuando el mapa está listo
  const handleMapReady = (map: L.Map) => {
    console.log("Mapa creado exitosamente");
    // Desactivar comportamientos de mapa que causan recentrado
    map.options.closePopupOnClick = false;
    map.options.inertia = false;
    map.options.zoomAnimation = false;
    map.options.fadeAnimation = false;
    map.options.markerZoomAnimation = false;
  };

  // Función para configurar la instancia del mapa
  const setMapRef = (map: L.Map | null) => {
    // Verificar que el mapa existe antes de intentar configurarlo
    if (!map) {
      console.log("Referencia de mapa es null");
      return;
    }
    
    console.log("Mapa referenciado correctamente");
    mapRef.current = map;
    setMapInstance(map);
    
    try {
      // Desactivar comportamientos que puedan causar recargas
      map.on('dragstart', () => {
        console.log("Inicio de arrastre del mapa");
        setIsDragging(true);
      });
      
      map.on('dragend', () => {
        console.log("Fin de arrastre del mapa");
        setIsDragging(false);
      });
      
      // Prevenir que el mapa se recenter automáticamente
      map.options.inertia = false;
      
      // Deshabilitar el autopan de los popups en todo el mapa
      map.options.closePopupOnClick = false;
      
      // Configuración adicional para prevenir recentrado
      // Desactivar animaciones y transiciones que pueden causar recentrado
      map.options.zoomAnimation = false;
      map.options.fadeAnimation = false;
      map.options.markerZoomAnimation = false;
      
      // Configurar opciones globales de popup para todo el mapa
      if (L.Popup) {
        L.Popup.prototype.options.autoPan = false;
        L.Popup.prototype.options.autoClose = false;
      }
    } catch (error) {
      console.error("Error al configurar eventos del mapa:", error);
    }
  };

  return (
    <div 
      className="w-full h-full relative" 
      style={{ height: '100%', minHeight: '600px' }}
      onClick={(e) => {
        // Evitar que clics en el contenedor afecten al mapa
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
          ref={setMapRef}
          // Configurar opciones de mapa para prevenir recargas
          scrollWheelZoom={true}
          doubleClickZoom={false}
          dragging={true}
          inertia={false}
          // Deshabilitar autocentrado de popups
          closePopupOnClick={false}
          // Desactivar animaciones que pueden causar recentrado
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
          
          {/* Componente para manejar eventos del mapa */}
          <MapEventHandler />
        </MapContainer>
      </Suspense>
    </div>
  );
};

export default MapView;
