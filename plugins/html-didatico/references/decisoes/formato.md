# Arquivo de decisões

Um módulo ES (`decisoes.mjs`), lido pelo motor ([gerar.mjs](gerar.mjs)) com
`import`. O exemplo-ouro é [numeros-e-unidades.mjs](exemplos/numeros-e-unidades.mjs):
duas decisões e as leis de Números e unidades, tiradas dos exemplos-ouro do kit,
sem fato novo. Copie a forma, nunca o conteúdo.

## O que o módulo exporta

| Nome | Obrigatório | O que é |
|---|---|---|
| `PAGINA` | sim | `{ id, nome, depois_de }`: página do canvas; criada depois da página `depois_de` se ainda não existir |
| `MAPA` | sim | `{ arquivo, titulo, titulo_canvas, olho, data, depois, onde, pergunta, links }`: nome do arquivo do mapa, título da capa, título no canvas, produto e assunto, data absoluta (dd/mm/aaaa), frase do passo 3 ("o que acontece depois das respostas"), a origem do mapa em `onde` (o sistema, a frente e o estado, com a data) e `pergunta` (a pergunta real que as decisões respondem juntas), como manda [Padrões](../padroes.md#abertura-ancorada), `links: [[rótulo, arquivo]]` com no máximo um link, para a página-índice do canvas (a aula, o roadmap) |
| `DECISOES` | sim | Lista de decisões, na ordem do mapa (muda, fica, arruma) |
| `JA_DECIDIDO` | não | Leis que não voltam à mesa: `[[data, lei, origem]]`, como a tabela Leis da [Aula](../playbooks/aula.md#leis) |
| `ALTURAS` | não | `{ mapa: 1700, D01: 3100, … }`: altura de cada artboard no canvas (padrão 3000; mapa 2200) |
| `PREFIXO`, `LARGURA` | não | `'D'` e `1400` por padrão |

## Uma decisão

```js
{
  short: 'Faixa do Triglicerídeos sem jejum',              // linha do mapa e título no canvas
  kind: 'muda',                                            // muda | fica | arruma
  q: 'Triglicerídeos sem jejum: desejável abaixo de 150 ou de 175 mg/dL?',   // a capa: pergunta com o caso
  rec: 'Desejável abaixo de 175 mg/dL.',                   // recomendação curta, no mapa
  quadros: [                                               // [título, frase, figura]; 2 ou 3 quadros
    ['O que acontece', 'São dois exames: o Triglicerídeos, sem jejum, e o em jejum de 12h.', `<w-fig cap="…">…</w-fig>`],
    ['Hoje', 'Os dois usam a mesma faixa. 160 mg/dL dá <b>Limítrofe alto</b> nos dois.', `<w-fig cap="…">…</w-fig>`],
    ['Com a recomendação', 'Sem jejum, desejável abaixo de 175. O mesmo 160 dá <b>Adequado</b>.', `<w-fig cap="…">…</w-fig>`],
  ],
  opts: [['A · Faixa própria sem jejum', 'Desejável abaixo de 175 mg/dL, pelo Consenso Brasileiro de 2016.'],
         ['B · Uma faixa só', 'Manter 150 nos dois até a curadoria revisar a faixa.']],
  pick: 0,                                                 // índice da recomendada
}
```

A figura é marcação do kit: uma `w-fig` com a cena, ou um `d-cols` com uma
`w-fig` por lado. Outra marcação sai embrulhada numa `w-fig`. A frase e as
opções são HTML: `<b>` para o líder, `&lt;` para o sinal de menor.

O motor confere: as variáveis obrigatórias em texto (com `MAPA.onde` e `MAPA.pergunta`), `MAPA.arquivo` terminado em
`.dc.html`, `MAPA.data` em dd/mm/aaaa, `kind` válido, ao menos duas opções com
rótulo "A · …", "B · …" em ordem, `pick` dentro delas, 2 ou 3 quadros com
título, frase e figura, as leis em três colunas, `{{` em nenhum texto (o canvas o
lê como buraco), componente que o kit não conhece e nome de board que já é de
outra página do canvas. O check, rodado na saída `--html`,
confere o resto: componente que não existe, código de nota, opção sem nome,
decisão sem recomendada, sem "Responda no chat" ou sem `<d-answer>`.

## Escrevendo bem

- `q` com o caso real e as saídas na própria pergunta.
- A opção se chama pelo que faz ("A · Sem teto"); a resposta no chat é número e
  letra, e o motor a monta a partir da letra.
- Frase do quadro com o líder em negrito e o número real: "160 mg/dL dá
  **Limítrofe alto**". Uma frase; duas no máximo.
- Valores de figura vêm da fonte do produto (faixas, condições, nomes). Paciente de
  exemplo fixo quando a faixa depende da pessoa (ex.: mulher, 34 anos).
- Datas absolutas (dd/mm/aaaa) nas figuras; nada de "hoje".
- A caneta (`mark`, `pin`, `w-callout mark`) só no dado de que o quadro fala.
- Opção sem justificativa longa: o porquê está nos quadros.
