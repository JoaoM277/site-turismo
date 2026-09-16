import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { otimizarImagem } from '@/utils/imagem';
import useCarrosselAutoAvanco from '@/hooks/useCarrosselAutoAvanco';

const INTERVALO_AUTO_AVANCO_MS = 6000; // "de tempo em tempo", devagar — não some antes do usuário ler.

// Fotos reais de Barra do Corda (2026-09-16) — panorâmicas aéreas do
// pôr do sol sobre a cidade, do lote em frontend/public/imagens/galeria/
// (mesmas fotos usadas na Galeria de Fotos). Textos e categoria
// continuam propositalmente placeholder — só a imagem virou conteúdo
// real por enquanto, o resto do texto ainda não foi definido.
const SLIDES_HERO = [
  { id: 1, imagem: '/imagens/galeria/IMG-20260915-WA0100.jpg', categoria: 'Natureza' },
  { id: 2, imagem: '/imagens/galeria/IMG-20260915-WA0106.jpg', categoria: 'Praias' },
  { id: 3, imagem: '/imagens/galeria/IMG-20260915-WA0108.jpg', categoria: 'Aventura' },
  { id: 4, imagem: '/imagens/galeria/IMG-20260915-WA0116.jpg', categoria: 'Cultura' },
];

// Hero em carrossel — mobile, Home (Task 5). Rolagem por toque é CSS puro
// (scroll-snap nativo); avanço automático + sincronia com o toque manual
// vêm do hook compartilhado useCarrosselAutoAvanco (ver esse arquivo pro
// porquê — inclui a correção do bug de "página pulando pro topo" da
// Task 8).
export default function HeroMobile() {
  const { containerRef, indiceAtual, registrarSlide } = useCarrosselAutoAvanco(
    SLIDES_HERO.length,
    INTERVALO_AUTO_AVANCO_MS,
  );

  return (
    <div className="mx-4 mt-3 md:hidden">
      <div
        ref={containerRef}
        // touch-action:pan-x diz explicitamente ao navegador que esse
        // elemento só deve responder a gestos horizontais, evitando
        // ambiguidade de eixo durante o arrasto. overscroll-behavior-x
        // evita que o "esticar" no primeiro/último slide vaze pra
        // rolagem da página (scroll chaining).
        className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth rounded-3xl [-ms-overflow-style:none] [overscroll-behavior-x:contain] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES_HERO.map((slide, indice) => (
          <article
            key={slide.id}
            ref={registrarSlide(indice)}
            className="relative h-60 w-full shrink-0 snap-center snap-always"
          >
            <img
              src={otimizarImagem(slide.imagem, { largura: 1000 })}
              alt=""
              className="h-full w-full object-cover"
              loading={indice === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <h2 className="text-xl font-bold leading-tight text-white">Texto maior (apenas exemplo por enquanto)</h2>
              <p className="mt-1 text-sm text-white/85">
                Texto auxiliar menor, no mesmo estilo do principal (exemplo).
              </p>
              <Link
                to="/destinos"
                className="mt-3 inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md"
              >
                {slide.categoria}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5" aria-hidden="true">
        {SLIDES_HERO.map((slide, indice) => (
          <span
            key={slide.id}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              indice === indiceAtual ? 'w-5 bg-primary' : 'w-1.5 bg-muted',
            )}
          />
        ))}
      </div>
    </div>
  );
}
