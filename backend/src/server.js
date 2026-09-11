const app = require('./app');
const config = require('./config/config');

// Ponto de entrada da aplicação: apenas sobe o servidor HTTP.
// Toda a configuração do Express fica isolada em app.js.
app.listen(config.port, () => {
  console.log(`✅ API rodando em http://localhost:${config.port}`);
  console.log(`   Ambiente: ${config.nodeEnv}`);
});
