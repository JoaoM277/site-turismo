import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import './index.css';

// Ponto de entrada da aplicação React.
// BrowserRouter habilita a navegação entre páginas (rotas).
// AppProvider disponibiliza estado global (ex: lista de destinos) para toda a árvore.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
