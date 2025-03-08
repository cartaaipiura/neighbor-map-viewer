
import React from 'react';
import { Incident } from './IncidentCard';
import VoteButton from './VoteButton';
import CommentSection, { Comment } from './CommentSection';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface IncidentDetailProps {
  incident: Incident;
  comments: Comment[];
  className?: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getCategoryLabel = (category: string): string => {
  const categories: Record<string, string> = {
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

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
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

const getStatusLabel = (status: string): string => {
  const statuses: Record<string, string> = {
    active: 'Activo',
    in_progress: 'En progreso',
    resolved: 'Resuelto'
  };
  
  return statuses[status] || 'Desconocido';
};

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'bg-red-100 text-red-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800'
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const IncidentDetail: React.FC<IncidentDetailProps> = ({
  incident,
  comments,
  className,
}) => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className={cn("animate-fade-in", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={goBack}
          className="flex items-center text-vecino-gray-600 hover:text-vecino-blue transition-colors mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Volver</span>
        </button>
        
        {/* Main content */}
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-subtle border border-vecino-gray-200 p-6 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex flex-wrap gap-2 justify-between items-start">
              <div className="space-y-1">
                <div className="flex flex-wrap gap-2">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getCategoryColor(incident.category)
                  )}>
                    {getCategoryLabel(incident.category)}
                  </span>
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getStatusColor(incident.status)
                  )}>
                    {getStatusLabel(incident.status)}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-vecino-gray-900 leading-tight">
                  {incident.title}
                </h1>
              </div>
              
              <div className="flex items-center text-vecino-gray-500 text-sm">
                <Calendar size={14} className="mr-1.5" />
                <span>{formatDate(incident.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center text-vecino-gray-700">
              <MapPin size={16} className="mr-1.5 flex-shrink-0" />
              <span>{incident.address}</span>
            </div>
            
            <p className="text-vecino-gray-700 whitespace-pre-line">
              {incident.description}
            </p>
            
            {incident.imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden bg-vecino-gray-200 h-64 relative">
                <div className="absolute inset-0 bg-vecino-gray-100 animate-pulse"></div>
              </div>
            )}
          </div>
          
          {/* Voting section */}
          {incident.status === 'active' && (
            <div className="bg-white rounded-xl shadow-subtle border border-vecino-gray-200 p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-semibold text-vecino-gray-900 mb-4">
                ¿Sigue activa esta incidencia?
              </h3>
              <p className="text-vecino-gray-700 mb-4">
                Ayuda a mantener actualizada esta incidencia confirmando si sigue activa o si ya ha sido resuelta.
              </p>
              <VoteButton
                incidentId={incident.id}
                currentUpvotes={incident.upvotes}
                currentDownvotes={incident.downvotes}
              />
            </div>
          )}
          
          {/* Comments section */}
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CommentSection
              incidentId={incident.id}
              comments={comments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
