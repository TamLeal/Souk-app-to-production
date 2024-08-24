import React from 'react';
import ControleExpedicao from '../components/expedicao/ControleExpedicao';
import PainelProducao from '../components/expedicao/PainelProducao';
import { useSelector } from 'react-redux';

const ExpedicaoPage = () => {
  // Obtendo a fila de pedidos diretamente do estado do Redux
  const filaPedidos = useSelector((state) => state.expedicao.filaPedidos);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Controle de Expedição
      </h1>
      
      <ControleExpedicao />
      <PainelProducao filaPedidos={filaPedidos} /> {/* Passando filaPedidos real */}
      
      {/* Outros componentes relacionados à expedição podem ser adicionados aqui */}
    </div>
  );
};

export default ExpedicaoPage;
