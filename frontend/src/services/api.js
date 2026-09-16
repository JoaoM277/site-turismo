import axios from 'axios';

// URL base da API. Definida via variável de ambiente (.env), com um
// fallback para desenvolvimento local caso a variável não exista.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Instância única do axios reaproveitada em toda a aplicação.
// Centralizar aqui facilita adicionar, no futuro, interceptors
// (ex: token de autenticação, tratamento global de erros).
const api = axios.create({ baseURL });

export default api;

// Origem "crua" do backend, sem o sufixo /api — os arquivos enviados na
// Galeria (Task 12) são servidos como estático em /uploads, fora do
// prefixo da API, então precisam desse endereço base diferente.
export const URL_ARQUIVOS = baseURL.replace(/\/api\/?$/, '');

// --- Cache em memória das buscas (GET) ---
//
// `useFetch` não tinha cache nenhum: toda vez que um componente montava
// (ex: voltar pra Home depois de visitar outra aba, já que o React
// Router desmonta a página anterior) ele refazia a chamada de rede do
// zero — mesmo pra dados que não mudam durante a sessão. Isso também
// escondia uma duplicação real: a Home busca destinos pros "destaques" e
// a BuscaMobile busca os MESMOS destinos (+ pacotes) pro índice de busca,
// então só a Home já disparava 2 requisições repetidas pra /api/destinos.
//
// Cacheamos a PROMISE (não o resultado já resolvido): se dois
// componentes pedirem a mesma coisa ao mesmo tempo, os dois reaproveitam
// a mesma chamada de rede em andamento em vez de disparar duas. Em caso
// de erro, removemos do cache — senão um erro de rede passageiro ficaria
// preso pro resto da sessão.
const cache = new Map();

function comCache(chave, buscar) {
  if (!cache.has(chave)) {
    cache.set(
      chave,
      buscar().catch((erro) => {
        cache.delete(chave);
        throw erro;
      }),
    );
  }
  return cache.get(chave);
}

// --- Funções de acesso a cada recurso da API ---
// Mantidas neste arquivo para que os componentes/páginas nunca
// precisem conhecer detalhes de URLs ou do axios diretamente.

export const buscarDestinos = async (params = {}) => {
  return comCache(`destinos:${JSON.stringify(params)}`, async () => {
    const { data } = await api.get('/destinos', { params });
    return data.dados;
  });
};

export const buscarDestinoPorId = async (id) => {
  return comCache(`destino:${id}`, async () => {
    const { data } = await api.get(`/destinos/${id}`);
    return data.dados;
  });
};

export const buscarPacotes = async (params = {}) => {
  return comCache(`pacotes:${JSON.stringify(params)}`, async () => {
    const { data } = await api.get('/pacotes', { params });
    return data.dados;
  });
};

export const buscarPacotePorId = async (id) => {
  return comCache(`pacote:${id}`, async () => {
    const { data } = await api.get(`/pacotes/${id}`);
    return data.dados;
  });
};

export const buscarLocais = async (params = {}) => {
  return comCache(`locais:${JSON.stringify(params)}`, async () => {
    const { data } = await api.get('/locais', { params });
    return data.dados;
  });
};

export const buscarLocalPorId = async (id) => {
  return comCache(`local:${id}`, async () => {
    const { data } = await api.get(`/locais/${id}`);
    return data.dados;
  });
};

export const buscarEventos = async () => {
  return comCache('eventos', async () => {
    const { data } = await api.get('/eventos');
    return data.dados;
  });
};

// Galeria (Task 12): sem cache de propósito — ao contrário do resto do
// conteúdo (mock, nunca muda sozinho), fotos aprovadas podem aparecer a
// qualquer momento (moderação), então cada visita à página deve buscar
// de novo.
export const buscarFotosGaleria = async () => {
  const { data } = await api.get('/galeria');
  return data.dados;
};

// multipart/form-data — envia o arquivo de imagem + username + as
// dimensões reais (lidas no navegador antes de enviar, ver
// EnviarFotoModal.jsx) pro masonry da galeria já nascer com o tamanho
// certo quando a foto for aprovada.
export const enviarFotoGaleria = async ({ arquivo, username, largura, altura }) => {
  const formData = new FormData();
  formData.append('foto', arquivo);
  formData.append('username', username);
  formData.append('largura', largura);
  formData.append('altura', altura);

  const { data } = await api.post('/galeria', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

// Reservas e contato são ações (escrita), nunca cacheadas.
export const criarReserva = async (payload) => {
  const { data } = await api.post('/reservas', payload);
  return data.dados;
};

export const enviarContato = async (payload) => {
  const { data } = await api.post('/contato', payload);
  return data;
};
