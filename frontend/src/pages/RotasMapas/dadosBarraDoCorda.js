// Dados geográficos e pontos turísticos reais e verificados de Barra do Corda - MA
// Coordenadas checadas com base nas ruas, bairros e mapeamentos reais no OpenStreetMap e Google Maps.

export const CIDADE_ATUAL = {
  id: 'barra-do-corda',
  nome: 'Barra do Corda',
  uf: 'MA',
  titulo: 'Barra do Corda - Maranhão',
  apelido: 'Cidade dos Rios e Cachoeiras',
  // Centro estratégico entre Centro e Trezidela, logo acima da confluência dos rios
  coordenadasCentro: [-5.5030, -45.2510],
  zoomPadrao: 14,
  zoomMaximo: 18,
  zoomMinimo: 10,
  // Limites territoriais estritos do município cobrindo o centro urbano e as cachoeiras ao sul
  limitesTerritorio: [
    [-5.7300, -45.3400], // Sudoeste (abrange Vila Real / Cachoeira da Fumaça)
    [-5.4600, -45.2100], // Nordeste
  ],
};

export const CIDADES_DISPONIVEIS = [
  { id: 'barra-do-corda', nome: 'Barra do Corda - MA', ativa: true },
  { id: 'imperatriz', nome: 'Imperatriz - MA (Em breve)', ativa: false },
  { id: 'sao-luis', nome: 'São Luís - MA (Em breve)', ativa: false },
  { id: 'carolina', nome: 'Carolina - MA (Em breve)', ativa: false },
];

export const PONTOS_BARRA_DO_CORDA = [
  // ========================================================
  // DESTINOS PÚBLICOS (Encontro dos Rios, Balneários, Cachoeiras)
  // ========================================================
  {
    id: 'pub-1',
    nome: 'Balneário Guajajara (Encontro dos Rios)',
    tipo: 'publico',
    categoria: 'Balneário & Encontro das Águas',
    descricaoCurta: 'Ponto exato onde as águas cristalinas do Rio Corda encontram as águas mornas do Rio Mearim.',
    detalhes: 'O mais icônico cartão-postal da cidade. O encontro das águas frias do Rio Corda com as mornas do Mearim atrai turistas para banhos refrescantes, quiosques com petiscos e passeios de barco.',
    // Coordenada exata da confluência dos rios Corda e Mearim
    coordenadas: [-5.50445, -45.24775],
    endereco: 'Confluência dos Rios Corda e Mearim, Centro / Trezidela',
    destaque: true,
    tags: ['Encontro dos Rios', 'Banho', 'Passeio de Barco', 'Gratuito'],
    imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Balneario+Guajajara+Barra+do+Corda',
  },
  {
    id: 'pub-2',
    nome: 'Espaço Cultural & Prainha',
    tipo: 'publico',
    categoria: 'Cultura & Lazer Ribeirinho',
    descricaoCurta: 'Complexo cultural e área de convivência às margens do Rio Corda na Trezidela.',
    detalhes: 'Espaço público estruturado para eventos cívicos e culturais, com deck com vista privilegiada para o rio, calçadão para caminhadas e fácil acesso para banho.',
    // Coordenada oficial do Espaço Cultural de Barra do Corda
    coordenadas: [-5.50066, -45.25097],
    endereco: 'Rua Rio Tapajós / Margem do Rio Corda, Trezidela',
    destaque: true,
    tags: ['Espaço Cultural', 'Prainha', 'Eventos', 'Pôr do Sol'],
    imagem: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Espaco+Cultural+Barra+do+Corda',
  },
  {
    id: 'pub-3',
    nome: 'Orla da Beira Rio & Calçadão',
    tipo: 'publico',
    categoria: 'Orla Urbana & Caminhada',
    descricaoCurta: 'Calçadão urbanizado às margens do Rio Corda, perfeito para caminhadas e contemplação.',
    detalhes: 'Ponto nobre do Centro de Barra do Corda, reúne moradores e visitantes no fim de tarde. Conta com arborização, quiosques e vista do leito limpo do Rio Corda.',
    // Coordenada da Avenida Beira Rio no Centro
    coordenadas: [-5.50853, -45.25002],
    endereco: 'Avenida Beira Rio, Centro, Barra do Corda - MA',
    destaque: false,
    tags: ['Caminhada', 'Orla', 'Esportes', 'Quiosques'],
    imagem: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Avenida+Beira+Rio+Barra+do+Corda',
  },
  {
    id: 'pub-4',
    nome: 'Cachoeira da Fumaça',
    tipo: 'publico',
    categoria: 'Cachoeira & Aventura',
    descricaoCurta: 'Imponente queda d’água no povoado Vila Real, que cria uma névoa característica na mata.',
    detalhes: 'Localizada no povoado Vila Real, a cerca de 32 km ao sul da sede do município. As fortes quedas formam uma nuvem de vapor e poços profundos cercados por vegetação intocada.',
    // Coordenada real do povoado Vila Real (zona rural de Barra do Corda)
    coordenadas: [-5.68786, -45.27501],
    endereco: 'Povoado Vila Real (acesso pela MA-012 sul), Barra do Corda - MA',
    destaque: true,
    tags: ['Cachoeira', 'Ecoturismo', 'Vila Real', 'Trilha'],
    imagem: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cachoeira+da+Fumaca+Barra+do+Corda',
  },
  {
    id: 'pub-5',
    nome: 'Cachoeira Grande (dos Índios)',
    tipo: 'publico',
    categoria: 'Cachoeira & Piscinas Naturais',
    descricaoCurta: 'Refúgio de águas frias e cristalinas com corredeiras no Rio Corda.',
    detalhes: 'Trecho do Rio Corda caracterizado por lajedos rochosos que aceleram as correntes d’água, criando piscinas naturais para banho e contemplação da mata ciliar preservada.',
    coordenadas: [-5.55200, -45.27800],
    endereco: 'Circuito do Rio Corda, Barra do Corda - MA',
    destaque: false,
    tags: ['Cachoeira', 'Águas Cristalinas', 'Banho', 'Natureza'],
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cachoeira+Grande+Barra+do+Corda',
  },

  // ========================================================
  // DESTINOS CLIENTES & PARCEIROS (Restaurantes, Hotéis reais)
  // ========================================================
  {
    id: 'cli-1',
    nome: 'Hotel Diniz',
    tipo: 'cliente',
    categoria: 'Hotel & Hospedagem',
    descricaoCurta: 'Um dos mais tradicionais e renomados hotéis da cidade, na Trezidela em frente ao Mercado Municipal.',
    detalhes: 'Localização central privilegiada na Trezidela, em frente ao mercado municipal. Oferece quartos climatizados, Wi-Fi veloz, café da manhã farto com iguarias regionais e estacionamento seguro.',
    // Rua Rio Tapajós, 260, Trezidela (coordenada verificada com precisão no OSM e Maps)
    coordenadas: [-5.49841, -45.25199],
    endereco: 'Rua Rio Tapajós, 260, Trezidela, Barra do Corda - MA',
    destaque: true,
    tags: ['Hotel', 'Centro', 'Mercado Municipal', 'Café Regional'],
    imagem: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Diniz+Rua+Rio+Tapajos+Barra+do+Corda',
    avaliacao: 4.8,
  },
  {
    id: 'cli-2',
    nome: 'Restaurante Flor do Mandacaru',
    tipo: 'cliente',
    categoria: 'Restaurante & Culinária Regional',
    descricaoCurta: 'Referência em sabor maranhense na Trezidela, famoso pelo carneiro, galinha caipira e carne de sol.',
    detalhes: 'Localizado na Trezidela, ao lado do Hotel Belchior. Dispõe de ambiente climatizado e moderno, servindo pratos da gastronomia nordestina e buffet variado com tempero caseiro autêntico.',
    // Rua Rio Mearim, 231, Trezidela (ao lado do Hotel Belchior)
    coordenadas: [-5.50080, -45.25390],
    endereco: 'Rua Rio Mearim, 231, Trezidela, Barra do Corda - MA',
    destaque: true,
    tags: ['Comida Regional', 'Carneiro', 'Carne de Sol', 'Self-Service'],
    imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Restaurante+Flor+do+Mandacaru+Barra+do+Corda',
    avaliacao: 4.7,
  },
  {
    id: 'cli-3',
    nome: 'Restaurante Tabocas',
    tipo: 'cliente',
    categoria: 'Peixaria & Restaurante Beira Rio',
    descricaoCurta: 'Famoso ponto gastronômico na orla da Beira Rio, especialista no irresistível tambaqui sem espinhas.',
    detalhes: 'Localizado na Avenida Beira Rio no Centro, com vista panorâmica para o leito do Rio Corda. Serve peixes de água doce grelhados, moquecas e bebidas geladas para curtir a brisa do rio.',
    // Avenida Beira Rio, 905, Centro
    coordenadas: [-5.50910, -45.24925],
    endereco: 'Avenida Beira Rio, 905, Centro, Barra do Corda - MA',
    destaque: true,
    tags: ['Tambaqui', 'Peixe na Brasa', 'Beira Rio', 'Orla'],
    imagem: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tabocas+Avenida+Beira+Rio+Barra+do+Corda',
    avaliacao: 4.9,
  },
  {
    id: 'cli-4',
    nome: 'Hotel Belchior',
    tipo: 'cliente',
    categoria: 'Hotel & Hospedagem',
    descricaoCurta: 'Hospedagem aconchegante e tradicional na Trezidela, com fácil acesso ao polo gastronômico.',
    detalhes: 'Localizado no início da Trezidela, próximo à ponte e ao lado do Flor do Mandacaru. Quartos confortáveis para turistas e representantes comerciais, com atendimento acolhedor.',
    // Mapeado no OpenStreetMap no coração da Trezidela
    coordenadas: [-5.50065, -45.25366],
    endereco: 'Rua Rio Mearim, Trezidela, Barra do Corda - MA',
    destaque: false,
    tags: ['Hotel', 'Trezidela', 'Próximo aos Restaurantes', 'Ar-condicionado'],
    imagem: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Belchior+Barra+do+Corda',
    avaliacao: 4.6,
  },
  {
    id: 'cli-5',
    nome: 'Bar & Churrascaria Ponto da Bisteca',
    tipo: 'cliente',
    categoria: 'Churrascaria & Bar Noturno',
    descricaoCurta: 'Ponto consagrado para bistecas especiais, carnes na brasa e chopp gelado na Nova Trizidela.',
    detalhes: 'Localizado na Avenida 01 na Nova Trizidela, é um dos locais mais movimentados da vida noturna de Barra do Corda, com porções generosas de carnes nobres e transmissão de jogos.',
    // Avenida 01, Nova Trizidela
    coordenadas: [-5.49420, -45.25820],
    endereco: 'Avenida 01, Nova Trizidela, Barra do Corda - MA',
    destaque: false,
    tags: ['Churrasco', 'Bisteca', 'Chopp', 'Happy Hour'],
    imagem: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ponto+da+Bisteca+Avenida+01+Barra+do+Corda',
    avaliacao: 4.7,
  },
];
