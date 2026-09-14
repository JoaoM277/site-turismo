import React from 'react';
import { MapPinned } from 'lucide-react';

// Página "Mapa" — placeholder mínimo (Task 8). Existe pra dar ao banner
// "Veja no mapa" da Home uma rota real (em vez de um link morto) até essa
// aba ser construída de verdade numa task futura — mesmo raciocínio já
// usado em Sobre.jsx: nenhum link do site aponta pra lugar nenhum, ainda
// que o destino final seja só "em breve".
export default function Mapa() {
  return (
    <div className="mx-4 mt-3 rounded-3xl border border-border bg-background p-6 text-center shadow-xl md:mx-auto md:mt-8 md:max-w-lg">
      <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MapPinned size={26} aria-hidden="true" />
      </span>
      <span className="mx-auto mb-2 block w-fit rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Em breve
      </span>
      <h1 className="text-xl font-bold text-foreground">Mapa de Barra do Corda</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Em breve você vai poder encontrar cada ponto turístico visualmente num mapa interativo.
      </p>
    </div>
  );
}
