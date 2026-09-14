// Carrega as variáveis de ambiente definidas no arquivo .env
require('dotenv').config();

// Centraliza a leitura das variáveis de ambiente em um único lugar.
// Assim, o resto da aplicação nunca acessa `process.env` diretamente,
// o que facilita testes e evita erros de digitação espalhados pelo código.
// Variáveis de ambiente são sempre strings — "true"/"false" precisam ser
// convertidas explicitamente pro booleano real que o pacote `cors`
// espera (origin: true reflete a origem da requisição; uma string faria
// o cors comparar literalmente contra ela, nunca dando match de verdade).
const corsOriginEnv = process.env.CORS_ORIGIN;
const corsOrigin =
  corsOriginEnv === 'true' ? true : corsOriginEnv === 'false' ? false : corsOriginEnv || 'http://localhost:5173';

const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin,
};

module.exports = config;
