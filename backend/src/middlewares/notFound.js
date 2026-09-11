// Middleware chamado quando nenhuma rota corresponde à requisição.
// Deve ser registrado DEPOIS de todas as rotas da aplicação.
const notFound = (req, res, next) => {
  res.status(404).json({
    sucesso: false,
    mensagem: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = notFound;
