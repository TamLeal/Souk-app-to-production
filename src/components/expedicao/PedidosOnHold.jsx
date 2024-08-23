import React from 'react';

const PedidosOnHold = ({ pedidosOnHold, moverParaEsquecidos, removerPedido }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Pedidos em Espera</h2>
      
      {pedidosOnHold.length === 0 ? (
        <p className="text-gray-700">Nenhum pedido em espera no momento.</p>
      ) : (
        <ul className="space-y-4">
          {pedidosOnHold.map((pedido) => (
            <li key={pedido.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
              <div>
                <h3 className="font-bold text-gray-800">Pedido #{pedido.id}</h3>
                <p className="text-gray-600">Cliente: {pedido.cliente}</p>
                <p className="text-gray-600">Itens:</p>
                <ul className="pl-4 list-disc text-gray-600">
                  {Object.entries(pedido.itens).map(([id, item]) => (
                    <li key={id}>
                      {item.qtd}x {item.nome}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => moverParaEsquecidos(pedido)}
                  className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300"
                >
                  Mover para Esquecidos
                </button>
                <button
                  onClick={() => removerPedido(pedido.id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PedidosOnHold;
