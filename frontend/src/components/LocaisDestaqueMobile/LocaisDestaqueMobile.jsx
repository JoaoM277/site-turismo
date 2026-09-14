import React, { useState } from 'react';

import { buscarLocais } from '@/services/api';
import useFetch from '../../hooks/useFetch';
import { otimizarImagem } from '@/utils/imagem';
import LocalDestaqueModal from './LocalDestaqueModal';

const ROTULO_CATEGORIA = {
  lazer: 'Lazer',
  saude: 'Saúde',
  hospedagem: 'Hospedagem',
  'ponto-turistico': 'Ponto turístico',
};

// Seção "Locais em Destaque" (Task 9, item 1) — mobile, Home: uma linha
// rolável de locais marcados `destaque: true` no backend (pontos
// turísticos e parceiros, ver backend/src/data/locais.js). Tocar num
// card abre o modal completo (LocalDestaqueModal) com fotos, descrição e
// a aba de contato/mapa.
//
// Rolagem só manual (CSS scroll-snap + touch-action:pan-x, sem avanço
// automático) — diferente do Hero e dos Eventos, essa lista pode crescer
// bastante e não faz sentido "passar sozinha" enquanto o usuário talvez
// ainda esteja decidindo o que tocar.
export default function LocaisDestaqueMobile() {
  const { dados: locais } = useFetch(() => buscarLocais({ destaque: true }), []);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  if (!locais || locais.length === 0) return null;

  function abrirLocal(local) {
    setLocalSelecionado(local);
    setModalAberto(true);
  }

  return (
    <section className="mt-4 md:hidden">
      <h2 className="mb-2 px-5 text-base font-bold text-foreground">Locais em destaque</h2>

      <div className="flex gap-3 overflow-x-auto px-4 pb-1 [overscroll-behavior-x:contain] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden">
        {locais.map((local) => (
          <button
            key={local.id}
            type="button"
            onClick={() => abrirLocal(local)}
            className="relative h-40 w-48 shrink-0 overflow-hidden rounded-3xl text-left shadow-xl"
          >
            {local.fotos?.[0] ? (
              <img
                src={otimizarImagem(local.fotos[0], { largura: 400 })}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <span className="block truncate text-sm font-bold text-white">{local.nome}</span>
              <span className="block text-[11px] text-white/80">{ROTULO_CATEGORIA[local.categoria] ?? local.categoria}</span>
            </div>
          </button>
        ))}
      </div>

      <LocalDestaqueModal local={localSelecionado} aberto={modalAberto} aoFechar={() => setModalAberto(false)} />
    </section>
  );
}
