// Envolve uma função de controller assíncrona e encaminha qualquer erro
// (rejeição de Promise) automaticamente para o middleware de erro do
// Express, evitando repetir try/catch em todo controller.
//
// Uso:
//   router.get('/', asyncHandler(async (req, res) => { ... }));
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
