import { combineReducers } from 'redux';
import caixaReducer from './caixaReducer';
import expedicaoReducer from './expedicaoReducer';

const rootReducer = combineReducers({
  caixa: caixaReducer,
  expedicao: expedicaoReducer,
});

export default rootReducer;
