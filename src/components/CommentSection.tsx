
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface Comment {
  id: number;
  incidentId: number;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  incidentId: number;
  comments: Comment[];
  className?: string;
}

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'hace un momento';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `hace ${diffInMonths} ${diffInMonths === 1 ? 'mes' : 'meses'}`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `hace ${diffInYears} ${diffInYears === 1 ? 'año' : 'años'}`;
};

const CommentSection: React.FC<CommentSectionProps> = ({
  incidentId,
  comments,
  className,
}) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !author.trim()) {
      toast.error('Por favor, completa todos los campos');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // API call would go here
      // const response = await axios.post('/api/comments', {
      //   incidentId,
      //   author,
      //   content: newComment
      // });
      
      // Mock API response
      const newCommentObj: Comment = {
        id: commentList.length + 1,
        incidentId,
        author,
        content: newComment,
        createdAt: new Date().toISOString()
      };
      
      setCommentList([newCommentObj, ...commentList]);
      setNewComment('');
      toast.success('Comentario añadido correctamente');
    } catch (error) {
      toast.error('Error al añadir el comentario');
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-xl font-semibold text-vecino-gray-900">
        Comentarios ({commentList.length})
      </h3>
      
      <div className="bg-white rounded-xl border border-vecino-gray-200 shadow-subtle p-4 animate-fade-in">
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="author" className="block text-sm font-medium text-vecino-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-2 border border-vecino-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vecino-blue/30 focus:border-vecino-blue/50 transition-all"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="comment" className="block text-sm font-medium text-vecino-gray-700">
              Comentario
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              rows={3}
              className="w-full px-4 py-2 border border-vecino-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vecino-blue/30 focus:border-vecino-blue/50 transition-all resize-none"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-vecino-blue text-white font-medium rounded-lg transition-all hover:bg-vecino-blue/90 focus:outline-none focus:ring-2 focus:ring-vecino-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || !newComment.trim() || !author.trim()}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar comentario'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="space-y-4">
        {commentList.length === 0 ? (
          <p className="text-center py-8 text-vecino-gray-500">
            No hay comentarios aún. ¡Sé el primero en comentar!
          </p>
        ) : (
          commentList.map((comment) => (
            <div 
              key={comment.id} 
              className="bg-white rounded-xl border border-vecino-gray-200 p-4 shadow-subtle animate-fade-in"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-vecino-blue/10 text-vecino-blue flex items-center justify-center font-semibold">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-vecino-gray-900 ml-2">
                    {comment.author}
                  </span>
                </div>
                <span className="text-xs text-vecino-gray-500">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
              <p className="text-vecino-gray-700 whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
