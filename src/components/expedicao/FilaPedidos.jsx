import React from 'react';

const FilaPedidos = ({ filaPedidos, togglePedidoOnHold, removerPedido }) => {
  return (
    <div className="flex flex-col space-y-4">
      {filaPedidos.length === 0 ? (
        <p className="text-gray-700">Nenhum pedido na fila.</p>
      ) : (
        filaPedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col space-y-2"
          >
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
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => togglePedidoOnHold(pedido)}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300"
              >
                {pedido.onHold ? 'Retomar' : 'Colocar em espera'}
              </button>
              <button
                onClick={() => removerPedido(pedido.id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Remover
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FilaPedidos;
