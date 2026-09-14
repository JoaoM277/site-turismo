import React from 'react';
import { Clock, MapPinned, Phone, AtSign, Globe, MessageCircle } from 'lucide-react';

import { otimizarImagem } from '@/utils/imagem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Ícone por tipo de contato — cai em MessageCircle se o tipo não bater
// com nenhum dos conhecidos (mantém o item utilizável mesmo com um tipo
// novo que ainda não tenha ícone dedicado).
const ICONE_POR_TIPO_CONTATO = {
  whatsapp: MessageCircle,
  telefone: Phone,
  instagram: AtSign,
  site: Globe,
};

// Modal de um local em destaque (Task 9, item 1): fotos + descrição numa
// aba "Sobre", links de contato + rota no mapa numa aba "Contato" — só
// aparece pra locais marcados `destaque: true` (pontos turísticos e
// parceiros, nunca locais básicos), então sempre tem pelo menos fotos e
// `linkMaps`; `contatos` pode faltar (ex: ponto turístico público, sem
// parceiro comercial por trás) — a aba de contato então mostra só o
// botão do mapa.
export default function LocalDestaqueModal({ local, aberto, aoFechar }) {
  if (!local) return null;

  const temContato = (local.contatos?.length ?? 0) > 0 || Boolean(local.linkMaps);

  return (
    <Dialog open={aberto} onOpenChange={(abertoNovo) => !abertoNovo && aoFechar()}>
      <DialogContent>
        {local.fotos?.length > 0 && (
          <div className="flex gap-2 overflow-x-auto p-4 pb-0 [overscroll-behavior-x:contain] [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden">
            {local.fotos.map((foto) => (
              <img
                key={foto}
                src={otimizarImagem(foto, { largura: 500 })}
                alt={local.nome}
                className="h-40 w-56 shrink-0 rounded-xl object-cover"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        )}

        <DialogHeader>
          <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-primary">
            Destaque da semana
          </span>
          <DialogTitle>{local.nome}</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4">
          {temContato ? (
            <Tabs defaultValue="sobre">
              <TabsList>
                <TabsTrigger value="sobre">Sobre</TabsTrigger>
                <TabsTrigger value="contato">Contato</TabsTrigger>
              </TabsList>

              <TabsContent value="sobre">
                <DialogDescription>{local.descricaoCompleta ?? local.descricaoCurta}</DialogDescription>
                {local.horarioFuncionamento && (
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={16} className="shrink-0" aria-hidden="true" />
                    {local.horarioFuncionamento}
                  </p>
                )}
              </TabsContent>

              <TabsContent value="contato" className="flex flex-col gap-2">
                {local.contatos?.map((contato) => {
                  const Icone = ICONE_POR_TIPO_CONTATO[contato.tipo] ?? MessageCircle;
                  return (
                    <a
                      key={contato.valor}
                      href={contato.valor}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-foreground transition-colors active:bg-muted"
                    >
                      <Icone size={16} className="shrink-0 text-primary" aria-hidden="true" />
                      {contato.rotulo}
                    </a>
                  );
                })}

                {local.linkMaps && (
                  <a
                    href={local.linkMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-md"
                  >
                    <MapPinned size={16} className="shrink-0" aria-hidden="true" />
                    Ver rota no mapa
                  </a>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <>
              <DialogDescription>{local.descricaoCompleta ?? local.descricaoCurta}</DialogDescription>
              {local.horarioFuncionamento && (
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} className="shrink-0" aria-hidden="true" />
                  {local.horarioFuncionamento}
                </p>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
