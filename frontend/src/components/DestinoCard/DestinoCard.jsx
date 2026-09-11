import React from 'react';
import { Link } from 'react-router-dom';
import './DestinoCard.css';

// Card usado nas grades de destinos (Home e página Destinos).
// Recebe um objeto `destino` vindo da API e monta um link para o detalhe.
export default function DestinoCard({ destino }) {
  const { id, nome, pais, descricao, imagem, precoMedio, avaliacao } = destino;

  return (
    <Link to={`/destinos/${id}`} className="destino-card">
      <div className="destino-card__imagem-wrapper">
        <img src={imagem} alt={nome} loading="lazy" />
        <span className="destino-card__avaliacao">⭐ {avaliacao}</span>
      </div>

      <div className="destino-card__conteudo">
        <h3>{nome}</h3>
        <p className="destino-card__pais">{pais}</p>
        <p className="destino-card__descricao">{descricao}</p>
        <p className="destino-card__preco">
          A partir de <strong>R$ {precoMedio.toLocaleString('pt-BR')}</strong>
        </p>
      </div>
    </Link>
  );
}
