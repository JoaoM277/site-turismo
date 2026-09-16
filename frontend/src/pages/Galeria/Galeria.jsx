import React, { useState } from 'react';
import { Camera } from 'lucide-react';

import { buscarFotosGaleria } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import Loader from '../../components/Loader/Loader';
import { resolverUrlImagem, otimizarImagem } from '../../utils/imagem';
import FotoModal from './FotoModal';
import EnviarFotoModal from './EnviarFotoModal';

// "Galeria de Fotos" (Task 12) — fotos enviadas pelos próprios usuários.
// Layout em mosaico (item 3 da task): CSS multi-column (`columns-2`),
// não grid nem flexbox — é o único jeito de fazer cada foto ocupar o
// espaço proporcional à sua altura/largura reais sem nenhuma lib de
// masonry em JS. Cada item entra com `break-inside-avoid` (nunca corta
// uma foto ao meio entre colunas) e `h-auto` (a altura vem da proporção
// real da imagem, não de um recorte forçado).
export default function Galeria() {
  const { dados: fotos, carregando, erro } = useFetch(() => buscarFotosGaleria(), []);
  const [fotoSelecionada, setFotoSelecionada] = useState(null);
  const [modalFotoAberto, setModalFotoAberto] = useState(false);
  const [modalEnvioAberto, setModalEnvioAberto] = useState(false);

  function abrirFoto(foto) {
    setFotoSelecionada(foto);
    setModalFotoAberto(true);
  }

  return (
    <div className="pb-4">
      <div className="mx-4 mt-3 rounded-3xl border border-border bg-background p-4 shadow-xl md:mx-auto md:mt-8 md:max-w-3xl">
        <h1 className="text-xl font-bold text-foreground md:text-3xl">Galeria de Fotos</h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Momentos registrados por quem já visitou Barra do Corda.
        </p>

        <button
          type="button"
          onClick={() => setModalEnvioAberto(true)}
          className="mt-3 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md"
        >
          <Camera size={16} aria-hidden="true" />
          Enviar foto
        </button>
      </div>

      <div className="mx-4 mt-3 md:mx-auto md:max-w-3xl">
        {carregando && <Loader mensagem="Carregando galeria..." />}
        {erro && <p className="mensagem-erro">{erro}</p>}

        {!carregando && !erro && fotos?.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
            Nenhuma foto na galeria ainda. Seja o primeiro a enviar uma!
          </p>
        )}

        {fotos?.length > 0 && (
          <div className="columns-2 gap-2 pb-24 md:columns-3 md:pb-8">
            {fotos.map((foto) => (
              <button
                key={foto.id}
                type="button"
                onClick={() => abrirFoto(foto)}
                className="mb-2 block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-md"
              >
                <img
                  src={otimizarImagem(resolverUrlImagem(foto.url), { largura: 500 })}
                  alt={`Foto enviada por ${foto.username}`}
                  width={foto.largura}
                  height={foto.altura}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <FotoModal foto={fotoSelecionada} aberto={modalFotoAberto} aoFechar={() => setModalFotoAberto(false)} />
      <EnviarFotoModal aberto={modalEnvioAberto} aoFechar={() => setModalEnvioAberto(false)} />
    </div>
  );
}
