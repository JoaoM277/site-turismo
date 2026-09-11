import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

// Barra de navegação principal, fixa no topo, responsiva:
// em telas pequenas o menu vira um "hambúrguer" que abre/fecha.
export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="navbar">
      <div className="container navbar__conteudo">
        <NavLink to="/" className="navbar__logo" onClick={fecharMenu}>
          ✈️ Explora
        </NavLink>

        <button
          className="navbar__hamburguer"
          aria-label="Abrir menu de navegação"
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${menuAberto ? 'navbar__links--aberto' : ''}`}>
          <NavLink to="/" end onClick={fecharMenu}>
            Início
          </NavLink>
          <NavLink to="/destinos" onClick={fecharMenu}>
            Destinos
          </NavLink>
          <NavLink to="/pacotes" onClick={fecharMenu}>
            Pacotes
          </NavLink>
          <NavLink to="/contato" onClick={fecharMenu}>
            Contato
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
