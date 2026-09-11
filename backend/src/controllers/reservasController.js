const reservas = require('../data/reservas');
const pacotes = require('../data/pacotes');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// Campos obrigatórios para criar uma reserva.
const CAMPOS_OBRIGATORIOS = ['pacoteId', 'nome', 'email', 'quantidadePessoas', 'dataViagem'];

// Faz uma validação simples dos dados recebidos.
// Retorna uma lista de mensagens de erro (vazia se estiver tudo certo).
const validarReserva = (dados) => {
  const erros = [];

  CAMPOS_OBRIGATORIOS.forEach((campo) => {
    if (dados[campo] === undefined || dados[campo] === '') {
      erros.push(`O campo "${campo}" é obrigatório`);
    }
  });

  if (dados.email && !/^\S+@\S+\.\S+$/.test(dados.email)) {
    erros.push('E-mail inválido');
  }

  return erros;
};

// GET /api/reservas
// Em um sistema real, isso exigiria autenticação (rota administrativa).
const listarReservas = asyncHandler(async (req, res) => {
  res.json({ sucesso: true, total: reservas.length, dados: reservas });
});

// POST /api/reservas
const criarReserva = asyncHandler(async (req, res) => {
  const dados = req.body;
  const erros = validarReserva(dados);

  if (erros.length > 0) {
    throw new ApiError(400, erros.join('; '));
  }

  const pacote = pacotes.find((item) => item.id === Number(dados.pacoteId));
  if (!pacote) {
    throw new ApiError(404, `Pacote com id ${dados.pacoteId} não encontrado`);
  }

  const novaReserva = {
    id: reservas.length + 1,
    pacoteId: pacote.id,
    nome: dados.nome,
    email: dados.email,
    quantidadePessoas: Number(dados.quantidadePessoas),
    dataViagem: dados.dataViagem,
    observacoes: dados.observacoes || '',
    precoTotal: pacote.preco * Number(dados.quantidadePessoas),
    criadaEm: new Date().toISOString(),
  };

  reservas.push(novaReserva);

  res.status(201).json({ sucesso: true, dados: novaReserva });
});

module.exports = {
  listarReservas,
  criarReserva,
};
