
import React from 'react';
import { cn } from '@/lib/utils';

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

export default MapLegend;
