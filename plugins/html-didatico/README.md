# HTML Didático

Plugin com três skills para transformar explicação técnica em documento que se
entende sem tradutor.

| Skill | Papel |
|---|---|
| `html-didatico` | O desenho: HTML autocontido com anatomia visual própria. Cinco direções — A manual de operação, B editorial, C prova final, D prancha de decisão, E blueprint de composição — e primitivos para explicar sistemas (explorer de IDE, editor, chave, árvore, camadas). |
| `explain-clearly` | O significado: reconstrói objetos, causas e consequências a partir das fontes antes de qualquer frase. |
| `writing-clearly-and-concisely` | A frase: voz ativa, termos concretos, só as palavras necessárias. |

## Instalar

Veja o README da raiz do repositório.

## Exemplos de origem

`skills/html-didatico/references/exemplos/` guarda um HTML real por direção. O
primeiro, `A-manual-escalaflow-quickstart.html` (10/06/2026), é o documento de
onde o estilo nasceu: o manual de primeira escala do EscalaFlow.

## Blueprint de composição

A Direção E tem [playbook próprio](skills/html-didatico/references/blueprint-componentes.md)
e [receita HTML exemplar](skills/html-didatico/references/exemplos/E-blueprint-componentes.html).
Ela reconstrói a composição real, desenha `children` e slots dentro de suas
fronteiras e acompanha cada camada com tipos, props, mods e fontes. Propostas
são marcadas no ponto exato da mudança.

## HTMLs de proof

`references/proof-html.md` descreve os dois modos:

1. **Projeto com renderer oficial** (DietFlow: `scripts/proof/render-pack.ts` +
   `proof-pack.css`). O HTML publicado nunca é escrito à mão; a skill orienta o
   renderer, que já usa a Direção A/C.
2. **Sem renderer.** Direção C: o wireframe Rev. 0 nasce antes da execução e o
   mesmo arquivo vira a prova preenchida (Rev. 1).

## Origem

Estas skills viviam no plugin Superflow (`nmarcofernandess/superflow`,
`plugins/superflow/skills/`) de 06/07/2026 até 13/09/2026, quando o commit
`04644e7` as removeu. Esta versão parte da última revisão de lá (Direções A–D,
clareza sem burocracia, sub-skills de significado e escrita) e acrescenta, em
05/11/2026, a narrativa para explicar sistemas, os primitivos de sistema
(`receita.md` §12) e a referência de HTML de proof.

