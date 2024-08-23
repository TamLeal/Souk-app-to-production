const initialState = {
    filaPedidos: [],
    pedidosOnHold: [],
    esquecidos: [],
  };
  
  const expedicaoReducer = (state = initialState, action) => {
    switch (action.type) {
      // Adicione cases para ações específicas aqui
      default:
        return state;
    }
  };
  
  export default expedicaoReducer;
  