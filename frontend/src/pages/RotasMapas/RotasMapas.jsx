import React, { useState } from 'react';
import { Map, MapPin } from 'lucide-react';

const destinos = [
  { id: 1, nome: 'Praça Central', tipo: 'publico', x: 30, y: 40, mapsUrl: 'https://maps.google.com/?q=-23.5505,-46.6333' },
  { id: 2, nome: 'Museu de Arte', tipo: 'publico', x: 60, y: 25, mapsUrl: 'https://maps.google.com/?q=-23.5614,-46.6565' },
  { id: 3, nome: 'Resort Vila Mar', tipo: 'cliente', x: 20, y: 70, mapsUrl: 'https://maps.google.com/?q=-23.5700,-46.6800' },
  { id: 4, nome: 'Hotel Fasano', tipo: 'cliente', x: 80, y: 60, mapsUrl: 'https://maps.google.com/?q=-23.5800,-46.7000' },
  { id: 5, nome: 'Parque Ibirapuera', tipo: 'publico', x: 50, y: 80, mapsUrl: 'https://maps.google.com/?q=-23.5874,-46.6576' }
];

export default function RotasMapas() {
  const [filtro, setFiltro] = useState('todos');

  const destinosFiltrados = destinos.filter(d => filtro === 'todos' || d.tipo === filtro);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-blue-900">
        <Map className="w-8 h-8" />
        Rotas e Destinos
      </h1>
      
      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-4">
        <button 
          onClick={() => setFiltro('todos')} 
          className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${filtro === 'todos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Todos
        </button>
        <button 
          onClick={() => setFiltro('publico')} 
          className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${filtro === 'publico' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Públicos
        </button>
        <button 
          onClick={() => setFiltro('cliente')} 
          className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${filtro === 'cliente' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Clientes
        </button>
      </div>

      <div className="relative w-full max-w-4xl h-[400px] md:h-[600px] bg-slate-200 rounded-xl overflow-hidden shadow-lg border-2 border-slate-300 mx-auto">
        {/* Imagem de fundo do mapa ilustrativo */}
        <img 
          src="https://placehold.co/1200x800/e2e8f0/64748b?text=Mapa+Ilustrativo" 
          alt="Mapa Ilustrativo" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        
        {/* Pontos no mapa */}
        {destinosFiltrados.map((destino) => (
          <div 
            key={destino.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
            style={{ left: `${destino.x}%`, top: `${destino.y}%` }}
          >
            <div className={`p-2 rounded-full shadow-md cursor-pointer transition-transform group-hover:scale-110 ${destino.tipo === 'publico' ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
              <MapPin className="w-6 h-6" />
            </div>
            
            {/* Tooltip com nome e link */}
            <div className="absolute top-full mt-2 w-48 bg-white text-gray-900 text-sm p-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10 border border-gray-200">
              <p className="font-bold mb-1">{destino.nome}</p>
              <p className="text-xs text-gray-500 mb-2 capitalize">
                {destino.tipo === 'publico' ? 'Destino Público' : 'Destino Cliente'}
              </p>
              <a 
                href={destino.mapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1"
              >
                Traçar Rota no Maps
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          Destinos Públicos
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          Destinos Clientes
        </div>
      </div>
    </div>
  );
}
