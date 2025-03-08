
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Menu, X, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navClasses = cn(
    'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out px-6 lg:px-10',
    {
      'py-4 bg-transparent': !isScrolled && !isMenuOpen,
      'py-3 bg-white/80 backdrop-blur-md shadow-subtle': isScrolled || isMenuOpen
    }
  );

  const menuItemClasses = 'text-vecino-gray-800 hover:text-vecino-blue transition-colors duration-200 font-medium';
  const activeItemClasses = 'text-vecino-blue';

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 group animate-fade-in"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-vecino-blue text-white">
            <MapPin size={20} className="group-hover:animate-float" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-vecino-gray-900">
            Vecino<span className="text-vecino-blue">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="hidden md:flex space-x-8 animate-fade-in">
            <Link 
              to="/" 
              className={cn(menuItemClasses, location.pathname === '/' && activeItemClasses)}
            >
              Inicio
            </Link>
            <Link 
              to="/map" 
              className={cn(menuItemClasses, location.pathname === '/map' && activeItemClasses)}
            >
              Mapa de Incidencias
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:hidden p-2 focus:outline-none rounded-md transition-opacity duration-200 hover:opacity-80 animate-fade-in"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X size={24} className="text-vecino-gray-800 animate-scale-in" />
            ) : (
              <Menu size={24} className="text-vecino-gray-800 animate-scale-in" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-subtle rounded-b-xl mt-3 animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link 
              to="/" 
              className={cn(
                "block py-3 px-4 rounded-lg transition-all duration-200", 
                location.pathname === '/' ? 
                  "bg-vecino-blue/10 text-vecino-blue" : 
                  "text-vecino-gray-800 hover:bg-vecino-gray-100"
              )}
            >
              Inicio
            </Link>
            <Link 
              to="/map" 
              className={cn(
                "block py-3 px-4 rounded-lg transition-all duration-200", 
                location.pathname === '/map' ? 
                  "bg-vecino-blue/10 text-vecino-blue" : 
                  "text-vecino-gray-800 hover:bg-vecino-gray-100"
              )}
            >
              Mapa de Incidencias
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
