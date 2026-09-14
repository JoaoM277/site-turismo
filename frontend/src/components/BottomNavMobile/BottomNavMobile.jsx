import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { itemEstaAtivo } from '@/components/Navbar/itensNav';
import { ITENS_BOTTOM_NAV } from './itensBottomNav';

const LARGURA_ROTULO = 72; // px — largura máxima do texto que aparece ao lado do ícone ativo.

// Navegação principal em telas pequenas: barra flutuante em pílula, ícone
// sempre visível, rótulo em texto aparece (com transição de largura) só
// no item da rota atual.
//
// Todas as animações (entrada, expansão do rótulo, feedback de toque) são
// CSS puro (keyframe em index.css + `transition`/`active:`) — chegamos a
// usar framer-motion aqui (Task 2.2.2), mas sozinho ele inflava o bundle
// final em ~127KB (~42KB gzip) só por causa deste componente, e tudo que
// animava eram interpolações entre valores fixos (opacity, scale, largura
// em px): exatamente o que o CSS já resolve nativamente, na GPU, sem
// runtime de JS por frame.
export default function BottomNavMobile() {
  const location = useLocation();

  return (
    <nav
      aria-label="Navegação principal"
      className="animate-entrada-flutuante fixed inset-x-0 bottom-4 z-50 mx-auto flex h-[52px] w-fit min-w-[320px] max-w-[95vw] items-center space-x-1 rounded-full border border-border bg-background p-2 shadow-xl md:hidden"
    >
      {ITENS_BOTTOM_NAV.map((item) => {
        const Icone = item.icone;
        const ativo = itemEstaAtivo(item, location.pathname);

        return (
          <Link
            key={item.rotulo}
            to={item.para}
            aria-current={ativo ? 'page' : undefined}
            aria-label={item.rotulo}
            className={cn(
              'relative flex h-10 min-h-[40px] max-h-[44px] min-w-[44px] items-center gap-0 rounded-full px-3 py-2 transition-[background-color,color,transform] duration-200 active:scale-[0.97] focus:outline-none focus-visible:ring-0',
              ativo
                ? 'gap-2 bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary'
                : 'bg-transparent text-muted-foreground hover:bg-muted',
            )}
          >
            <Icone size={22} strokeWidth={2} aria-hidden="true" className="shrink-0 transition-colors duration-200" />

            <div
              style={{ width: ativo ? `${LARGURA_ROTULO}px` : '0px', marginLeft: ativo ? '8px' : '0px' }}
              className="flex max-w-[72px] items-center overflow-hidden transition-[width,margin-left] duration-300 ease-out"
            >
              <span
                className={cn(
                  'select-none overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.625rem,0.5263rem+0.5263vw,1rem)] font-medium leading-[1.9] transition-opacity duration-200',
                  ativo ? 'text-primary opacity-100' : 'opacity-0',
                )}
                title={item.rotulo}
              >
                {item.rotulo}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
