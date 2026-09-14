const express = require('express');

const destinosRoutes = require('./destinosRoutes');
const pacotesRoutes = require('./pacotesRoutes');
const reservasRoutes = require('./reservasRoutes');
const contatoRoutes = require('./contatoRoutes');
const locaisRoutes = require('./locaisRoutes');

// Router "raiz" que agrupa todos os sub-routers da API.
// Mantém o app.js limpo, com apenas uma linha para montar todas as rotas.
const router = express.Router();

// Endpoint simples para verificar se a API está no ar (útil para monitoramento).
router.get('/health', (req, res) => {
  res.json({ sucesso: true, mensagem: 'API do site de turismo funcionando 🚀' });
});

router.use('/destinos', destinosRoutes);
router.use('/pacotes', pacotesRoutes);
router.use('/reservas', reservasRoutes);
router.use('/contato', contatoRoutes);
router.use('/locais', locaisRoutes);

module.exports = router;
