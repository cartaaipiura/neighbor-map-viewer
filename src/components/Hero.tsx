
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative py-20 md:py-32 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-vecino-blue/5 rounded-full blur-3xl transform rotate-45"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-vecino-green/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content Side */}
          <div className="flex-1 space-y-8 max-w-xl lg:max-w-none animate-fade-in">
            {/* Tag Chip */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-vecino-blue/10 text-vecino-blue text-sm font-medium animate-fade-in">
              <MapPin size={14} className="mr-1" />
              <span>Reportes urbanos inteligentes</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-vecino-gray-900 tracking-tight leading-tight">
              Mejora tu ciudad con 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-vecino-blue to-vecino-light-blue"> Vecino AI</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-vecino-gray-700 max-w-xl leading-relaxed">
              Conoce las incidencias urbanas en tu área, vota para confirmar problemas activos y colabora con tus vecinos para crear una comunidad mejor conectada.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/map" 
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-vecino-blue text-white font-medium rounded-xl transition-all duration-300 hover:bg-vecino-blue/90 hover:shadow-lg focus:ring-2 focus:ring-vecino-blue/20 focus:outline-none animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                <span>Ver mapa de incidencias</span>
                <ArrowRight size={18} />
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-vecino-gray-200 shadow-subtle">
                <h4 className="text-3xl font-bold text-vecino-gray-900">1,500+</h4>
                <p className="text-vecino-gray-600 font-medium mt-1">Incidencias reportadas</p>
              </div>
              <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-vecino-gray-200 shadow-subtle">
                <h4 className="text-3xl font-bold text-vecino-gray-900">750+</h4>
                <p className="text-vecino-gray-600 font-medium mt-1">Problemas resueltos</p>
              </div>
              <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-vecino-gray-200 shadow-subtle col-span-2 md:col-span-1">
                <h4 className="text-3xl font-bold text-vecino-gray-900">12</h4>
                <p className="text-vecino-gray-600 font-medium mt-1">Ciudades conectadas</p>
              </div>
            </div>
          </div>
          
          {/* Image Side */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <div className="aspect-[3/2] bg-vecino-gray-200 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-vecino-gray-100 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center text-vecino-gray-400">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 21l2-1l2 1v-7h2V7.5L12 4L5 7.5V14h2v7l2-1l2 1v-4h2v4zm1-7h-2v-2h2v2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 w-48 p-4 bg-white rounded-xl shadow-elevated border border-vecino-gray-100 animate-float">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-vecino-green/20 flex items-center justify-center text-vecino-green flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-vecino-gray-900">Problema resuelto</h4>
                    <p className="text-xs text-vecino-gray-600 mt-0.5">En menos de 48 horas</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 py-1.5 px-3 bg-vecino-blue text-white rounded-lg shadow-subtle animate-float" style={{ animationDelay: '1s' }}>
                <p className="text-sm font-semibold">86% de efectividad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
