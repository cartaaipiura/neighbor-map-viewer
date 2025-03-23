import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Check, X, User, Phone, IdCard, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VoteButtonProps {
  incidentId: number;
  currentUpvotes: number;
  currentDownvotes: number;
  className?: string;
}

const voteFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  phone: z.string().min(9, { message: 'El número de teléfono debe tener al menos 9 dígitos' }),
  dni: z.string().optional(),
});

type VoteFormValues = z.infer<typeof voteFormSchema>;

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
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [pendingVoteType, setPendingVoteType] = useState<'up' | 'down' | null>(null);
  const [userName, setUserName] = useState<string>('');
  
  const form = useForm<VoteFormValues>({
    resolver: zodResolver(voteFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      dni: '',
    }
  });
  
  const openVoteDialog = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      handleCancelVote(voteType);
      return;
    }
    
    setPendingVoteType(voteType);
    setVoteDialogOpen(true);
  };
  
  const handleCancelVote = async (voteType: 'up' | 'down') => {
    setIsSubmitting(true);
    
    try {
      if (voteType === 'up') {
        setUpvotes(upvotes - 1);
      } else {
        setDownvotes(downvotes - 1);
      }
      
      setUserVote(null);
      setUserName('');
      toast.success('Voto cancelado');
    } catch (error) {
      toast.error('Error al cancelar el voto');
      console.error('Error canceling vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleVoteSubmit = async (values: VoteFormValues) => {
    if (!pendingVoteType) return;
    
    setIsSubmitting(true);
    
    try {
      if (userVote !== null && userVote !== pendingVoteType) {
        if (pendingVoteType === 'up') {
          setUpvotes(upvotes + 1);
          setDownvotes(downvotes - 1);
        } else {
          setUpvotes(upvotes - 1);
          setDownvotes(downvotes + 1);
        }
      } else {
        if (pendingVoteType === 'up') {
          setUpvotes(upvotes + 1);
        } else {
          setDownvotes(downvotes + 1);
        }
      }
      
      setUserVote(pendingVoteType);
      setUserName(values.name);
      toast.success(pendingVoteType === 'up' ? 'Confirmaste que la incidencia sigue activa' : 'Confirmaste que la incidencia ya no está activa');
      setVoteDialogOpen(false);
      form.reset();
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
          onClick={() => openVoteDialog('up')}
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
          onClick={() => openVoteDialog('down')}
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
          <span className="font-medium">{userName}</span> {userVote === 'up' 
            ? ' ha confirmado que esta incidencia sigue activa' 
            : ' ha confirmado que esta incidencia ya no existe'}
        </p>
      )}
      
      <Dialog open={voteDialogOpen} onOpenChange={setVoteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {pendingVoteType === 'up' 
                ? 'Confirmar que la incidencia sigue activa' 
                : 'Confirmar que la incidencia ya no existe'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVoteSubmit)} className="space-y-4 py-4">
              <Alert className="bg-vecino-blue/5 border-vecino-blue/20 mb-2">
                <AlertDescription className="flex items-center gap-2 text-vecino-gray-700">
                  <Shield size={18} className="text-vecino-blue" />
                  Tu número de teléfono y DNI no serán mostrados públicamente. Solo se usarán para verificación.
                </AlertDescription>
              </Alert>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <User size={16} />
                      Nombre o alias*
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tu nombre o alias" 
                        {...field} 
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Phone size={16} />
                      Teléfono*
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tu número de teléfono" 
                        type="tel"
                        {...field} 
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <IdCard size={16} />
                      DNI (opcional)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tu DNI (opcional)" 
                        {...field} 
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      No es obligatorio, pero ayuda a validar tu identidad
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setVoteDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Confirmar'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VoteButton;

