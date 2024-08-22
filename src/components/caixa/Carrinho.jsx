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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg mb-10">
      {/* ... (header remains the same) */}

      <ul className="mb-6">
        {Object.entries(carrinho).map(([chave, item]) => (
          <li key={chave} className="flex flex-col mb-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span className="font-medium text-gray-800">{item.nome}</span>
              </div>
              <div className="flex-1 text-center flex items-center justify-center">
                <button
                  onClick={() => editarQuantidade(chave, -1)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
                >
                  <Minus size={20} />
                </button>
                <span className="mx-4 text-gray-700 font-semibold">
                  x {item.qtd}
                </span>
                <button
                  onClick={() => editarQuantidade(chave, 1)}
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

      {/* ... (footer remains the same) */}

      {produtoEditando && (
        <Opcionais
          produtoSelecionado={produtoEditando}
          opcionais={opcionais}
          opcionaisSelecionados={produtoEditando.opcionais}
          adicionarAoCarrinho={(produto, novosOpcionais) => {
            const chaveAntiga = Object.keys(carrinho).find(
              (key) => carrinho[key] === produtoEditando
            );
            atualizarOpcionais(chaveAntiga, produto, novosOpcionais);
            setProdutoEditando(null);
          }}
          fecharModal={() => setProdutoEditando(null)}
        />
      )}
    </div>
  );
};

export default Carrinho;