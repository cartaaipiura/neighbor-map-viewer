
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, X, Filter, ChevronUp, ChevronDown } from 'lucide-react';

const categoryOptions = [
  { value: 'road', label: 'Problema vial' },
  { value: 'lighting', label: 'Falta de iluminación' },
  { value: 'trash', label: 'Basura' },
  { value: 'graffiti', label: 'Grafiti' },
  { value: 'vegetation', label: 'Vegetación' },
  { value: 'water', label: 'Agua' },
  { value: 'noise', label: 'Ruido' },
  { value: 'other', label: 'Otro' },
];

const statusOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'resolved', label: 'Resuelto' },
];

interface MapFiltersProps {
  onFiltersChange: (categories: string[], statuses: string[]) => void;
  className?: string;
}

const MapFilters: React.FC<MapFiltersProps> = ({ onFiltersChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  
  const handleCategoryToggle = (value: string) => {
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter(cat => cat !== value)
      : [...selectedCategories, value];
    
    setSelectedCategories(updatedCategories);
    onFiltersChange(updatedCategories, selectedStatuses);
  };
  
  const handleStatusToggle = (value: string) => {
    const updatedStatuses = selectedStatuses.includes(value)
      ? selectedStatuses.filter(status => status !== value)
      : [...selectedStatuses, value];
    
    setSelectedStatuses(updatedStatuses);
    onFiltersChange(selectedCategories, updatedStatuses);
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
    onFiltersChange([], []);
  };
  
  const hasFilters = selectedCategories.length > 0 || selectedStatuses.length > 0;
  
  const totalFiltersCount = selectedCategories.length + selectedStatuses.length;
  
  return (
    <div className={cn(
      "bg-white/90 backdrop-blur-sm rounded-xl shadow-subtle border border-vecino-gray-200 animate-fade-in",
      className
    )}>
      <div 
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={toggleFilter}
      >
        <div className="flex items-center">
          <Filter size={18} className="text-vecino-gray-600 mr-2" />
          <h3 className="font-medium text-vecino-gray-900">
            Filtros
            {totalFiltersCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-vecino-blue text-white">
                {totalFiltersCount}
              </span>
            )}
          </h3>
        </div>
        <div className="text-vecino-gray-500">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 border-t border-vecino-gray-200 animate-slide-down">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-vecino-gray-900 mb-2">Categoría</h4>
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map(category => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryToggle(category.value)}
                    className={cn(
                      "flex items-center px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                      selectedCategories.includes(category.value)
                        ? "border-vecino-blue bg-vecino-blue/10 text-vecino-blue font-medium"
                        : "border-vecino-gray-200 text-vecino-gray-700 hover:border-vecino-gray-300"
                    )}
                  >
                    {selectedCategories.includes(category.value) && (
                      <Check size={14} className="mr-1.5 flex-shrink-0" />
                    )}
                    <span className="truncate">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-vecino-gray-900 mb-2">Estado</h4>
              <div className="flex gap-2">
                {statusOptions.map(status => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusToggle(status.value)}
                    className={cn(
                      "flex items-center px-3 py-1.5 text-sm rounded-lg border transition-all duration-200",
                      selectedStatuses.includes(status.value)
                        ? "border-vecino-blue bg-vecino-blue/10 text-vecino-blue font-medium"
                        : "border-vecino-gray-200 text-vecino-gray-700 hover:border-vecino-gray-300"
                    )}
                  >
                    {selectedStatuses.includes(status.value) && (
                      <Check size={14} className="mr-1.5 flex-shrink-0" />
                    )}
                    <span>{status.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {hasFilters && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="flex items-center text-sm text-vecino-gray-600 hover:text-vecino-gray-900 transition-colors"
                >
                  <X size={14} className="mr-1.5" />
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFilters;
