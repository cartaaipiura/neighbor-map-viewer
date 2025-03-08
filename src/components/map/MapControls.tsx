
import React from 'react';
import { useMap } from 'react-leaflet';
import MapInteractionControls from './MapInteractionControls';

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

export default MapControls;
