
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
    
    .leaflet-container {
      z-index: 0;
      height: 100%;
      width: 100%;
    }
  `;

  return (
    <style dangerouslySetInnerHTML={{ __html: mapStyles }} />
  );
};

export default MapStyles;
