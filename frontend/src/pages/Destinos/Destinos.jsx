import React, { useMemo, useState } from 'react';

import { buscarDestinos } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import DestinoCard from '../../components/DestinoCard/DestinoCard';
import Loader from '../../components/Loader/Loader';
import './Destinos.css';

// Página de listagem de todos os destinos, com um filtro simples por país.
export default function Destinos() {
  const { dados: destinos, carregando, erro } = useFetch(() => buscarDestinos(), []);
  const [paisFiltro, setPaisFiltro] = useState('todos');

  // Lista de países únicos, calculada a partir dos destinos carregados,
  // para popular o <select> de filtro dinamicamente.
  const paises = useMemo(() => {
    if (!destinos) return [];
    return [...new Set(destinos.map((destino) => destino.pais))];
  }, [destinos]);

  const destinosFiltrados = useMemo(() => {
    if (!destinos) return [];
    if (paisFiltro === 'todos') return destinos;
    return destinos.filter((destino) => destino.pais === paisFiltro);
  }, [destinos, paisFiltro]);

  return (
    <section className="container pagina-destinos">
      <div className="pagina-destinos__cabecalho">
        <h1>Todos os destinos</h1>

        <label className="filtro-select">
          País:
          <select value={paisFiltro} onChange={(e) => setPaisFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            {paises.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </label>
      </div>

      {carregando && <Loader mensagem="Carregando destinos..." />}
      {erro && <p className="mensagem-erro">{erro}</p>}

      {!carregando && destinosFiltrados.length === 0 && (
        <p>Nenhum destino encontrado para este filtro.</p>
      )}

      <div className="grade-cards">
        {destinosFiltrados.map((destino) => (
          <DestinoCard key={destino.id} destino={destino} />
        ))}
      </div>
    </section>
  );
}
