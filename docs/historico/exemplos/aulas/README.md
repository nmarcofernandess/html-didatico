# Aulas reais

> Histórico, de antes do design system 4.0.0: copie a didática, nunca o estilo nem a marcação.

Quatro aulas do DietFlow, feitas pelo playbook [Aula](../../../../plugins/html-didatico/references/playbooks/aula.md) e
pela gramática que deu origem a ele. São documentos históricos: os bytes ficam
como vieram, e os fatos de produto valem para a data de cada um. Copie a forma,
nunca o conteúdo.

| Exemplo | Data · origem | Abre como | O que copiar dele |
|---|---|---|---|
| [F · O que é um exame](F-aula-o-que-e-um-exame.html) | 10/11/2026 · canvas "O que é um exame" ([vivo](https://claude.ai/artifact/RALy8oAZT5HeLevnGPMaiW)), exportado autocontido | Sozinho, no navegador | O padrão de didática: a aula quase não precisa de texto. Cada quadro é uma pergunta, uma frase e uma figura que prova a frase; do objeto oficial mais simples até o único modelo que sobra |
| [G · Números e unidades](G-aula-numeros-e-unidades.html) | 18/11/2026 · Devkit `ac4d5ab6`, `.Docsdietflow/design/numeros-e-unidades/` | Sozinho, no navegador | O playbook atual inteiro, no kit: Aula, Na tela (protótipo que funciona), Dúvidas com subtab, Leis datadas e Roadmap |
| [H · Fórmula magistral](H-prescricao-canvas/Main.dc.html) | 19/11/2026 · Devkit `55fce07d`, canvas de Prescrição ([vivo](https://claude.ai/artifact/X2RTBjLmpRdhsMPtyeYXKJ)) | Só dentro do canvas de Design | Aula longa por construção: de "o que é uma fórmula magistral, oficialmente?" até a ficha do card, com o fecho fixo ("Qual é a regra, afinal?", "Funciona com os casos difíceis?", a ficha) |
| [H · Cadastrados](H-prescricao-canvas/Cadastrados.dc.html) | idem | Só dentro do canvas | Aula curta sobre um cadastro: o que ele guarda, o que trava, a regra, o caso que quebra ("E o bombom?") e o que muda no código |
| [H · Tomada, limite e lâmpada](H-prescricao-canvas/Limite.dc.html) | idem | Só dentro do canvas | Aula em três blocos com intertítulo (A tomada, O limite, A lâmpada e o documento) e um Blueprint no fim |

O F foi feito para tela larga, antes do kit: no celular ele rola para o lado e
o [check](../../../../plugins/html-didatico/scripts/check.mjs) aponta letra pequena e contraste baixo. A
didática é o padrão; a forma visual atual é a do kit e do G.

As páginas H dependem do runtime do canvas (`support.js`) e do DietFlow DS,
que não vêm aqui; as folhas e scripts da página (`aula.css`, `formula.css`,
`motor.js`, `lampada.css`, `lampada-motor.js`) vêm ao lado para ler a anatomia.

## A anatomia de um quadro

As aulas de canvas usam classes `au-*`; num documento do plugin, a mesma
anatomia se monta com as peças do [kit](../../../../plugins/html-didatico/references/kit/pecas.html).

```html
<section class="au-q" id="q2">
  <span class="au-n">2</span>                         <!-- número grande do quadro -->
  <h2>Quem lê o que você escreve?</h2>                <!-- título é a pergunta -->
  <p class="au-a">Três leitores. <b>Cada um precisa de um número diferente.</b></p>
  <figure class="au-fig">…</figure>                   <!-- a figura prova a frase -->
  <p class="au-src">Exemplo: … Catálogo de DEV em 11/11/2026.</p>   <!-- fonte em uma linha -->
  <p class="au-rule">Três leitores, três números. …</p>             <!-- a regra que se leva -->
</section>
```

## Padrões que se repetem nas quatro

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
