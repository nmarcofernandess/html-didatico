# Verificação da 2.8.0

22/11/2026, a partir da 2.7.0. Motivo: Marco reprovou o primeiro cartão-ouro por excesso de texto e por ter sido feito sem entender o sistema. Ele contou a explicação em seis frases e apontou as telas que elas citam: o editor, o import e o dado trazido.

| Verificação | Resultado |
|---|---|
| `python3 scripts/validate-package.py` | `passed`, versão 2.8.0 |
| `check.mjs` no cartão-ouro novo | Sem falhas e sem avisos: 63 palavras fora das figuras (eram 251), 3 figuras; 938 px de altura em 1280 px |
| `check.mjs` nos outros exemplos-ouro e na folha de peças | Sem falhas |
| Fatos do cartão, no DietFlow, branch dev (`aab98ecdbb`) | O calendário do cabeçalho do Cálculo abre Contexto clínico, com Data do Cálculo (`CalculoMain.tsx:458`, `MainGenericEditor.tsx:2873`), sem estado de aviso. A idade do Cálculo novo vem do nascimento no dia corrente (`Main.tsx:193`). O modal de import mostra o dia clínico da fonte (`ImportarCrossModuleModal.tsx:208`). O destino conserva sua data e seu contexto de idade e sexo (decisão de 20/11/2026, na lição sobre atualização automática e importação) |

Limites: o aviso no calendário e o cadeado na idade vêm da fala de Marco de 22/11/2026 e não estão em dev; o cartão diz isso na linha de estado. "Lock" foi lido como cadeado no campo Idade quando a idade na data difere da do dia; essa leitura não foi confirmada por ele. Os valores da avaliação de 2021 são ilustrativos. O design system no Claude não foi republicado.
