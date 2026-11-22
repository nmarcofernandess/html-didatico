# Verificação da 2.7.0

22/11/2026, a partir da 2.6.1. Motivo: para a pergunta "ficou um gap no Cálculo retroativo?", o Codex entregou cartões de texto fora do kit, e outro chat entregou um HTML com figuras, também fora do kit, que espalhou a mesma ideia por cinco seções. Faltavam no plugin o formato de uma página para uma dúvida da conversa, um critério conferível para "a figura prova a frase" e o nó como ponto de partida.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.7.0, 235 links resolvidos |
| `check.mjs` no cartão-ouro | Sem falhas e sem avisos: 251 palavras de prosa, 3 figuras, em 390, 768 e 1280 px |
| `check.mjs` na explicação-ouro, no passo a passo-ouro, na aula-ouro, na folha de peças e na aula G | Sem falhas. Avisos: caixa apertada em 390 px (explicação e folha de peças), três perguntas respondidas na hora (passo a passo), tela com 236 e com 309 palavras (aula-ouro e aula G) |
| `check.mjs` no HTML de cinco seções do outro chat | 6 falhas: fora do kit, texto abaixo de 11 px, contraste, animação sem `prefers-reduced-motion`; 535 palavras, 5 figuras sem legenda |
| `montar.mjs --novo cartao <destino>` | Cria o arquivo com o kit embutido; recusa sobrescrever; base desconhecida mostra o uso |
| Leitura pela figura no cartão-ouro | Onde aparece: a ficha, com Data clínica 05/11/2025 e Idade 46. De onde vêm os dois anos: a linha do tempo, com os aniversários de 45 e 46 entre as duas datas. O que mexe na idade: a tabela, com "Trocar a data clínica" marcado "Fica como estava" |
| Fatos do caso, no DietFlow, branch dev (`aab98ecdbb`) | `Main.tsx:193` preenche a idade do Cálculo novo com `calcPatientAgeYears(nascimento)`; `patient-age.ts:4` usa o dia corrente; importar medidas aplica peso, altura, massa magra e % de gordura; a seção 8 do documento de contexto diz que a data clínica não refaz a idade e traz o exemplo de 59 e 60 anos |
| Inspeção em 1280 e 390 px | No celular a linha do tempo desce, uma data por linha, e a tabela vira blocos rotulados |

Limites: a entrega do Codex não foi localizada em disco e não foi refeita no lugar; o cartão do mesmo caso está no plugin e foi entregue à parte. A leitura pela figura é feita por quem revisa: o check lista o que cada figura contém e não julga se ela responde. Os nomes dos campos do cartão-ouro não foram conferidos na tela do produto. O design system no Claude não foi republicado; `tools/design-system/gerar.mjs` rodou, com 28 componentes.
