// Motor de busca com previsão, usado pela BuscaMobile (Task 4). Roda
// inteiramente no cliente sobre a lista (pequena) de destinos + pacotes já
// carregada — sem lib de busca/fuzzy-match externa, só string matching e
// uma tabela de associações, o suficiente pro tamanho atual do catálogo.

// Remove acentos e normaliza caixa, pra "Iguaçu" bater com "iguacu" etc.
function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// Os 3 níveis pedidos na task, em ordem de prioridade de exibição.
export const NIVEIS_CORRESPONDENCIA = {
  MAIOR: 3, // título começa com o termo digitado
  MENOR: 2, // termo aparece em qualquer parte do título/descrição
  PROVAVEL: 1, // nenhuma ocorrência literal, mas um termo associado aparece
};

// Associações "conceito → palavras relacionadas": permite a busca sugerir
// resultados que fazem sentido pro termo digitado mesmo sem a palavra
// aparecer literalmente no conteúdo (ex.: buscar "rio" também traz coisas
// relacionadas a praia/barco/porto). Lista placeholder, genérica de
// turismo — trocar/expandir quando o conteúdo real de Barra do Corda
// entrar (rio, cachoeira, festa, artesanato etc.).
const ASSOCIACOES = {
  rio: ['barco', 'porto', 'balneario', 'praia', 'orla', 'mergulho'],
  praia: ['mar', 'litoral', 'orla', 'balneario', 'ilha'],
  trilha: ['montanha', 'natureza', 'ecoturismo', 'serra', 'aventura'],
  natureza: ['ecoturismo', 'trilha', 'parque', 'mergulho', 'cachoeira'],
  cachoeira: ['natureza', 'trilha', 'parque'],
  historia: ['historico', 'colonial', 'patrimonio', 'cultura'],
  familia: ['resort', 'all inclusive', 'crianca'],
  aventura: ['trilha', 'mergulho', 'ecoturismo'],
};

// Usado só na checagem de associação (nível "provável"): exige a palavra
// inteira, não qualquer substring. Sem isso, associar "praia" → "ilha"
// fazia "Foz do Iguaçu" aparecer como relacionado só porque "ilha" é
// substring de "maravilhas" — um falso positivo sem nenhuma relação real.
function contemPalavraInteira(texto, palavra) {
  return new RegExp(`\\b${palavra}\\b`).test(texto);
}

// Calcula o nível de correspondência de um item pro termo buscado, ou 0
// se não corresponder de nenhuma forma.
function pontuarItem(item, termoNormalizado) {
  const titulo = normalizar(item.titulo);
  const descricao = normalizar(item.descricao);

  if (titulo.startsWith(termoNormalizado)) return NIVEIS_CORRESPONDENCIA.MAIOR;
  if (titulo.includes(termoNormalizado) || descricao.includes(termoNormalizado)) {
    return NIVEIS_CORRESPONDENCIA.MENOR;
  }

  const relacionadas = ASSOCIACOES[termoNormalizado];
  if (relacionadas?.some((palavra) => contemPalavraInteira(titulo, palavra) || contemPalavraInteira(descricao, palavra))) {
    return NIVEIS_CORRESPONDENCIA.PROVAVEL;
  }

  return 0;
}

// Filtra e ordena `itens` (cada um com `titulo` + `descricao`) pelo termo
// digitado: maior correspondência primeiro, depois menor, depois provável.
export function buscarComPrevisao(itens, termoBusca) {
  const termoNormalizado = normalizar(termoBusca);
  if (!termoNormalizado) return [];

  return itens
    .map((item) => ({ ...item, nivelCorrespondencia: pontuarItem(item, termoNormalizado) }))
    .filter((item) => item.nivelCorrespondencia > 0)
    .sort((a, b) => b.nivelCorrespondencia - a.nivelCorrespondencia);
}

// Adaptam os formatos vindos da API pro formato genérico { titulo,
// descricao } que o motor de busca espera, junto com a rota de destino.
export function destinoParaItemBusca(destino) {
  return {
    id: `destino-${destino.id}`,
    tipo: 'Destino',
    titulo: destino.nome,
    descricao: destino.descricao,
    rota: `/destinos/${destino.id}`,
  };
}

export function pacoteParaItemBusca(pacote) {
  return {
    id: `pacote-${pacote.id}`,
    tipo: 'Pacote',
    titulo: pacote.titulo,
    descricao: pacote.descricao,
    rota: `/reserva/${pacote.id}`,
  };
}
