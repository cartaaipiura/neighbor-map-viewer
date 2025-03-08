
import L from 'leaflet';

// Define custom marker icons for different incident statuses
export const createCustomIcon = (status: string) => {
  return L.divIcon({
    html: `
      <div class="custom-marker-icon ${status === 'active' ? 'active' : 
                                       status === 'in_progress' ? 'in-progress' : 
                                       'resolved'}">
        <div class="marker-inner"></div>
      </div>
    `,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -20]
  });
};
