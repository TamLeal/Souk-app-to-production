import React, { useState, useEffect } from 'react';
import Carrinho from '../components/caixa/Carrinho';
import Produto from '../components/caixa/Produto';
import Opcionais from '../components/caixa/Opcionais';
import ResumoEvento from '../components/shared/ResumoEvento';
import { useWebSocket } from '../hooks/useWebSocket';

const CaixaPage = () => {
  const [carrinho, setCarrinho] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [opcionais, setOpcionais] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [nomeCliente, setNomeCliente] = useState('');
  const [pedidoPrioritario, setPedidoPrioritario] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState(1);
  const [historicoVendas, setHistoricoVendas] = useState({});
  const { sendMessage } = useWebSocket('ws://seu-endereco-websocket');

  useEffect(() => {
    // Carregar produtos e opcionais
    setProdutos([
      { id: 1, nome: 'KFT', preco: 15, cor: 'bg-red-200' },
      { id: 2, nome: 'Falafel', preco: 12, cor: 'bg-yellow-200' },
      { id: 3, nome: 'Marys', preco: 18, cor: 'bg-green-200' },
      { id: 4, nome: 'Fritas', preco: 8, cor: 'bg-yellow-100' },
    ]);

    setOpcionais([
      { id: 1, nome: 'Sem alface' },
      { id: 2, nome: 'Sem maionese' },
      { id: 3, nome: 'Rúcula extra' },
      { id: 4, nome: 'Duplo burger' },
    ]);

    // Carregar número do pedido e histórico de vendas do localStorage
    const savedNumeroPedido = localStorage.getItem('numeroPedido');
    if (savedNumeroPedido) {
      setNumeroPedido(parseInt(savedNumeroPedido, 10));
    }

    const savedHistoricoVendas = localStorage.getItem('historicoVendas');
    if (savedHistoricoVendas) {
      setHistoricoVendas(JSON.parse(savedHistoricoVendas));
    }
  }, []);

  useEffect(() => {
    // Salvar número do pedido e histórico de vendas no localStorage
    localStorage.setItem('numeroPedido', numeroPedido.toString());
    localStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
  }, [numeroPedido, historicoVendas]);

  const adicionarAoCarrinho = (produto, opcionaisSelecionados) => {
    const chaveProduto = `${produto.id}-${opcionaisSelecionados.join('-')}`;
    setCarrinho((prevCarrinho) => ({
      ...prevCarrinho,
      [chaveProduto]: {
        ...produto,
        opcionais: opcionaisSelecionados,
        qtd: (prevCarrinho[chaveProduto]?.qtd || 0) + 1,
      },
    }));
    setMostrarModal(false);
  };

  const editarQuantidade = (chave, delta) => {
    setCarrinho((prevCarrinho) => {
      const novoCarrinho = { ...prevCarrinho };
      const item = novoCarrinho[chave];
      if (item) {
        item.qtd = Math.max(0, item.qtd + delta);
        if (item.qtd === 0) {
          delete novoCarrinho[chave];
        }
      }
      return novoCarrinho;
    });
  };

  const removerItem = (chave) => {
    setCarrinho((prevCarrinho) => {
      const novoCarrinho = { ...prevCarrinho };
      delete novoCarrinho[chave];
      return novoCarrinho;
    });
  };

  const calcularTotal = () => {
    return Object.values(carrinho).reduce(
      (total, item) => total + item.preco * item.qtd,
      0
    );
  };

  const enviarParaProducao = () => {
    if (!nomeCliente.trim()) {
      alert('Por favor, insira o nome do cliente.');
      return;
    }

    const novoPedido = {
      id: numeroPedido,
      cliente: nomeCliente,
      itens: carrinho,
      total: calcularTotal(),
      prioritario: pedidoPrioritario,
      horario: new Date().toISOString(),
    };

    // Enviar pedido via WebSocket
    sendMessage({ type: 'novoPedido', pedido: novoPedido });

    // Atualizar histórico de vendas
    setHistoricoVendas((prevHistorico) => {
      const novoHistorico = { ...prevHistorico };
      Object.values(carrinho).forEach((item) => {
        novoHistorico[item.id] = (novoHistorico[item.id] || 0) + item.qtd;
      });
      return novoHistorico;
    });

    // Incrementar número do pedido
    setNumeroPedido((prev) => prev + 1);

    // Limpar carrinho e informações do cliente
    setCarrinho({});
    setNomeCliente('');
    setPedidoPrioritario(false);

    alert('Pedido enviado com sucesso!');
  };

  const apagarPedido = () => {
    if (window.confirm('Tem certeza de que deseja apagar o pedido atual?')) {
      setCarrinho({});
      setNomeCliente('');
      setPedidoPrioritario(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Controle de Caixa
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        {produtos.map((produto) => (
          <Produto
            key={produto.id}
            produto={produto}
            adicionarAoCarrinho={() => {
              setProdutoSelecionado(produto);
              setMostrarModal(true);
            }}
          />
        ))}
      </div>

      <Carrinho
        carrinho={carrinho}
        nomeCliente={nomeCliente}
        setNomeCliente={setNomeCliente}
        pedidoPrioritario={pedidoPrioritario}
        setPedidoPrioritario={setPedidoPrioritario}
        editarQuantidade={editarQuantidade}
        removerItem={removerItem}
        calcularTotal={calcularTotal}
        enviarParaProducao={enviarParaProducao}
        apagarPedido={apagarPedido}
      />

      {mostrarModal && (
        <Opcionais
          produtoSelecionado={produtoSelecionado}
          opcionais={opcionais}
          adicionarAoCarrinho={adicionarAoCarrinho}
          fecharModal={() => setMostrarModal(false)}
        />
      )}

      <ResumoEvento historicoVendas={historicoVendas} produtos={produtos} />
    </div>
  );
};

export default CaixaPage;
