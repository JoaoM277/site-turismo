import axios from 'axios';

// URL base da API. Definida via variável de ambiente (.env), com um
// fallback para desenvolvimento local caso a variável não exista.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Instância única do axios reaproveitada em toda a aplicação.
// Centralizar aqui facilita adicionar, no futuro, interceptors
// (ex: token de autenticação, tratamento global de erros).
const api = axios.create({ baseURL });

export default api;

// --- Funções de acesso a cada recurso da API ---
// Mantidas neste arquivo para que os componentes/páginas nunca
// precisem conhecer detalhes de URLs ou do axios diretamente.

export const buscarDestinos = async (params = {}) => {
  const { data } = await api.get('/destinos', { params });
  return data.dados;
};

export const buscarDestinoPorId = async (id) => {
  const { data } = await api.get(`/destinos/${id}`);
  return data.dados;
};

export const buscarPacotes = async (params = {}) => {
  const { data } = await api.get('/pacotes', { params });
  return data.dados;
};

export const buscarPacotePorId = async (id) => {
  const { data } = await api.get(`/pacotes/${id}`);
  return data.dados;
};

export const criarReserva = async (payload) => {
  const { data } = await api.post('/reservas', payload);
  return data.dados;
};

export const enviarContato = async (payload) => {
  const { data } = await api.post('/contato', payload);
  return data;
};
