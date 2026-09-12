import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Sobre from '../pages/Sobre/Sobre';
import Destinos from '../pages/Destinos/Destinos';
import DestinoDetalhe from '../pages/DestinoDetalhe/DestinoDetalhe';
import Pacotes from '../pages/Pacotes/Pacotes';
import Reserva from '../pages/Reserva/Reserva';
import Contato from '../pages/Contato/Contato';
import NaoEncontrada from '../pages/NaoEncontrada/NaoEncontrada';

// Declaração centralizada de todas as rotas (páginas) do site.
// Mantém o App.jsx enxuto e facilita visualizar o "mapa" do site inteiro.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/destinos" element={<Destinos />} />
      <Route path="/destinos/:id" element={<DestinoDetalhe />} />
      <Route path="/pacotes" element={<Pacotes />} />
      <Route path="/reserva/:pacoteId" element={<Reserva />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
