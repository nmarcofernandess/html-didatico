# Boards · a decisão no canvas de Design

Uma das saídas de [Decisão](../decisao.md), dona da gramática: cada decisão vira
um board de canvas de Design que conta a história em quadros, com componentes
reais do DietFlow DS, e um mapa abre a página e diz como decidir. Precisa do
canvas de Design do Claude com o DietFlow DS instalado, que o motor exige; sem
um dos dois, a saída é o HTML com uma aba por decisão.

Os boards são para decisão que muda comportamento, dado ou regra e precisa de
contexto para ser respondida. Escolha visual pontual (dois ícones, duas
palavras) sai como [maquete](../playbooks/maquete.md), com as duas lado a lado.

## O que se entrega

Uma página do canvas com:

1. **Mapa** (`CadastroDecisoes.dc.html` ou o nome dado em `MAPA['arquivo']`): como
   decidir em três passos e as decisões em grupos — **Mudam o sistema**, **Ficam
   como em dev**, **Arrumação** — cada linha com a recomendação em poucas palavras
   e o link para o board. Embaixo, "Já decidido" com o que não volta à mesa.
2. **Um board por decisão** (`D01` a `Dnn`), vertical, sempre na mesma gramática:

| Quadro | Título | Mostra |
|---|---|---|
| 1 | O que acontece | A situação concreta, com o caso real, que faz a pergunta existir |
| 2 | Em dev | Como o sistema faz em dev, na peça que a tela usa |
| 3 | Com a recomendação | Como fica se ele aceitar |
| 4 | Sua resposta | Opções A, B (C), a recomendada marcada, e "Responda no chat: 1A ou 1B" |

Quando a recomendação é **manter dev**, o quadro 2 se chama "Em dev, que é a
recomendação" e o 3 vira "Se fosse a outra opção": ele vê o que estaria recusando.
Decisão sem tela própria (arrumação de boards, por exemplo) pode ter dois quadros
antes da resposta.

Cada quadro é: título, **uma frase** que diz o líder (o status, o nome, a coluna
que muda), e uma figura com o componente do DS no estado que prova a frase. A
frase carrega o líder porque, no celular, a tabela rola para o lado.

## Como fazer

Levantar as decisões, apurar o estado em dev e a ordem seguem [Decisão](../decisao.md#levantar-e-apurar).

1. **Escreva cada decisão** no arquivo de decisões, no [formato](formato.md) do
   motor: a pergunta com o caso em `q`, as opções em uma frase cada e a
   recomendada em `pick`.
2. **Escolha a peça de cada figura** em [pecas.md](pecas.md). Use a peça
   existente; para outro domínio, componha com os componentes do DS (README e
   `index.d.ts` do DS) e só crie peça nova em [pecas.js](pecas.js) quando dois
   boards precisarem dela.
3. **Gere:** `python3 <plugin>/references/decisoes/gerar.py <decisoes.py> <canvas>/project`,
   onde `<plugin>` é a pasta instalada deste plugin (a que contém `skills/` e
   `references/`; o [motor](gerar.py) acha peças e CSS ao lado dele). O motor
   valida o arquivo, escreve mapa, boards, `decisoes.css` e o `canvas.json` da
   página, e imprime a lista de arquivos a publicar.
4. **Publique e confira** como em [canvas.md](canvas.md): ler o artifact antes,
   publicar com `root`, abrir cada board no modo Play, passar o
   `olho-semicerrado`, corrigir e publicar de novo.
5. **Versione as fontes** (arquivo de decisões e `project/`) na pasta da spec ou
   no devkit, com push, antes de encerrar.

## Armadilhas já vistas

| Sintoma | Causa | Faça |
|---|---|---|
| Status sumido atrás da lixeira | Coluna "Ações" fixa (`stickyEnd`) cobre a vizinha em tela estreita | Figura sem coluna de ações; a decisão nunca é sobre a lixeira |
| Coluna cortada numa figura lado a lado | Tabela em meia largura rola para o lado | Tabela sempre em largura inteira; lado a lado só busca, gráfico e card |
| Ícone vira bolinha | O bundle do DS não embute aquele glifo lucide | Confira em `components/src/icons.js` do DS; se faltar, use `lucide(corpo)` com o corpo de `node_modules/@iconify-json/lucide/icons.json`; nunca desenhe |
| "1.2 mg/L" no gráfico | Eixo Y e rótulo padrão do `LineChartCard` imprimem ponto | A peça `chart` já esconde o eixo Y e formata o rótulo em pt-BR |
| "Fig. 1" ao lado do número 1 | Plaqueta repete o número do quadro | Sem plaqueta; o número grande basta |
| Board cortado no canvas | Altura do artboard menor que o conteúdo | Ajuste `ALTURAS` e confira no modo canvas que a faixa "Responda no chat" aparece |
| Write negado no devkit | Hook do DietFlow bloqueia edição com a pasta em `main` | Trabalhe numa worktree do devkit (`.worktrees/<nome>`) e publique em `main` por fast-forward |

## Limites

- Só leitura em `origin/dev` e no banco; nenhum código de produto muda aqui.
- Copy dos boards passa por `strings-safadas`: frase invariante ou estrutura, nunca
  prosa que só vale para a amostra.
