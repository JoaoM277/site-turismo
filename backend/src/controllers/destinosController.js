const destinos = require('../data/destinos');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/destinos
// Lista todos os destinos. Aceita opcionalmente ?pais= para filtrar.
const listarDestinos = asyncHandler(async (req, res) => {
  const { pais } = req.query;

  let resultado = destinos;
  if (pais) {
    resultado = destinos.filter(
      (destino) => destino.pais.toLowerCase() === pais.toLowerCase()
    );
  }

  res.json({ sucesso: true, total: resultado.length, dados: resultado });
});

// GET /api/destinos/:id
// Retorna o detalhe de um único destino.
const buscarDestinoPorId = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const destino = destinos.find((item) => item.id === id);

  if (!destino) {
    throw new ApiError(404, `Destino com id ${id} não encontrado`);
  }

  res.json({ sucesso: true, dados: destino });
});

module.exports = {
  listarDestinos,
  buscarDestinoPorId,
};
