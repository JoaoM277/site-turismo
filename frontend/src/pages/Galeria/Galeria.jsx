import React from 'react';
import { Images } from 'lucide-react';

// Página "Galeria" — placeholder mínimo (Task 8), mesmo raciocínio de
// Mapa.jsx: dá ao banner "Galeria de fotos" da Home uma rota real até
// essa aba ser construída de verdade.
export default function Galeria() {
  return (
    <div className="mx-4 mt-3 rounded-3xl border border-border bg-background p-6 text-center shadow-xl md:mx-auto md:mt-8 md:max-w-lg">
      <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Images size={26} aria-hidden="true" />
      </span>
      <span className="mx-auto mb-2 block w-fit rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Em breve
      </span>
      <h1 className="text-xl font-bold text-foreground">Galeria de Fotos</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Em breve você vai poder ver imagens dos pontos mais bonitos de Barra do Corda aqui.
      </p>
    </div>
  );
}
