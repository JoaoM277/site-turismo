// "Banco de dados" mock das reservas, mantido em memória.
// Importante: como fica em memória, os dados são perdidos a cada
// reinício do servidor. Isso é aceitável para fins de demonstração;
// em produção, isso deve virar uma tabela/coleção em um banco real.
const reservas = [];

module.exports = reservas;
