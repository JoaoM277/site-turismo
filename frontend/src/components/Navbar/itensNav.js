import { Home, Info, MapPin, Package, MessageCircle } from 'lucide-react';

// Estrutura do menu principal, compartilhada entre a navegação desktop
// (Navbar, com dropdown) e a navegação mobile (BottomNavMobile, ícone +
// rótulo). Rótulos, descrições e destinos são mockups — servem só pra
// validar o padrão visual; entram como conteúdo/rotas reais numa task
// futura. `icone` é o componente do lucide-react usado pela bottom nav
// (a Navbar desktop, por enquanto, não usa ícones).
export const ITENS_NAV = [
  {
    rotulo: 'Início',
    para: '/',
    fim: true,
    icone: Home,
    subitens: [
      { rotulo: 'Destaques da Semana', descricao: 'Exemplo — atrações em destaque na home.' },
      { rotulo: 'Eventos Próximos', descricao: 'Exemplo — agenda de eventos da cidade.' },
      { rotulo: 'Notícias', descricao: 'Exemplo — novidades e avisos municipais.' },
    ],
  },
  {
    rotulo: 'Sobre',
    para: '/sobre',
    icone: Info,
    subitens: [
      { rotulo: 'Sobre a Cidade', descricao: 'Exemplo — história e apresentação do destino.' },
      { rotulo: 'Como Chegar', descricao: 'Exemplo — acesso rodoviário, distâncias, mapas.' },
      { rotulo: 'Perguntas Frequentes', descricao: 'Exemplo — dúvidas comuns de quem visita.' },
    ],
  },
  {
    rotulo: 'Destinos',
    para: '/destinos',
    icone: MapPin,
    subitens: [
      { rotulo: 'Cachoeiras', descricao: 'Exemplo — quedas d’água e piscinas naturais.' },
      { rotulo: 'Centro Histórico', descricao: 'Exemplo — pontos históricos e arquitetura.' },
      { rotulo: 'Trilhas e Natureza', descricao: 'Exemplo — trilhas ecológicas da região.' },
    ],
  },
  {
    rotulo: 'Pacotes',
    para: '/pacotes',
    icone: Package,
    subitens: [
      { rotulo: 'Pacotes em Família', descricao: 'Exemplo — roteiros pensados pra todas as idades.' },
      { rotulo: 'Aventura e Natureza', descricao: 'Exemplo — trilhas, cachoeiras e ecoturismo.' },
      { rotulo: 'Promoções', descricao: 'Exemplo — ofertas e pacotes com desconto.' },
    ],
  },
  {
    rotulo: 'Contato',
    para: '/contato',
    icone: MessageCircle,
    subitens: [
      { rotulo: 'Fale Conosco', descricao: 'Exemplo — formulário e canais de atendimento.' },
      { rotulo: 'Localização', descricao: 'Exemplo — endereço e mapa da secretaria de turismo.' },
      { rotulo: 'Redes Sociais', descricao: 'Exemplo — perfis oficiais da cidade.' },
    ],
  },
];

// Um item é "ativo" quando a rota atual corresponde a ele — sempre um só
// por vez. Itens com `fim: true` (ex: Início) ou destino "/" só ficam
// ativos na correspondência exata (senão "/" bateria com toda e qualquer
// rota, já que todo caminho começa com "/"); os demais também ativam em
// sub-rotas (ex: /destinos/1 mantém "Destinos" ativo).
//
// `ativavel: false` (não usado por nenhum item no momento) permite marcar
// um item mock que ainda não tenha rota própria, pra ele nunca acender —
// útil se um novo item de exemplo for adicionado antes de ganhar uma
// página de verdade (foi o caso de "Sobre" até ganhar "/sobre").
export function itemEstaAtivo(item, pathname) {
  if (item.ativavel === false) return false;
  if (item.fim || item.para === '/') return pathname === item.para;
  return pathname.startsWith(item.para);
}
