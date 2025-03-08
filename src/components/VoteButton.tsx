
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface VoteButtonProps {
  incidentId: number;
  currentUpvotes: number;
  currentDownvotes: number;
  className?: string;
}

const VoteButton: React.FC<VoteButtonProps> = ({
  incidentId,
  currentUpvotes,
  currentDownvotes,
  className,
}) => {
  const [upvotes, setUpvotes] = useState(currentUpvotes);
  const [downvotes, setDownvotes] = useState(currentDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleVote = async (voteType: 'up' | 'down') => {
    if (isSubmitting) return;
    
    // If user already voted the same way, cancel their vote
    if (userVote === voteType) {
      setIsSubmitting(true);
      
      try {
        // API call would go here
        // await axios.delete(`/api/votes/${incidentId}`);
        
        if (voteType === 'up') {
          setUpvotes(upvotes - 1);
        } else {
          setDownvotes(downvotes - 1);
        }
        
        setUserVote(null);
        toast.success('Voto cancelado');
      } catch (error) {
        toast.error('Error al cancelar el voto');
        console.error('Error canceling vote:', error);
      } finally {
        setIsSubmitting(false);
      }
      
      return;
    }
    
    // If user is changing their vote
    if (userVote !== null && userVote !== voteType) {
      setIsSubmitting(true);
      
      try {
        // API call would go here
        // await axios.put(`/api/votes/${incidentId}`, { type: voteType });
        
        if (voteType === 'up') {
          setUpvotes(upvotes + 1);
          setDownvotes(downvotes - 1);
        } else {
          setUpvotes(upvotes - 1);
          setDownvotes(downvotes + 1);
        }
        
        setUserVote(voteType);
        toast.success(voteType === 'up' ? 'Confirmaste que la incidencia sigue activa' : 'Confirmaste que la incidencia ya no está activa');
      } catch (error) {
        toast.error('Error al cambiar el voto');
        console.error('Error changing vote:', error);
      } finally {
        setIsSubmitting(false);
      }
      
      return;
    }
    
    // New vote
    setIsSubmitting(true);
    
    try {
      // API call would go here
      // await axios.post(`/api/votes`, { incidentId, type: voteType });
      
      if (voteType === 'up') {
        setUpvotes(upvotes + 1);
      } else {
        setDownvotes(downvotes + 1);
      }
      
      setUserVote(voteType);
      toast.success(voteType === 'up' ? 'Confirmaste que la incidencia sigue activa' : 'Confirmaste que la incidencia ya no está activa');
    } catch (error) {
      toast.error('Error al votar');
      console.error('Error voting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-3", className)}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleVote('up')}
          disabled={isSubmitting}
          className={cn(
            "flex items-center gap-2 py-2 px-4 rounded-lg border font-medium transition-all duration-200",
            userVote === 'up'
              ? "bg-vecino-green/10 border-vecino-green text-vecino-green"
              : "bg-white border-vecino-gray-200 text-vecino-gray-800 hover:border-vecino-gray-300"
          )}
        >
          {userVote === 'up' ? (
            <Check size={18} />
          ) : (
            <ArrowUp size={18} />
          )}
          <span>{upvotes}</span>
          <span className="hidden sm:inline ml-1">Sigue activa</span>
        </button>
        
        <button
          onClick={() => handleVote('down')}
          disabled={isSubmitting}
          className={cn(
            "flex items-center gap-2 py-2 px-4 rounded-lg border font-medium transition-all duration-200",
            userVote === 'down'
              ? "bg-vecino-red/10 border-vecino-red text-vecino-red"
              : "bg-white border-vecino-gray-200 text-vecino-gray-800 hover:border-vecino-gray-300"
          )}
        >
          {userVote === 'down' ? (
            <X size={18} />
          ) : (
            <ArrowDown size={18} />
          )}
          <span>{downvotes}</span>
          <span className="hidden sm:inline ml-1">Ya no existe</span>
        </button>
      </div>
      
      {userVote && (
        <p className="text-sm text-vecino-gray-600">
          {userVote === 'up' 
            ? 'Has confirmado que esta incidencia sigue activa' 
            : 'Has confirmado que esta incidencia ya no existe'}
        </p>
      )}
    </div>
  );
};

export default VoteButton;
