import React from 'react';
import { FaArrowUp, FaArrowDown, FaPause, FaCheck } from 'react-icons/fa'; // Ícones da V1
import { GiHamburger } from 'react-icons/gi'; // Ícone de exemplo

const FilaPedidos = ({ filaPedidos, moverPedido, togglePedidoOnHold, removerPedido }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filaPedidos.length === 0 ? (
        <p className="text-gray-700">Nenhum pedido na fila.</p>
      ) : (
        filaPedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
              <h3 className="text-lg font-semibold">{pedido.cliente} #{pedido.id}</h3>
              <div className="flex space-x-2">
                <FaArrowUp 
                  className="cursor-pointer" 
                  title="Priorizar Pedido" 
                  onClick={() => moverPedido(pedido.id, 'up')}
                />
                <FaArrowDown 
                  className="cursor-pointer" 
                  title="Despriorizar Pedido" 
                  onClick={() => moverPedido(pedido.id, 'down')}
                />
                <FaPause 
                  className="cursor-pointer" 
                  title="Colocar em Espera" 
                  onClick={() => togglePedidoOnHold(pedido.id)}
                />
                <FaCheck 
                  className="cursor-pointer" 
                  title="Concluir Pedido" 
                  onClick={() => removerPedido(pedido.id)}
                />
              </div>
            </div>
            <div className="p-4">
              <ul>
                {Object.entries(pedido.itens).map(([key, item]) => (
                  <li key={key} className="text-gray-800">
                    <GiHamburger className="inline-block mr-2" /> {item.nome} x {item.qtd}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-gray-800 font-bold">Total: R$ {pedido.total.toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FilaPedidos;
