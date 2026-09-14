import React from 'react';
import { Clock, ExternalLink, ImageOff } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Modal de detalhe de um local (Task 6, item 3: "aba ou modal próprio com
// fotos, descrição e horário de funcionamento"). O conteúdo muda conforme
// o plano do local (item 4 da task — lógica escalável cliente/básico):
// - "cliente": galeria de fotos + descrição completa + link direto.
// - "basico": só as informações superficiais que todo local tem
//   (categoria, descrição curta, horário) — sem fotos nem link, com um
//   aviso discreto explicando o porquê (abre espaço pro upsell futuro).
export default function LocalDetalheModal({ local, categoriaNome, aberto, aoFechar }) {
  if (!local) return null;

  const ehCliente = local.plano === 'cliente';

  return (
    <Dialog open={aberto} onOpenChange={(abertoNovo) => !abertoNovo && aoFechar()}>
      <DialogContent>
        {ehCliente && local.fotos?.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto p-4 pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {local.fotos.map((foto) => (
              <img
                key={foto}
                src={foto}
                alt={local.nome}
                className="h-40 w-56 shrink-0 rounded-xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="mx-4 mt-4 flex h-32 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <ImageOff size={24} aria-hidden="true" />
          </div>
        )}

        <DialogHeader>
          <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-primary">
            {categoriaNome}
          </span>
          <DialogTitle>{local.nome}</DialogTitle>
          <DialogDescription>{local.descricaoCompleta ?? local.descricaoCurta}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 px-4 pb-4">
          {local.horarioFuncionamento && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} className="shrink-0" aria-hidden="true" />
              {local.horarioFuncionamento}
            </p>
          )}

          {ehCliente && local.linkExterno && (
            <a
              href={local.linkExterno}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md"
            >
              Saiba mais
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}

          {!ehCliente && (
            <p className="rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
              Este é um perfil básico — fotos e link direto ficam disponíveis para locais parceiros.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
