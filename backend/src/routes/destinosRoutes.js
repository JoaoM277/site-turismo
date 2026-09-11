const express = require('express');
const { listarDestinos, buscarDestinoPorId } = require('../controllers/destinosController');

const router = express.Router();

router.get('/', listarDestinos);
router.get('/:id', buscarDestinoPorId);

module.exports = router;
