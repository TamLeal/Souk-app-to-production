import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import InitialScreen from './components/shared/InitialScreen';
import CaixaPage from './pages/CaixaPage';
import ExpedicaoPage from './pages/ExpedicaoPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<InitialScreen />} />
          <Route path="/caixa" element={<CaixaPage />} />
          <Route path="/expedicao" element={<ExpedicaoPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
