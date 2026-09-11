import React, { createContext, useContext, useMemo, useState } from 'react';

// Context global simples da aplicação.
// Guarda estados que várias páginas/componentes precisam compartilhar,
// como o "carrinho" de reserva sendo montado pelo usuário.
const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Pacote selecionado pelo usuário para reservar (preenchido ao clicar
  // em "Reservar" na página de detalhe/pacotes e usado na página de Reserva).
  const [pacoteSelecionado, setPacoteSelecionado] = useState(null);

  // useMemo evita recriar o objeto de valor a cada renderização,
  // o que evitaria re-renders desnecessários nos componentes consumidores.
  const valor = useMemo(
    () => ({ pacoteSelecionado, setPacoteSelecionado }),
    [pacoteSelecionado]
  );

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

// Hook de conveniência para consumir o contexto, com verificação de uso correto.
export function useAppContext() {
  const contexto = useContext(AppContext);
  if (!contexto) {
    throw new Error('useAppContext precisa ser usado dentro de um <AppProvider>');
  }
  return contexto;
}
