
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import IncidentDetail from '@/components/IncidentDetail';
import { Comment } from '@/components/CommentSection';
import { Incident } from '@/components/IncidentCard';

// Mock data for the incident - in a real app, you would fetch this from an API
const getMockIncident = (id: number): Incident => {
  return {
    id,
    title: 'Bache peligroso en calle principal',
    description: 'Hay un bache muy grande y peligroso en mitad de la calle que está causando daños a los vehículos y es un riesgo para motocicletas. El bache tiene aproximadamente 1 metro de diámetro y 30 centímetros de profundidad, lo que lo hace especialmente peligroso para vehículos pequeños y motocicletas. Varios vecinos han reportado daños en sus vehículos al pasar por esta zona. Se solicita la reparación urgente del pavimento para evitar accidentes.',
    category: 'road',
    status: 'active',
    latitude: 40.416775,
    longitude: -3.70379,
    address: 'Calle Gran Vía 28, Madrid',
    createdAt: '2023-08-15T10:30:00',
    updatedAt: '2023-08-15T10:30:00',
    upvotes: 23,
    downvotes: 2,
    commentsCount: 5,
    imageUrl: '/placeholder.svg'
  };
};

// Mock comments data
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
  const incident = getMockIncident(incidentId);
  const comments = getMockComments(incidentId);

  return (
    <div className="min-h-screen bg-vecino-gray-100/50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <IncidentDetail 
          incident={incident} 
          comments={comments} 
        />
      </main>
    </div>
  );
};

export default IncidentDetailPage;
