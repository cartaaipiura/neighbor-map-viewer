
import axios from 'axios';
import { Incident } from '@/components/incidents/types';

const API_URL = 'https://ff0a-179-7-82-193.ngrok-free.app';

export const fetchIncidents = async (): Promise<Incident[]> => {
  try {
    const response = await axios.get(`${API_URL}/reports`);
    return mapResponseToIncidents(response.data);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    throw error;
  }
};

export const fetchIncidentById = async (id: number): Promise<Incident | null> => {
  try {
    // First try to get it from the specific endpoint if it exists
    const response = await axios.get(`${API_URL}/reports/${id}`);
    if (response.data) {
      return mapResponseToIncident(response.data);
    }
    
    // If that fails, get all incidents and find the one we need
    const incidents = await fetchIncidents();
    return incidents.find(incident => incident.id === id) || null;
  } catch (error) {
    console.error(`Error fetching incident with id ${id}:`, error);
    
    // Fallback: Get all incidents and find the one we need
    try {
      const incidents = await fetchIncidents();
      return incidents.find(incident => incident.id === id) || null;
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError);
      return null;
    }
  }
};

// Map the API response to our Incident type
const mapResponseToIncidents = (data: any[]): Incident[] => {
  return data.map(mapResponseToIncident);
};

const mapResponseToIncident = (item: any): Incident => {
  return {
    id: item.id || 0,
    title: item.title || 'Sin título',
    description: item.description || '',
    category: mapCategory(item.category),
    status: mapStatus(item.status),
    latitude: item.latitude || 0,
    longitude: item.longitude || 0,
    address: item.address || 'Dirección desconocida',
    createdAt: item.created_at || new Date().toISOString(),
    updatedAt: item.updated_at || new Date().toISOString(),
    upvotes: item.upvotes || 0,
    downvotes: item.downvotes || 0,
    commentsCount: item.comments_count || 0,
    imageUrl: item.image_url || undefined
  };
};

// Map API categories to our application categories
const mapCategory = (apiCategory: string): string => {
  const categoryMap: Record<string, string> = {
    // Add mappings based on API response
    'road': 'road',
    'lighting': 'lighting',
    'trash': 'trash',
    'graffiti': 'graffiti',
    'vegetation': 'vegetation',
    'water': 'water',
    'noise': 'noise'
  };
  
  return categoryMap[apiCategory?.toLowerCase()] || 'other';
};

// Map API status to our application status
const mapStatus = (apiStatus: string): string => {
  const statusMap: Record<string, string> = {
    // Add mappings based on API response
    'active': 'active',
    'in_progress': 'in_progress',
    'resolved': 'resolved'
  };
  
  return statusMap[apiStatus?.toLowerCase()] || 'active';
};
