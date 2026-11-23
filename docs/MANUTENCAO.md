# Como o HTML Didático funciona e como atualizar

## O que manda

O sistema visual é um design system só, com fonte em `plugins/html-didatico/references/kit/`:

- `kit.css`: os tokens (um `:root`, sem looks) e a aparência de cada componente;
- `kit.js`: a biblioteca de componentes. `d-*` monta o documento (capa, parte,
  abas, aviso, pé); `w-*` desenha o wireframe e o blueprint da figura. Cada
  componente é uma função pura de props e filhos que devolve a marcação semântica,
  e carrega grupo, resumo, props e um exemplo;
- `sprite.svg`: os ícones (Phosphor).

Tudo o mais é gerado dela ou a lê.

```
kit.css + kit.js ──montar.mjs──▶ starter.html, pecas.html, componentes.md,
                                 ouro/<nome>.html (de ouro/<nome>.body.html)
kit.css + kit.js ──gerar.mjs───▶ design system "HTML Didático" no Claude
```

A ideia visual, em uma frase: um rótulo nutricional desenhado a caneta. Tinta
preta desenha o produto em wireframe; magenta é a caneta de quem explica e não
tem outro uso. Os princípios moram em `references/visual/design.md`.

Os componentes são também o contrato de uma futura versão React (vídeo no
Remotion, por exemplo): mesmo nome, mesmas props, mesma marcação. Por isso uma
figura nunca é desenhada à mão no documento.

O design system no Claude é uma vitrine do kit, gerado e nunca editado lá.

Endereço: https://claude.ai/artifact/4qkdmqk1fvJZK58isz2Uqa

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
