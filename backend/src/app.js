const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/config');
const apiRoutes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// Cria e configura a aplicação Express. Fica separado do server.js
// para facilitar testes automatizados (é possível importar `app`
// sem precisar subir um servidor HTTP de verdade).
const app = express();

// --- Middlewares globais ---

// Adiciona cabeçalhos HTTP de segurança.
app.use(helmet());

// Permite que o frontend (em outra origem/porta) consuma a API.
app.use(cors({ origin: config.corsOrigin }));

// Faz o parse automático de corpos JSON nas requisições.
app.use(express.json());

// Loga as requisições HTTP no console (apenas fora de produção).
if (config.nodeEnv !== 'production') {
  app.use(morgan('dev'));
}

// --- Rotas ---

app.use('/api', apiRoutes);

// --- Tratamento de erros ---
// A ordem importa: notFound primeiro (rota não encontrada),
// errorHandler por último (captura qualquer erro lançado antes).
app.use(notFound);
app.use(errorHandler);

module.exports = app;
