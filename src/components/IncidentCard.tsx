
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type IncidentCategory = 
  | 'road' 
  | 'lighting' 
  | 'trash' 
  | 'graffiti' 
  | 'vegetation' 
  | 'water' 
  | 'noise'
  | 'other';

export type IncidentStatus = 'active' | 'in_progress' | 'resolved';

export interface Incident {
  id: number;
  title: string;
  description: string;
  category: IncidentCategory;
  status: IncidentStatus;
  latitude: number;
  longitude: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  downvotes: number;
  imageUrl?: string;
  commentsCount: number;
}

interface IncidentCardProps {
  incident: Incident;
  variant?: 'default' | 'compact' | 'map';
  className?: string;
}

const getCategoryLabel = (category: IncidentCategory): string => {
  const categories: Record<IncidentCategory, string> = {
    road: 'Problema vial',
    lighting: 'Falta de iluminación',
    trash: 'Basura',
    graffiti: 'Grafiti',
    vegetation: 'Vegetación',
    water: 'Agua',
    noise: 'Ruido',
    other: 'Otro'
  };
  
  return categories[category] || 'Otro';
};

const getCategoryColor = (category: IncidentCategory): string => {
  const colors: Record<IncidentCategory, string> = {
    road: 'bg-orange-100 text-orange-800',
    lighting: 'bg-yellow-100 text-yellow-800',
    trash: 'bg-red-100 text-red-800',
    graffiti: 'bg-purple-100 text-purple-800',
    vegetation: 'bg-green-100 text-green-800',
    water: 'bg-blue-100 text-blue-800',
    noise: 'bg-indigo-100 text-indigo-800',
    other: 'bg-gray-100 text-gray-800'
  };
  
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status: IncidentStatus): string => {
  const statuses: Record<IncidentStatus, string> = {
    active: 'Activo',
    in_progress: 'En progreso',
    resolved: 'Resuelto'
  };
  
  return statuses[status] || 'Desconocido';
};

const getStatusColor = (status: IncidentStatus): string => {
  const colors: Record<IncidentStatus, string> = {
    active: 'bg-red-100 text-red-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800'
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const IncidentCard: React.FC<IncidentCardProps> = ({ 
  incident, 
  variant = 'default',
  className
}) => {
  if (variant === 'compact') {
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
  }
  
  if (variant === 'map') {
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
  }
  
  // Default variant
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

export default IncidentCard;
