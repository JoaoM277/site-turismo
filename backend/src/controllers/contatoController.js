const contatos = require('../data/contatos');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/contato
// Recebe uma mensagem do formulário de contato do site.
const enviarContato = asyncHandler(async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    throw new ApiError(400, 'Os campos nome, email e mensagem são obrigatórios');
  }

  const novoContato = {
    id: contatos.length + 1,
    nome,
    email,
    mensagem,
    criadoEm: new Date().toISOString(),
  };

  contatos.push(novoContato);

  // Em uma aplicação real, aqui entraria o envio de e-mail (ex: nodemailer)
  // ou a integração com um serviço de CRM.
  res.status(201).json({
    sucesso: true,
    mensagem: 'Mensagem recebida com sucesso! Em breve entraremos em contato.',
    dados: novoContato,
  });
});

module.exports = {
  enviarContato,
};
