const express = require('express');
const { listarPacotes, buscarPacotePorId } = require('../controllers/pacotesController');

const router = express.Router();

router.get('/', listarPacotes);
router.get('/:id', buscarPacotePorId);

module.exports = router;
