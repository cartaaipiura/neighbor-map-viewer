
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import IncidentDetail from '@/components/IncidentDetail';
import { Comment } from '@/components/comments/types';
import { Incident } from '@/components/incidents/types';
import { fetchIncidentById } from '@/services/incidentService';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

// Mock comments data - in real app this would come from API
const getMockComments = (incidentId: number): Comment[] => {
  return [
    {
      id: 1,
      incidentId,
      author: 'Elena García',
      content: 'He pasado por allí hoy y sigue igual. Necesita arreglarse urgentemente.',
      createdAt: '2023-08-16T09:45:00'
    },
    {
      id: 2,
      incidentId,
      author: 'Miguel Fernández',
      content: 'Mi coche sufrió daños al pasar por ahí la semana pasada. ¿A quién podemos reclamar?',
      createdAt: '2023-08-17T14:22:00'
    },
    {
      id: 3,
      incidentId,
      author: 'Sara López',
      content: 'He visto que han venido a inspeccionar, pero no han hecho nada todavía.',
      createdAt: '2023-08-18T11:30:00'
    }
  ];
};

const IncidentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const incidentId = id ? parseInt(id) : 0;
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const comments = getMockComments(incidentId);
  const { toast } = useToast();

  useEffect(() => {
    const loadIncident = async () => {
      try {
        setLoading(true);
        const data = await fetchIncidentById(incidentId);
        if (data) {
          setIncident(data);
          setError(null);
        } else {
          setError('No se pudo encontrar la incidencia');
          toast({
            title: "Error",
            description: "No se pudo cargar la incidencia",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error('Error loading incident:', err);
        setError('Error al cargar la incidencia');
        toast({
          title: "Error",
          description: "Error al cargar la incidencia",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadIncident();
  }, [incidentId, toast]);

  return (
    <div className="min-h-screen bg-vecino-gray-100/50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-vecino-gray-800 mb-4">
              {error}
            </h2>
            <p className="text-vecino-gray-600">
              Por favor, intenta nuevamente más tarde.
            </p>
          </div>
        ) : incident ? (
          <IncidentDetail 
            incident={incident} 
            comments={comments} 
          />
        ) : null}
      </main>
    </div>
  );
};

export default IncidentDetailPage;
