// Dados mock (em memória) dos eventos da semana — festas, feiras,
// promoções de lojas etc. Nomes/datas são fictícios, placeholders até o
// conteúdo real de Barra do Corda ser definido (Task 9).
//
// `tipo`: 'festa' | 'promocao' | 'evento' — só rotula o card, não muda
// nenhuma regra de negócio (ao contrário do `plano` em locais.js).
const eventos = [
  {
    id: 1,
    titulo: 'Festa Junina Municipal',
    tipo: 'festa',
    dataExibicao: '20 de junho',
    local: 'Praça Central',
    descricao: 'Quadrilhas, comidas típicas e música ao vivo pra toda a família.',
    imagem: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
  },
  {
    id: 2,
    titulo: 'Feira de Artesanato Local',
    tipo: 'evento',
    dataExibicao: 'Sábados, o dia todo',
    local: 'Centro Histórico',
    descricao: 'Produtores e artesãos da região expõem e vendem suas peças.',
    imagem: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d',
  },
  {
    id: 3,
    titulo: 'Loja Boa Vista — 20% OFF',
    tipo: 'promocao',
    dataExibicao: 'Até domingo',
    local: 'Centro',
    descricao: 'Desconto em toda a linha de roupas e acessórios de verão.',
    imagem: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
  },
  {
    id: 4,
    titulo: 'Show na Praça',
    tipo: 'evento',
    dataExibicao: 'Sexta-feira, 20h',
    local: 'Praça Central',
    descricao: 'Banda local se apresenta com repertório de forró e MPB.',
    imagem: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
  },
  {
    id: 5,
    titulo: 'Corrida Rústica Municipal',
    tipo: 'evento',
    dataExibicao: 'Domingo, 6h',
    local: 'Saída do Balneário Municipal',
    descricao: 'Percurso de 5km e 10km aberto à comunidade, com premiação.',
    imagem: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3',
  },
];

module.exports = eventos;
