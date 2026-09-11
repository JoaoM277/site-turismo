// Dados mock (em memória) dos destinos turísticos.
// Em uma evolução futura, este array seria substituído por
// consultas a um banco de dados real (ex: MongoDB, PostgreSQL).
const destinos = [
  {
    id: 1,
    nome: 'Rio de Janeiro',
    pais: 'Brasil',
    descricao:
      'Cidade Maravilhosa, famosa pelo Cristo Redentor, Pão de Açúcar e praias icônicas.',
    imagem: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
    precoMedio: 1800,
    avaliacao: 4.8,
  },
  {
    id: 2,
    nome: 'Fernando de Noronha',
    pais: 'Brasil',
    descricao:
      'Arquipélago paradisíaco com águas cristalinas, ideal para mergulho e ecoturismo.',
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    precoMedio: 3200,
    avaliacao: 4.9,
  },
  {
    id: 3,
    nome: 'Lisboa',
    pais: 'Portugal',
    descricao:
      'Capital histórica de ruas de calçada portuguesa, elétricos amarelos e fado.',
    imagem: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a',
    precoMedio: 4500,
    avaliacao: 4.7,
  },
  {
    id: 4,
    nome: 'Paris',
    pais: 'França',
    descricao:
      'Cidade Luz, lar da Torre Eiffel, do Louvre e de uma gastronomia inigualável.',
    imagem: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    precoMedio: 6200,
    avaliacao: 4.9,
  },
  {
    id: 5,
    nome: 'Foz do Iguaçu',
    pais: 'Brasil',
    descricao:
      'Lar das Cataratas do Iguaçu, uma das sete maravilhas naturais do mundo.',
    imagem: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
    precoMedio: 1500,
    avaliacao: 4.9,
  },
  {
    id: 6,
    nome: 'Cancún',
    pais: 'México',
    descricao:
      'Praias de areia branca no Caribe mexicano, com ruínas maias por perto.',
    imagem: 'https://images.unsplash.com/photo-1518509562904-e7ef99cddff9',
    precoMedio: 5200,
    avaliacao: 4.6,
  },
];

module.exports = destinos;
