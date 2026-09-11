import React from 'react';
import './Depoimento.css';

// Card de depoimento de cliente, usado na seção de "prova social" da Home.
// Recebe dados estáticos por enquanto (não há endpoint de depoimentos na API).
export default function Depoimento({ nome, cidade, texto, foto }) {
  return (
    <blockquote className="depoimento">
      <p className="depoimento__texto">“{texto}”</p>
      <footer className="depoimento__autor">
        <img src={foto} alt={nome} />
        <div>
          <strong>{nome}</strong>
          <span>{cidade}</span>
        </div>
      </footer>
    </blockquote>
  );
}
