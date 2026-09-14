// Dados mock (em memória) dos locais/roteiros de viagem, agrupados por
// categoria (lazer, saude, hospedagem). Nomes e descrições são fictícios
// — placeholders pra validar a estrutura (categorias, listagem, plano
// cliente vs básico) até o conteúdo real de Barra do Corda ser definido.
//
// `plano`: 'cliente' (perfil completo — fotos, link externo, descrição
// rica) ou 'basico' (informação superficial — nome, categoria, horário).
// É a base da lógica de "plano escalável" pedida na task: um local pode
// ser promovido de básico pra cliente só mudando esse campo, sem
// precisar mudar a estrutura de dados nem o front.
const locais = [
  // --- Lazer ---
  {
    id: 1,
    nome: 'Balneário Municipal',
    categoria: 'lazer',
    plano: 'cliente',
    descricaoCurta: 'Área de lazer às margens do rio, com estrutura para banho e piquenique.',
    descricaoCompleta:
      'Um dos pontos de encontro mais tradicionais da cidade, com águas calmas, quiosques e área verde para toda a família.',
    horarioFuncionamento: 'Todos os dias, 6h às 18h',
    fotos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    linkExterno: 'https://instagram.com',
  },
  {
    id: 2,
    nome: 'Praça Central',
    categoria: 'lazer',
    plano: 'basico',
    descricaoCurta: 'Praça pública no centro da cidade, com bancos e área de convivência.',
    horarioFuncionamento: 'Aberta 24h',
  },
  {
    id: 3,
    nome: 'Clube Recreativo',
    categoria: 'lazer',
    plano: 'basico',
    descricaoCurta: 'Espaço com piscina e quadras esportivas.',
    horarioFuncionamento: 'Ter a Dom, 8h às 20h',
  },

  // --- Saúde ---
  {
    id: 4,
    nome: 'Posto de Saúde Central',
    categoria: 'saude',
    plano: 'basico',
    descricaoCurta: 'Atendimento básico de saúde pública.',
    horarioFuncionamento: 'Seg a Sex, 7h às 17h',
  },
  {
    id: 5,
    nome: 'Clínica Vida Plena',
    categoria: 'saude',
    plano: 'cliente',
    descricaoCurta: 'Clínica particular com atendimento em diversas especialidades.',
    descricaoCompleta:
      'Estrutura moderna com consultórios equipados e equipe médica multidisciplinar. Atendimento particular e por convênio.',
    horarioFuncionamento: 'Seg a Sáb, 7h às 19h',
    fotos: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d'],
    linkExterno: 'https://wa.me/5500000000000',
  },

  // --- Hospedagem ---
  {
    id: 6,
    nome: 'Pousada Vista Alegre',
    categoria: 'hospedagem',
    plano: 'cliente',
    descricaoCurta: 'Pousada aconchegante próxima ao centro histórico.',
    descricaoCompleta:
      'Quartos confortáveis, café da manhã incluso e fácil acesso aos principais pontos turísticos da cidade.',
    horarioFuncionamento: 'Recepção 24h',
    fotos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    ],
    linkExterno: 'https://booking.com',
  },
  {
    id: 7,
    nome: 'Hotel Rio Grande',
    categoria: 'hospedagem',
    plano: 'basico',
    descricaoCurta: 'Hospedagem simples no centro da cidade.',
    horarioFuncionamento: 'Recepção 24h',
  },
];

module.exports = locais;
