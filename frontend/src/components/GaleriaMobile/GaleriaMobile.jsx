import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

import { otimizarImagem } from '@/utils/imagem';

// Mosaico de fotos da cidade — reaproveita imagens já usadas em outras
// seções (Hero, Locais em Destaque) em vez de puxar fotos novas de fora,
// mesmo raciocínio já seguido desde a Task 5.
const FOTOS_MOSAICO = [
  'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
  'https://images.unsplash.com/photo-1526392060635-9d6019884377',
  'https://images.unsplash.com/photo-1585208798174-6cedd86e019a',
  'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
  'https://images.unsplash.com/photo-1558642084-fd07fae5282e',
];

// Seção "Da Galeria" (Task 10) — mobile, Home: banner com um mosaico de
// fotos da cidade, chamando pra galeria de fotos. O card inteiro é um
// link pra /galeria (Task 8 — ainda "Em breve"; quando a galeria de
// verdade existir, esse link já funciona sem precisar mudar nada aqui).
export default function GaleriaMobile() {
  return (
    <section className="mx-4 mt-4 md:hidden">
      <h2 className="mb-2 px-1 text-base font-bold text-foreground">Galeria</h2>

      <Link to="/galeria" className="relative block h-48 overflow-hidden rounded-3xl shadow-xl">
        <div className="grid h-full grid-cols-3 grid-rows-2 gap-0.5">
          {FOTOS_MOSAICO.map((foto) => (
            <img
              key={foto}
              src={otimizarImagem(foto, { largura: 300 })}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
            <Camera size={20} aria-hidden="true" />
          </span>
          <h3 className="text-lg font-bold leading-tight text-white">Deixe registrado seu passeio</h3>
          <p className="text-xs text-white/85">Veja e compartilhe fotos de quem já visitou Barra do Corda</p>
        </div>
      </Link>
    </section>
  );
}
