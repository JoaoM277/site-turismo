import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { ITENS_NAV, itemEstaAtivo } from './itensNav';

// Conteúdo do dropdown de um item: link "ver tudo" + subitens de exemplo.
function ItensDropdown({ item }) {
  return (
    <ul className="grid w-72 gap-1 p-1">
      <li>
        <NavigationMenuLink asChild>
          <Link
            to={item.para}
            className="flex items-center justify-between rounded-lg bg-accent/60 px-3 py-2 text-sm font-semibold text-accent-foreground"
          >
            Ver tudo em {item.rotulo}
            <span aria-hidden="true">→</span>
          </Link>
        </NavigationMenuLink>
      </li>
      {item.subitens.map((sub) => (
        <li key={sub.rotulo}>
          <NavigationMenuLink asChild>
            <Link to={item.para}>
              <span className="text-sm font-medium">{sub.rotulo}</span>
              <span className="text-xs text-muted-foreground">{sub.descricao}</span>
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

// Faixa de destaque acima da barra de navegação. Só um placeholder de
// texto pra testar a composição visual — vira o hero de verdade
// (imagem, chamada, CTA) quando o conteúdo de Barra do Corda for definido.
//
// Só aparece a partir do `md`: no mobile ela foi substituída pela
// TopBarSaudacao (Task 3), exclusiva da Home — nas demais páginas mobile
// não existe nenhuma faixa de topo, só o conteúdo + a BottomNavMobile.
function TopHero() {
  return (
    <div className="hidden bg-primary text-primary-foreground md:block">
      <div className="container py-8 text-center md:py-10">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Bem-vindo a Barra do Corda</h1>
        <p className="mx-auto mt-1 max-w-md text-sm text-primary-foreground/80">
          Texto de exemplo — portal de turismo municipal (conteúdo definitivo em task futura)
        </p>
      </div>
    </div>
  );
}

// Cabeçalho do site: TopHero (faixa de boas-vindas) + barra de navegação
// sticky logo abaixo. Sem logo — sem elementos de identidade visual "de
// empresa", o espaço todo da barra fica para a navegação em si, mais
// coerente com um portal público municipal.
//
// A partir da Task 2 (foco mobile), este componente só cuida da
// navegação de telas médias/grandes (`hidden md:flex` no NavigationMenu);
// em telas pequenas a navegação vive na BottomNavMobile (ver
// components/BottomNavMobile), um padrão mais adequado a toque/polegar.
export default function Navbar() {
  const location = useLocation();

  return (
    // Sem TopHero nem barra de navegação visíveis no mobile (ambas somem
    // abaixo do `md`), a borda inferior do header também fica só a
    // partir do `md` — senão sobraria uma linha solta no topo da tela.
    <header className="md:border-b md:border-border">
      <TopHero />

      {/* Em telas pequenas essa barra não tem mais o que mostrar (a
          navegação mobile é a BottomNavMobile), então ela some inteira em
          vez de deixar uma faixa vazia — só existe a partir do md. */}
      <div className="hidden border-t border-border bg-background md:sticky md:top-0 md:z-50 md:block">
        <div className="container flex h-14 items-center justify-center">
          {/* viewport={false}: sem essa opção, o Radix renderiza todos os
              dropdowns dentro de um único painel compartilhado ancorado no
              início do menu — por isso o dropdown do último item aparecia
              embaixo do primeiro. Com viewport={false}, cada
              NavigationMenuContent nasce relativo ao seu próprio
              NavigationMenuItem, descendo sempre alinhado com o botão que
              o abriu. */}
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {ITENS_NAV.map((item) => (
                <NavigationMenuItem key={item.rotulo}>
                  <NavigationMenuTrigger
                    className={cn(
                      'rounded-lg',
                      itemEstaAtivo(item, location.pathname) && 'bg-accent/50 text-accent-foreground',
                    )}
                  >
                    {item.rotulo}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-xl">
                    <ItensDropdown item={item} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
