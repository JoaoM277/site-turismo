// Dados mock (em memória) dos pacotes de viagem.
// Cada pacote referencia um destino pelo campo `destinoId`.
const pacotes = [
  {
    id: 1,
    destinoId: 1,
    titulo: 'Rio Completo — 5 dias',
    descricao: 'Hospedagem em Copacabana, city tour e passeio ao Cristo Redentor.',
    duracaoDias: 5,
    preco: 2400,
    inclui: ['Hospedagem', 'Café da manhã', 'City tour', 'Transfer aeroporto'],
  },
  {
    id: 2,
    destinoId: 2,
    titulo: 'Noronha Ecológico — 7 dias',
    descricao: 'Mergulho, trilhas e passeio de barco pelas praias mais bonitas do arquipélago.',
    duracaoDias: 7,
    preco: 5900,
    inclui: ['Hospedagem', 'Passeio de barco', 'Taxa de preservação ambiental'],
  },
  {
    id: 3,
    destinoId: 3,
    titulo: 'Lisboa Histórica — 6 dias',
    descricao: 'Tour por Belém, Alfama e passeio de um dia a Sintra.',
    duracaoDias: 6,
    preco: 5200,
    inclui: ['Hospedagem', 'Café da manhã', 'Passeio a Sintra', 'City tour'],
  },
  {
    id: 4,
    destinoId: 4,
    titulo: 'Paris Romântica — 8 dias',
    descricao: 'Torre Eiffel, cruzeiro pelo Sena e visita guiada ao Louvre.',
    duracaoDias: 8,
    preco: 8900,
    inclui: ['Hospedagem', 'Cruzeiro no Sena', 'Ingresso ao Louvre'],
  },
  {
    id: 5,
    destinoId: 5,
    titulo: 'Cataratas do Iguaçu — 4 dias',
    descricao: 'Visita aos dois lados das cataratas e passeio ao Parque das Aves.',
    duracaoDias: 4,
    preco: 1900,
    inclui: ['Hospedagem', 'Ingressos dos parques', 'Transfer'],
  },
  {
    id: 6,
    destinoId: 6,
    titulo: 'Cancún All Inclusive — 7 dias',
    descricao: 'Resort all inclusive de frente para o mar, com passeio a Chichén Itzá.',
    duracaoDias: 7,
    preco: 7400,
    inclui: ['Hospedagem all inclusive', 'Passeio a Chichén Itzá', 'Transfer aeroporto'],
  },
];

module.exports = pacotes;
