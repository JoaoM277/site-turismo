// Temperatura atual de Barra do Corda (MA), via Open-Meteo — API pública
// gratuita, sem chave de API e com CORS liberado, então dá pra chamar
// direto do navegador sem passar pelo nosso backend.
const LATITUDE = -5.5058;
const LONGITUDE = -45.2467;
const URL_CLIMA = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m&timezone=America%2FSao_Paulo`;

// Cache com validade curta (10 min): ao contrário dos outros dados do
// site (mock, nunca mudam sozinhos), temperatura muda de verdade — um
// cache "pra sempre" como o de services/api.js ficaria desatualizado.
// Ainda assim, evita rebuscar a cada re-render/troca rápida de aba.
const TTL_CACHE_MS = 10 * 60 * 1000;
let cache = null; // { temperatura, expiraEm }

export async function buscarTemperaturaAtual() {
  if (cache && Date.now() < cache.expiraEm) {
    return cache.temperatura;
  }

  const resposta = await fetch(URL_CLIMA);
  if (!resposta.ok) throw new Error('Não foi possível obter a temperatura atual');

  const dados = await resposta.json();
  const temperatura = Math.round(dados.current.temperature_2m);

  cache = { temperatura, expiraEm: Date.now() + TTL_CACHE_MS };
  return temperatura;
}
