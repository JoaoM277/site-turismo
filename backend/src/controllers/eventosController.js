const eventos = require('../data/eventos');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/eventos
// Lista os eventos da semana (festas, feiras, promoções etc).
const listarEventos = asyncHandler(async (req, res) => {
  res.json({ sucesso: true, total: eventos.length, dados: eventos });
});

// GET /api/eventos/:id
const buscarEventoPorId = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const evento = eventos.find((item) => item.id === id);

  if (!evento) {
    throw new ApiError(404, `Evento com id ${id} não encontrado`);
  }

  res.json({ sucesso: true, dados: evento });
});

module.exports = {
  listarEventos,
  buscarEventoPorId,
};
