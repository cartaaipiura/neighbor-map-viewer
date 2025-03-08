
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import IncidentDetail from '@/components/IncidentDetail';
import CommentSection from '@/components/CommentSection';
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

const IncidentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const incidentId = id ? parseInt(id) : 0;
  const incident = getMockIncident(incidentId);

  return (
    <div className="min-h-screen bg-vecino-gray-100/50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <IncidentDetail incident={incident} />
        
        <div className="mt-8">
          <CommentSection incidentId={incidentId} />
        </div>
      </main>
    </div>
  );
};

export default IncidentDetailPage;
