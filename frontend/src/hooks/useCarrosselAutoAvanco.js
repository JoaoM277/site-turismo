import { useEffect, useRef, useState } from 'react';

// Hook reutilizável pra carrosséis horizontais com rolagem por toque (CSS
// scroll-snap nativo) + avanço automático seguro. Extraído do HeroMobile
// (Task 5) ao aparecer um segundo carrossel com a mesma necessidade
// (EventosMobile, Task 9) — centraliza aqui, num só lugar, a correção do
// bug de "página pulando pro topo" achado na Task 8: o avanço automático
// nunca deve usar `elemento.scrollIntoView(...)` (ele tenta deixar o
// alvo visível em TODOS os containers roláveis ancestrais, incluindo a
// página inteira), só `container.scrollTo({ left, behavior })` no
// próprio elemento do carrossel — assim qualquer carrossel novo que usar
// este hook já nasce sem esse bug, sem precisar redescobrir a correção.
//
// Uso:
//   const { containerRef, indiceAtual, registrarSlide } = useCarrosselAutoAvanco(slides.length, 6000);
//   <div ref={containerRef}>
//     {slides.map((slide, i) => <article key={slide.id} ref={registrarSlide(i)}>...</article>)}
//   </div>
//
// `intervaloMs` nulo/0 desativa o avanço automático (só rolagem manual).
export default function useCarrosselAutoAvanco(totalSlides, intervaloMs) {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  // Observa qual slide está mais visível e mantém `indiceAtual`
  // sincronizado — funciona tanto pro avanço automático quanto pro
  // usuário arrastando manualmente, sem os dois brigarem entre si.
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
  }, [totalSlides]);

  // Reinicia a contagem sempre que o slide visível muda (automático ou
  // por toque), dando o intervalo cheio de visualização antes de avançar
  // de novo — e já volta pro primeiro depois do último.
  useEffect(() => {
    if (!intervaloMs) return undefined;

    const timer = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const proximoIndice = (indiceAtual + 1) % totalSlides;
      container.scrollTo({ left: proximoIndice * container.clientWidth, behavior: 'smooth' });
    }, intervaloMs);

    return () => clearInterval(timer);
  }, [indiceAtual, totalSlides, intervaloMs]);

  const registrarSlide = (indice) => (el) => {
    slidesRef.current[indice] = el;
  };

  return { containerRef, indiceAtual, registrarSlide };
}
