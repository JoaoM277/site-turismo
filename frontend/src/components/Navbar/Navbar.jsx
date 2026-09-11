import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, MenuIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Estrutura do menu principal: cada item vira um dropdown (desktop) /
// grupo expansível (mobile) com um link "ver tudo" + subitens de exemplo.
// Rótulos, descrições e destinos são mockups — servem só pra validar o
// padrão visual; entram como conteúdo/rotas reais numa task futura.
const ITENS_NAV = [
  {
    rotulo: 'Início',
    para: '/',
    fim: true,
    subitens: [
      { rotulo: 'Destaques da Semana', descricao: 'Exemplo — atrações em destaque na home.' },
      { rotulo: 'Eventos Próximos', descricao: 'Exemplo — agenda de eventos da cidade.' },
      { rotulo: 'Notícias', descricao: 'Exemplo — novidades e avisos municipais.' },
    ],
  },
  {
    rotulo: 'Sobre',
    para: '/',
    subitens: [
      { rotulo: 'Sobre a Cidade', descricao: 'Exemplo — história e apresentação do destino.' },
      { rotulo: 'Como Chegar', descricao: 'Exemplo — acesso rodoviário, distâncias, mapas.' },
      { rotulo: 'Perguntas Frequentes', descricao: 'Exemplo — dúvidas comuns de quem visita.' },
    ],
  },
  {
    rotulo: 'Destinos',
    para: '/destinos',
    subitens: [
      { rotulo: 'Cachoeiras', descricao: 'Exemplo — quedas d’água e piscinas naturais.' },
      { rotulo: 'Centro Histórico', descricao: 'Exemplo — pontos históricos e arquitetura.' },
      { rotulo: 'Trilhas e Natureza', descricao: 'Exemplo — trilhas ecológicas da região.' },
    ],
  },
  {
    rotulo: 'Pacotes',
    para: '/pacotes',
    subitens: [
      { rotulo: 'Pacotes em Família', descricao: 'Exemplo — roteiros pensados pra todas as idades.' },
      { rotulo: 'Aventura e Natureza', descricao: 'Exemplo — trilhas, cachoeiras e ecoturismo.' },
      { rotulo: 'Promoções', descricao: 'Exemplo — ofertas e pacotes com desconto.' },
    ],
  },
  {
    rotulo: 'Contato',
    para: '/contato',
    subitens: [
      { rotulo: 'Fale Conosco', descricao: 'Exemplo — formulário e canais de atendimento.' },
      { rotulo: 'Localização', descricao: 'Exemplo — endereço e mapa da secretaria de turismo.' },
      { rotulo: 'Redes Sociais', descricao: 'Exemplo — perfis oficiais da cidade.' },
    ],
  },
];

// Conteúdo do dropdown de um item: link "ver tudo" + subitens de exemplo.
// Reaproveitado tanto no NavigationMenu (desktop) quanto no <details> mobile.
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
function TopHero() {
  return (
    <div className="bg-primary text-primary-foreground">
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
export default function Navbar() {
  const location = useLocation();

  const estaAtivo = (item) => (item.fim ? location.pathname === item.para : location.pathname.startsWith(item.para));

  return (
    <header className="border-b border-border">
      <TopHero />

      <div className="sticky top-0 z-50 border-t border-border bg-background">
        <div className="container flex h-14 items-center justify-center">
          {/* Navegação desktop. viewport={false}: sem essa opção, o Radix
              renderiza todos os dropdowns dentro de um único painel
              compartilhado ancorado no início do menu — por isso o
              dropdown do último item aparecia embaixo do primeiro. Com
              viewport={false}, cada NavigationMenuContent nasce relativo
              ao seu próprio NavigationMenuItem, descendo sempre alinhado
              com o botão que o abriu. */}
          <NavigationMenu className="hidden md:flex" viewport={false}>
            <NavigationMenuList>
              {ITENS_NAV.map((item) => (
                <NavigationMenuItem key={item.rotulo}>
                  <NavigationMenuTrigger
                    className={cn('rounded-lg', estaAtivo(item) && 'bg-accent/50 text-accent-foreground')}
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

          {/* Navegação mobile: botão único abre um painel lateral (Sheet)
              com cada item como um grupo expansível (<details>/<summary>,
              sem depender de estado em React pra abrir/fechar). */}
          <Sheet>
            <SheetTrigger
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground md:hidden"
              aria-label="Abrir menu de navegação"
            >
              <MenuIcon className="size-5" aria-hidden="true" />
              Menu
            </SheetTrigger>

            <SheetContent side="right" className="w-72 rounded-l-2xl">
              <SheetHeader>
                <SheetTitle>Barra do Corda</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4 pb-4">
                {ITENS_NAV.map((item) => (
                  <details key={item.rotulo} className="group rounded-lg">
                    <summary
                      className={cn(
                        'flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground [&::-webkit-details-marker]:hidden',
                        estaAtivo(item) && 'bg-accent/50 text-accent-foreground',
                      )}
                    >
                      {item.rotulo}
                      <ChevronDownIcon className="size-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>

                    <div className="ml-2 flex flex-col gap-0.5 border-l border-border py-1 pl-3">
                      <SheetClose asChild>
                        <Link to={item.para} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-accent-foreground">
                          Ver tudo em {item.rotulo}
                        </Link>
                      </SheetClose>
                      {item.subitens.map((sub) => (
                        <SheetClose asChild key={sub.rotulo}>
                          <Link
                            to={item.para}
                            className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          >
                            {sub.rotulo}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </details>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
