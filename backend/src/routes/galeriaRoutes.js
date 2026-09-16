const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const { listarFotosAprovadas, enviarFoto } = require('../controllers/galeriaController');
const ApiError = require('../utils/ApiError');

const router = express.Router();

// Fotos enviadas pelos usuários vão pra disco (não pro array em
// memória, que ficaria gigante e lento com base64) — servidas depois
// como estático em /uploads (ver app.js). A pasta é criada aqui se
// ainda não existir, então não depende de nada pré-criado no repo.
const PASTA_UPLOADS = path.join(__dirname, '../../public/uploads/galeria');
fs.mkdirSync(PASTA_UPLOADS, { recursive: true });

const armazenamento = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PASTA_UPLOADS),
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname) || '.jpg';
    const nomeUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extensao}`;
    cb(null, nomeUnico);
  },
});

const upload = multer({
  storage: armazenamento,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB — suficiente pra foto de celular, sem abrir pra abuso.
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new ApiError(400, 'Envie apenas arquivos de imagem'));
      return;
    }
    cb(null, true);
  },
});

// Envolve o middleware do multer só pra traduzir os erros dele (arquivo
// grande demais, tipo inválido) pro mesmo formato de erro do resto da
// API (ApiError, tratado por middlewares/errorHandler.js) — sem isso,
// esses erros específicos cairiam como 500 genérico.
function uploadFoto(req, res, next) {
  upload.single('foto')(req, res, (erro) => {
    if (!erro) return next();
    if (erro instanceof multer.MulterError && erro.code === 'LIMIT_FILE_SIZE') {
      return next(new ApiError(400, 'Imagem muito grande (máximo 8MB)'));
    }
    return next(erro);
  });
}

router.get('/', listarFotosAprovadas);
router.post('/', uploadFoto, enviarFoto);

module.exports = router;
