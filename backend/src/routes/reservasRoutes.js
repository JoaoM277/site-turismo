const express = require('express');
const { listarReservas, criarReserva } = require('../controllers/reservasController');

const router = express.Router();

router.get('/', listarReservas);
router.post('/', criarReserva);

module.exports = router;
