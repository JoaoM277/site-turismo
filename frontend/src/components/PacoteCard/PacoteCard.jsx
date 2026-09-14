import React from 'react';
import { Link } from 'react-router-dom';

import { otimizarImagem } from '../../utils/imagem';
import './PacoteCard.css';

// Card usado na página de listagem de pacotes de viagem.
// `pacote` já vem "populado" com os dados resumidos do destino (ver backend).
export default function PacoteCard({ pacote }) {
  const { id, titulo, descricao, duracaoDias, preco, destino } = pacote;

  return (
    <div className="pacote-card">
      {destino && (
        <img
          className="pacote-card__imagem"
          src={otimizarImagem(destino.imagem, { largura: 500 })}
          alt={destino.nome}
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="pacote-card__conteudo">
        <h3>{titulo}</h3>
        {destino && <p className="pacote-card__destino">{destino.nome}, {destino.pais}</p>}
        <p className="pacote-card__descricao">{descricao}</p>

        <div className="pacote-card__rodape">
          <div>
            <span className="pacote-card__duracao">{duracaoDias} dias</span>
            <strong className="pacote-card__preco">R$ {preco.toLocaleString('pt-BR')}</strong>
          </div>
          <Link to={`/reserva/${id}`} className="pacote-card__botao">
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
