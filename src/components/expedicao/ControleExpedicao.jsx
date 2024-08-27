// src/components/expedicao/ControleExpedicao.jsx

import React, { useState, useEffect } from 'react';
import FilaPedidos from './FilaPedidos';
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
  const [historicoVendas, setHistoricoVendas] = useState(() => {
    const savedHistoricoVendas = localStorage.getItem('historicoVendas');
    return savedHistoricoVendas ? JSON.parse(savedHistoricoVendas) : {};
  });

  const [numeroPedido, setNumeroPedido] = useState(() => {
    const savedNumeroPedido = localStorage.getItem('numeroPedido');
    return savedNumeroPedido ? parseInt(savedNumeroPedido, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem('filaPedidos', JSON.stringify(filaPedidos));
  }, [filaPedidos]);

  useEffect(() => {
    localStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
  }, [historicoVendas]);

  useEffect(() => {
    localStorage.setItem('numeroPedido', numeroPedido.toString());
  }, [numeroPedido]);

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

  const handleNovoPedido = (pedido) => {
    const novoPedido = {
      id: numeroPedido,
      cliente: pedido.cliente,
      itens: pedido.itens,
      total: pedido.total,
      prioritario: pedido.prioritario,
      horario: new Date().toISOString(),
    };

    // Atualizar fila de pedidos
    setFilaPedidos((prevFila) => [...prevFila, novoPedido]);

    // Incrementar número do pedido
    setNumeroPedido((prevNumero) => prevNumero + 1);

    // Atualizar histórico de vendas
    const novoHistorico = { ...historicoVendas };
    Object.values(pedido.itens).forEach((item) => {
      novoHistorico[item.id] = (novoHistorico[item.id] || 0) + item.qtd;
    });
    setHistoricoVendas(novoHistorico);
  };

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
      localStorage.removeItem('numeroPedido'); // Limpar também o número do pedido
      setFilaPedidos([]);
      setHistoricoVendas({});
      setNumeroPedido(1); // Resetar o número do pedido
      alert('Todos os dados foram limpos.');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <FilaPedidos filaPedidos={filaPedidos} setFilaPedidos={setFilaPedidos} />
      </div>
      {/* Adicione o botão de limpar dados */}
      <div className="flex space-x-4">
        <button onClick={exportarCSV} className="bg-blue-500 text-white p-2 rounded">
          Exportar CSV
        </button>
        <button onClick={limparDadosPersistidos} className="bg-red-500 text-white p-2 rounded">
          Limpar Dados
        </button>
      </div>
    </div>
  );
};

export default ControleExpedicao;
