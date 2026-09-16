// "Banco de dados" mock da Galeria de Fotos (Task 12), em memória —
// perdido a cada reinício do servidor, igual reservas.js. Fotos novas
// entram via POST /api/galeria com `status: 'pendente'` (ver
// controllers/galeriaController.js); só aparecem na galeria pública
// depois de aprovadas.
//
// `status`: 'pendente' | 'aprovada' | 'rejeitada'. Moderação em si (o
// painel/fluxo que decide aprovar ou rejeitar) ainda não existe — é
// trabalho de uma task futura. Por enquanto, aprovar uma foto pendente
// significa editar esse campo manualmente (mesma filosofia de "edição
// direta no código" já adotada pro resto do conteúdo do site).
//
// `largura`/`altura`: dimensões reais da imagem, enviadas pelo próprio
// navegador no upload (lidas do arquivo antes de mandar) — é o que
// permite ao grid em mosaico (masonry) da Task 12 reservar o espaço
// certo pra cada foto sem cortar nem distorcer.
//
// Sementes abaixo: fotos de exemplo já "aprovadas" pra galeria não
// nascer vazia, reaproveitando imagens do Unsplash já usadas em outras
// partes do site (mesmo raciocínio de sempre — evita puxar fotos novas
// não verificadas) com usernames fictícios.
const galeria = [
  {
    id: 1,
    username: 'joao_viajante',
    url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
    largura: 1200,
    altura: 800,
    status: 'aprovada',
    criadaEm: '2026-09-01T10:00:00.000Z',
  },
  {
    id: 2,
    username: 'maria.turista',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    largura: 800,
    altura: 1200,
    status: 'aprovada',
    criadaEm: '2026-09-02T14:30:00.000Z',
  },
  {
    id: 3,
    username: 'carlosbdc',
    url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    largura: 1000,
    altura: 1000,
    status: 'aprovada',
    criadaEm: '2026-09-03T09:15:00.000Z',
  },
  {
    id: 4,
    username: 'ana.explora',
    url: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
    largura: 800,
    altura: 1300,
    status: 'aprovada',
    criadaEm: '2026-09-04T17:45:00.000Z',
  },
  {
    id: 5,
    username: 'pedro_viagens',
    url: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e',
    largura: 1300,
    altura: 900,
    status: 'aprovada',
    criadaEm: '2026-09-05T11:20:00.000Z',
  },
  {
    id: 6,
    username: 'lu.fotografa',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    largura: 900,
    altura: 1200,
    status: 'aprovada',
    criadaEm: '2026-09-06T16:00:00.000Z',
  },
  {
    id: 7,
    username: 'rafael.mdc',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    largura: 1200,
    altura: 750,
    status: 'aprovada',
    criadaEm: '2026-09-07T08:30:00.000Z',
  },
  {
    id: 8,
    username: 'bianca_viaja',
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    largura: 900,
    altura: 900,
    status: 'aprovada',
    criadaEm: '2026-09-08T19:10:00.000Z',
  },
];

module.exports = galeria;
