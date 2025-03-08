
import React, { useEffect } from 'react';

// Componente para cargar los estilos de Leaflet
const LeafletLoader: React.FC = () => {
  useEffect(() => {
    // Verificar que estamos en el navegador
    if (typeof window !== 'undefined') {
      // Cargar CSS de Leaflet si no está ya cargado
      const leafletLinkId = 'leaflet-css';
      if (!document.getElementById(leafletLinkId)) {
        const link = document.createElement('link');
        link.id = leafletLinkId;
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.rel = 'stylesheet';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
        console.log('Leaflet CSS cargado');
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
        document.body.appendChild(script);
        console.log('Leaflet JS cargado');
      }
    }
  }, []);

  return null;
};

export default LeafletLoader;
