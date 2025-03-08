
import React from 'react';

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

export default MapInteractionControls;
