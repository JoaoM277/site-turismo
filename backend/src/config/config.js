// Carrega as variáveis de ambiente definidas no arquivo .env
require('dotenv').config();

// Centraliza a leitura das variáveis de ambiente em um único lugar.
// Assim, o resto da aplicação nunca acessa `process.env` diretamente,
// o que facilita testes e evita erros de digitação espalhados pelo código.
const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

module.exports = config;
