import { useCallback, useEffect, useState } from 'react';

const CHAVE_ARMAZENAMENTO = 'barra-do-corda:meus-roteiros';

function lerRoteirosSalvos() {
  if (typeof window === 'undefined') return [];
  try {
    const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    return bruto ? JSON.parse(bruto) : [];
  } catch {
    return [];
  }
}

// Persiste os roteiros criados pelo usuário (Task 6.1) no navegador dele.
// O projeto ainda não tem login/conta de usuário, então "meus roteiros"
// vive no localStorage por enquanto — trocar por uma API com
// autenticação de verdade quando o site tiver contas.
export default function useRoteirosSalvos() {
  const [roteiros, setRoteiros] = useState(lerRoteirosSalvos);

  useEffect(() => {
    try {
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(roteiros));
    } catch {
      // Armazenamento indisponível (modo privado, cota cheia etc.) — ignora,
      // o roteiro continua funcionando na sessão atual mesmo sem persistir.
    }
  }, [roteiros]);

  const criarRoteiro = useCallback((nome, localIds) => {
    setRoteiros((atual) => [...atual, { id: `roteiro-${Date.now()}`, nome, localIds, criadoEm: Date.now() }]);
  }, []);

  const removerRoteiro = useCallback((id) => {
    setRoteiros((atual) => atual.filter((roteiro) => roteiro.id !== id));
  }, []);

  return { roteiros, criarRoteiro, removerRoteiro };
}
