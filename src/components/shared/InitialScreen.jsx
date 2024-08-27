import React from 'react';
import { useNavigate } from 'react-router-dom';

const InitialScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-800 opacity-75 z-0"></div>
      
      {/* Bolhas no fundo */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-500 opacity-20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-orange-700 opacity-30 rounded-full filter blur-2xl"></div>
      <div className="absolute bottom-20 left-40 w-96 h-96 bg-orange-600 opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-32 left-1/4 w-80 h-80 bg-orange-400 opacity-15 rounded-full filter blur-3xl"></div>
      <div className="absolute top-2/3 right-1/4 w-72 h-72 bg-orange-500 opacity-25 rounded-full filter blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-orange-600 opacity-20 rounded-full filter blur-2xl"></div>
      <div className="absolute bottom-36 left-10 w-72 h-72 bg-orange-500 opacity-15 rounded-full filter blur-2xl"></div>

      <h1 className="text-5xl font-extrabold text-orange-500 mb-12 drop-shadow-lg z-10">
        Souk Eventos
      </h1>
      <div className="flex space-x-10 z-10">
        <button
          onClick={() => navigate('/caixa')}
          className="w-64 p-4 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          Caixa
        </button>
        <button
          onClick={() => navigate('/expedicao')}
          className="w-64 p-4 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          Expedição
        </button>
      </div>
    </div>
  );
};

export default InitialScreen;
