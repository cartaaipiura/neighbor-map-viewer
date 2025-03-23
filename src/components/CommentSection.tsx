import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { User, Phone, IdCard } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export interface Comment {
  id: number;
  incidentId: number;
  author: string;
  phone?: string;
  dni?: string;
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

const commentFormSchema = z.object({
  author: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  phone: z.string().min(9, { message: 'El número de teléfono debe tener al menos 9 dígitos' }),
  dni: z.string().optional(),
  content: z.string().min(5, { message: 'El comentario debe tener al menos 5 caracteres' })
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

const CommentSection: React.FC<CommentSectionProps> = ({
  incidentId,
  comments,
  className,
}) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      author: '',
      phone: '',
      dni: '',
      content: ''
    }
  });
  
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
      form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitComment)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author"
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
            </div>
            
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
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentario*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Escribe tu comentario..." 
                      rows={3}
                      className="resize-none"
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-vecino-blue text-white font-medium rounded-lg transition-all hover:bg-vecino-blue/90 focus:outline-none focus:ring-2 focus:ring-vecino-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar comentario'}
              </button>
            </div>
          </form>
        </Form>
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
