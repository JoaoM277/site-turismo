import React from 'react';
import { Link } from 'react-router-dom';

import { buscarDestinos } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import DestinoCard from '../../components/DestinoCard/DestinoCard';
import Depoimento from '../../components/Depoimento/Depoimento';
import Loader from '../../components/Loader/Loader';
import Botao from '../../components/Botao/Botao';
import TopBarSaudacao from '../../components/TopBarSaudacao/TopBarSaudacao';
import BuscaMobile from '../../components/BuscaMobile/BuscaMobile';
import HeroMobile from '../../components/HeroMobile/HeroMobile';
import './Home.css';

// Depoimentos estáticos (não há endpoint de depoimentos na API mock).
const DEPOIMENTOS = [
  {
    nome: 'Mariana Souza',
    cidade: 'São Paulo, SP',
    texto: 'Viagem perfeita! Organização impecável do início ao fim.',
    foto: 'https://i.pravatar.cc/80?img=47',
  },
  {
    nome: 'Carlos Lima',
    cidade: 'Belo Horizonte, MG',
    texto: 'Melhor experiência de viagem que já tive, recomendo demais.',
    foto: 'https://i.pravatar.cc/80?img=12',
  },
  {
    nome: 'Ana Ferreira',
    cidade: 'Curitiba, PR',
    texto: 'Preços justos e atendimento excelente durante toda a reserva.',
    foto: 'https://i.pravatar.cc/80?img=32',
  },
];

// Página inicial: banner de destaque + destinos em alta + depoimentos.
export default function Home() {
  // Busca todos os destinos e exibe apenas os 3 primeiros como "destaques".
  const { dados: destinos, carregando, erro } = useFetch(() => buscarDestinos(), []);
  const destaques = destinos ? destinos.slice(0, 3) : [];

  return (
    <>
      <TopBarSaudacao />
      <BuscaMobile />
      <HeroMobile />

      {/* No mobile o hero de verdade é o HeroMobile (carrossel) acima —
          esse banner genérico do scaffold vira exclusivo do desktop. */}
      <section className="home-banner hidden md:block">
        <div className="container home-banner__conteudo">
          <h1>Descubra o mundo com a Explora</h1>
          <p>Os melhores destinos e pacotes de viagem em um só lugar.</p>
          <Link to="/destinos">
            <Botao variante="secundario">Ver destinos</Botao>
          </Link>
        </div>
      </section>

      <section className="container home-secao">
        <h2>Destinos em destaque</h2>

        {carregando && <Loader mensagem="Carregando destinos..." />}
        {erro && <p className="mensagem-erro">{erro}</p>}

        {destaques.length > 0 && (
          <div className="grade-cards">
            {destaques.map((destino) => (
              <DestinoCard key={destino.id} destino={destino} />
            ))}
          </div>
        )}
      </section>

      <section className="container home-secao">
        <h2>O que dizem nossos viajantes</h2>
        <div className="grade-depoimentos">
          {DEPOIMENTOS.map((depoimento) => (
            <Depoimento key={depoimento.nome} {...depoimento} />
          ))}
        </div>
      </section>
    </>
  );
}
