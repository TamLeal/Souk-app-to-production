import React from 'react';
import ControleExpedicao from '../components/expedicao/ControleExpedicao'; // Verifique o caminho correto

const ExpedicaoPage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Controle de Expedição
      </h1>
      
      <ControleExpedicao />
      
      {/* Outros componentes relacionados à expedição podem ser adicionados aqui */}
    </div>
  );
};

export default ExpedicaoPage;
