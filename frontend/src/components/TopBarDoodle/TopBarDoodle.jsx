import React, { useEffect, useState } from 'react';
import { Sunrise, Sun, Moon, Thermometer } from 'lucide-react';

import { buscarTemperaturaAtual } from '../../services/clima';

// Saudação muda com o horário do dispositivo — bem pequeno, sem
// depender de nenhuma lib de data (ver política de dependências em
// memória: só adicionar peso quando o CSS/JS nativo não resolver).
// `periodo` é a chave usada em MENSAGENS_CLIMA logo abaixo.
//
// Bug corrigido aqui: a condição original era só `hora < 12` pra manhã,
// então de 0h a 5h59 (madrugada) também caía como "Bom dia" — testado
// às 00:59 e a saudação errava. Agora a manhã exige `hora >= 6`, e
// qualquer coisa fora de manhã/tarde cai em "noite" — o que inclui de
// propósito a madrugada (0h-5h59), tratada igual ao período noturno.
function obterSaudacao() {
  const hora = new Date().getHours();
  if (hora >= 6 && hora < 12) return { periodo: 'manha', texto: 'Bom dia', Icone: Sunrise };
  if (hora >= 12 && hora < 18) return { periodo: 'tarde', texto: 'Boa tarde', Icone: Sun };
  return { periodo: 'noite', texto: 'Boa noite', Icone: Moon };
}

// Faixas de temperatura simples — a região é tropical, então "calor" é o
// caso mais comum, mas vale cobrir os outros pra quando esfriar mesmo.
function categorizarTemperatura(temperatura) {
  if (temperatura >= 30) return 'calor';
  if (temperatura >= 22) return 'ameno';
  return 'frio';
}

// Mensagens variáveis — combinação período do dia + faixa de
// temperatura, com mais de uma opção por combinação pra não repetir
// sempre a mesma frase. Sorteada a cada carregamento da Home. Curtas de
// propósito (cabem numa linha só) e com tom leve/brincalhão — não é
// aviso de tempo, é convite.
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

// Cores principais da bandeira do município — usadas só como referência
// abstrata (3 retinhos, ver rodapé do componente), não uma reprodução
// fiel da bandeira em si. Tons de referência; se surgir um guia de
// identidade visual oficial com os hex exatos, é só trocar aqui.
const CORES_BANDEIRA = ['#FFC700', '#1E9E4A', '#141414'];

// Top bar única no topo da Home mobile (Task 3 + doodle + clima,
// consolidados numa mesclagem única a pedido do dono do produto): reúne
// o que antes eram dois elementos empilhados — a faixa com o doodle de
// Barra do Corda (Antônio Cardoso/Cardosonot) e o cartão de saudação —
// numa barra só, de ponta a ponta (mesma largura do Footer), mantendo o
// conteúdo/lógica da saudação exatamente como era, só sem o cartão
// arredondado próprio (agora ele "mora" dentro da barra).
//
// Fundo com a mesma cor do fundo da própria imagem (`bg-background`,
// branco) de propósito: a ilustração é um JPG comum (sem transparência
// de verdade), mas como o fundo dela é branco liso e a barra também é
// branca, o retângulo da foto "some" visualmente — dá a impressão de
// ser um PNG recortado, sem precisar remover o fundo de verdade.
//
// No rodapé da barra, 3 retinhos nas cores da bandeira do município
// (amarelo/verde/preto) "furam" a borda inferior — ver comentário mais
// abaixo, junto do JSX deles, para o porquê do posicionamento.
export default function TopBarDoodle() {
  const { periodo, texto, Icone } = obterSaudacao();
  const [temperatura, setTemperatura] = useState(null);

  useEffect(() => {
    let cancelado = false;

    buscarTemperaturaAtual()
      .then((valor) => {
        if (!cancelado) setTemperatura(valor);
      })
      .catch(() => {
        // Sem clima disponível: a barra simplesmente não mostra o selo
        // de temperatura nem a mensagem variável, caindo pro texto fixo.
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const mensagem = temperatura !== null ? sortearMensagemClima(periodo, temperatura) : 'Bem-vindo a Barra do Corda';

  return (
    // O padding vertical mora aqui, no <header>, e não na div.container
    // logo abaixo de propósito: a classe .container (index.css) usa o
    // shorthand `padding: 0 var(--espaco-md)`, que também zera
    // padding-top/bottom — e como essa regra é declarada depois das
    // utilities do Tailwind no CSS final, ela sempre vence e anula
    // qualquer py-* aplicado ali (testado com py-3 a py-20, nenhum
    // efeito visual). Se precisar mexer no respiro vertical da barra de
    // novo, é aqui em cima.
    <header className="relative w-full border-b border-border bg-background md:hidden py-3">
      <div className="container flex items-center gap-7">
        {/* h-full + w-auto (não um quadrado forçado com object-cover):
            a ilustração é retrato (595×894) — mostrando ela inteira, só
            reduzida, a margem branca do próprio JPG encosta direto no
            fundo branco da barra sem nenhuma borda visível entre os
            dois, reforçando a ilusão de "PNG" pedida. Cortar num
            quadrado esconderia o "BARRA DO CORDA" que já está desenhado
            na própria arte. */}
        <div className="animate-doodle-float relative h-12 shrink-0">
          <img
            src="/imagens/ilustracoes/barra-do-corda-doodle.jpg"
            alt="Ilustração de Barra do Corda, por Antônio Cardoso (Cardosonot)"
            className="h-full w-auto rounded-lg"
          />
          <div
            aria-hidden="true"
            className="animate-doodle-sheen pointer-events-none absolute inset-0 rounded-lg mix-blend-overlay"
            style={{
              backgroundImage: 'linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.8) 50%, transparent 58%)',
              backgroundSize: '250% 250%',
            }}
          />
        </div>

        {/* Conteúdo da antiga TopBarSaudacao, mesclado aqui do jeito que
            era — só sem o wrapper de cartão (rounded-3xl/border/shadow),
            que virou redundante já que agora tudo mora dentro desta
            mesma barra. */}
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
          <p className="mt-1 text-base font-semibold text-foreground">{mensagem}</p>
        </div>
      </div>

      {/* As 3 cores principais da bandeira do município, num aceno bem
          discreto a ela (sem tentar redesenhar a bandeira inteira em
          código). `bottom-0` + `translate-y-1/2` no grupo faz a borda
          inferior da barra (border-b acima) cortar cada retinho bem no
          meio — metade dentro da barra, metade pra fora —, centralizado
          horizontalmente na borda. Maior medida é a altura (retinhos em
          pé), do tamanho de um ícone pequeno do site, com espaçamento
          mediano entre eles. Cada um com uma leve inclinação (mesmo
          ângulo nos 3) pra não ficarem "engessados" — um toque de
          bandeirinha tremulando, sem exagerar. */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-1.5"
      >
        {CORES_BANDEIRA.map((cor) => (
          <span key={cor} className="h-4 w-1.5 -rotate-6 rounded-[1px]" style={{ backgroundColor: cor }} />
        ))}
      </span>
    </header>
  );
}
