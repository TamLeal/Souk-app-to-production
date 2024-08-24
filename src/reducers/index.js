import { combineReducers } from 'redux';
import caixaReducer from './caixaReducer';
import expedicaoReducer from './expedicaoReducer';
import producaoReducer from './producaoReducer'; // Adicione esta linha

const rootReducer = combineReducers({
  caixa: caixaReducer,
  expedicao: expedicaoReducer,
  producao: producaoReducer, // Adicione esta linha
});

export default rootReducer;
