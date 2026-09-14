const express = require('express');
const { listarLocais, buscarLocalPorId } = require('../controllers/locaisController');

const router = express.Router();

router.get('/', listarLocais);
router.get('/:id', buscarLocalPorId);

module.exports = router;
