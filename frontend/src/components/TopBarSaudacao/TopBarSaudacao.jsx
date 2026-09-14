import React, { useEffect, useState } from 'react';
import { Sunrise, Sun, Moon, Thermometer } from 'lucide-react';

import { buscarTemperaturaAtual } from '../../services/clima';

// Saudação muda com o horário do dispositivo — bem pequeno, sem
// depender de nenhuma lib de data (ver política de dependências em
// memória: só adicionar peso quando o CSS/JS nativo não resolver).
// `periodo` é a chave usada em MENSAGENS_CLIMA logo abaixo.
function obterSaudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return { periodo: 'manha', texto: 'Bom dia', Icone: Sunrise };
  if (hora < 18) return { periodo: 'tarde', texto: 'Boa tarde', Icone: Sun };
  return { periodo: 'noite', texto: 'Boa noite', Icone: Moon };
}

// Faixas de temperatura simples — a região é tropical, então "calor" é o
// caso mais comum, mas vale cobrir os outros pra quando esfriar mesmo.
function categorizarTemperatura(temperatura) {
  if (temperatura >= 30) return 'calor';
  if (temperatura >= 22) return 'ameno';
  return 'frio';
}

// Mensagens variáveis (item 2 da task) — combinação período do dia +
// faixa de temperatura, com mais de uma opção por combinação pra não
// repetir sempre a mesma frase. Sorteada a cada carregamento da Home.
// Curtas de propósito (cabem numa linha só do cartão, sem cortar) e
// com tom leve/brincalhão — não é aviso de tempo, é convite.
const MENSAGENS_CLIMA = {
  manha: {
    calor: ['Já esquenta! Bora pro rio?', 'Sol forte — passa protetor!'],
    ameno: ['Manhã boa pra explorar!', 'Clima gostoso lá fora!'],
    frio: ['Friozinho, que tal um café?', 'Esfriou! Só o café ajuda.'],
  },
  tarde: {
    calor: ['Calor desse jeito? Bora pro rio!', 'Tá quente! Hora do mergulho.'],
    ameno: ['Tardezinha boa pra passear!', 'Clima top pra um rolê!'],
    frio: ['Fresquinho, ótimo pra andar!', 'Esfriou? Bom papo cai bem.'],
  },
  noite: {
    calor: ['Noite quente, bora sair?', 'Calorzinho até de noite!'],
    ameno: ['Noite boa pra um rolê!', 'Clima gostoso pra curtir!'],
    frio: ['Esfriou! Chocolate quente chama.', 'Friozinho — cobertor pede passagem.'],
  },
};

function sortearMensagemClima(periodo, temperatura) {
  const opcoes = MENSAGENS_CLIMA[periodo][categorizarTemperatura(temperatura)];
  return opcoes[Math.floor(Math.random() * opcoes.length)];
}

// Top bar exclusiva da Home no mobile (Task 3, com clima na Task extra
// final): um cartão de saudação, flutuando com a mesma margem/linguagem
// visual da BottomNavMobile (borda, fundo, sombra, cantos bem
// arredondados) — harmonioso com o menu inferior já implementado, sem
// repetir o TopHero genérico (esse segue só pro desktop, ver Navbar.jsx).
//
// A temperatura é opcional por natureza: se a Open-Meteo falhar (rede
// instável, API fora do ar) o cartão cai de volta pro texto padrão sem
// nenhum erro visível — é um enfeite, não algo crítico pra página funcionar.
export default function TopBarSaudacao() {
  const { periodo, texto, Icone } = obterSaudacao();
  const [temperatura, setTemperatura] = useState(null);

  useEffect(() => {
    let cancelado = false;

    buscarTemperaturaAtual()
      .then((valor) => {
        if (!cancelado) setTemperatura(valor);
      })
      .catch(() => {
        // Sem clima disponível: o cartão simplesmente não mostra o selo
        // de temperatura nem a mensagem variável, caindo pro texto fixo.
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const mensagem = temperatura !== null ? sortearMensagemClima(periodo, temperatura) : 'Bem-vindo a Barra do Corda';

  return (
    <div className="mx-4 mt-4 flex items-center gap-3 rounded-3xl border border-border bg-background p-4 shadow-xl md:hidden">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icone size={22} strokeWidth={2} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">{texto}, visitante</p>
          {temperatura !== null && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              <Thermometer size={12} aria-hidden="true" />
              {temperatura}°C
            </span>
          )}
        </div>
        <p className="text-base font-semibold text-foreground">{mensagem}</p>
      </div>
    </div>
  );
}
