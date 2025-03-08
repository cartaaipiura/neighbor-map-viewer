
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IncidentCardBaseProps } from './types';
import { 
  getCategoryColor, 
  getCategoryLabel, 
  getStatusColor, 
  getStatusLabel, 
  formatDate 
} from '@/utils/incidentFormatUtils';

const DefaultCard: React.FC<IncidentCardBaseProps> = ({ incident, className }) => {
  return (
    <Link
      to={`/incident/${incident.id}`}
      className={cn(
        "block group bg-white rounded-xl overflow-hidden shadow-subtle border border-vecino-gray-200 hover:shadow-elevated transition-all duration-300 animate-fade-in",
        className
      )}
    >
      {incident.imageUrl && (
        <div className="h-40 bg-vecino-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-vecino-gray-100 animate-pulse"></div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full",
            getCategoryColor(incident.category)
          )}>
            {getCategoryLabel(incident.category)}
          </span>
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full",
            getStatusColor(incident.status)
          )}>
            {getStatusLabel(incident.status)}
          </span>
        </div>
        
        <h3 className="text-lg text-vecino-gray-900 font-semibold leading-tight mb-2 group-hover:text-vecino-blue transition-colors">
          {incident.title}
        </h3>
        
        <p className="text-vecino-gray-600 text-sm mb-4 line-clamp-2">
          {incident.description}
        </p>
        
        <div className="flex items-center text-vecino-gray-600 text-sm mb-3">
          <MapPin size={14} className="mr-1.5" />
          <span className="truncate">{incident.address}</span>
        </div>
        
        <div className="flex items-center justify-between pt-1 border-t border-vecino-gray-100">
          <div className="flex items-center text-vecino-gray-500 text-sm">
            <Clock size={14} className="mr-1.5" />
            {formatDate(incident.createdAt)}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center text-sm">
              <ArrowUp size={14} className="mr-1 text-vecino-green" />
              <span className="font-medium">{incident.upvotes}</span>
            </div>
            <div className="flex items-center text-sm">
              <ArrowDown size={14} className="mr-1 text-vecino-red" />
              <span className="font-medium">{incident.downvotes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DefaultCard;
