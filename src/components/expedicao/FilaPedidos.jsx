import React from 'react';
import { ArrowUp, ArrowDown, Pause, Check } from 'lucide-react'; // Ícones mais leves da V1
import { GiHamburger } from 'react-icons/gi';
import { ChefHat } from 'lucide-react'; // Importando o ícone de chapéu de cozinha

const FilaPedidos = ({ filaPedidos, moverPedido, togglePedidoOnHold, removerPedido }) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <ChefHat className="mr-2" size={24} /> {/* Ícone de chapéu de cozinha */}
        <h2 className="text-xl font-bold text-gray-800">Fila de Pedidos</h2>
      </div>
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
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">{pedido.cliente} #{pedido.id}</h3>
                  <span className="ml-2 text-sm text-gray-200">
                    {new Date(pedido.horario).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200">
                    <ArrowUp
                      className="text-gray-700"
                      size={18}
                      title="Priorizar Pedido"
                      onClick={() => moverPedido(pedido.id, 'up')}
                    />
                  </button>
                  <button className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200">
                    <ArrowDown
                      className="text-gray-700"
                      size={18}
                      title="Despriorizar Pedido"
                      onClick={() => moverPedido(pedido.id, 'down')}
                    />
                  </button>
                  <button className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200">
                    <Pause
                      className="text-gray-700"
                      size={18}
                      title="Colocar em Espera"
                      onClick={() => togglePedidoOnHold(pedido.id)}
                    />
                  </button>
                  <button className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600">
                    <Check
                      className="text-white"
                      size={18}
                      title="Concluir Pedido"
                      onClick={() => removerPedido(pedido.id)}
                    />
                  </button>
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilaPedidos;
