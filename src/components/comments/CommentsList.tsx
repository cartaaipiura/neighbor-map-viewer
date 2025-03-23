
import React from 'react';
import { Comment } from './types';
import CommentItem from './CommentItem';

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <p className="text-center py-8 text-vecino-gray-500">
        No hay comentarios aún. ¡Sé el primero en comentar!
      </p>
    );
  }
  
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
