
import React, { useEffect, useState } from 'react';

// Componente para cargar los estilos de Leaflet
const LeafletLoader: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Verificar que estamos en el navegador
    if (typeof window !== 'undefined' && !isLoaded) {
      // Cargar CSS de Leaflet si no está ya cargado
      const leafletLinkId = 'leaflet-css';
      if (!document.getElementById(leafletLinkId)) {
        const link = document.createElement('link');
        link.id = leafletLinkId;
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.rel = 'stylesheet';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        
        // Añadir un listener para saber cuándo se carga el CSS
        link.onload = () => {
          console.log('Leaflet CSS cargado correctamente');
        };
        
        document.head.appendChild(link);
      }
      
      // Verificar si el script de Leaflet está cargado
      const leafletScriptId = 'leaflet-js';
      if (!document.getElementById(leafletScriptId) && !window.L) {
        const script = document.createElement('script');
        script.id = leafletScriptId;
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.async = true;
        
        // Añadir un listener para saber cuándo se carga el script
        script.onload = () => {
          console.log('Leaflet JS cargado correctamente');
          setIsLoaded(true);
        };
        
        document.body.appendChild(script);
      } else if (window.L) {
        // Si Leaflet ya está disponible, marcar como cargado
        console.log('Leaflet ya está disponible');
        setIsLoaded(true);
      }
    }
  }, [isLoaded]);

  return null;
};

export default LeafletLoader;
