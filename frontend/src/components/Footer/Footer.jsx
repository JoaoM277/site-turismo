import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight } from 'lucide-react';

// Rodapé exibido em todas as páginas (Task 11). Redesenhado no mesmo
// idioma visual do resto do site — fundo `bg-muted` de propósito: é o
// mesmo tom neutro já usado em badges/áreas secundárias, contraste leve
// o bastante pra separar visualmente do conteúdo acima sem ficar escuro
// ou pesado como o rodapé antigo (`--cor-primaria-escura` + texto branco).
//
// `pb-24 md:pb-8`: sem isso, a última linha do rodapé ficaria presa
// atrás da BottomNavMobile (fixa, flutuando por cima do conteúdo) — não
// há mais nada depois do Footer no documento pra "revelar" esse espaço
// rolando mais, então o respiro extra precisa vir do próprio rodapé.
export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="mt-6 border-t border-border bg-muted pb-24 md:pb-8">
      <div className="mx-auto max-w-3xl px-4 py-8 text-center md:text-left">
        <h2 className="text-base font-bold text-foreground">Portal de Turismo de Barra do Corda</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground md:mx-0">
          Portal oficial de turismo municipal — descubra a cidade, monte seu roteiro e acompanhe os eventos da
          semana.
        </p>

        <div className="mt-4 flex flex-col items-center gap-1.5 text-sm text-muted-foreground md:items-start">
          <a href="tel:+5599000000000" className="flex items-center gap-2 transition-colors hover:text-foreground">
            <Phone size={14} className="shrink-0" aria-hidden="true" />
            (99) 0000-0000
          </a>
          <a
            href="mailto:turismo@barradocorda.ma.gov.br"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Mail size={14} className="shrink-0" aria-hidden="true" />
            turismo@barradocorda.ma.gov.br
          </a>
        </div>

        <Link
          to="/contato"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Divulgue seu negócio
          <ArrowRight size={14} aria-hidden="true" />
        </Link>

        <p className="mx-auto mt-6 max-w-md border-t border-border pt-4 text-xs text-muted-foreground md:mx-0">
          © {anoAtual} Portal de Turismo de Barra do Corda. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
