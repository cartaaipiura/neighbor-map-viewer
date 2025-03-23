
export interface Comment {
  id: number;
  incidentId: number;
  author: string;
  phone?: string;
  dni?: string;
  content: string;
  createdAt: string;
}

export interface CommentSectionProps {
  incidentId: number;
  comments: Comment[];
  className?: string;
}
