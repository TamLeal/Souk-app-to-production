import React from 'react';
import ControleExpedicao from '../components/expedicao/ControleExpedicao';
import PainelProducao from '../components/expedicao/PainelProducao';
import PedidosOnHold from '../components/expedicao/PedidosOnHold';
import Esquecidos from '../components/expedicao/Esquecidos';
import { useSelector } from 'react-redux';

const ExpedicaoPage = () => {
  const filaPedidos = useSelector((state) => state.expedicao.filaPedidos);
  const pedidosOnHold = useSelector((state) => state.expedicao.pedidosOnHold);
  const esquecidos = useSelector((state) => state.expedicao.esquecidos);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Controle de Expedição
      </h1>

      <PainelProducao filaPedidos={filaPedidos} />
      <ControleExpedicao />

      <div className="grid grid-cols-2 gap-4 mt-8">
        <PedidosOnHold pedidosOnHold={pedidosOnHold} />
        <Esquecidos esquecidos={esquecidos} />
      </div>
    </div>
  );
};

export default ExpedicaoPage;
