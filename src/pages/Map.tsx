import React, { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { Incident } from '@/components/IncidentCard';

// Cargar IncidentMap perezosamente
const IncidentMap = React.lazy(() => import('@/components/IncidentMap'));

// Datos de muestra para incidentes (igual que en Index.tsx)
const mockIncidents: Incident[] = [
  {
    id: 1,
    title: 'Bache peligroso en calle principal',
    description: 'Hay un bache muy grande y peligroso en mitad de la calle que está causando daños a los vehículos y es un riesgo para motocicletas.',
    category: 'road',
    status: 'active',
    latitude: 40.416775,
    longitude: -3.70379,
    address: 'Calle Gran Vía 28, Madrid',
    createdAt: '2023-08-15T10:30:00',
    updatedAt: '2023-08-15T10:30:00',
    upvotes: 23,
    downvotes: 2,
    commentsCount: 5
  },
  {
    id: 2,
    title: 'Farola sin funcionar desde hace semanas',
    description: 'La farola de la esquina no funciona desde hace semanas, dejando la zona muy oscura por la noche y creando inseguridad.',
    category: 'lighting',
    status: 'in_progress',
    latitude: 40.418075,
    longitude: -3.70479,
    address: 'Plaza de España 5, Madrid',
    createdAt: '2023-08-10T15:45:00',
    updatedAt: '2023-08-12T09:20:00',
    upvotes: 15,
    downvotes: 0,
    commentsCount: 3
  },
  {
    id: 3,
    title: 'Acumulación de basura junto a contenedores',
    description: 'Los contenedores de basura están desbordados desde hace días y la basura se acumula a su alrededor, generando mal olor y suciedad.',
    category: 'trash',
    status: 'resolved',
    latitude: 40.417275,
    longitude: -3.70279,
    address: 'Calle Princesa 12, Madrid',
    createdAt: '2023-08-05T18:20:00',
    updatedAt: '2023-08-08T11:10:00',
    upvotes: 28,
    downvotes: 1,
    commentsCount: 7
  }
];

// Componente de carga
const LoadingIndicator = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-vecino-gray-600 text-center">
      <div className="mb-4">
        <svg className="animate-spin h-8 w-8 mx-auto text-vecino-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p className="font-medium">Cargando mapa...</p>
    </div>
  </div>
);

const Map = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isClientSide, setIsClientSide] = useState(false);

  // Asegurar que el mapa solo se renderice del lado del cliente
  useEffect(() => {
    // Verificar que estamos en el navegador
    if (typeof window !== 'undefined') {
      // Dar un tiempo para asegurar que los estilos de Leaflet se carguen
      const timer = setTimeout(() => {
        setIsClientSide(true);
        console.log("Map page: cliente detectado, listo para renderizar");
      }, 1500); // Aumentamos aún más el tiempo para asegurar que todo esté cargado
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-vecino-gray-100/50">
      <Navbar />
      
      <main className="pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado del mapa */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-vecino-gray-900 mb-2">
                Mapa de incidencias
              </h1>
              <p className="text-vecino-gray-600">
                Explora incidencias reportadas en tu zona
              </p>
            </div>
            
            {/* Botón de WhatsApp */}
            <a
              href="https://wa.me/+34600000000?text=Quiero%20reportar%20una%20incidencia%20urbana"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-medium transition-all hover:bg-green-600 shadow-sm"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6 6.31999C16.8 5.49999 15.8667 4.84999 14.8 4.36999C13.7333 3.88999 12.6 3.64999 11.4 3.64999C10.0667 3.64999 8.8 3.92999 7.6 4.48999C6.4 5.04999 5.35 5.79999 4.45 6.73999C3.55 7.67999 2.83333 8.77999 2.3 10.04C1.76667 11.3 1.5 12.6333 1.5 14.04C1.5 15.04 1.66667 16.02 2 16.98C2.33333 17.94 2.8 18.8333 3.4 19.66L2 24L6.5 22.64C7.33333 23.2133 8.21667 23.6467 9.15 23.94C10.0833 24.2333 11.0333 24.38 12 24.38C13.3333 24.38 14.6 24.1 15.8 23.54C17 22.98 18.05 22.24 18.95 21.32C19.85 20.4 20.5667 19.3 21.1 18.02C21.6333 16.74 21.9 15.38 21.9 13.94C21.9 12.7533 21.6667 11.6133 21.2 10.52C20.7333 9.42666 20.1 8.47999 19.3 7.67999L17.6 6.31999ZM11.5 22.4C10.6 22.4 9.71667 22.26 8.85 21.98C7.98333 21.7 7.18333 21.2933 6.45 20.76L5.5 20.2L3.3 20.94L4.1 18.82L3.5 17.86C2.96667 17.1067 2.55 16.2933 2.25 15.42C1.95 14.5467 1.8 13.6467 1.8 12.72C1.8 11.56 2.03333 10.4667 2.5 9.43999C2.96667 8.41332 3.61667 7.50666 4.45 6.71999C5.28333 5.93332 6.25 5.31332 7.35 4.85999C8.45 4.40666 9.61667 4.17999 10.85 4.17999C11.9167 4.17999 12.9333 4.38666 13.9 4.79999C14.8667 5.21332 15.7333 5.77999 16.5 6.49999L18 7.99999C18.6667 8.69999 19.1833 9.49999 19.55 10.4C19.9167 11.3 20.1 12.2333 20.1 13.2C20.1 14.3867 19.8667 15.4933 19.4 16.52C18.9333 17.5467 18.3 18.44 17.5 19.2C16.7 19.96 15.7667 20.5533 14.7 20.98C13.6333 21.4067 12.5333 21.62 11.4 21.62L11.5 22.4Z"
                  fill="white"
                />
              </svg>
              Reportar por WhatsApp
            </a>
          </div>
          
          {/* Contenedor del mapa */}
          <div className="bg-white rounded-xl overflow-hidden shadow-subtle border border-vecino-gray-200 h-[calc(100vh-200px)]">
            <Suspense fallback={<LoadingIndicator />}>
              {isClientSide ? (
                <IncidentMap 
                  incidents={mockIncidents} 
                  onIncidentClick={(incident) => setSelectedIncident(incident)}
                  key={`incident-map-${Date.now()}`} // Clave única para forzar re-renderizado
                />
              ) : (
                <LoadingIndicator />
              )}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Map;
