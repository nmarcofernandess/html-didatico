# Acervo de candidatas

Formas de explicar que funcionaram numa entrega real e podem virar regra do plugin. Cada arquivo em `candidatos/` é uma candidata: o que era, o link, por que funcionou e a regra que ela sugere. O formato e o critério estão em [`references/acervo.md`](../plugins/html-didatico/references/acervo.md), que é o que as skills leem.

## Fora do release

Esta pasta fica fora de `plugins/html-didatico/`, que é a única pasta que os marketplaces empacotam. Nada aqui entra na instalação, muda a versão ou pede release.

As candidatas chegam por commit direto na branch `acervo`, sem PR: um chat que usou o plugin registra o arquivo e segue. Assim nenhum registro passa por revisão nem por bump de versão, e `main` só recebe o acervo quando a curadoria quer.

## Curadoria

1. Leia as candidatas novas da branch `acervo`.
2. Para cada uma, decida:
   - **Canonizar.** A regra entra em `references/padroes.md` (com o caso, onde é cumprida e o check), ou vira exemplo-ouro ou componente do kit. Isso é mudança do plugin e segue o ciclo normal: PR para `main`, versão, CHANGELOG e release. A candidata ganha no topo `canonizada: vX.Y.Z · <onde>`.
   - **Juntar.** Duas candidatas com a mesma regra viram uma, com os dois casos.
   - **Descartar.** A candidata ganha `descartada: <motivo em uma linha>` e fica como registro.
3. Leve a branch `acervo` para `main` quando quiser o histórico lá (merge que só toca `acervo/`, sem release).
