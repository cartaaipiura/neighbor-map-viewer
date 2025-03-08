
import React, { useEffect } from 'react';

// Ensure Leaflet styles are loaded
const LeafletLoader: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if Leaflet CSS is already loaded
      const linkId = 'leaflet-css';
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.rel = 'stylesheet';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
        
        console.log('Leaflet CSS loaded');
      }
    }
  }, []);

  return null;
};

export default LeafletLoader;
