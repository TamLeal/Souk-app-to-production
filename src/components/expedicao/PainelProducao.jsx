import React, { useEffect, useState } from "react";
import PanelCard from "../shared/PanelCard";
import { ChefHat, AlertTriangle, Clock, User, CiFries, FaHamburger } from "../shared/Icones";

const PainelProducao = ({ filaPedidos }) => {
  const [contadorFila, setContadorFila] = useState({
    KFT: 0,
    Falafel: 0,
    Marys: 0,
    Fritas: 0,
  });

  useEffect(() => {
    const novoContador = {};
    filaPedidos.forEach((pedido) => {
      pedido.itens.forEach((item) => {
        novoContador[item.nome] = (novoContador[item.nome] || 0) + item.qtd;
      });
    });
    setContadorFila(novoContador);
  }, [filaPedidos]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8"> {/* Container Principal */}
      <h2 className="text-2xl font-bold mb-4 text-left">Painel de Produção</h2> {/* Título */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <PanelCard
          icon={<ChefHat size={24} />}
          label="Total de Itens"
          value={Object.values(contadorFila).reduce((total, qtd) => total + qtd, 0)}
          items={Object.entries(contadorFila).map(([name, quantity]) => ({
            icon: name === 'KFT' ? <FaHamburger /> : name === 'Fritas' ? <CiFries /> : null,
            name,
            quantity,
          }))}
          color="blue"
        />

        <PanelCard
          icon={<AlertTriangle size={24} />}
          label="Pedidos Prioritários"
          value={filaPedidos.filter((p) => p.prioritario).length}
          color="red"
        />

        <PanelCard
          icon={<Clock size={24} />}
          label="Tempo Médio na Fila"
          value={
            filaPedidos.length > 0
              ? `${Math.round(
                  filaPedidos.reduce(
                    (total, pedido) =>
                      total +
                      (new Date().getTime() - new Date(pedido.horario).getTime()) /
                        60000,
                    0
                  ) / filaPedidos.length
                )} min`
              : '0 min'
          }
          color="green"
        />

        <PanelCard
          icon={<User size={24} />}
          label="Pessoas na Fila"
          value={filaPedidos.length}
          color="yellow"
        />
      </div>
    </div>
  );
};

export default PainelProducao;
