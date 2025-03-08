
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

export interface IncidentCardBaseProps {
  incident: Incident;
  className?: string;
}
