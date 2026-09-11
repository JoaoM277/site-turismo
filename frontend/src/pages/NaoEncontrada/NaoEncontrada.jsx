import React from 'react';
import { Link } from 'react-router-dom';
import './NaoEncontrada.css';

// Página exibida quando nenhuma rota corresponde ao caminho acessado (404).
export default function NaoEncontrada() {
  return (
    <section className="container pagina-404">
      <h1>404</h1>
      <p>Ops, esta página não existe.</p>
      <Link to="/">Voltar para o início</Link>
    </section>
  );
}
