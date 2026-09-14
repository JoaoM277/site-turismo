import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { buscarDestinoPorId, buscarPacotes } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import PacoteCard from '../../components/PacoteCard/PacoteCard';
import Loader from '../../components/Loader/Loader';
import { otimizarImagem } from '../../utils/imagem';
import './DestinoDetalhe.css';

// Página de detalhe de um destino específico, com os pacotes disponíveis
// para ele. O `id` do destino vem da URL (ex: /destinos/3).
export default function DestinoDetalhe() {
  const { id } = useParams();

  const {
    dados: destino,
    carregando: carregandoDestino,
    erro: erroDestino,
  } = useFetch(() => buscarDestinoPorId(id), [id]);

  const { dados: pacotes, carregando: carregandoPacotes } = useFetch(
    () => buscarPacotes({ destinoId: id }),
    [id]
  );

  if (carregandoDestino) return <Loader mensagem="Carregando destino..." />;

  if (erroDestino) {
    return (
      <div className="container">
        <p className="mensagem-erro">{erroDestino}</p>
        <Link to="/destinos">← Voltar para destinos</Link>
      </div>
    );
  }

  if (!destino) return null;

  return (
    <article>
      <div
        className="destino-detalhe__banner"
        style={{ backgroundImage: `url(${otimizarImagem(destino.imagem, { largura: 1200 })})` }}
      >
        <div className="destino-detalhe__banner-overlay">
          <div className="container">
            <h1>{destino.nome}</h1>
            <p>{destino.pais} · ⭐ {destino.avaliacao}</p>
          </div>
        </div>
      </div>

      <div className="container destino-detalhe__conteudo">
        <p className="destino-detalhe__descricao">{destino.descricao}</p>
        <p className="destino-detalhe__preco">
          Preço médio: <strong>R$ {destino.precoMedio.toLocaleString('pt-BR')}</strong>
        </p>

        <h2>Pacotes disponíveis</h2>

        {carregandoPacotes && <Loader mensagem="Carregando pacotes..." />}

        {pacotes && pacotes.length === 0 && (
          <p>Ainda não há pacotes cadastrados para este destino.</p>
        )}

        {pacotes && pacotes.length > 0 && (
          <div className="grade-cards">
            {pacotes.map((pacote) => (
              <PacoteCard key={pacote.id} pacote={pacote} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
