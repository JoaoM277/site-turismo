import React, { useMemo, useState } from 'react';
import { Umbrella, HeartPulse, BedDouble } from 'lucide-react';

import { buscarLocais } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader/Loader';
import CategoriaAccordion from './CategoriaAccordion';
import LocalDetalheModal from './LocalDetalheModal';

// Categorias fixas do prototipo do PO. `icone` usado pela bottom nav e
// pelo placeholder de locais sem foto (plano básico); `id` bate com o
// campo `categoria` dos dados vindos da API (backend/src/data/locais.js).
const CATEGORIAS = [
  { id: 'lazer', nome: 'Lazer', icone: Umbrella },
  { id: 'saude', nome: 'Saúde', icone: HeartPulse },
  { id: 'hospedagem', nome: 'Hospedagem', icone: BedDouble },
];

// "Descubra seu destino" (Task 6, renomeada de "Roteiros" pra "Descubra"
// na Task 6.1 — ver [[barra-do-corda-portal]] na memória: essa é a aba de
// navegar/descobrir o catálogo de locais; criar um roteiro PRÓPRIO a
// partir dele é a outra aba, "Roteiros" — ver pages/Roteiros/Roteiros.jsx).
// Segue o mesmo idioma visual mobile já estabelecido na Home (cartões
// flutuantes com border-border/bg-background/shadow-xl, cantos bem
// arredondados, margem mx-4): locais separados por categoria, cada
// categoria um item expansível (CategoriaAccordion), cada local abrindo
// um modal próprio com fotos/descrição/horário (LocalDetalheModal) — com
// a lógica de plano cliente/básico decidindo o quanto de detalhe mostra.
export default function Descubra() {
  const { dados: locais, carregando, erro } = useFetch(() => buscarLocais(), []);

  // `localSelecionado` guarda o último local aberto e só é sobrescrito ao
  // selecionar outro — nunca zerado ao fechar. Isso deixa o conteúdo
  // disponível durante a animação de saída do modal (controlada por
  // `modalAberto`); se zerássemos os dois juntos, o modal sumiria de
  // uma vez, sem a transição de fechamento.
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirLocal = (local) => {
    setLocalSelecionado(local);
    setModalAberto(true);
  };

  const locaisPorCategoria = useMemo(() => {
    const mapa = { lazer: [], saude: [], hospedagem: [] };
    (locais ?? []).forEach((local) => {
      if (mapa[local.categoria]) mapa[local.categoria].push(local);
    });
    return mapa;
  }, [locais]);

  const categoriaDoSelecionado = CATEGORIAS.find((categoria) => categoria.id === localSelecionado?.categoria);

  return (
    <div className="pb-4">
      <div className="mx-4 mt-3 rounded-3xl border border-border bg-background p-4 shadow-xl md:mx-auto md:mt-8 md:max-w-3xl">
        <h1 className="text-xl font-bold text-foreground md:text-3xl">Descubra seu destino</h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Locais de Barra do Corda por categoria — lazer, saúde e hospedagem.
        </p>
      </div>

      <div className="mx-4 mt-3 flex flex-col gap-3 pb-24 md:mx-auto md:max-w-3xl md:pb-8">
        {carregando && <Loader mensagem="Carregando locais..." />}
        {erro && <p className="mensagem-erro">{erro}</p>}

        {!carregando &&
          !erro &&
          CATEGORIAS.map((categoria, indice) => (
            <CategoriaAccordion
              key={categoria.id}
              categoria={categoria}
              locais={locaisPorCategoria[categoria.id] ?? []}
              aoSelecionarLocal={abrirLocal}
              abertoPorPadrao={indice === 0}
            />
          ))}
      </div>

      <LocalDetalheModal
        local={localSelecionado}
        categoriaNome={categoriaDoSelecionado?.nome}
        aberto={modalAberto}
        aoFechar={() => setModalAberto(false)}
      />
    </div>
  );
}
