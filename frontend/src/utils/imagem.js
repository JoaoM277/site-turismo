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
