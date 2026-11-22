# Escolher pelo resultado

A escolha explícita do usuário governa o formato. Se o conteúdo conflitar com
ela (por exemplo, chamar uma proposta de prova), explique a diferença e preserve
a intenção sem fabricar evidência. Não carregue os seis playbooks por rotina.

| Pergunta ou resultado | Skill | Distinção |
|---|---|---|
| Entender ou simplificar, sem pedir arquivo visual | [Explicar com Clareza](../skills/explain-clearly/SKILL.md) | Resposta em texto; não gera HTML automaticamente. |
| Ver uma dúvida da conversa: um defeito, uma feature, um exemplo, um "me mostra" | [HTML Didático](../skills/html-didatico/SKILL.md) | Cartão: uma página, com o Em pauta e uma figura por pergunta. |
| Manual, quickstart, narrativa, explicação visual de sistema, aula | [HTML Didático](../skills/html-didatico/SKILL.md) | Manual, editorial, sistemas e aula são modos internos. |
| Maquete, layout, estrutura ou comportamento de interface a decidir | [HTML Wireframe](../skills/html-wireframe/SKILL.md) | Uma maquete basta; compare alternativas apenas quando a decisão pedir. |
| Como componentes se montam; árvore, children, slots, props, types | [HTML Blueprint](../skills/html-blueprint/SKILL.md) | Montagem e contratos; não é comparação de layouts. |
| Evidências, resultados, pack, prova ou slots de verificação futura | [HTML Proof](../skills/html-proof/SKILL.md) | Descobrir renderer antes de criar HTML, mesmo sem pack existente. |
| Várias decisões de produto, modelo ou arquitetura em lista ou prosa, para decidir vendo como está em dev e como ficaria | [Decisões em Boards](../skills/decisoes-em-boards/SKILL.md) | Canvas de Design com componentes reais do DS; um board por decisão e um mapa. |

“Wireframe de prova” pertence a HTML Proof; “wireframe da tela” pertence a HTML
Wireframe. “Blueprint do layout” pertence a Wireframe se a pergunta é onde ficam
as regiões; Blueprint se é como as peças se compõem. “Explique este sistema”
sem pedido visual começa em texto; “explique em HTML” usa HTML Didático.
“Compare as APIs destes componentes” usa Blueprint quando o eixo é contrato;
“compare duas formas de organizar a tela” usa Wireframe. “Me mostra isso”, “desenha esse bug” ou “não entendi, quero ver” no meio de uma
conversa usam HTML Didático com o playbook Cartão, mesmo sem a palavra HTML.
“Faça uma aula de X”
usa HTML Didático com o playbook Aula; dúvidas de produto dentro dela viram a tab
Dúvidas, não um wireframe à parte. “Um board por decisão”, “como está em dev e
como ficaria” ou uma fila de códigos de decisão (C-03, R-01) de uma spec usam
Decisões em Boards no canvas de Design do Claude; sem canvas (Codex, Cursor), as
mesmas decisões vão para a tab Dúvidas de uma aula de HTML Didático. Uma escolha visual pontual (dois ícones, duas palavras) não é
isso: cabe numa maquete de HTML Wireframe.

Em pedido misto, use um documento principal e carregue só os trechos auxiliares
necessários. Uma explicação que cita um pack continua explicação; o link não a
torna prova. Se nenhuma pista resolver uma diferença que muda a entrega, faça
uma pergunta curta sobre o resultado esperado. Não pergunte por técnica interna.
