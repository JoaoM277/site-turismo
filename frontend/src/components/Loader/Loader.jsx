import React from 'react';
import './Loader.css';

// Indicador de carregamento simples (spinner), usado enquanto
// as páginas aguardam a resposta da API.
export default function Loader({ mensagem = 'Carregando...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" />
      <p>{mensagem}</p>
    </div>
  );
}
