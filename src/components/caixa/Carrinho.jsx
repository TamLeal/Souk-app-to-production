import React, { useState } from 'react';
import {
  ShoppingCart,
  AlertTriangle,
  Trash2,
  Send,
  Edit3,
  Plus,
  Minus,
} from 'lucide-react';
import Opcionais from './Opcionais';

const Carrinho = ({
  carrinho,
  nomeCliente,
  setNomeCliente,
  pedidoPrioritario,
  setPedidoPrioritario,
  editarQuantidade,
  removerItem,
  calcularTotal,
  enviarParaProducao,
  apagarPedido,
  atualizarOpcionais,
  opcionais,
}) => {
  const [produtoEditando, setProdutoEditando] = useState(null);

  const handleEditarQuantidade = (chave, delta) => {
    editarQuantidade(chave, delta);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg mb-10">
      {/* ... (cabeçalho do carrinho permanece o mesmo) ... */}

      <ul className="mb-6">
        {Object.entries(carrinho).map(([chave, item]) => (
          <li key={chave} className="flex flex-col mb-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span className="font-medium text-gray-800">{item.nome}</span>
              </div>
              <div className="flex-1 text-center flex items-center justify-center">
                <button
                  onClick={() => handleEditarQuantidade(chave, -1)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
                >
                  <Minus size={20} />
                </button>
                <span className="mx-4 text-gray-700 font-semibold">
                  x {item.qtd}
                </span>
                <button
                  onClick={() => handleEditarQuantidade(chave, 1)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="flex-1 text-right">
                <span className="text-sm text-gray-600">
                  R$ {(item.preco * item.qtd).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setProdutoEditando(item)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => removerItem(chave)}
                  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            {item.opcionais && item.opcionais.length > 0 && (
              <div className="text-xs text-gray-500 mt-1 ml-4">
                {item.opcionais.join(', ')}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="text-right">
        <p className="font-medium text-gray-700">
          Total de itens:{' '}
          {Object.values(carrinho).reduce((acc, item) => acc + item.qtd, 0)}
        </p>
        <p className="text-2xl font-bold text-gray-800 mt-2">
          Total: R$ {calcularTotal().toFixed(2)}
        </p>
        <div className="flex justify-end mt-6">
          <button
            onClick={enviarParaProducao}
            className="p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300"
            disabled={Object.keys(carrinho).length === 0}
          >
            <span>Enviar Pedido</span>
            <Send size={24} className="ml-2" />
          </button>
        </div>
      </div>

      {produtoEditando && (
        <Opcionais
          produtoSelecionado={produtoEditando}
          opcionais={opcionais}
          opcionaisSelecionados={produtoEditando.opcionais || []}
          adicionarAoCarrinho={(produto, novosOpcionais) => {
            const chaveEditada = Object.keys(carrinho).find(
              chave => carrinho[chave] === produtoEditando
            );
            atualizarOpcionais(produto.id, novosOpcionais, chaveEditada);
            setProdutoEditando(null);
          }}
          fecharModal={() => setProdutoEditando(null)}
        />
      )}
    </div>
  );
};

export default Carrinho;