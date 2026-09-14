// Dados mock (em memória) dos locais/roteiros de viagem, agrupados por
// categoria (lazer, saude, hospedagem, ponto-turistico). Nomes e
// descrições são fictícios — placeholders pra validar a estrutura
// (categorias, listagem, plano cliente vs básico) até o conteúdo real de
// Barra do Corda ser definido.
//
// `plano`: 'cliente' (perfil completo — fotos, link externo, descrição
// rica) ou 'basico' (informação superficial — nome, categoria, horário).
// É a base da lógica de "plano escalável" pedida na Task 6: um local pode
// ser promovido de básico pra cliente só mudando esse campo, sem
// precisar mudar a estrutura de dados nem o front. Usado hoje só pela
// aba Descubra/Roteiros.
//
// `destaque` (Task 9): marca um local pra aparecer na seção "Locais em
// Destaque" da Home, com um modal mais completo (fotos, descrição, aba
// de contato com link(s) + rota no mapa). Só faz sentido pra pontos
// turísticos e parceiros comerciais (`categoria === 'ponto-turistico'`
// ou `plano === 'cliente'`) — um posto de saúde básico, por exemplo,
// nunca deveria ser "destaque". `contatos` e `linkMaps` só existem nos
// itens marcados como destaque.
//
// Observação: `ponto-turistico` ainda não é uma categoria reconhecida
// pela aba Descubra/Roteiros (que hoje só agrupam lazer/saude/
// hospedagem) — os itens dessa categoria aparecem por enquanto só na
// seção de destaque da Home. Unificar isso é trabalho de uma task futura
// se fizer sentido incluir pontos turísticos no catálogo geral também.
const locais = [
  // --- Lazer ---
  {
    id: 1,
    nome: 'Balneário Municipal',
    categoria: 'lazer',
    plano: 'cliente',
    destaque: true,
    descricaoCurta: 'Área de lazer às margens do rio, com estrutura para banho e piquenique.',
    descricaoCompleta:
      'Um dos pontos de encontro mais tradicionais da cidade, com águas calmas, quiosques e área verde para toda a família.',
    horarioFuncionamento: 'Todos os dias, 6h às 18h',
    fotos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    linkExterno: 'https://instagram.com',
    contatos: [
      { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: 'https://wa.me/5500000000000' },
      { tipo: 'instagram', rotulo: 'Instagram', valor: 'https://instagram.com' },
    ],
    linkMaps: 'https://www.google.com/maps/search/?api=1&query=Balneário+Municipal+Barra+do+Corda',
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
    // Não marcada como destaque: é parceira, mas uma clínica não é bem
    // um "destaque" pra vitrine da Home — critério curatorial, não regra
    // técnica (o campo `plano: cliente` já a tornaria elegível).
  },

  // --- Hospedagem ---
  {
    id: 6,
    nome: 'Pousada Vista Alegre',
    categoria: 'hospedagem',
    plano: 'cliente',
    destaque: true,
    descricaoCurta: 'Pousada aconchegante próxima ao centro histórico.',
    descricaoCompleta:
      'Quartos confortáveis, café da manhã incluso e fácil acesso aos principais pontos turísticos da cidade.',
    horarioFuncionamento: 'Recepção 24h',
    fotos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    ],
    linkExterno: 'https://booking.com',
    contatos: [
      { tipo: 'whatsapp', rotulo: 'WhatsApp', valor: 'https://wa.me/5500000000000' },
      { tipo: 'site', rotulo: 'Site / Reservas', valor: 'https://booking.com' },
    ],
    linkMaps: 'https://www.google.com/maps/search/?api=1&query=Pousada+Vista+Alegre+Barra+do+Corda',
  },
  {
    id: 7,
    nome: 'Hotel Rio Grande',
    categoria: 'hospedagem',
    plano: 'basico',
    descricaoCurta: 'Hospedagem simples no centro da cidade.',
    horarioFuncionamento: 'Recepção 24h',
  },

  // --- Pontos turísticos ---
  {
    id: 8,
    nome: 'Mirante da Serra',
    categoria: 'ponto-turistico',
    plano: 'cliente',
    destaque: true,
    descricaoCurta: 'Vista panorâmica da cidade, imperdível ao entardecer.',
    descricaoCompleta:
      'Um dos mirantes mais procurados por quem visita a cidade — vista panorâmica de tirar o fôlego, especialmente durante o pôr do sol.',
    horarioFuncionamento: 'Todos os dias, 6h às 18h',
    fotos: [
      'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    ],
    contatos: [{ tipo: 'instagram', rotulo: 'Instagram', valor: 'https://instagram.com' }],
    linkMaps: 'https://www.google.com/maps/search/?api=1&query=Mirante+da+Serra+Barra+do+Corda',
  },
  {
    id: 9,
    nome: 'Centro Histórico',
    categoria: 'ponto-turistico',
    plano: 'basico',
    destaque: true,
    descricaoCurta: 'Arquitetura antiga e charme colonial no coração da cidade.',
    descricaoCompleta:
      'Ruas e casarões que contam a história da cidade — um passeio a pé pelo centro revela a arquitetura colonial preservada.',
    horarioFuncionamento: 'Aberto 24h (área pública)',
    // Ponto turístico público, sem parceiro comercial por trás — ainda
    // assim é destaque (categoria já garante isso) e ganha fotos, só não
    // tem contato/link (não há "quem" contatar) nem linkExterno.
    fotos: ['https://images.unsplash.com/photo-1558642084-fd07fae5282e'],
    linkMaps: 'https://www.google.com/maps/search/?api=1&query=Centro+Histórico+Barra+do+Corda',
  },
];

module.exports = locais;
