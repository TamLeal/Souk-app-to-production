// src/reducers/producaoActions.js

export const FETCH_PRODUCAO_DATA = 'FETCH_PRODUCAO_DATA';

export const fetchProducaoData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/producao'); // Ajuste conforme necessário
      const data = await response.json();
      dispatch({ type: FETCH_PRODUCAO_DATA, payload: data });
    } catch (error) {
      console.error('Erro ao buscar dados de produção:', error);
    }
  };
};
