# Boards · a decisão no canvas de Design

Uma das saídas de [Decisão](../decisao.md), dona da gramática: cada decisão vira
um board de canvas de Design que conta a história em quadros, com os componentes
do [kit](../kit/componentes.md), e um mapa abre a página e diz como decidir.
Precisa do canvas de Design do Claude com o design system HTML Didático
instalado ([canvas.md](canvas.md)); sem canvas, a saída é o HTML com uma aba por
decisão.

Os boards são para decisão que muda comportamento, dado ou regra e precisa de
contexto para ser respondida. Escolha visual pontual (dois ícones, duas
palavras) sai como [maquete](../playbooks/maquete.md), com as duas lado a lado.

## O que se entrega

Uma página do canvas com:

1. **Mapa** (o arquivo de `MAPA.arquivo`): como decidir em três passos e as
   decisões em grupos — **Mudam o sistema**, **Ficam como em dev**, **Arrumação** —,
   cada linha com a recomendação em poucas palavras e o link para o board. Embaixo,
   "Já decidido", com data, lei e origem do que não volta à mesa.
2. **Um board por decisão** (`D01` a `Dnn`), vertical, sempre na mesma gramática:

| Quadro | Título | Mostra |
|---|---|---|
| 1 | O que acontece | A situação concreta, com o caso real, que faz a pergunta existir |
| 2 | Em dev | Como o sistema faz em dev, na tela que a pessoa usa |
| 3 | Com a recomendação | Como fica se ele aceitar |
| 4 | Sua resposta | Opções A, B (C), a recomendada marcada, e "Responda no chat: 1A ou 1B" |

Quando a recomendação é **manter dev**, o quadro 2 se chama "Em dev, que é a
recomendação" e o 3 vira "Se fosse a outra opção": ele vê o que estaria recusando.
Decisão sem tela própria (arrumação de boards, por exemplo) pode ter dois quadros
antes da resposta. Estado de dev que não foi conferido na fonte não vira quadro
"Em dev": o quadro mostra a opção pelo nome dela.

Cada quadro é: título, **uma frase** que diz o líder (o status, o nome, a coluna
que muda) e uma figura de componentes do kit no estado que prova a frase. A frase
carrega o líder porque, no celular, a figura pode rolar para o lado.

O motor compõe tudo com o kit: `d-pager` (mapa, anterior, próxima), `d-cover`
(decisão n de N, o grupo e a data), `d-steps` com um `d-part` por quadro, a
tabela das opções com a recomendada marcada e a `d-note` "Responda no chat".

## Como fazer

Levantar as decisões, apurar o estado em dev e a ordem seguem [Decisão](../decisao.md#levantar-e-apurar).

1. **Escreva cada decisão** no arquivo de decisões, no [formato](formato.md) do
   motor: a pergunta com o caso em `q`, os quadros com a figura, as opções em uma
   frase cada e a recomendada em `pick`.
2. **Escolha os componentes de cada figura** em [peças](pecas.md). Componente que
   falta entra no kit, com exemplo, como manda o `AGENTS.md`; nunca marcação à mão
   no arquivo de decisões.
3. **Confira em HTML:** `node <plugin>/references/decisoes/gerar.mjs <decisoes.mjs> --html <pasta>`
   escreve o mapa e os boards como documentos do kit e imprime o comando do
   [check](../../scripts/check.mjs). Rode, conserte as falhas e olhe os screenshots.
4. **Gere no canvas:** `node <plugin>/references/decisoes/gerar.mjs <decisoes.mjs> <canvas>/project`.
   `<plugin>` é a pasta instalada deste plugin (a que contém `skills/`, `scripts/`
   e `references/`). O motor valida o arquivo, recusa canvas sem o design system
   HTML Didático, pré-renderiza cada board com o kit num navegador (Playwright, a
   mesma dependência do check), escreve mapa, boards e as entradas da página no
   `canvas.json` e imprime a lista de arquivos a publicar.
5. **Publique e confira** como em [canvas.md](canvas.md).
6. **Versione as fontes** (arquivo de decisões e `project/`) na pasta da spec ou
   no devkit, com push, antes de encerrar.

## Armadilhas

| Sintoma | Causa | Faça |
|---|---|---|
| Board sem estilo, ou paginação como texto corrido | A cópia do design system no canvas é anterior ao componente | Atualize `project/ds/hd/` (canvas.md) depois de publicar o design system |
| Componente aparece cru (`<w-field>` sem desenho) | Tag que não existe no kit | O motor recusa; confira o nome em [componentes](../kit/componentes.md) |
| O motor recusa um board por ser de outra página | Dois assuntos no mesmo canvas com o `PREFIXO` padrão | Dê um `PREFIXO` e um `MAPA.arquivo` próprios a cada assunto |
| Board antigo continua no canvas | Uma decisão saiu do arquivo | O motor lista o arquivo a remover; mande-o como `null` no publish |
| Tabela cortada no celular | Muitas colunas numa figura | Tabela só com as colunas que o quadro discute; o resto vai para a frase |
| "Fig. 1" ao lado do número 1 | Legenda repete o número do quadro | A legenda diz a conclusão da figura, nunca o número |
| Board cortado no canvas | Altura do artboard menor que o conteúdo | Ajuste `ALTURAS` e confira no modo canvas que a "Sua resposta" aparece inteira |
| Write negado no devkit | Hook do DietFlow bloqueia edição com a pasta em `main` | Trabalhe numa worktree do devkit (`.worktrees/<nome>`) e publique em `main` por fast-forward |

## Limites

- Só leitura em `origin/dev` e no banco; nenhum código de produto muda aqui.
- Copy dos boards passa por `strings-safadas`: frase invariante ou estrutura, nunca
  prosa que só vale para a amostra.
- O board mostra o produto em wireframe, não a tela real. Quando a decisão é sobre
  a aparência de uma tela que existe, o print do produto entra com `w-shot`.
- Canvas antigos, feitos com o DietFlow DS, continuam abrindo com a cópia própria
  do DS; o motor daquela época está em `docs/historico/exemplos/decisoes/`, no
  repositório.
