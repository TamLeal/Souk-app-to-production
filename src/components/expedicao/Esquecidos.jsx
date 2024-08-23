import React from 'react';

const Esquecidos = ({ esquecidos, removerPedido }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Pedidos Esquecidos</h2>
      
      {esquecidos.length === 0 ? (
        <p className="text-gray-700">Nenhum pedido esquecido no momento.</p>
      ) : (
        <ul className="space-y-4">
          {esquecidos.map((pedido) => (
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
              <button
                onClick={() => removerPedido(pedido.id)}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Esquecidos;
