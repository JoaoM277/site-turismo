import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Route, MapPinned, Images, ChevronRight } from 'lucide-react';

// Seção "Explore mais" (Task 8): pequenos banners na Home direcionando
// pras outras abas do site. Mesmo padrão visual/de texto já usado no
// resto da Home e do app — o mesmo "cartão com ícone em badge + título +
// descrição curta + seta" das linhas de local em Descubra
// (CategoriaAccordion) e do badge de ícone da TopBarSaudacao, só que
// promovido a cartão cheio em vez de ficar dentro de um accordion.
//
// Mapa ainda não existe de verdade (aba futura) — pra não apontar pra
// lugar nenhum, tem uma página placeholder "Em breve" (mesmo raciocínio
// já usado em Sobre.jsx), sinalizada aqui com o selo "Em breve". Galeria
// ganhou conteúdo de verdade na Task 12 e perdeu o selo.
const SECOES_EXPLORAR = [
  {
    titulo: 'Descubra Barra do Corda',
    descricao: 'Locais de lazer, saúde e hospedagem organizados por categoria.',
    icone: Compass,
    para: '/descubra',
  },
  {
    titulo: 'Monte seu roteiro',
    descricao: 'Combine os locais que você mais gosta em um roteiro só seu.',
    icone: Route,
    para: '/roteiros',
  },
  {
    titulo: 'Veja no mapa',
    descricao: 'Encontre cada ponto turístico visualmente.',
    icone: MapPinned,
    para: '/rotas',
  },
  {
    titulo: 'Galeria de fotos',
    descricao: 'Imagens dos pontos mais bonitos da cidade.',
    icone: Images,
    para: '/galeria',
  },
];

export default function ExploreMaisMobile() {
  return (
    <section className="mx-4 mt-4 md:hidden">
      <h2 className="mb-2 px-1 text-base font-bold text-foreground">Explore mais</h2>

      <div className="flex flex-col gap-3">
        {SECOES_EXPLORAR.map((secao) => {
          const Icone = secao.icone;

          return (
            <Link
              key={secao.para}
              to={secao.para}
              className="flex items-center gap-3 rounded-3xl border border-border bg-background p-4 shadow-xl transition-colors active:bg-muted"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icone size={20} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">{secao.titulo}</span>
                  {secao.emBreve && (
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      Em breve
                    </span>
                  )}
                </span>
                <span className="line-clamp-1 block text-xs text-muted-foreground">{secao.descricao}</span>
              </span>

              <ChevronRight size={18} className="shrink-0 text-muted-foreground" aria-hidden="true" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
