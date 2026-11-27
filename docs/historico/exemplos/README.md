# Exemplos históricos

Documentos reais feitos antes do design system único (4.0.0). Ficam aqui, fora do
pacote do plugin, como registro: os bytes são os de origem e os fatos de produto
valem para a data de cada um.

**O estilo deles é obsoleto.** Cada um tem paleta, fontes e marcação próprias, e
desenha as figuras à mão. Não copie a aparência nem a marcação: todo documento
novo usa os componentes do [kit](../../../plugins/html-didatico/references/kit/componentes.md)
e parte de um [exemplo-ouro](../../../plugins/html-didatico/references/kit/ouro/).

| Exemplo | Forma | Exemplo-ouro que o substitui |
|---|---|---|
| [A · Primeira escala](A-manual-escalaflow-quickstart.html) | Passo a passo | [aula](../../../plugins/html-didatico/references/kit/ouro/aula.html); o ouro de passo a passo saiu na 4.5.0 |
| [B · Panorama da exportação](B-editorial-panorama-export-v2.html) | Explicação | [aula](../../../plugins/html-didatico/references/kit/ouro/aula.html); o ouro de explicação saiu na 4.5.0 |
| [C · Prova da importação](C-prova-importacao.html) | Prova | [prova](../../../plugins/html-didatico/references/kit/ouro/prova.html) |
| [D · Prancha da unidade de exames](D-prancha-unidade-exames.html) | Maquete | [maquete](../../../plugins/html-didatico/references/kit/ouro/maquete.html) |
| [E · Blueprint de componentes](E-blueprint-componentes.html) | Montagem | [montagem](../../../plugins/html-didatico/references/kit/ouro/montagem.html) |
| [F, G, H · Aulas reais](aulas/README.md) | Aula | [aula](../../../plugins/html-didatico/references/kit/ouro/aula.html) |
| [Boards de decisão com o DietFlow DS](decisoes/) | Decidir, boards | [numeros-e-unidades.mjs](../../../plugins/html-didatico/references/decisoes/exemplos/numeros-e-unidades.mjs), gerado pelo motor novo |

A pasta `decisoes/` guarda o motor dos boards até a 3.x (`gerar.py`, `pecas.js`,
`decisoes.css`), que montava as figuras com componentes React do DietFlow DS, e os
dois arquivos de decisões reais que ele gerava (cadastro de exames e favoritos da
Prescrição). Os canvas já publicados com ele continuam abrindo, porque carregam a
própria cópia do DietFlow DS; boards novos saem do motor com o kit.

