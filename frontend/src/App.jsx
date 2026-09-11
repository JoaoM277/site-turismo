import React from 'react';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import './App.css';

// Componente raiz: define o "esqueleto" visível em todas as páginas
// (cabeçalho e rodapé fixos) e delega o conteúdo variável às rotas.
export default function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-layout__conteudo">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
