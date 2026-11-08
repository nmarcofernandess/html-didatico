# HTML Didático

Plugin com dez skills para transformar explicação técnica em documento que se
entende sem tradutor.

| Skill | Responsabilidade |
|---|---|
| [html-didatico](skills/html-didatico/SKILL.md) | Entrada geral: escolhe a direção adequada ao pedido. |
| [manual-operacao](skills/manual-operacao/SKILL.md) | Direção A: manuais, onboarding, quickstarts e runbooks. |
| [editorial](skills/editorial/SKILL.md) | Direção B: narrativa técnica, problema e decisão. |
| [prova-final](skills/prova-final/SKILL.md) | Direção C: wireframe Rev. 0 e evidência real na Rev. 1. |
| [prancha-decisao](skills/prancha-decisao/SKILL.md) | Direção D: alternativas da mesma estrutura e seus custos. |
| [blueprint-componentes](skills/blueprint-componentes/SKILL.md) | Direção E: árvore, montagem dos primitivos ao específico e contratos laterais. |
| [explicar-sistema](skills/explicar-sistema/SKILL.md) | Onde mora, como funciona, por que existe e quem usa; primitivos de sistema. |
| [proof-html](skills/proof-html/SKILL.md) | Renderer oficial ou prova manual; anatomia e integridade das evidências. |
| [explain-clearly](skills/explain-clearly/SKILL.md) | Reconstrução de significado, causas e consequências a partir das fontes. |
| [writing-clearly-and-concisely](skills/writing-clearly-and-concisely/SKILL.md) | Revisão de frases, títulos, labels e legendas. |

## Chamada direta

No Codex, selecione a skill pelo `$` e pelo nome do plugin. Exemplos:

    $html-didatico:blueprint-componentes Mostre como este componente é montado.
    $html-didatico:proof-html Revise a apresentação do renderer deste pack.
    $html-didatico:prancha-decisao Compare estas duas estruturas.
    $html-didatico:explicar-sistema Explique a organização dos testes deste projeto.

Os demais nomes da tabela seguem o mesmo namespace `html-didatico`.
No Claude Code, use `/html-didatico:nome-da-skill`. A apresentação do seletor
pode variar por host. As entradas diretas usam os mesmos playbooks e receitas;
não são cópias independentes. `html-didatico` continua disponível como entrada geral.

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

[`proof-html`](skills/proof-html/SKILL.md) dá acesso direto à [referência](skills/html-didatico/references/proof-html.md), que descreve os dois modos:

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

