import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { otimizarImagem } from '../../utils/imagem';

// Uma categoria (lazer/saúde/hospedagem) como item expansível — Task 6,
// item 2: "listas distintas sendo cada uma delas um item expandível".
// Usa <details>/<summary> nativo (mesmo padrão já usado no projeto pro
// menu mobile em Task 2.1): acessível e sem precisar de estado em React
// só pra abrir/fechar.
export default function CategoriaAccordion({ categoria, locais, aoSelecionarLocal, abertoPorPadrao = false }) {
  const Icone = categoria.icone;

  return (
    <details
      className="group overflow-hidden rounded-3xl border border-border bg-background shadow-xl"
      open={abertoPorPadrao}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icone size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">{categoria.nome}</span>
            <span className="block text-xs text-muted-foreground">
              {locais.length} {locais.length === 1 ? 'local' : 'locais'}
            </span>
          </span>
        </span>
        <ChevronDown
          size={20}
          className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="divide-y divide-border border-t border-border">
        {locais.length === 0 && (
          <p className="px-4 py-4 text-sm text-muted-foreground">Nenhum local cadastrado nessa categoria ainda.</p>
        )}

        {locais.map((local) => (
          <button
            key={local.id}
            type="button"
            onClick={() => aoSelecionarLocal(local)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors active:bg-muted"
          >
            {local.plano === 'cliente' && local.fotos?.[0] ? (
              <img
                src={otimizarImagem(local.fotos[0], { largura: 100 })}
                alt=""
                className="h-12 w-12 shrink-0 rounded-xl object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <Icone size={18} aria-hidden="true" />
              </span>
            )}

            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-foreground">{local.nome}</span>
                {local.plano === 'cliente' && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                    Destaque
                  </span>
                )}
              </span>
              <span className="line-clamp-1 block text-xs text-muted-foreground">{local.descricaoCurta}</span>
            </span>

            <ChevronRight size={16} className="shrink-0 text-muted-foreground" aria-hidden="true" />
          </button>
        ))}
      </div>
    </details>
  );
}
