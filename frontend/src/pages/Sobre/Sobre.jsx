import React from 'react';
import './Sobre.css';

// Página "Sobre" — placeholder mínimo. Existe principalmente pra dar ao
// item "Sobre" do menu uma rota própria e distinta de "/" (antes ele
// apontava pra "/", o que fazia o clique parecer "quebrado" quando já se
// estava na Home, e também causava o bug de dois itens ativos ao mesmo
// tempo). Conteúdo real de Barra do Corda entra numa task futura.
export default function Sobre() {
  return (
    <section className="container pagina-sobre">
      <h1>Sobre Barra do Corda</h1>
      <p>
        Texto de exemplo — apresentação da cidade, história e informações gerais entram aqui quando o
        conteúdo definitivo for definido.
      </p>
    </section>
  );
}
