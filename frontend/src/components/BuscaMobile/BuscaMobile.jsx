import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, MapPin, Package, Sparkles } from 'lucide-react';

import { buscarDestinos, buscarPacotes } from '@/services/api';
import useFetch from '@/hooks/useFetch';
import { buscarComPrevisao, destinoParaItemBusca, pacoteParaItemBusca, NIVEIS_CORRESPONDENCIA } from '@/utils/busca';

const ICONE_POR_TIPO = { Destino: MapPin, Pacote: Package };

// Busca destinos + pacotes e converte pro formato genérico que o motor de
// busca (utils/busca.js) espera. Feito uma vez, reaproveitado a cada
// tecla digitada — o catálogo é pequeno o bastante pra filtrar no cliente
// sem precisar de debounce ou nova chamada à API por letra digitada.
async function carregarItensBusca() {
  const [destinos, pacotes] = await Promise.all([buscarDestinos(), buscarPacotes()]);
  return [...destinos.map(destinoParaItemBusca), ...pacotes.map(pacoteParaItemBusca)];
}

// Barra de busca mobile (Task 4): input sempre visível + resultados com
// previsão baseada no que foi digitado, em 3 níveis (ver utils/busca.js):
// 1) maior correspondência (título começa com o termo), 2) menor
// correspondência (termo aparece em algum lugar do título/descrição),
// 3) provável correspondência (nada literal, mas algo relacionado ao
// termo aparece — sinalizado como "Relacionado à sua busca").
//
// Visual no mesmo idioma da BottomNavMobile/TopBarSaudacao: cartão
// flutuante com borda, fundo e sombra iguais, cantos bem arredondados.
export default function BuscaMobile() {
  const [termo, setTermo] = useState('');
  const { dados: itensBusca } = useFetch(carregarItensBusca, []);

  const resultados = useMemo(() => buscarComPrevisao(itensBusca ?? [], termo), [itensBusca, termo]);

  return (
    <div className="mx-4 mt-3 md:hidden">
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 shadow-xl">
        <Search size={18} className="shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          // type="text", não "search": inputs type="search" ganham um "x"
          // nativo do navegador (::-webkit-search-cancel-button) assim que
          // têm valor — somado ao nosso botão de limpar customizado logo
          // abaixo, apareciam dois "x" ao mesmo tempo.
          type="text"
          value={termo}
          onChange={(evento) => setTermo(evento.target.value)}
          placeholder="O que você procura?"
          aria-label="Buscar destinos e pacotes"
          className="w-full min-w-0 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        {termo && (
          <button
            type="button"
            onClick={() => setTermo('')}
            aria-label="Limpar busca"
            className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {termo && (
        <div className="mt-2 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
          {resultados.length === 0 && (
            <p className="px-4 py-4 text-center text-sm text-muted-foreground">
              Nenhum resultado encontrado para "{termo}"
            </p>
          )}

          {resultados.map((item) => {
            const Icone = ICONE_POR_TIPO[item.tipo] ?? Search;
            const ehProvavel = item.nivelCorrespondencia === NIVEIS_CORRESPONDENCIA.PROVAVEL;

            return (
              <Link
                key={item.id}
                to={item.rota}
                className="flex items-start gap-3 px-4 py-3 transition-colors active:bg-muted"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icone size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-foreground">{item.titulo}</span>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {item.tipo}
                    </span>
                  </span>
                  <span className="line-clamp-1 block text-xs text-muted-foreground">{item.descricao}</span>
                  {ehProvavel && (
                    <span className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-primary">
                      <Sparkles size={11} aria-hidden="true" />
                      Relacionado à sua busca
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
