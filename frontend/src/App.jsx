import React from 'react';

import Navbar from './components/Navbar/Navbar';
import BottomNavMobile from './components/BottomNavMobile/BottomNavMobile';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import './App.css';

// Componente raiz: define o "esqueleto" visível em todas as páginas
// (cabeçalho e rodapé fixos) e delega o conteúdo variável às rotas.
//
// BottomNavMobile flutua por cima do conteúdo em telas pequenas (ver seu
// arquivo pra detalhes) — o padding-bottom extra no <main> abaixo do `md`
// evita que ela cubra o final da página.
export default function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-layout__conteudo pb-24 md:pb-0">
        <AppRoutes />
      </main>
      <Footer />
      <BottomNavMobile />
    </div>
  );
}
