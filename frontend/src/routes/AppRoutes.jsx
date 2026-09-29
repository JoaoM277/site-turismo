import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Sobre from '../pages/Sobre/Sobre';
import Descubra from '../pages/Descubra/Descubra';
import Roteiros from '../pages/Roteiros/Roteiros';
import Galeria from '../pages/Galeria/Galeria';
import Destinos from '../pages/Destinos/Destinos';
import DestinoDetalhe from '../pages/DestinoDetalhe/DestinoDetalhe';
import Pacotes from '../pages/Pacotes/Pacotes';
import Reserva from '../pages/Reserva/Reserva';
import Contato from '../pages/Contato/Contato';
import NaoEncontrada from '../pages/NaoEncontrada/NaoEncontrada';
import Loader from '../components/Loader/Loader';

// O mapa traz o Leaflet (~150KB) — carregado só quando alguém abre /rotas,
// pra não pesar o bundle inicial das outras páginas.
const RotasMapas = lazy(() => import('../pages/RotasMapas/RotasMapas'));

// Declaração centralizada de todas as rotas (páginas) do site.
// Mantém o App.jsx enxuto e facilita visualizar o "mapa" do site inteiro.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/descubra" element={<Descubra />} />
      <Route path="/roteiros" element={<Roteiros />} />
      {/* /mapa era o placeholder "Em breve" — o mapa real agora vive em /rotas */}
      <Route path="/mapa" element={<Navigate to="/rotas" replace />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/destinos" element={<Destinos />} />
      <Route path="/destinos/:id" element={<DestinoDetalhe />} />
      <Route path="/pacotes" element={<Pacotes />} />
      <Route
        path="/rotas"
        element={
          <Suspense fallback={<Loader mensagem="Carregando mapa..." />}>
            <RotasMapas />
          </Suspense>
        }
      />
      <Route path="/reserva/:pacoteId" element={<Reserva />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
