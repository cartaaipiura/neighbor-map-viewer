
import { useState, useEffect } from 'react';
import { Incident } from '../incidents/types';

export const useMapSetup = (incidents: Incident[]) => {
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(incidents);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showLegend, setShowLegend] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);

  // Inicializar el mapa solo del lado del cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar que Leaflet está disponible
      const checkLeaflet = () => {
        if (window.L) {
          console.log("Leaflet detectado, estableciendo mapa como listo");
          setIsMapReady(true);
          return true;
        }
        return false;
      };

      // Intentar detectar Leaflet inmediatamente
      if (!checkLeaflet()) {
        // Si no está disponible, configurar un intervalo para verificar
        console.log("Esperando a que Leaflet esté disponible...");
        const intervalId = setInterval(() => {
          if (checkLeaflet()) {
            clearInterval(intervalId);
          }
        }, 500);

        // Establecer un tiempo máximo de espera (5 segundos)
        const timeoutId = setTimeout(() => {
          clearInterval(intervalId);
          console.log("Tiempo de espera agotado, forzando la carga del mapa");
          setIsMapReady(true);
        }, 5000);

        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };
      }
    }
  }, []);
  
  // Aplicar filtros cuando cambien
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
    console.log("Incidentes filtrados:", filtered.length);
  }, [incidents, selectedCategories, selectedStatuses]);
  
  const handleFiltersChange = (categories: string[], statuses: string[]) => {
    setSelectedCategories(categories);
    setSelectedStatuses(statuses);
  };

  const toggleLegend = () => setShowLegend(!showLegend);

  return {
    filteredIncidents,
    selectedCategories,
    selectedStatuses,
    showLegend,
    isMapReady,
    handleFiltersChange,
    toggleLegend
  };
};
