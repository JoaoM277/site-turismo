const express = require('express');
const { listarEventos, buscarEventoPorId } = require('../controllers/eventosController');

const router = express.Router();

router.get('/', listarEventos);
router.get('/:id', buscarEventoPorId);

module.exports = router;
