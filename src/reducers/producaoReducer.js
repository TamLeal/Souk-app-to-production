// src/reducers/producaoReducer.js

import { FETCH_PRODUCAO_DATA } from './producaoActions';

const initialState = {
  data: [],
  loading: false,
};

const producaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCAO_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default producaoReducer;
