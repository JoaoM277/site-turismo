import React from 'react';

import { buscarEventos } from '@/services/api';
import useFetch from '../../hooks/useFetch';
import { otimizarImagem } from '@/utils/imagem';
import useCarrosselAutoAvanco from '@/hooks/useCarrosselAutoAvanco';
import { cn } from '@/lib/utils';

const INTERVALO_AUTO_AVANCO_MS = 5000;

const ROTULO_TIPO = {
  festa: 'Festa',
  promocao: 'Promoção',
  evento: 'Evento',
};

// Seção "Eventos da Semana" (Task 9, item 2) — mobile, Home: carrossel
// com os eventos/festas/promoções cadastrados (backend/src/data/eventos.js),
// mesmo mecanismo de rolagem por toque + avanço automático seguro do
// Hero (useCarrosselAutoAvanco — ver esse hook pro porquê de não usar
// scrollIntoView aqui).
export default function EventosMobile() {
  const { dados: eventos } = useFetch(() => buscarEventos(), []);
  const total = eventos?.length ?? 0;
  const { containerRef, indiceAtual, registrarSlide } = useCarrosselAutoAvanco(total, total > 1 ? INTERVALO_AUTO_AVANCO_MS : 0);

  if (!eventos || eventos.length === 0) return null;

  return (
    <section className="mx-4 mt-4 md:hidden">
      <h2 className="mb-2 px-1 text-base font-bold text-foreground">Eventos da semana</h2>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth rounded-3xl [-ms-overflow-style:none] [overscroll-behavior-x:contain] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
      >
        {eventos.map((evento, indice) => (
          <article
            key={evento.id}
            ref={registrarSlide(indice)}
            className="relative h-48 w-full shrink-0 snap-center snap-always"
          >
            <img
              src={otimizarImagem(evento.imagem, { largura: 1000 })}
              alt=""
              className="h-full w-full object-cover"
              loading={indice === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="mb-1 inline-block rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                {ROTULO_TIPO[evento.tipo] ?? evento.tipo}
              </span>
              <h3 className="text-lg font-bold leading-tight text-white">{evento.titulo}</h3>
              <p className="mt-0.5 text-xs text-white/85">
                {evento.dataExibicao} · {evento.local}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5" aria-hidden="true">
        {eventos.map((evento, indice) => (
          <span
            key={evento.id}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              indice === indiceAtual ? 'w-5 bg-primary' : 'w-1.5 bg-muted',
            )}
          />
        ))}
      </div>
    </section>
  );
}
