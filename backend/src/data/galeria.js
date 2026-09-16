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
// `largura`/`altura`: dimensões reais da imagem — no upload de um
// usuário vêm do próprio navegador (lidas antes de enviar); nas fotos
// abaixo vêm do redimensionamento feito antes de entrarem no repo. É o
// que permite ao grid em mosaico (masonry) reservar o espaço certo pra
// cada foto sem cortar nem distorcer.
//
// As 71 fotos abaixo são reais, tiradas em Barra do Corda —
// arquivos em frontend/public/imagens/galeria/ (ver CONTEUDO-INTERNO.md),
// redimensionadas/comprimidas (script pontual, ~75MB -> ~15MB) antes de
// entrar aqui. Aprovadas direto (não passaram pela fila de moderação de
// usuário porque foram adicionadas pelo próprio time, não por visitantes).
const galeria = [
  { id: 1, username: 'barradocorda.oficial', url: '/imagens/galeria/1000816371.jpg', largura: 1308, altura: 736, status: 'aprovada', criadaEm: '2026-09-15T12:00:00.000Z' },
  { id: 2, username: 'barradocorda.oficial', url: '/imagens/galeria/1000816379.jpg', largura: 1228, altura: 736, status: 'aprovada', criadaEm: '2026-09-15T12:01:00.000Z' },
  { id: 3, username: 'barradocorda.oficial', url: '/imagens/galeria/file_000000000700820eaf6c19af1b7b6c3f.jpg', largura: 1600, altura: 900, status: 'aprovada', criadaEm: '2026-09-15T12:02:00.000Z' },
  { id: 4, username: 'barradocorda.oficial', url: '/imagens/galeria/file_000000008dac820eb51f95aa33e8a72e.jpg', largura: 1600, altura: 900, status: 'aprovada', criadaEm: '2026-09-15T12:03:00.000Z' },
  { id: 5, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0064.jpg', largura: 1024, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:04:00.000Z' },
  { id: 6, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0065.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:05:00.000Z' },
  { id: 7, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0066.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:06:00.000Z' },
  { id: 8, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0067.jpg', largura: 795, altura: 1061, status: 'aprovada', criadaEm: '2026-09-15T12:07:00.000Z' },
  { id: 9, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0068.jpg', largura: 1024, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:08:00.000Z' },
  { id: 10, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0069.jpg', largura: 1024, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:09:00.000Z' },
  { id: 11, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0070.jpg', largura: 1015, altura: 1269, status: 'aprovada', criadaEm: '2026-09-15T12:10:00.000Z' },
  { id: 12, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0071.jpg', largura: 1024, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:11:00.000Z' },
  { id: 13, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0072.jpg', largura: 1024, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:12:00.000Z' },
  { id: 14, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0073.jpg', largura: 1023, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:13:00.000Z' },
  { id: 15, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0074.jpg', largura: 1023, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:14:00.000Z' },
  { id: 16, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0075.jpg', largura: 1024, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:15:00.000Z' },
  { id: 17, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0076.jpg', largura: 1280, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:16:00.000Z' },
  { id: 18, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0083.jpg', largura: 1280, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:17:00.000Z' },
  { id: 19, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0084.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:18:00.000Z' },
  { id: 20, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0086.jpg', largura: 1199, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:19:00.000Z' },
  { id: 21, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0087.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:20:00.000Z' },
  { id: 22, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0088.jpg', largura: 1280, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:21:00.000Z' },
  { id: 23, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0089.jpg', largura: 1280, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:22:00.000Z' },
  { id: 24, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0090.jpg', largura: 1280, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:23:00.000Z' },
  { id: 25, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0091.jpg', largura: 1280, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:24:00.000Z' },
  { id: 26, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0092.jpg', largura: 1280, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:25:00.000Z' },
  { id: 27, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0093.jpg', largura: 1280, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:26:00.000Z' },
  { id: 28, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0094.jpg', largura: 720, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:27:00.000Z' },
  { id: 29, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0095.jpg', largura: 622, altura: 1106, status: 'aprovada', criadaEm: '2026-09-15T12:28:00.000Z' },
  { id: 30, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0096.jpg', largura: 900, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:29:00.000Z' },
  { id: 31, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0097.jpg', largura: 900, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:30:00.000Z' },
  { id: 32, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0098.jpg', largura: 720, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:31:00.000Z' },
  { id: 33, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0099.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:32:00.000Z' },
  { id: 34, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0100.jpg', largura: 1280, altura: 960, status: 'aprovada', criadaEm: '2026-09-15T12:33:00.000Z' },
  { id: 35, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0101.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:34:00.000Z' },
  { id: 36, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0102.jpg', largura: 720, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:35:00.000Z' },
  { id: 37, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0104.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:36:00.000Z' },
  { id: 38, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0106.jpg', largura: 1280, altura: 960, status: 'aprovada', criadaEm: '2026-09-15T12:37:00.000Z' },
  { id: 39, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0107.jpg', largura: 720, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:38:00.000Z' },
  { id: 40, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0108.jpg', largura: 1600, altura: 1200, status: 'aprovada', criadaEm: '2026-09-15T12:39:00.000Z' },
  { id: 41, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0109.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:40:00.000Z' },
  { id: 42, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0110.jpg', largura: 900, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:41:00.000Z' },
  { id: 43, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0115.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:42:00.000Z' },
  { id: 44, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0116.jpg', largura: 1600, altura: 1200, status: 'aprovada', criadaEm: '2026-09-15T12:43:00.000Z' },
  { id: 45, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0117.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:44:00.000Z' },
  { id: 46, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0118.jpg', largura: 900, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:45:00.000Z' },
  { id: 47, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0119.jpg', largura: 900, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:46:00.000Z' },
  { id: 48, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0120.jpg', largura: 900, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:47:00.000Z' },
  { id: 49, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0121.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T12:48:00.000Z' },
  { id: 50, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0123.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:49:00.000Z' },
  { id: 51, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0124.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:50:00.000Z' },
  { id: 52, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0125.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:51:00.000Z' },
  { id: 53, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0126.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:52:00.000Z' },
  { id: 54, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0127.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:53:00.000Z' },
  { id: 55, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0128.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:54:00.000Z' },
  { id: 56, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0129.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:55:00.000Z' },
  { id: 57, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0130.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:56:00.000Z' },
  { id: 58, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0131.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:57:00.000Z' },
  { id: 59, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0132.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:58:00.000Z' },
  { id: 60, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0133.jpg', largura: 960, altura: 1280, status: 'aprovada', criadaEm: '2026-09-15T12:59:00.000Z' },
  { id: 61, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0145.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:00:00.000Z' },
  { id: 62, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0146.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:01:00.000Z' },
  { id: 63, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0147.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:02:00.000Z' },
  { id: 64, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0148.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:03:00.000Z' },
  { id: 65, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0149.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:04:00.000Z' },
  { id: 66, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0150.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:05:00.000Z' },
  { id: 67, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0151.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:06:00.000Z' },
  { id: 68, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0152.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:07:00.000Z' },
  { id: 69, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0153.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:08:00.000Z' },
  { id: 70, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0154.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:09:00.000Z' },
  { id: 71, username: 'barradocorda.oficial', url: '/imagens/galeria/IMG-20260915-WA0155.jpg', largura: 1200, altura: 1600, status: 'aprovada', criadaEm: '2026-09-15T13:10:00.000Z' },
];

module.exports = galeria;
