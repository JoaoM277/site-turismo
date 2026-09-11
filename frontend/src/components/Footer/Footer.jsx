import React from 'react';
import './Footer.css';

// Rodapé simples exibido em todas as páginas.
export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__conteudo">
        <p>✈️ Explora — encontre o seu próximo destino</p>
        <p>© {anoAtual} Explora Turismo. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
