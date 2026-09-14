import React, { useMemo, useState } from 'react';
import { Plus, Trash2, MapPin } from 'lucide-react';

import { buscarLocais } from '../../services/api';
import useFetch from '../../hooks/useFetch';
import useRoteirosSalvos from '../../hooks/useRoteirosSalvos';
import Loader from '../../components/Loader/Loader';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// Mesmas 3 categorias da aba Descubra (Task 6) — os locais pra escolher
// aqui são exatamente o mesmo catálogo (/api/locais), parceiros ou não,
// como pedido na task: "selecionando destinos já presentes parceiros ou
// não".
const CATEGORIAS = [
  { id: 'lazer', nome: 'Lazer' },
  { id: 'saude', nome: 'Saúde' },
  { id: 'hospedagem', nome: 'Hospedagem' },
];

// "Meu Roteiro" (Task 6.1, renomeada de "Criar" pra "Roteiros" na bottom
// nav — o catálogo de navegar/descobrir virou "Descubra", ver
// pages/Descubra/Descubra.jsx): o usuário monta o próprio roteiro de
// viagem combinando vários locais já cadastrados (parceiros ou básicos).
// Aba separada da Descubra de propósito — ver decisão de arquitetura na
// memória do projeto: navegar/descobrir e criar/montar são experiências
// diferentes, cada uma com sua própria aba fica mais claro e mais
// interativo do que misturar os dois numa lista só.
export default function Roteiros() {
  const { dados: locais, carregando, erro } = useFetch(() => buscarLocais(), []);
  const { roteiros, criarRoteiro, removerRoteiro } = useRoteirosSalvos();

  const [modalAberto, setModalAberto] = useState(false);
  const [nomeRoteiro, setNomeRoteiro] = useState('');
  const [selecionados, setSelecionados] = useState([]);

  const locaisPorId = useMemo(() => {
    const mapa = {};
    (locais ?? []).forEach((local) => {
      mapa[local.id] = local;
    });
    return mapa;
  }, [locais]);

  const locaisPorCategoria = useMemo(() => {
    const mapa = { lazer: [], saude: [], hospedagem: [] };
    (locais ?? []).forEach((local) => {
      if (mapa[local.categoria]) mapa[local.categoria].push(local);
    });
    return mapa;
  }, [locais]);

  function alternarSelecao(id) {
    setSelecionados((atual) => (atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]));
  }

  function abrirCriacao() {
    setNomeRoteiro('');
    setSelecionados([]);
    setModalAberto(true);
  }

  function salvarRoteiro() {
    if (!nomeRoteiro.trim() || selecionados.length === 0) return;
    criarRoteiro(nomeRoteiro.trim(), selecionados);
    setModalAberto(false);
  }

  return (
    <div className="pb-4">
      <div className="mx-4 mt-3 rounded-3xl border border-border bg-background p-4 shadow-xl md:mx-auto md:mt-8 md:max-w-3xl">
        <h1 className="text-xl font-bold text-foreground md:text-3xl">Meu Roteiro</h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          Monte seu próprio roteiro combinando os locais que você quer visitar.
        </p>
      </div>

      <div className="mx-4 mt-3 flex flex-col gap-3 pb-24 md:mx-auto md:max-w-3xl md:pb-8">
        {carregando && <Loader mensagem="Carregando locais..." />}
        {erro && <p className="mensagem-erro">{erro}</p>}

        <button
          type="button"
          onClick={abrirCriacao}
          className="flex items-center justify-center gap-2 rounded-3xl border border-dashed border-primary/40 bg-primary/5 px-4 py-4 text-sm font-semibold text-primary transition-colors active:bg-primary/10"
        >
          <Plus size={18} aria-hidden="true" />
          Criar novo roteiro
        </button>

        {!carregando && roteiros.length === 0 && (
          <p className="px-2 text-center text-sm text-muted-foreground">
            Você ainda não criou nenhum roteiro. Toque em "Criar novo roteiro" pra começar.
          </p>
        )}

        {roteiros.map((roteiro) => (
          <article key={roteiro.id} className="rounded-3xl border border-border bg-background p-4 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-sm font-semibold text-foreground">{roteiro.nome}</h2>
                <p className="text-xs text-muted-foreground">
                  {roteiro.localIds.length} {roteiro.localIds.length === 1 ? 'parada' : 'paradas'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removerRoteiro(roteiro.id)}
                aria-label={`Excluir roteiro ${roteiro.nome}`}
                className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-3 flex flex-col gap-1.5">
              {roteiro.localIds.map((id) => {
                const local = locaisPorId[id];
                if (!local) return null;
                return (
                  <li key={id} className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin size={14} className="shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{local.nome}</span>
                    {local.plano === 'cliente' && (
                      <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium uppercase text-primary">
                        Parceiro
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar novo roteiro</DialogTitle>
            <DialogDescription>Dê um nome e escolha os locais que fazem parte da sua experiência.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 px-4 pb-4">
            <input
              type="text"
              value={nomeRoteiro}
              onChange={(evento) => setNomeRoteiro(evento.target.value)}
              placeholder="Ex: Fim de semana em família"
              className="rounded-xl border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />

            <div className="flex max-h-64 flex-col gap-4 overflow-y-auto">
              {CATEGORIAS.map((categoria) => {
                const locaisDaCategoria = locaisPorCategoria[categoria.id] ?? [];
                if (locaisDaCategoria.length === 0) return null;

                return (
                  <div key={categoria.id}>
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {categoria.nome}
                    </p>
                    <div className="flex flex-col gap-1">
                      {locaisDaCategoria.map((local) => {
                        const marcado = selecionados.includes(local.id);
                        return (
                          <label
                            key={local.id}
                            className={cn(
                              'flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors',
                              marcado
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border text-foreground hover:bg-muted',
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={marcado}
                              onChange={() => alternarSelecao(local.id)}
                              className="accent-primary"
                            />
                            <span className="min-w-0 flex-1 truncate">{local.nome}</span>
                            {local.plano === 'cliente' && (
                              <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium uppercase text-primary">
                                Parceiro
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <button
              type="button"
              onClick={() => setModalAberto(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={salvarRoteiro}
              disabled={!nomeRoteiro.trim() || selecionados.length === 0}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              Salvar roteiro
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
