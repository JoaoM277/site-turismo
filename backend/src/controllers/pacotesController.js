const pacotes = require('../data/pacotes');
const destinos = require('../data/destinos');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// Junta cada pacote com os dados resumidos do seu destino,
// para o frontend não precisar fazer duas chamadas separadas.
const comDestino = (pacote) => {
  const destino = destinos.find((item) => item.id === pacote.destinoId);
  return { ...pacote, destino };
};

// GET /api/pacotes
// Lista todos os pacotes. Aceita opcionalmente ?destinoId= para filtrar.
const listarPacotes = asyncHandler(async (req, res) => {
  const { destinoId } = req.query;

  let resultado = pacotes;
  if (destinoId) {
    resultado = pacotes.filter((pacote) => pacote.destinoId === Number(destinoId));
  }

  res.json({
    sucesso: true,
    total: resultado.length,
    dados: resultado.map(comDestino),
  });
});

// GET /api/pacotes/:id
const buscarPacotePorId = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const pacote = pacotes.find((item) => item.id === id);

  if (!pacote) {
    throw new ApiError(404, `Pacote com id ${id} não encontrado`);
  }

  res.json({ sucesso: true, dados: comDestino(pacote) });
});

module.exports = {
  listarPacotes,
  buscarPacotePorId,
};
