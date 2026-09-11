const express = require('express');
const { enviarContato } = require('../controllers/contatoController');

const router = express.Router();

router.post('/', enviarContato);

module.exports = router;
