import React, { useState, useEffect } from 'react';
import Carrinho from '../components/caixa/Carrinho';
import Produto from '../components/caixa/Produto';
import Opcionais from '../components/caixa/Opcionais';
import ResumoEvento from '../components/shared/ResumoEvento';
import { useWebSocket } from '../hooks/useWebSocket';
import { Settings } from 'lucide-react';

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

  const [mostrarInputSenha, setMostrarInputSenha] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaCorreta, setSenhaCorreta] = useState(false);

  useEffect(() => {
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

    const savedNumeroPedido = localStorage.getItem('numeroPedido');
    if (savedNumeroPedido) {
      setNumeroPedido(parseInt(savedNumeroPedido, 10));
    }

    const savedHistoricoVendas = localStorage.getItem('historicoVendas');
    if (savedHistoricoVendas) {
      setHistoricoVendas(JSON.parse(savedHistoricoVendas));
    }

    const savedFaturamentoTotal = localStorage.getItem('faturamentoTotal');
    if (savedFaturamentoTotal) {
      setFaturamentoTotal(parseFloat(savedFaturamentoTotal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('numeroPedido', numeroPedido.toString());
    localStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
    localStorage.setItem('faturamentoTotal', faturamentoTotal.toFixed(2));
  }, [numeroPedido, historicoVendas, faturamentoTotal]);

  const handleEngrenagemClick = () => {
    if (senhaCorreta) {
      // Reinicia a lógica e fecha tudo
      setSenhaCorreta(false);
      setMostrarInputSenha(false);
      setSenha('');
    } else {
      setMostrarInputSenha(!mostrarInputSenha);
    }
  };

  const handleSenhaSubmit = (e) => {
    e.preventDefault();
    if (senha === 'lec123') {
      setSenhaCorreta(true);
      setMostrarInputSenha(false);
    } else {
      alert('Senha incorreta!');
    }
  };

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
            qtd: novaQuantidade,
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

    const totalCarrinho = calcularTotal();

    const novoPedido = {
      id: numeroPedido,
      cliente: nomeCliente,
      itens: carrinho,
      total: totalCarrinho,
      prioritario: pedidoPrioritario,
      horario: new Date().toISOString(),
    };

    // Enviar pedido via WebSocket
    sendMessage({ type: 'novoPedido', pedido: novoPedido });

    // Armazenar pedido no localStorage para a Expedição
    const pedidosExpedicao = JSON.parse(localStorage.getItem('filaPedidos')) || [];
    localStorage.setItem('filaPedidos', JSON.stringify([...pedidosExpedicao, novoPedido]));

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

    // Acumular o valor do carrinho ao faturamento total
    setFaturamentoTotal((prevTotal) => prevTotal + totalCarrinho);

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

  const limparDadosPersistidos = () => {
    if (window.confirm('Tem certeza de que deseja limpar todos os dados?')) {
      // Limpa o localStorage para os dados de vendas e faturamento
      localStorage.removeItem('historicoVendas');
      localStorage.removeItem('faturamentoTotal');
      localStorage.removeItem('metas');
      
      // Reseta os estados locais
      setHistoricoVendas({});
      setFaturamentoTotal(0);
      setMetas({});
      
      alert('Dados de vendas e faturamento foram limpos.');
    }
  };
  

  const atualizarOpcionais = (produtoId, novosOpcionais, chaveEditada) => {
    setCarrinho((prevCarrinho) => {
      const novoCarrinho = { ...prevCarrinho };
      const novaChave = `${produtoId}-${novosOpcionais.sort().join('-')}`;

      const itemEditado = novoCarrinho[chaveEditada];

      if (itemEditado) {
        delete novoCarrinho[chaveEditada];

        const itemExistente = Object.entries(novoCarrinho).find(
          ([chave, item]) => chave === novaChave && chave !== chaveEditada
        );

        if (itemExistente) {
          const [chaveExistente, itemExistenteValor] = itemExistente;
          novoCarrinho[chaveExistente] = {
            ...itemExistenteValor,
            qtd: itemExistenteValor.qtd + itemEditado.qtd,
          };
        } else {
          novoCarrinho[novaChave] = {
            ...itemEditado,
            opcionais: novosOpcionais,
          };
        }
      }

      return novoCarrinho;
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* Título centralizado */}
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Controle de Caixa
      </h1>

      {/* Engrenagem e campo de senha na mesma linha */}
      <div className="flex justify-end items-center mb-4" style={{ position: 'relative' }}>
        {mostrarInputSenha && !senhaCorreta && (
          <form
            onSubmit={handleSenhaSubmit}
            className="flex items-center space-x-2 mr-2"
            style={{ position: 'absolute', right: '40px' }}
          >
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Digite a senha"
              style={{ width: '150px' }}
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg text-sm"
            >
              Confirmar
            </button>
          </form>
        )}
        <Settings
          className="cursor-pointer"
          onClick={handleEngrenagemClick}
          size={24}
        />
      </div>

      {/* Painel de Produtos */}
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

      {senhaCorreta && (
        <ResumoEvento
          historicoVendas={historicoVendas}
          produtos={produtos}
          faturamentoTotal={faturamentoTotal}
        />
      )}
    </div>
  );
};

export default CaixaPage;
