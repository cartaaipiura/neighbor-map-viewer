
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IncidentCardBaseProps } from './types';
import { 
  getCategoryColor, 
  getCategoryLabel, 
  getStatusColor, 
  getStatusLabel, 
  formatDate 
} from '@/utils/incidentFormatUtils';

const MapCard: React.FC<IncidentCardBaseProps> = ({ incident, className }) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-3 shadow-elevated border border-vecino-gray-100 max-w-[280px] animate-scale-in",
      className
    )}>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded",
            getCategoryColor(incident.category)
          )}>
            {getCategoryLabel(incident.category)}
          </span>
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded",
            getStatusColor(incident.status)
          )}>
            {getStatusLabel(incident.status)}
          </span>
        </div>
        
        <h3 className="text-vecino-gray-900 font-medium leading-tight">
          {incident.title}
        </h3>
        
        <p className="text-vecino-gray-600 text-sm line-clamp-2">
          {incident.description}
        </p>
        
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center text-vecino-gray-500 text-xs">
            <Clock size={12} className="mr-1" />
            {formatDate(incident.createdAt)}
          </div>
          
          <Link
            to={`/incident/${incident.id}`}
            className="text-vecino-blue text-sm font-medium hover:underline"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapCard;
