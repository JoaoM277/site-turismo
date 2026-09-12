import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

const INTERVALO_AUTO_AVANCO_MS = 6000; // "de tempo em tempo", devagar — não some antes do usuário ler.

// Slides de exemplo — imagens reaproveitadas das já usadas nos destinos
// mock do resto do site (evita puxar imagens novas de fora). Os textos
// são propositalmente placeholders, como pedido na task: viram conteúdo
// real de Barra do Corda (e a categoria vira uma rota/filtro de verdade)
// numa próxima task.
const SLIDES_HERO = [
  { id: 1, imagem: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325', categoria: 'Natureza' },
  { id: 2, imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5', categoria: 'Praias' },
  { id: 3, imagem: 'https://images.unsplash.com/photo-1526392060635-9d6019884377', categoria: 'Aventura' },
  { id: 4, imagem: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a', categoria: 'Cultura' },
];

// Hero em carrossel — mobile, Home (Task 5). Rolagem por toque é CSS puro
// (scroll-snap nativo, sem lib nenhuma: o navegador já cuida do gesto).
// O avanço automático usa um IntersectionObserver pra saber qual slide o
// usuário está vendo de fato, em vez de guardar seu próprio índice
// "cego" — assim ele nunca briga com um arrasto manual: continua
// exatamente de onde a pessoa deixou.
export default function HeroMobile() {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const observer = new IntersectionObserver(
      (entradas) => {
        const maisVisivel = entradas.reduce(
          (maior, atual) => (atual.intersectionRatio > (maior?.intersectionRatio ?? 0) ? atual : maior),
          null,
        );

        if (maisVisivel?.isIntersecting) {
          const indice = slidesRef.current.indexOf(maisVisivel.target);
          if (indice !== -1) setIndiceAtual(indice);
        }
      },
      { root: container, threshold: 0.6 },
    );

    slidesRef.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  // Reinicia a contagem sempre que o slide visível muda (automático ou
  // por toque), dando o intervalo cheio de visualização antes de avançar
  // de novo — e já volta pro primeiro depois do último.
  useEffect(() => {
    const timer = setInterval(() => {
      const proximoIndice = (indiceAtual + 1) % SLIDES_HERO.length;
      slidesRef.current[proximoIndice]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }, INTERVALO_AUTO_AVANCO_MS);

    return () => clearInterval(timer);
  }, [indiceAtual]);

  return (
    <div className="mx-4 mt-3 md:hidden">
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth rounded-3xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES_HERO.map((slide, indice) => (
          <article
            key={slide.id}
            ref={(el) => {
              slidesRef.current[indice] = el;
            }}
            className="relative h-60 w-full shrink-0 snap-center snap-always"
          >
            <img
              src={slide.imagem}
              alt=""
              className="h-full w-full object-cover"
              loading={indice === 0 ? 'eager' : 'lazy'}
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
