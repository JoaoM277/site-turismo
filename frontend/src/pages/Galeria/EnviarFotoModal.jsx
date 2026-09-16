import React, { useState } from 'react';
import { Upload, ImagePlus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { enviarFotoGaleria } from '@/services/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Lê a largura/altura reais do arquivo antes de enviar — é o que
// permite ao masonry da galeria (item 3 da task) reservar o espaço
// certo assim que a foto for aprovada, sem precisar de nenhuma lib de
// leitura de imagem no backend: o próprio navegador já sabe as
// dimensões de um arquivo que ele mesmo carregou.
function lerDimensoesImagem(arquivo) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(arquivo);
    const img = new Image();
    img.onload = () => {
      resolve({ largura: img.naturalWidth, altura: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Não foi possível ler a imagem'));
    };
    img.src = url;
  });
}

// Modal de envio de foto (Task 12, itens 2 e 5): sem sistema de login —
// só pede um nome de usuário em texto. A foto entra numa fila de
// moderação e nunca aparece em tempo real; o usuário só recebe a
// confirmação de que foi recebida.
export default function EnviarFotoModal({ aberto, aoFechar }) {
  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [username, setUsername] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState(null); // { tipo: 'sucesso' | 'erro', texto }

  function selecionarArquivo(evento) {
    const arquivoSelecionado = evento.target.files?.[0];
    if (!arquivoSelecionado) return;

    setArquivo(arquivoSelecionado);
    setPreview(URL.createObjectURL(arquivoSelecionado));
    setMensagem(null);
  }

  function fecharModal() {
    setArquivo(null);
    setPreview(null);
    setUsername('');
    setMensagem(null);
    aoFechar();
  }

  async function enviar() {
    if (!arquivo || !username.trim()) return;

    setEnviando(true);
    setMensagem(null);

    try {
      const { largura, altura } = await lerDimensoesImagem(arquivo);
      const resposta = await enviarFotoGaleria({ arquivo, username: username.trim(), largura, altura });
      setMensagem({ tipo: 'sucesso', texto: resposta.mensagem });
      setArquivo(null);
      setPreview(null);
    } catch (erro) {
      setMensagem({
        tipo: 'erro',
        texto: erro.response?.data?.mensagem || 'Não foi possível enviar a foto. Tente novamente.',
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={(abertoNovo) => !abertoNovo && fecharModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviar foto</DialogTitle>
          <DialogDescription>
            Compartilhe um momento do seu passeio. Sua foto passa por uma breve moderação antes de aparecer aqui.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-4 pb-4">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/50 p-6 text-center text-sm text-muted-foreground">
            {preview ? (
              <img src={preview} alt="Pré-visualização" className="max-h-48 rounded-lg object-contain" />
            ) : (
              <>
                <ImagePlus size={24} aria-hidden="true" />
                Toque pra escolher uma foto
              </>
            )}
            <input type="file" accept="image/*" onChange={selecionarArquivo} className="hidden" />
          </label>

          <input
            type="text"
            value={username}
            onChange={(evento) => setUsername(evento.target.value)}
            placeholder="Seu nome de usuário"
            maxLength={40}
            className="rounded-xl border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />

          {mensagem && (
            <p className={cn('text-sm', mensagem.tipo === 'sucesso' ? 'text-[var(--cor-sucesso)]' : 'text-destructive')}>
              {mensagem.texto}
            </p>
          )}
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={fecharModal}
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            {mensagem?.tipo === 'sucesso' ? 'Fechar' : 'Cancelar'}
          </button>

          {mensagem?.tipo !== 'sucesso' && (
            <button
              type="button"
              onClick={enviar}
              disabled={!arquivo || !username.trim() || enviando}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload size={14} aria-hidden="true" />
              {enviando ? 'Enviando...' : 'Enviar foto'}
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
