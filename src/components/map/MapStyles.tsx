
import React from 'react';

const MapStyles: React.FC = () => {
  // Estilos para los marcadores y elementos del mapa
  const mapStyles = `
    .custom-marker-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      box-shadow: 0 0 0 4px white, 0 2px 4px rgba(0, 0, 0, 0.2);
      transform: translateY(-12px);
      cursor: pointer;
      z-index: 1000;
      transition: transform 0.2s ease;
    }
    
    .custom-marker-icon:hover {
      transform: translateY(-12px) scale(1.2);
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
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .leaflet-popup-content-wrapper:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
    }
    
    .leaflet-popup-content {
      margin: 0;
      width: 280px !important;
    }
    
    .leaflet-popup-close-button {
      z-index: 10;
      font-size: 20px;
      margin: 5px;
      color: #666;
      background: white;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      width: 22px !important;
      height: 22px !important;
      display: flex !important;
      align-items: center;
      justify-content: center;
    }
    
    .leaflet-popup-close-button:hover {
      color: #333;
      background: #f0f0f0;
    }
    
    .leaflet-popup-tip {
      background-color: white;
    }
    
    .leaflet-container {
      z-index: 0;
      height: 100%;
      width: 100%;
    }
    
    /* Make popups more visible */
    .leaflet-popup {
      margin-bottom: 10px !important;
      z-index: 1000 !important;
    }
    
    /* Ensure popups are above markers */
    .leaflet-popup-pane {
      z-index: 700 !important;
    }
    
    .leaflet-marker-pane {
      z-index: 600 !important;
    }
    
    /* Styles to ensure popups don't move when map pans */
    .no-autopan {
      transition: none !important;
      transform: none !important;
    }
    
    /* Bloquear animaciones de movimiento */
    .leaflet-fade-anim .leaflet-popup {
      transition: opacity 0.2s linear !important;
      opacity: 1 !important;
    }
    
    /* Prevenir que el mapa se mueva al hacer clic en el popup */
    .leaflet-popup-content * {
      pointer-events: auto;
    }
    
    /* Deshabilitar todas las animaciones del mapa */
    .leaflet-fade-anim,
    .leaflet-zoom-anim,
    .leaflet-zoom-animated {
      transition: none !important;
      -webkit-transition: none !important;
      -moz-transition: none !important;
    }
  `;

  return (
    <style dangerouslySetInnerHTML={{ __html: mapStyles }} />
  );
};

export default MapStyles;
