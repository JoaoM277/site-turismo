import React from 'react';
import './Botao.css';

// Botão reutilizável com variantes visuais.
// `variante`: 'primario' (padrão) | 'secundario' | 'contorno'
// Aceita `as="link"` implicitamente ao receber `href`/`to` via `Componente`,
// mas por simplicidade este botão é sempre um <button> nativo; para links
// estilizados como botão, use a classe .botao diretamente em um <Link>.
export default function Botao({
  children,
  variante = 'primario',
  tipo = 'button',
  onClick,
  disabled = false,
  ...outrasProps
}) {
  return (
    <button
      type={tipo}
      className={`botao botao--${variante}`}
      onClick={onClick}
      disabled={disabled}
      {...outrasProps}
    >
      {children}
    </button>
  );
}
