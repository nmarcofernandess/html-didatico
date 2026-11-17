# Aula · um assunto consolidado, com as tabs que o pedido pede

A aula é o documento em que um assunto em construção fica de pé: como ele
funciona, como fica na tela, o que falta decidir e o que já foi decidido. É um
HTML só. A tab Aula existe sempre; as outras entram quando o pedido ou o estado
do trabalho pedem, e nunca para mostrar processo. Pedido pequeno, documento
pequeno.

Este playbook soma ao [didático](didatico.md): ficha, kit, figuras, check e
leitura seguem de lá. Aqui ficam o roteador das tabs e a gramática de cada uma.

## O roteador

Leia o pedido e o estado do trabalho, e abra só as tabs que têm material. A
ordem é fixa.

| Tab | Entra quando | O que é |
|---|---|---|
| Aula | Sempre | A consolidação: como a coisa funciona, em quadros |
| Na tela | O pedido pede teste, protótipo ou "como fica"; ou ver funcionando decide algo | Protótipo funcional do estado decidido |
| Dúvidas | Há mais de uma opção para algo que muda o resultado | Uma subtab por dúvida, com a comparação |
| Leis | O usuário já decidiu algo sobre o assunto | Só as decisões dele, com data e origem |
| Roadmap | O usuário pede, ou uma lei muda o que já existe no produto | O que muda, de onde para onde |

| Pedido | Tabs |
|---|---|
| "Me explica como X funciona" | Aula |
| "Uma aula e um teste de X" | Aula, Na tela |
| "Estou entre A e B para X" | Aula, Dúvidas |
| Continuação de uma aula com decisões tomadas | Aula e as que o estado pede, com Leis |
| "O que muda no sistema por causa disso?" | Aula, Leis, Roadmap |

Com uma tab só, não desenhe a barra de tabs: a página é a aula.

## Antes de escrever: entender

A aula não é resumo de fontes. Ela só se escreve depois de entender como a
coisa funciona de verdade.

1. **Leia as leis primeiro.** Se o assunto já tem aula, abra a tab Leis da
   versão anterior. Nada no documento contradiz uma lei sem nova decisão do
   usuário; o que contradiz vira dúvida.
2. **Entenda o sistema.** Com a skill `architecture-research` disponível, use-a.
   Sem ela, responda o mesmo: quem é o dono, quais dados, quem escreve e quem
   lê, o ciclo de vida, o contrato e a regra que não pode quebrar. Cada fato vem
   da fonte (código, spec, decisão, tela); fato do produto em uso é conferido no
   código vigente.
3. **Monte a ficha** de [Conteúdo](../conteudo.md#1-ficha-de-fatos) com duas
   linhas a mais: o que está decidido (vai para Leis) e o que está aberto, com
   as opções (vai para Dúvidas). O que a fonte não dá fica fora e entra na
   entrega como pendência.

## Aula

Cada parte é um **quadro**: uma pergunta que o leitor faria, na ordem em que ela
nasceria.

- **Título é a pergunta**, com o caso real: "Glicose é um exame?", "Essa
  quantidade é de uma dose ou do dia?".
- **Uma frase de resposta** logo abaixo. Ela carrega o líder da figura.
- **Uma figura que prova a frase**: cena ou esquema do kit, com os dados da
  ficha.
- **A fonte em uma linha** quando o fato vem de pesquisa. A evidência entra
  destilada: a conclusão e a origem. O percurso da pesquisa fica fora.
- **A regra do quadro na última linha**, em negrito: o que o leitor leva dali.

Os quadros sobem em degraus: cada um parte do que o anterior deixou. Com quatro
quadros ou mais, abra com o trilho (`rail`). O fecho tem três quadros fixos,
nesta ordem, quando há material:

1. **"Qual é a regra, afinal?"**: a regra inteira, em uma tabela.
2. **"Funciona com os casos difíceis?"**: a regra aplicada aos casos que
   quebravam as tentativas anteriores.
3. **A ficha**: o modelo de dados ou o contrato que sai da regra, quando o
   assunto é dado ou peça de sistema.

A Aula mostra só o que está decidido ou confirmado. Onde há dúvida aberta, o
quadro mostra o estado atual e leva à dúvida por link (`#duvida-2`).

## Na tela

Um **protótipo que funciona**: o leitor clica, marca, digita e vê o resultado.

- Monte com as peças de cena do kit e os dados reais da ficha. O comportamento
  vai num `<script>` curto no fim do `<body>`, depois do script do kit.
- Só o estado decidido. Uma opção ainda aberta fica em Dúvidas.
- Recorte a tela em que a regra aparece, em tamanho de leitura. Várias telas,
  um protótipo por tela, cada uma com um título que a nomeia.
- O protótipo mostra o comportamento; ele não comprova o produto. Comparar com o
  produto em uso é [HTML Proof](proof.md).

## Dúvidas

Uma subtab por dúvida (peça `tabs tabs--sub` dentro da tab), numeradas de 1 a n.
Cada painel tem `id="duvida-n"`, para o link da Aula e para a resposta.

Cada dúvida tem um título e três passos:

| Passo | Mostra |
|---|---|
| Título | A pergunta com o caso e as saídas: "Triglicerídeos sem jejum: desejável abaixo de 150 ou de 175 mg/dL?" |
| O que acontece | A situação concreta que faz a pergunta existir |
| Comparando | As opções lado a lado (`cols`), cada uma com a figura e o resultado no mesmo caso. A evidência mora aqui: a fonte, os números, como o mercado faz. Quando a dúvida é sobre a tela, o produto em uso entra como print, ao lado da proposta |
| Sua resposta | Tabela das opções (A, B e, se houver, C), uma frase cada, a recomendada com o chip "Recomendada"; embaixo, um `note` com "Responda no chat: 2A ou 2B" |

- Quando a recomendação é manter o que existe, a coluna do produto em uso vem
  primeiro e diz isso.
- Nenhum código de nota (C-03, D04, "quadro 18"): mostre o fato, ou leve ao
  quadro da Aula por link.
- A gramática é a mesma da skill `decisoes-em-boards` (pergunta, quadros,
  opções, recomendada). As mesmas decisões servem ao HTML e aos boards de canvas.

## Leis

Uma tabela: **Data | Lei | Origem**. Entra só decisão do usuário: a resposta a
uma dúvida ("2A em 17/11/2026") ou uma ordem explícita dele. Recomendação sem
resposta não é lei.

- A lei é uma frase afirmativa que se confere: "Triglicerídeos sem jejum:
  desejável abaixo de 175 mg/dL."
- A lista protege contra regressão. Antes de mudar a aula, o protótipo ou o
  código do assunto, confira as leis; mudar uma lei exige nova decisão.
- Lei superada não some: a linha ganha "Superada em dd/mm/aaaa" e a lei nova
  entra com a própria data.

## Roadmap

Uma tabela: **No produto | Muda para | Lei de origem**. A coluna da esquerda
só tem o que foi conferido na fonte; o que não foi conferido fica fora e entra
na entrega como pendência.

## O ciclo

Quando o usuário responde uma dúvida:

1. A dúvida sai de Dúvidas.
2. A resposta entra em Leis, com data e origem.
3. Aula e Na tela passam a mostrar a decisão.
4. Se o produto precisa mudar, o Roadmap ganha a linha.

Atualize o mesmo documento, preservando o que segue correto. Dúvidas encolhe a
cada rodada; tab sem material sai.

## Forma e prova

- Copie o [starter](../kit/starter.html). As tabs principais são a peça `tabs`
  no lugar das partes soltas. O look segue o assunto: `editorial` para modelo,
  regra e decisão; `manual` quando a aula ensina uma operação.
- Com a skill `olho-semicerrado` disponível, use-a na composição e na revisão.
- Rode o [check](../../scripts/check.mjs): ele lê todas as tabs, uma abaixo da
  outra. Depois abra o documento e exercite cada tab, cada subtab, os links
  `#duvida-n` e os controles do protótipo, em 390 e 1280 px.

## Entrega

Em poucas linhas: as tabs abertas e por quê, as dúvidas com a recomendação de
cada uma, as leis novas desta versão, o que a fonte não deu e o que não foi
conferido no produto.
