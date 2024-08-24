import { ADICIONAR_PEDIDO, ATUALIZAR_PEDIDO, REMOVER_PEDIDO } from './expedicaoActions';

const initialState = {
  filaPedidos: [],
  pedidosOnHold: [],
  esquecidos: [],
};

const expedicaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADICIONAR_PEDIDO:
      return {
        ...state,
        filaPedidos: [...state.filaPedidos, action.payload],
      };

    case ATUALIZAR_PEDIDO:
      return {
        ...state,
        filaPedidos: state.filaPedidos.map((pedido) =>
          pedido.id === action.payload.pedidoId
            ? { ...pedido, ...action.payload.dadosAtualizados }
            : pedido
        ),
      };

    case REMOVER_PEDIDO:
      return {
        ...state,
        filaPedidos: state.filaPedidos.filter((pedido) => pedido.id !== action.payload),
      };

    default:
      return state;
  }
};

export default expedicaoReducer;
