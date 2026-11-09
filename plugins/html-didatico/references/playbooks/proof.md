# HTML Proof · contrato de evidência e apresentação

Este é o owner das regras de proof do plugin. Antes de abrir uma tag, descubra
se o projeto possui renderer oficial e leia o contrato vigente. **Um pack ainda
não gerado não significa que não existe renderer.** Resultado ausente, renderer
com erro ou ambiente indisponível também não autorizam um substituto manual.
Se a existência do renderer não puder ser determinada, exponha a lacuna e não
apresente HTML manual como prova oficial.

## Com renderer oficial

- Packs novos seguem o fluxo canônico do projeto, seus inputs/descriptor, ambiente,
  execução, locks/fila quando exigidos, retenção e regeneração. A skill não cria
  outro contrato nem executa campanha além da autorização existente.
- HTML oficial é gerado. Nunca escreva ou edite sua saída à mão, nem altere status
  ou screenshots para fabricar prova. Ajuste template/CSS no owner do renderer
  quando o pedido for apresentação; regenere conforme o contrato.
- No DietFlow, pontos de partida históricos são `scripts/proof/render-pack.ts`,
  `scripts/proof/proof-pack.css`, `docs/proofs/CONTRATO-PROOF-PACK.md`,
  `.agents/skills/proof-canonico` e `docs/ci/PROOF-NAVIGATION.md`. Verifique caminhos,
  versão e contrato atuais; estes nomes não são universais nem garantem que o
  renderer continue usando a mesma anatomia A/C.
- Um mural ou explicação extra pode citar o pack e se identifica como documento
  complementar. Prints no mural não o promovem a pack oficial.

## Sem renderer oficial, após conferir as fontes

A capacidade antes chamada prova-final usa duas fases no mesmo arquivo:

1. **Rev. 0 · PLANEJAMENTO DE VERIFICAÇÃO**: slots vazios, status `não executado`,
   comandos reais e critérios extraídos da fonte. Pode conservar o rótulo
   `WIREFRAME` para o esqueleto de proof; isso não o torna maquete de interface.
2. **Rev. 1 ou seguinte**: preencha o mesmo documento somente com resultados e
   capturas obtidos. Preserve falhas, etapas ausentes e limites. O banner e o
   veredito refletem a fase atual; slot vazio não vira sucesso.

Organize por fonte de verdade: PR/merge quando houver, ou jornada/caso com sua
revisão identificada. Não invente PR, comando, SHA, ticket nem integração. Cite
packs anteriores antes de propor reexecução. Gates transversais só entram se
fizerem parte do contrato real. O planejamento não cria obrigação de executar
uma campanha fora do pedido. Mantenha nome estável; revisão/data ficam no arquivo
e o histórico durável segue o destino versionado do projeto.

Para essa apresentação manual, leia os [tokens de manual](../visual/tokens-manual.md),
a [anatomia manual](../visual/anatomia-manual.md) e a
[receita de cards de proof](../visual/proof.md). Abra o
[exemplo C](../exemplos/C-prova-importacao.html) como referência visual histórica:
é saída de renderer; não é template de prova oficial a preencher manualmente.
Snippets mostram formato, nunca autorizam repetir comandos históricos sem conferir.

## Anatomia e integridade

O contrato do renderer prevalece sobre esta anatomia de referência:

`metadata/revisão/data → tese + veredito → gates reais → jornadas/casos → etapas
com status, checks e evidência → pendências → comando, revisão e fontes`.

Cada etapa visual diz o que o print prova e quais checks foram executados. O fato
precisa estar no enquadramento; ajuste a captura, não a frase, se estiver oculto.
Screenshots reais são o conteúdo do slot de prova, sem substituição por diorama.
Fatos de máquina (contagem, SQL, payload) usam saída estruturada, sem PNG artificial.
Use poucos prints, cada um para uma propriedade visual distinta; duas proofs
não precisam repetir a mesma célula, podem se citar.

Veredito segue resultados e gates: falha, lacuna obrigatória ou etapa não executada
impede `passed`. Diferencie `partial`, `failed` e `não executado` conforme o contrato.
`N/A` exige justificativa. Revisão visual não é aceite humano nem prova do que está
fora da captura. Ambiente, revisão, comando e ticket (quando existentes) conferem
com a execução; não transforme sucesso de uma revisão em resultado de outra.

Antes de entregar, confira veredito contra todas as etapas, tese/checks/evidência,
assets e links, portabilidade e inspeção visual pelo contrato HTML compartilhado.
Com renderer, confirme que a saída continua gerada pelo caminho oficial.
