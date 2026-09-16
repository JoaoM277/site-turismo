const galeria = require('../data/galeria');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/galeria
// Só retorna fotos aprovadas — é a galeria pública (Task 12, item 2:
// "review não em tempo real", então nada aparece aqui antes de moderado).
const listarFotosAprovadas = asyncHandler(async (req, res) => {
  const aprovadas = galeria.filter((foto) => foto.status === 'aprovada');
  res.json({ sucesso: true, total: aprovadas.length, dados: aprovadas });
});

// POST /api/galeria (multipart/form-data — ver routes/galeriaRoutes.js
// pro middleware do multer que popula req.file)
// Sem sistema de login (Task 12, item 5): só pede um username em texto,
// sem senha nem conta. Toda foto entra como "pendente" — nunca aparece
// na galeria pública imediatamente.
const enviarFoto = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Nenhuma imagem enviada');
  }

  const { username, largura, altura } = req.body;
  if (!username || !username.trim()) {
    throw new ApiError(400, 'Informe um nome de usuário');
  }

  const novaFoto = {
    id: galeria.length + 1,
    username: username.trim().slice(0, 40),
    url: `/uploads/galeria/${req.file.filename}`,
    largura: Number(largura) || 1000,
    altura: Number(altura) || 1000,
    status: 'pendente',
    criadaEm: new Date().toISOString(),
  };

  galeria.push(novaFoto);

  res.status(201).json({
    sucesso: true,
    mensagem: 'Recebemos sua foto! Ela passa por uma breve moderação antes de aparecer na galeria.',
    dados: { id: novaFoto.id, status: novaFoto.status },
  });
});

module.exports = {
  listarFotosAprovadas,
  enviarFoto,
};
