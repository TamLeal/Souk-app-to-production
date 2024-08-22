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
  const [faturamentoTotal, setFaturamentoTotal] = useState(0);

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

    // Atualizar o faturamento total
    const total = Object.values(carrinho).reduce(
      (sum, item) => sum + item.preco * item.qtd,
      0
    );
    setFaturamentoTotal(total);
  }, [numeroPedido, historicoVendas, carrinho]);

  const adicionarAoCarrinho = (produto, opcionaisSelecionados) => {
    const chaveProduto = `${produto.id}-${opcionaisSelecionados.sort().join('-')}`;
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

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  };

  const editarQuantidade = (chave, delta) => {
    setCarrinho((prevCarrinho) => {
      const novoCarrinho = { ...prevCarrinho };
      const item = novoCarrinho[chave];
      if (item) {
        const novaQuantidade = Math.max(0, item.qtd + delta);
        if (novaQuantidade === 0) {
          delete novoCarrinho[chave];
        } else {
          novoCarrinho[chave] = {
            ...item,
            qtd: novaQuantidade
          };
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

  const atualizarOpcionais = (produtoId, novosOpcionais) => {
    setCarrinho((prevCarrinho) => {
      const novoCarrinho = { ...prevCarrinho };
      const chaveAntiga = Object.keys(novoCarrinho).find(
        (chave) => chave.startsWith(produtoId.toString())
      );
      if (chaveAntiga) {
        const itemAntigo = novoCarrinho[chaveAntiga];
        const novaChave = `${produtoId}-${novosOpcionais.sort().join('-')}`;
        delete novoCarrinho[chaveAntiga];
        novoCarrinho[novaChave] = {
          ...itemAntigo,
          opcionais: novosOpcionais
        };
      }
      return novoCarrinho;
    });
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
            adicionarAoCarrinho={adicionarAoCarrinho}
            abrirModal={abrirModal}
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
        atualizarOpcionais={atualizarOpcionais}
        opcionais={opcionais}
      />

      {mostrarModal && (
        <Opcionais
          produtoSelecionado={produtoSelecionado}
          opcionais={opcionais}
          adicionarAoCarrinho={adicionarAoCarrinho}
          fecharModal={() => setMostrarModal(false)}
          opcionaisSelecionados={carrinho[`${produtoSelecionado.id}`]?.opcionais || []}
        />
      )}

      <ResumoEvento
        historicoVendas={historicoVendas}
        produtos={produtos}
        faturamentoTotal={faturamentoTotal}
      />
    </div>
  );
};

export default CaixaPage;