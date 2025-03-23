
import React from 'react';
import { Comment } from './types';
import { formatRelativeTime } from '@/utils/dateUtils';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="bg-white rounded-xl border border-vecino-gray-200 p-4 shadow-subtle animate-fade-in">
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
  );
};

export default CommentItem;
