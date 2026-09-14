import { Home, Compass, Route, Package, MessageCircle } from 'lucide-react';

// Itens da bottom nav (mobile) — a partir da Task 6, essa lista passou a
// ser própria/independente da Navbar desktop (Navbar/itensNav.js): o
// plano é substituir, uma "big task" de cada vez, os placeholders
// genéricos do bottom menu por abas reais do site. Até agora:
// - Descubra (Task 6, renomeada de "Roteiros" na Task 6.1) no lugar do
//   antigo "Sobre" — catálogo de locais pra navegar/descobrir.
// - Roteiros (Task 6.1, renomeada de "Criar") no lugar do antigo
//   "Destinos" — onde o usuário monta o próprio roteiro. A página
//   /destinos continua existindo e acessível por outros lugares (Home,
//   busca, dropdown desktop), só perdeu o atalho direto daqui.
// A Navbar desktop continua usando a lista antiga por enquanto — ainda
// não foi alvo de nenhuma task específica.
export const ITENS_BOTTOM_NAV = [
  { rotulo: 'Início', para: '/', fim: true, icone: Home },
  { rotulo: 'Rotas', para: '/rotas', icone: Route },
  { rotulo: 'Descubra', para: '/descubra', icone: Compass },
  { rotulo: 'Pacotes', para: '/pacotes', icone: Package },
  { rotulo: 'Contato', para: '/contato', icone: MessageCircle },
];
