
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IncidentCardBaseProps } from './types';
import { getCategoryColor, getCategoryLabel, formatDate } from '@/utils/incidentFormatUtils';

const CompactCard: React.FC<IncidentCardBaseProps> = ({ incident, className }) => {
  return (
    <Link
      to={`/incident/${incident.id}`}
      className={cn(
        "block group bg-white rounded-xl p-4 shadow-subtle border border-vecino-gray-200 hover:shadow-elevated transition-all duration-300 animate-scale-in",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
          incident.status === 'active' ? 'bg-red-100 text-red-600' :
          incident.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
          'bg-green-100 text-green-600'
        )}>
          <MapPin size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded",
              getCategoryColor(incident.category)
            )}>
              {getCategoryLabel(incident.category)}
            </span>
            <span className="text-vecino-gray-500 text-xs">
              {formatDate(incident.createdAt)}
            </span>
          </div>
          
          <h3 className="text-vecino-gray-900 font-medium leading-tight mb-1 truncate group-hover:text-vecino-blue transition-colors">
            {incident.title}
          </h3>
          
          <p className="text-vecino-gray-600 text-sm line-clamp-1">
            {incident.address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CompactCard;
