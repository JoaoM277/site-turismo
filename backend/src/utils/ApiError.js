// Classe de erro customizada para erros esperados da aplicação
// (ex: recurso não encontrado, dados inválidos). Permite anexar um
// status HTTP ao erro para que o middleware de erro responda corretamente.
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
