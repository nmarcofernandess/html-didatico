# Como o HTML Didático funciona e como atualizar

## O que manda

O sistema visual é um design system só, com fonte em `plugins/html-didatico/references/kit/`:

- `kit.css`: os tokens (um `:root`, sem looks) e a aparência de cada componente;
- `kit.js`: a biblioteca de componentes. `d-*` monta o documento (capa, parte,
  abas, aviso, pé); `w-*` desenha o wireframe e o blueprint da figura. Cada
  componente é uma função pura de props e filhos que devolve a marcação semântica,
  e carrega grupo, resumo, props e um exemplo;
- `sprite.svg`: os ícones (Phosphor).

Tudo o mais é gerado dela ou a lê. Em Node, `scripts/kit.mjs` é a porta de
entrada: lê a fonte, carrega o registro e pré-renderiza um corpo de componentes
num navegador. `montar.mjs` e o motor dos boards (`references/decisoes/gerar.mjs`)
usam daqui.

```
kit.css + kit.js ──montar.mjs──▶ starter.html, pecas.html, componentes.md,
                                 ouro/<nome>.html (de ouro/<nome>.body.html)
kit.css + kit.js ──gerar.mjs───▶ design system "HTML Didático" no Claude
kit.css + kit.js ──decisoes/gerar.mjs──▶ boards de Decidir no canvas de Design
```

A ideia visual, em uma frase: uma aula impressa em papel quadriculado: título em serifa, rótulo em mono, uma pergunta com a resposta em uma linha e a figura em largura total. Tinta
preta desenha o produto em wireframe; magenta é a caneta de quem explica e não
tem outro uso. Os princípios moram em `references/visual/design.md`.

Os componentes são também o contrato de uma futura versão React (vídeo no
Remotion, por exemplo): mesmo nome, mesmas props, mesma marcação. Por isso uma
figura nunca é desenhada à mão no documento.

O design system no Claude é uma vitrine do kit, gerado e nunca editado lá.

Endereço: https://claude.ai/artifact/4qkdmqk1fvJZK58isz2Uqa

## O que a marcação gerada promete

- A raiz de cada componente tem como classe o próprio nome (`w-field`, `d-part`) e o
  estado em `data-*`. O `kit.css` veste por aí.
- Alguns componentes levam também uma classe curta da 3.x (`page`, `part`, `fig`,
  `cover`, `tabs__panel`, `chip`…). Elas não têm regra no `kit.css`: existem porque o
  `check.mjs` lê `.part`, `.fig`, `.page--card`, `.cover__sub` e `.tabs__panel`. Para
  tirar uma, mude o check junto.
- `slot` passa adiante na raiz: é como `d-part` acha a figura (`slot="fig"`) e
  `d-band` acha o lado (`slot="aside"`), seja o filho um componente ou não.
- `montar.mjs --atualizar` troca o kit só em documento 4.x. Um documento da 3.x é
  escrito em marcação que o kit 4 não veste; ele fica como está ou tem o corpo
  reescrito com componentes.

## Mudar ou criar um componente

1. Em `kit.js`, um `def('w-nome', { grupo, doc, props, ex, html })`; em `kit.css`,
   a aparência por classe (`.w-nome`) e estado em `data-*`, só com tokens.
2. `node plugins/html-didatico/scripts/montar.mjs`: regera starter, folha de peças,
   `componentes.md` e os exemplos-ouro a partir de `ouro/<nome>.body.html`.
3. `node plugins/html-didatico/scripts/check.mjs` nos exemplos-ouro e na folha de
   peças. O check reprova componente que não existe no kit e erro de script, e
   avisa quando um corpo tem peça desenhada à mão.
4. `node tools/design-system/gerar.mjs` escreve `tools/design-system/saida/`.
5. Peça a um chat do Claude com acesso a artefatos: "publique a pasta
   `saida/project` no design system HTML Didático". Os ícones em `saida/icons`
   só sobem de novo quando o sprite muda.
6. Release, como manda o `AGENTS.md`.

Os boards de Decidir no canvas de Design levam a marcação pronta e se vestem com a
cópia do `bundle.css` que cada canvas guarda em `project/ds/hd/`. Um componente
novo ou um ajuste de CSS só aparece num canvas depois que essa cópia é atualizada
(`references/decisoes/canvas.md`).

Sem Claude Code ou sem acesso a artefatos, os passos 1 a 3 e 6 bastam para o
plugin. O design system fica atrasado até alguém rodar o 4 e o 5.

## Exemplo-ouro

A fonte é `references/kit/ouro/<nome>.body.html`: só componentes e, se preciso, um
`<style data-pagina>` com até três regras de tokens. O `montar` gera o
`<nome>.html` ao lado. Exemplo novo entra na pasta e, se for base de documento, na
lista `BASES` do `montar.mjs`. Um documento avulso nasce de
`montar.mjs --novo <base> <destino.html>` ou de `montar.mjs --corpo <corpo.html> <destino.html>`.

## Ideia que nasceu no design system ou num canvas

Uma ideia aprovada lá só existe para o plugin quando chega ao `kit.js` e ao
`kit.css`. O caminho de volta é manual: quem fez a mudança lê o token ou o
componente no design system, escreve no kit e segue os passos acima. Não edite o
design system direto para "guardar" uma mudança; a próxima geração apaga.

## Históricos

Os documentos de antes do design system ficam em `docs/historico/exemplos/`,
fora do pacote, com os bytes de origem. O estilo deles é obsoleto.

## O que o design system no Claude não guarda

- O chão pontilhado da figura e o marca-texto: são gradientes, ficam só no CSS.
- O comportamento de `kit.js` além da montagem: conferência e abas aparecem paradas nos cartões.
