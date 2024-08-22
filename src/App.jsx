import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialScreen from './components/InitialScreen';
import CaixaPage from './pages/CaixaPage';
// import ExpedicaoPage from './pages/ExpedicaoPage'; // Comentamos esta linha

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/caixa" element={<CaixaPage />} />
        {/* Comentamos a rota de Expedição por enquanto */}
        {/* <Route path="/expedicao" element={<ExpedicaoPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;