// src/reducers/expedicaoActions.js

// Definindo tipos de ações
export const ADICIONAR_PEDIDO = 'ADICIONAR_PEDIDO';
export const ATUALIZAR_PEDIDO = 'ATUALIZAR_PEDIDO';
export const REMOVER_PEDIDO = 'REMOVER_PEDIDO';

// Ação para adicionar um pedido à fila
export const adicionarPedido = (pedido) => ({
  type: ADICIONAR_PEDIDO,
  payload: pedido,
});

// Ação para atualizar um pedido existente na fila
export const atualizarPedido = (pedidoId, dadosAtualizados) => ({
  type: ATUALIZAR_PEDIDO,
  payload: { pedidoId, dadosAtualizados },
});

// Ação para remover um pedido da fila
export const removerPedido = (pedidoId) => ({
  type: REMOVER_PEDIDO,
  payload: pedidoId,
});
