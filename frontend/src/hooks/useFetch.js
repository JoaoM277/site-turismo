import { useEffect, useState, useCallback } from 'react';

// Hook genérico para buscar dados assíncronos e controlar os estados
// de carregamento e erro, evitando repetir essa lógica em cada página.
//
// Uso:
//   const { dados, carregando, erro } = useFetch(() => buscarDestinos(), []);
//
// `dependencias` funciona igual ao array de dependências do useEffect:
// a busca é refeita sempre que um valor dele mudar.
export default function useFetch(funcaoBusca, dependencias = []) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const executar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const resultado = await funcaoBusca();
      setDados(resultado);
    } catch (err) {
      setErro(err.response?.data?.mensagem || err.message || 'Erro ao carregar dados');
    } finally {
      setCarregando(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencias);

  useEffect(() => {
    executar();
  }, [executar]);

  return { dados, carregando, erro, recarregar: executar };
}
