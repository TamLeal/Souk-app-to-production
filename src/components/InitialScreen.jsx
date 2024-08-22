import React from 'react';
import { useNavigate } from 'react-router-dom';

const InitialScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-10">Sistema de Feira Autônomo</h1>
      <div className="space-y-4">
        <button
          onClick={() => navigate('/caixa')}
          className="w-64 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Caixa
        </button>
        {/* Comentamos ou desativamos o botão de Expedição */}
        {/* <button
          onClick={() => navigate('/expedicao')}
          className="w-64 p-4 bg-gray-400 text-white rounded-lg cursor-not-allowed"
          disabled
        >
          Expedição (Em desenvolvimento)
        </button> */}
      </div>
    </div>
  );
};

export default InitialScreen;
