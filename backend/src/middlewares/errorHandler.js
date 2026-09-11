const config = require('../config/config');

// Middleware central de tratamento de erros do Express.
// Precisa ter exatamente 4 argumentos (err, req, res, next) para o
// Express reconhecer como um "error handler" e não como middleware normal.
// Deve ser o ÚLTIMO middleware registrado em app.js.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    sucesso: false,
    mensagem: err.message || 'Erro interno do servidor',
    // A stack trace só é exposta em ambiente de desenvolvimento,
    // por segurança (nunca vazar detalhes internos em produção).
    stack: config.nodeEnv === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
