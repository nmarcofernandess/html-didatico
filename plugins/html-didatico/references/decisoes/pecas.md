# Peças das figuras

Definidas em [pecas.js](pecas.js) e coladas no `renderVals()` de cada board. Cada
uma monta componentes do DietFlow DS (`window.DietFlow`, aqui `DF`). Escolha pela
pergunta que o quadro responde.

## Qual peça para qual quadro

| O quadro mostra | Peça |
|---|---|
| Linhas de pedido ou resultado de exames, com status | `mini('P' \| 'R', linhas)`; com o card inteiro (busca, Em massa, Preparo), `card(K, linhas, prep?, título?, props?)`: tipo por ícone com dica, lixeira e chevron, como em dev; `props` passa `isExpanded: false` para recolher |
| O que a busca acha | `busca(texto, [opt(nome, ícone?)])` |
| Escolha em lote | `massa([[seção, itens]], escolhidos)` (Adicionar Exames em Massa); item com `off: motivo` sai bloqueado, como a linha “Já está neste card” |
| Abas de um cadastro | `modal(abas, abaSelecionada)` com `num`, `select`, `input` no conteúdo |
| Texto livre | `textCard(título, texto)` |
| Curva no tempo | `chart(título, dados, séries)` |
| Valores com data, sem gráfico | `readings(título, [[valor, data, nota?]])` |
| Tabela de fatos (fase × faixa, coleta × condição) | `simple(colunas, linhas)` |
| Dois lados de um quadro | `two(a, b)`; empilhar: `stack(...)`; legenda curta: `lane(etiqueta, texto, nó)` |

## Linha de exame (`mini`, `card`)

`{ name, cond, val, op, unit, ref, stat, why, cat, kids, open, opens, quiet }`

- Pedido (`'P'`): `name` e `cond` (texto da Condição; sem `cond`, mostra —).
- Resultado (`'R'`): `val` número, `op` sinal (`=`, `<`, `≤`, `>`, `≥`), `unit`,
  `ref` (texto da faixa de referência, ex. `'50–59'`), `stat` `[texto, cor]`
  (`success`, `warning`, `danger`, `default`). Sem `stat`, o status sai como
  "—", com `why` no tooltip (use as frases de dev, ex. "Sem referência no cadastro.").
- `cat`: valor de categoria no lugar do número.
- `kids` + `open: true`: composto aberto em subitens (cada filho é uma linha).
- `opens: true`: linha simples desenhada aberta (para mostrar "a linha passaria a abrir").
- `quiet: true`: sem célula de status (quando o status não é o assunto).

Status segue a regra do sistema: faixa de referência = Adequado; vizinha com outra
além = Limítrofe alto/baixo; ponta = Alto/Baixo. Calcule com as faixas reais do
catálogo antes de escrever `stat`.

## Primitivas

`h` (createElement), `icon(nome, px)` (lucide do DS), `lucide(corpo, px)` (glifo que o
DS não embute), `chip(texto, cor, variante)`, `tip(rótulo, nó)`, `iconButton(nome,
rótulo, cor)`, `field(rótulo, valor)`, `closed(valor, rótulo)` (autocomplete fechado),
`dash`, `noop`.

## Outro domínio

Para Prescrição, Agenda ou outro módulo, componha com os componentes do DS no
`js` da decisão: leia o README do componente no DS
(`https://claude.ai/artifact/T9rFqZfSNdxXtk9iHNVhrm`, `project/components/<Nome>/README.md`
e `index.d.ts`) e o componente de dev que ele representa. Overlays aparecem
estáticos com as props do DS: `isOpen` + `contained` em modais, `isOpen` em
`SmartAutocomplete`. Quando dois boards precisarem da mesma composição, ela vira
peça em [pecas.js](pecas.js).

## O que não fazer

- Coluna de ações nas tabelas das figuras: a fixa cobre o status.
- Tabela em meia largura.
- Ícone desenhado à mão ou emoji.
- `<div>` com borda imitando card, modal ou campo: use o componente.
- Número com ponto decimal visível (use `toLocaleString('pt-BR')`).
