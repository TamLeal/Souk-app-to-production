import React, { useState, useEffect } from 'react';
import FilaPedidos from './FilaPedidos';
import PedidosOnHold from './PedidosOnHold';
import Esquecidos from './Esquecidos';
import ResumoEvento from '../shared/ResumoEvento';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

const produtos = [
  { id: 1, nome: 'KFT', preco: 15 },
  { id: 2, nome: 'Falafel', preco: 12 },
  { id: 3, nome: 'Marys', preco: 18 },
  { id: 4, nome: 'Fritas', preco: 8 },
];

const ControleExpedicao = () => {
  const [filaPedidos, setFilaPedidos] = useState(() => {
    const savedFilaPedidos = localStorage.getItem('filaPedidos');
    return savedFilaPedidos ? JSON.parse(savedFilaPedidos) : [];
  });
  const [pedidosOnHold, setPedidosOnHold] = useState([]);
  const [esquecidos, setEsquecidos] = useState([]);
  const [historicoVendas, setHistoricoVendas] = useState(() => {
    const savedHistoricoVendas = localStorage.getItem('historicoVendas');
    return savedHistoricoVendas ? JSON.parse(savedHistoricoVendas) : {};
  });
  const [mostrarResumo, setMostrarResumo] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaCorreta, setSenhaCorreta] = useState(false);
  const [mostrarInputSenha, setMostrarInputSenha] = useState(false);

  useEffect(() => {
    localStorage.setItem('filaPedidos', JSON.stringify(filaPedidos));
  }, [filaPedidos]);

  useEffect(() => {
    localStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
  }, [historicoVendas]);

  const calcularFaturamentoTotal = () => {
    return Object.entries(historicoVendas).reduce((total, [id, qtd]) => {
      const produto = produtos.find((p) => p.id === parseInt(id));
      if (produto) {
        return total + produto.preco * qtd;
      } else {
        console.error(`Produto com ID ${id} não encontrado!`);
        return total;
      }
    }, 0);
  };

  const faturamentoTotal = calcularFaturamentoTotal();

  const exportarCSV = () => {
    const dadosPedidos = filaPedidos.map((pedido) => {
      const horario = new Date(pedido.horario).toLocaleTimeString();

      const produtoQuantidade = produtos.map((produto) => {
        const itemPedido = Object.values(pedido.itens).find(
          (item) => item.nome === produto.nome
        );
        return itemPedido ? itemPedido.qtd : 0;
      });

      return {
        numero_pedido: pedido.id,
        nome_cliente: pedido.cliente,
        horario_pedido: horario,
        ...produtoQuantidade.reduce((acc, qtd, index) => {
          acc[produtos[index].nome] = qtd;
          return acc;
        }, {}),
      };
    });

    const csvPedidos = Papa.unparse(dadosPedidos);
    const blob = new Blob([csvPedidos], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `exportacao_pedidos_${new Date().toISOString()}.csv`);
  };

  const limparDadosPersistidos = () => {
    if (window.confirm('Tem certeza de que deseja limpar todos os dados?')) {
      localStorage.removeItem('filaPedidos');
      localStorage.removeItem('historicoVendas');
      setFilaPedidos([]);
      setHistoricoVendas({});
      alert('Todos os dados foram limpos.');
    }
  };

  const handleSenhaSubmit = (e) => {
    e.preventDefault();
    if (senha === 'lec123') {
      setSenhaCorreta(true);
      setMostrarResumo(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleToggleResumo = () => {
    if (mostrarResumo) {
      setSenhaCorreta(false);
      setMostrarResumo(false);
      setMostrarInputSenha(false);
      setSenha('');
    } else {
      setMostrarInputSenha(!mostrarInputSenha);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Fila de Pedidos</h2>
        <FilaPedidos filaPedidos={filaPedidos} setFilaPedidos={setFilaPedidos} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold">Pedidos em Espera</h2>
        <PedidosOnHold pedidosOnHold={pedidosOnHold} setPedidosOnHold={setPedidosOnHold} />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold">Pedidos Esquecidos</h2>
        <Esquecidos esquecidos={esquecidos} setEsquecidos={setEsquecidos} />
      </div>

      <div className="mt-8">
        <button onClick={handleToggleResumo}>
          {mostrarResumo ? 'Esconder Resumo' : 'Mostrar Resumo'}
        </button>

        {mostrarInputSenha && (
          <form onSubmit={handleSenhaSubmit} className="mt-4">
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a senha"
              className="p-2 border rounded"
            />
            <button type="submit" className="p-2 ml-2 bg-blue-500 text-white rounded">
              Confirmar
            </button>
          </form>
        )}

        {mostrarResumo && senhaCorreta && (
          <ResumoEvento
            historicoVendas={historicoVendas}
            faturamentoTotal={faturamentoTotal}
            exportarCSV={exportarCSV}
            limparDadosPersistidos={limparDadosPersistidos}
            produtos={produtos}
            historicoAcoes={[]}
            mostrarHistorico={false}
            setMostrarHistorico={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default ControleExpedicao;
