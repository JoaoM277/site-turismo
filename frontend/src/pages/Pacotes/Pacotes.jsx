import React from 'react';

import { buscarPacotes } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import PacoteCard from '../../components/PacoteCard/PacoteCard';
import Loader from '../../components/Loader/Loader';
import './Pacotes.css';

// Página de listagem de todos os pacotes de viagem disponíveis.
export default function Pacotes() {
  const { dados: pacotes, carregando, erro } = useFetch(() => buscarPacotes(), []);

  return (
    <section className="container pagina-pacotes">
      <h1>Pacotes de viagem</h1>
      <p className="pagina-pacotes__subtitulo">
        Encontre o pacote perfeito para a sua próxima viagem.
      </p>

      {carregando && <Loader mensagem="Carregando pacotes..." />}
      {erro && <p className="mensagem-erro">{erro}</p>}

      <div className="grade-cards">
        {pacotes?.map((pacote) => (
          <PacoteCard key={pacote.id} pacote={pacote} />
        ))}
      </div>
    </section>
  );
}
