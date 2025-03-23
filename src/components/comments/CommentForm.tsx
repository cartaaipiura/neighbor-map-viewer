
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Phone, IdCard, Shield } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

const commentFormSchema = z.object({
  author: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  phone: z.string().min(9, { message: 'El número de teléfono debe tener al menos 9 dígitos' }),
  dni: z.string().optional(),
  content: z.string().min(5, { message: 'El comentario debe tener al menos 5 caracteres' })
});

export type CommentFormValues = z.infer<typeof commentFormSchema>;

interface CommentFormProps {
  onSubmit: (values: CommentFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isSubmitting }) => {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      author: '',
      phone: '',
      dni: '',
      content: ''
    }
  });
  
  const handleSubmit = async (values: CommentFormValues) => {
    await onSubmit(values);
    form.reset();
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <Alert className="bg-vecino-blue/5 border-vecino-blue/20 mb-4">
          <AlertDescription className="flex items-center gap-2 text-vecino-gray-700">
            <Shield size={18} className="text-vecino-blue" />
            Tu número de teléfono y DNI no serán mostrados públicamente. Solo se usarán para verificación.
          </AlertDescription>
        </Alert>
        
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
  );
};

export default CommentForm;
