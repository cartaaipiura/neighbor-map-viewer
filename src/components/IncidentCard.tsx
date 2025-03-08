
import React from 'react';
import DefaultCard from './incidents/DefaultCard';
import CompactCard from './incidents/CompactCard';
import MapCard from './incidents/MapCard';
import { Incident } from './incidents/types';

// Re-export the Incident type for backward compatibility
export type { 
  Incident, 
  IncidentCategory, 
  IncidentStatus 
} from './incidents/types';

interface IncidentCardProps {
  incident: Incident;
  variant?: 'default' | 'compact' | 'map';
  className?: string;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ 
  incident, 
  variant = 'default',
  className
}) => {
  if (variant === 'compact') {
    return <CompactCard incident={incident} className={className} />;
  }
  
  if (variant === 'map') {
    return <MapCard incident={incident} className={className} />;
  }
  
  // Default variant
  return <DefaultCard incident={incident} className={className} />;
};

export default IncidentCard;
