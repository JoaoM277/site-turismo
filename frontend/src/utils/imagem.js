import { URL_ARQUIVOS } from '@/services/api';

// Resolve uma URL de imagem que pode vir de três formas (Task 12): uma
// URL absoluta de verdade (ex: Unsplash), um caminho relativo servido
// pelo próprio FRONTEND (ex: "/imagens/galeria/foto.jpg" — fotos reais
// versionadas no repo, ver CONTEUDO-INTERNO.md) ou um caminho relativo
// servido pelo BACKEND (ex: "/uploads/galeria/foto.jpg", enviado em
// runtime por um usuário via upload). Sem distinguir os dois últimos,
// "/imagens/..." tentaria carregar a partir da origem do backend (onde
// o arquivo não existe) em vez da origem correta, o frontend.
export function resolverUrlImagem(url) {
  if (!url) return url;
  if (url.startsWith('http') || url.startsWith('/imagens/')) return url;
  return `${URL_ARQUIVOS}${url}`;
}

// Adiciona parâmetros de redimensionamento/compressão às URLs do
// Unsplash (a CDN deles é baseada em imgix, que já suporta isso via
// query string). Sem isso, um <img> exibido a 300px de largura baixava
// a foto ORIGINAL do Unsplash — medimos ~7,4MB numa única foto sem
// parâmetro nenhum, contra ~120KB pedindo w=800&q=70 (98% menor, mesma
// foto). Multiplicado por todo card/carrossel/galeria do site, era de
// longe o maior gargalo de "renderização das fotos" (Task Extra).
//
// Só mexe em URLs do Unsplash — fotos locais reais de Barra do Corda
// (arquivo em frontend/public/imagens/, ver CONTEUDO-INTERNO.md) ou
// qualquer outra origem (ex: pravatar.cc nos depoimentos) voltam sem
// alteração, sem quebrar nada.
export function otimizarImagem(url, { largura = 800, qualidade = 70 } = {}) {
  if (!url || !url.includes('images.unsplash.com')) return url;
  const separador = url.includes('?') ? '&' : '?';
  return `${url}${separador}auto=format&fit=crop&w=${largura}&q=${qualidade}`;
}
