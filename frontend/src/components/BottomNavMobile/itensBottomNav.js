import { Home, Compass, Route, Images, MessageCircle } from 'lucide-react';

// Itens da bottom nav (mobile) — a partir da Task 6, essa lista passou a
// ser própria/independente da Navbar desktop (Navbar/itensNav.js): o
// plano é substituir, uma "big task" de cada vez, os placeholders
// genéricos do bottom menu por abas reais do site. Até agora:
// - Descubra (Task 6, renomeada de "Roteiros" na Task 6.1) no lugar do
//   antigo "Sobre" — catálogo de locais pra navegar/descobrir.
// - Roteiros (Task 6.1, renomeada de "Criar") no lugar do antigo
//   "Destinos" — onde o usuário monta o próprio roteiro.
// - Galeria (task em andamento) no lugar do antigo "Pacotes" — rota
//   /galeria já existe (placeholder "Em breve" criado na Task 8, ainda
//   sem o conteúdo de verdade da galeria; isso vem nas próximas etapas
//   dessa mesma task). A página /pacotes continua existindo e acessível
//   por outros lugares (detalhe de destino, dropdown desktop), só
//   perdeu o atalho direto daqui — mesmo tratamento já dado a
//   Sobre/Destinos antes.
// A Navbar desktop continua usando a lista antiga por enquanto — ainda
// não foi alvo de nenhuma task específica.
export const ITENS_BOTTOM_NAV = [
  { rotulo: 'Início', para: '/', fim: true, icone: Home },
  { rotulo: 'Descubra', para: '/descubra', icone: Compass },
  { rotulo: 'Roteiros', para: '/roteiros', icone: Route },
  { rotulo: 'Galeria', para: '/galeria', icone: Images },
  { rotulo: 'Contato', para: '/contato', icone: MessageCircle },
];
