# Como o HTML Didático funciona e como atualizar

## O que manda

O sistema visual tem uma fonte: `plugins/html-didatico/references/kit/kit.css`
(com `kit.js` e `sprite.svg`). Tudo o mais é gerado dela ou a lê.

```
kit.css ──montar.mjs──▶ starter.html, pecas.html, ouro/*      (o que o plugin entrega)
kit.css ──gerar.mjs───▶ design system "HTML Didático" no Claude (onde se vê e se discute)
```

O design system no Claude é uma vitrine do kit: os mesmos tokens em dois temas
(manual e editorial), um cartão por peça e os ícones. O CSS dele é o `kit.css`
inteiro, mais doze linhas que ligam o tema da página ao look. Por isso uma
página montada lá usa as mesmas classes de um documento do plugin.

Endereço: https://claude.ai/artifact/4qkdmqk1fvJZK58isz2Uqa

## Mudar ou criar uma peça

1. Edite `kit.css`. Peça nova: acrescente também um cartão na lista `C` de
   `tools/design-system/gerar.mjs` (nome, grupo, marcação, resumo, guia, classes).
2. `node plugins/html-didatico/scripts/montar.mjs` e depois o mesmo com
   `--atualizar` para os exemplos-ouro.
3. `node plugins/html-didatico/scripts/check.mjs` nos três documentos gerados.
4. `node tools/design-system/gerar.mjs` escreve `tools/design-system/saida/`.
5. Peça a um chat do Claude com acesso a artefatos: "publique a pasta
   `saida/project` no design system HTML Didático". Os ícones em `saida/icons`
   só sobem de novo quando o sprite muda.
6. Release, como manda o `AGENTS.md`.

Sem Claude Code ou sem acesso a artefatos, os passos 1 a 3 e 6 bastam para o
plugin. O design system fica atrasado até alguém rodar o 4 e o 5.

## Ideia que nasceu no design system ou num canvas

Uma ideia aprovada lá só existe para o plugin quando chega ao `kit.css`.
O caminho de volta é manual: quem fez a mudança lê o token ou a marcação no
design system, escreve no `kit.css` e segue os passos acima. Não edite o
design system direto para "guardar" uma mudança; a próxima geração apaga.

## Receita ou exemplo novo

Monte com as classes do kit, em qualquer lugar. Para virar arquivo do plugin,
parta de `references/kit/starter.html` (que traz o kit embutido), cole o corpo
e rode o `check.mjs`. Exemplo-ouro novo entra em `references/kit/ouro/`.

## O que o design system não guarda

- Raio por look: o formato aceita um valor; o CSS aplica o do tema.
- O fundo em grade da figura: é gradiente, fica só no CSS.
- `kit.js`: conferência e abas aparecem paradas nos cartões.
