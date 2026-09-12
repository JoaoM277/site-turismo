import React from 'react';
import { Sunrise, Sun, Moon } from 'lucide-react';

// Saudação muda com o horário do dispositivo — bem pequeno, sem
// depender de nenhuma lib de data (ver política de dependências em
// memória: só adicionar peso quando o CSS/JS nativo não resolver).
function obterSaudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return { texto: 'Bom dia', Icone: Sunrise };
  if (hora < 18) return { texto: 'Boa tarde', Icone: Sun };
  return { texto: 'Boa noite', Icone: Moon };
}

// Top bar exclusiva da Home no mobile (Task 3): um cartão de saudação,
// flutuando com a mesma margem/linguagem visual da BottomNavMobile
// (borda, fundo, sombra, cantos bem arredondados) — harmonioso com o
// menu inferior já implementado, sem repetir o TopHero genérico (esse
// segue só pro desktop, ver Navbar.jsx).
export default function TopBarSaudacao() {
  const { texto, Icone } = obterSaudacao();

  return (
    <div className="mx-4 mt-4 flex items-center gap-3 rounded-3xl border border-border bg-background p-4 shadow-xl md:hidden">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icone size={22} strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{texto}, visitante</p>
        <p className="truncate text-base font-semibold text-foreground">Bem-vindo a Barra do Corda</p>
      </div>
    </div>
  );
}
