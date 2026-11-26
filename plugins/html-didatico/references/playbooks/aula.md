# Aula · um assunto consolidado, com as tabs que o pedido pede

A aula é o documento em que um assunto em construção fica de pé: como ele
funciona, como fica na tela, o que falta decidir e o que já foi decidido. É um
HTML só. A tab Aula existe sempre; as outras entram quando o pedido ou o estado
do trabalho pedem, e nunca para mostrar processo. Pedido pequeno, documento
pequeno.

Este playbook soma ao [didático](didatico.md): ficha, kit, figuras e leitura
seguem de lá. Aqui ficam o roteador das tabs e a gramática de cada uma; a da
dúvida é de [Decisão](../decisao.md).

## Exemplos

A base de toda aula é a [aula-ouro](../kit/ouro/aula.html): o kit embutido, as
cinco tabs, o quadro-pergunta e uma dúvida na gramática inteira. Copie o arquivo
para o destino (`node scripts/montar.mjs --novo aula <destino.html>`, a partir da
raiz do plugin) e troque o conteúdo, tab por tab; não comece do zero nem do
starter vazio. Copie a forma, nunca o conteúdo: os fatos da aula-ouro valem para
a data dela.

### O quadro

Cada quadro é uma `d-part` cujo título é a pergunta; a frase responde com o caso;
a figura (`w-fig`, ou uma tabela com `slot="fig"`) prova a frase; a fonte entra
em uma linha (`d-src`); a regra que se leva fecha em `<p><b>…</b></p>`.

```html
<d-part title="Quem lê o que você escreve?">
  <p>Três leitores. <b>Cada um precisa de um número diferente.</b></p>
  <w-fig cap="…a conclusão, com o dado do caso">…componentes w-*…</w-fig>
  <d-src>Exemplo: … catálogo de dev em 11/11/2026.</d-src>
</d-part>
```

As aulas reais que deram origem a este playbook repetem cinco padrões:

- A pergunta seguinte nasce da resposta anterior; nenhum quadro apresenta o
  modelo pronto para justificar depois.
- O caso real entra no título ou na frase (1000 mg de bisglicinato, 3.000, o
  bombom), nunca um exemplo genérico.
- A fonte oficial (ANVISA, FHIR, o catálogo de dev com data) entra destilada,
  numa linha, debaixo da figura.
- O caso difícil tem quadro próprio, com título de pergunta ("E se trocar a
  forma?", "E o Geral?").
- O fecho resume a regra numa tabela e a aplica aos casos que quebravam as
  tentativas anteriores.

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
| "Uma aula de como X funciona" | Aula |
| "Uma aula e um teste de X" | Aula, Na tela |
| "Uma aula de X", com uma escolha aberta no assunto | Aula, Dúvidas |
| Continuação de uma aula com decisões tomadas | Aula e as que o estado pede, com Leis |
| "O que muda no sistema por causa disso?" | Aula, Leis, Roadmap |

Com uma tab só, não desenhe a barra de tabs: a página é a aula.

## Antes de escrever: entender

A aula se escreve depois de [entender](../nucleo.md#entender-antes-de-tudo)
como a coisa funciona de verdade e de achar [o nó](../nucleo.md#o-nó).
Na aula, somam-se dois cuidados:

1. **As leis da versão anterior** são a fonte do passo 1 de Entender: se o
   assunto já tem aula, abra a tab Leis. Mudar uma lei pede nova decisão do
   usuário; o que diverge vira dúvida.
2. **Monte a ficha** de [Conteúdo](../conteudo.md#1-ficha-de-fatos) com duas
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
  ficha. A prova se confere pela [leitura pela figura](../visual/design.md#leitura-pela-figura):
  a resposta precisa aparecer só com a figura e a legenda.
- **A fonte em uma linha** quando o fato vem de pesquisa. A evidência entra
  destilada: a conclusão e a origem. O percurso da pesquisa fica fora.
- **A regra do quadro na última linha**, em negrito: o que o leitor leva dali.

Os quadros sobem em degraus: cada um parte do que o anterior deixou. Com quatro
quadros ou mais, abra com o trilho (`rail`). O fecho tem três quadros fixos,
nesta ordem, quando há material:

1. **"Qual é a regra, afinal?"**: a regra inteira, em uma tabela.
2. **"Funciona com os casos difíceis?"**: a regra aplicada aos casos de
   borda; num problema, aos que quebravam as tentativas anteriores.
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
  produto em uso é [Prova](prova.md).

## Dúvidas

Cada dúvida segue a gramática de [Decisão](../decisao.md): a pergunta com o caso
e as saídas, o que acontece, as opções comparadas no mesmo caso e a resposta com
a recomendada. A marcação de cada painel é a do
[HTML com uma aba por decisão](../decisao.md#html-com-uma-aba-por-decisão). Da
tab, só isto:

- Uma subtab por dúvida (peça `tabs tabs--sub` dentro da tab), numeradas de 1 a
  n, com `id="duvida-n"` em cada painel, para o link da Aula e para a resposta.
- A resposta de cada dúvida é um `<d-answer>`, e a tab fecha com um `<d-answers>`
  depois das subtabs: o texto copiado leva a pergunta junto, como manda
  [Padrões](../padroes.md#resposta-copiável-leva-a-origem).
- Para outro quadro da Aula, um link; nunca o número dele.

Decisões fora de uma aula, ou no canvas de Design, saem pelas outras
[saídas de Decisão](../decisao.md#a-saída).

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

## Forma

- Copie a [aula-ouro](../kit/ouro/aula.html). As tabs, o quadro, a figura e a
  dúvida são componentes do kit (`d-tabs`, `d-part`, `w-fig`, `w-*`); CSS de
  página só no bloco "desta página", com os tokens do kit. Não há look a escolher.
- Com a skill `olho-semicerrado` disponível, use-a na composição e na revisão.
- Verificar é opcional: quando pedido, ou quando o protótipo tem comportamento
  que só o clique confirma. O [check](../../scripts/check.mjs) lê todas as tabs,
  uma abaixo da outra; o resto é exercitar tabs, subtabs, links `#duvida-n` e os
  controles do protótipo. Nada disso é salvo junto da aula.
- A aula é um arquivo só. Bancada, boards, censo e scripts de geração não ficam
  ao lado dela: o que importa deles entra destilado nas tabs.

## O que não passa

Cada item já apareceu numa aula entregue e a derrubou. Releia o documento
contra a lista antes de entregar; quando o [check](../../scripts/check.mjs) roda,
ele reprova os quatro primeiros.

| Não passa | Faça |
|---|---|
| CSS próprio ou figura desenhada à mão: faixa de cabeçalho, cards, tabs, diorama | Copie a aula-ouro; o kit fica embutido e a figura é feita de componentes |
| Código de nota em qualquer tab: "a 07", "PRD 03", "162/05", "D-427" | Mostre o fato; para outro quadro, um link |
| Opção sem nome: "Uma possibilidade", "Outra possibilidade" | "A · Sem teto": a letra e o que a opção faz |
| Dúvida sem recomendada, sem "Responda no chat" ou com resposta que copia só o código | Sua resposta com `<d-answer>`, como em [Decisão](../decisao.md) e [Padrões](../padroes.md#resposta-copiável-leva-a-origem) |
| Tab fora do roteador: resumo de PRD, "Funcionamento canônico" | O que está decidido vai para Leis; o resto fica na fonte |
| Opção sem figura, ou figuras de casos diferentes | Uma figura por opção, todas com o mesmo caso e o mesmo número |
| Print de estado vazio ou de erro como figura de quadro | A figura prova a frase do quadro; print de produto só ao lado da proposta, em Dúvidas |
| Quadro que repete a ideia do anterior com outra figura | Uma pergunta, um quadro, com a figura que responde melhor |
| Inventário de fatos certos, sem o nó | A pergunta em pauta, o nó (a regra, ou o que prende) e a régua; os fatos se organizam em volta |
| Dor ou virada inventada num assunto que só pede apresentação | O que existe, como existe: o caso do começo ao fim e a regra |
| Fala sobre o documento: "um HTML ajuda a decidir", "comece pela 02" | O documento mostra; quem decide sabe por onde começar pelo mapa das tabs |

## Entrega

Em poucas linhas: as tabs abertas e por quê, as dúvidas com a recomendação de
cada uma, as leis novas desta versão, o que a fonte não deu e o que não foi
conferido no produto.
