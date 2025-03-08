
import { useState, useEffect } from 'react';
import { Incident } from '../incidents/types';

export const useMapSetup = (incidents: Incident[]) => {
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(incidents);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showLegend, setShowLegend] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize the map only on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Give time for Leaflet styles to load correctly
      const timer = setTimeout(() => {
        console.log("Setting map ready state to true");
        setIsMapReady(true);
      }, 1000); // Increased timeout to ensure resources are loaded
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Apply filters when they change
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
    console.log("Filtered incidents:", filtered.length);
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
