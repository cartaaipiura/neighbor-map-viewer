
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import CommentForm, { CommentFormValues } from './comments/CommentForm';
import CommentsList from './comments/CommentsList';
import { Comment, CommentSectionProps } from './comments/types';

const CommentSection: React.FC<CommentSectionProps> = ({
  incidentId,
  comments,
  className,
}) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitComment = async (values: CommentFormValues) => {
    setIsSubmitting(true);
    
    try {
      const newCommentObj: Comment = {
        id: commentList.length + 1,
        incidentId,
        author: values.author,
        phone: values.phone,
        dni: values.dni || undefined,
        content: values.content,
        createdAt: new Date().toISOString()
      };
      
      setCommentList([newCommentObj, ...commentList]);
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
        <CommentForm 
          onSubmit={handleSubmitComment}
          isSubmitting={isSubmitting}
        />
      </div>
      
      <div className="space-y-4">
        <CommentsList comments={commentList} />
      </div>
    </div>
  );
};

export default CommentSection;
