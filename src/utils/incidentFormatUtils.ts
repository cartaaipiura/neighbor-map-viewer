
import { IncidentCategory, IncidentStatus } from '@/components/incidents/types';

export const getCategoryLabel = (category: IncidentCategory): string => {
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

export const getCategoryColor = (category: IncidentCategory): string => {
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

export const getStatusLabel = (status: IncidentStatus): string => {
  const statuses: Record<IncidentStatus, string> = {
    active: 'Activo',
    in_progress: 'En progreso',
    resolved: 'Resuelto'
  };
  
  return statuses[status] || 'Desconocido';
};

export const getStatusColor = (status: IncidentStatus): string => {
  const colors: Record<IncidentStatus, string> = {
    active: 'bg-red-100 text-red-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800'
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export const formatDetailDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
