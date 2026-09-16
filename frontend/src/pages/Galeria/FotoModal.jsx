import React from 'react';
import { Download } from 'lucide-react';

import { resolverUrlImagem, otimizarImagem } from '@/utils/imagem';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Baixa a imagem de verdade (em vez de só abrir/navegar) buscando como
// blob e disparando um link temporário — funciona mesmo com front e
// back em origens diferentes, ao contrário do atributo `download` puro
// num link cross-origin (que a maioria dos navegadores ignora).
async function baixarImagem(url, nomeArquivo) {
  try {
    const resposta = await fetch(url);
    const blob = await resposta.blob();
    const urlObjeto = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = urlObjeto;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(urlObjeto);
  } catch {
    // Download via blob falhou (rede instável, CORS inesperado etc.) —
    // como último recurso, abre a imagem numa aba nova.
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// Modal de uma foto da Galeria (Task 12, item 4): a foto em si, opção
// de download e uma legenda discreta "By username" — nada chamativo,
// só atribuição.
export default function FotoModal({ foto, aberto, aoFechar }) {
  if (!foto) return null;

  const src = resolverUrlImagem(foto.url);

  return (
    <Dialog open={aberto} onOpenChange={(abertoNovo) => !abertoNovo && aoFechar()}>
      <DialogContent showCloseButton className="overflow-hidden">
        <img
          src={otimizarImagem(src, { largura: 900 })}
          alt={`Foto enviada por ${foto.username}`}
          className="max-h-[70vh] w-full bg-black object-contain"
        />

        <div className="flex items-center justify-between gap-3 p-4">
          <p className="text-xs text-muted-foreground">By {foto.username}</p>
          <button
            type="button"
            onClick={() => baixarImagem(src, `barra-do-corda-${foto.id}.jpg`)}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-md"
          >
            <Download size={14} aria-hidden="true" />
            Baixar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
