import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Sobre from '../pages/Sobre/Sobre';
import Descubra from '../pages/Descubra/Descubra';
import Roteiros from '../pages/Roteiros/Roteiros';
import Mapa from '../pages/Mapa/Mapa';
import Galeria from '../pages/Galeria/Galeria';
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
      <Route path="/descubra" element={<Descubra />} />
      <Route path="/roteiros" element={<Roteiros />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/destinos" element={<Destinos />} />
      <Route path="/destinos/:id" element={<DestinoDetalhe />} />
      <Route path="/pacotes" element={<Pacotes />} />
      <Route path="/reserva/:pacoteId" element={<Reserva />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
