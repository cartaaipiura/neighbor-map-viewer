
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IncidentCard, { Incident } from '@/components/IncidentCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Mock data for featured incidents
const featuredIncidents: Incident[] = [
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

const Index = () => {
  return (
    <div className="min-h-screen bg-vecino-gray-100/50">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-8 pb-16">
          <Hero />
        </section>
        
        {/* Featured Incidents Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-vecino-green/10 text-vecino-green text-sm font-medium mb-2">
                  <span>Destacados</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-vecino-gray-900">
                  Incidencias recientes
                </h2>
              </div>
              
              <Link 
                to="/map" 
                className="flex items-center text-vecino-blue hover:text-vecino-blue/80 font-medium transition-colors"
              >
                <span>Ver todas las incidencias</span>
                <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredIncidents.map((incident, index) => (
                <IncidentCard 
                  key={incident.id} 
                  incident={incident} 
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gradient-to-b from-vecino-gray-100/50 to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-vecino-blue/10 text-vecino-blue text-sm font-medium mb-2">
                <span>Cómo funciona</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-vecino-gray-900">
                Mejora tu ciudad en 3 simples pasos
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-6 shadow-subtle border border-vecino-gray-200 text-center">
                <div className="w-12 h-12 rounded-full bg-vecino-blue flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-vecino-gray-900 mb-2">
                  Explora el mapa
                </h3>
                <p className="text-vecino-gray-700">
                  Visualiza las incidencias urbanas cercanas a ti en nuestro mapa interactivo.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white rounded-xl p-6 shadow-subtle border border-vecino-gray-200 text-center">
                <div className="w-12 h-12 rounded-full bg-vecino-blue flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-vecino-gray-900 mb-2">
                  Vota por la actualidad
                </h3>
                <p className="text-vecino-gray-700">
                  Ayuda a mantener la información actualizada confirmando el estado de las incidencias.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white rounded-xl p-6 shadow-subtle border border-vecino-gray-200 text-center">
                <div className="w-12 h-12 rounded-full bg-vecino-blue flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-vecino-gray-900 mb-2">
                  Comenta y colabora
                </h3>
                <p className="text-vecino-gray-700">
                  Aporta información adicional para ayudar a resolver los problemas de tu comunidad.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-white py-10 border-t border-vecino-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-vecino-blue text-white mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-semibold text-lg text-vecino-gray-900">
                  Vecino<span className="text-vecino-blue">AI</span>
                </span>
              </div>
              
              <div className="text-sm text-vecino-gray-600">
                &copy; {new Date().getFullYear()} VecinoAI. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
