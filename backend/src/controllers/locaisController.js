const locais = require('../data/locais');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/locais
// Lista todos os locais/roteiros. Aceita opcionalmente:
// - ?categoria= (lazer | saude | hospedagem | ponto-turistico)
// - ?destaque=true — só os marcados pra seção "Locais em Destaque" (Task 9)
const listarLocais = asyncHandler(async (req, res) => {
  const { categoria, destaque } = req.query;

  let resultado = locais;
  if (categoria) {
    resultado = resultado.filter(
      (local) => local.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }
  if (destaque !== undefined) {
    const querDestaque = destaque === 'true';
    resultado = resultado.filter((local) => Boolean(local.destaque) === querDestaque);
  }

  res.json({ sucesso: true, total: resultado.length, dados: resultado });
});

// GET /api/locais/:id
// Retorna o detalhe de um único local.
const buscarLocalPorId = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const local = locais.find((item) => item.id === id);

  if (!local) {
    throw new ApiError(404, `Local com id ${id} não encontrado`);
  }

  res.json({ sucesso: true, dados: local });
});

module.exports = {
  listarLocais,
  buscarLocalPorId,
};
