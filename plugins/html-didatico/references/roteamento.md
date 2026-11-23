# Escolher pela pergunta

Quem pede não precisa nomear o formato. O pedido sem forma nomeada ("me mostra", "me ensina", "faz um HTML didático disso") entra pela automática, HTML Didático, que lê o pedido e a conversa e escolhe por esta tabela. As seis entradas diretas atendem quem nomeia a forma ou invoca a skill: um cartão, uma aula, um board, uma maquete, a montagem, a prova. Quando o usuário nomeia uma entrada, essa escolha governa, e a entrega tem o tamanho que o conteúdo tem. Se o conteúdo conflitar com ela (por exemplo, chamar uma proposta de prova), explique a diferença e preserve a intenção sem fabricar evidência.

Toda entrada passa pelo [Núcleo](nucleo.md) antes. Carregue só o playbook da forma escolhida e o que ele mandar somar.

| O que está na mesa | Entrada | O que sai | Siga |
|---|---|---|---|
| "Me mostra", "desenha isso", "não entendi X": uma dúvida, um defeito, uma feature ou um exemplo da conversa | [Cartão](../skills/cartao/SKILL.md) | Uma página: a pergunta, o caso em uma linha e até três telas do produto | [Playbook Cartão](playbooks/cartao.md) |
| "Me ensina", "como funciona", "como eu faço", "onde estamos", "faz uma aula": um assunto inteiro | [Aula](../skills/aula/SKILL.md) | Um documento: explicação, passo a passo, mural, narrativa de sistema ou aula em quadros, com Na tela, Dúvidas, Leis e Roadmap quando o pedido pede | [Playbook didático](playbooks/didatico.md), com [Aula](playbooks/aula.md) e [sistemas](playbooks/sistemas.md) |
| "Estou entre A e B", "onde fica X", "como ficaria": uma escolha aberta, uma maquete, uma fila de perguntas de spec | [Decidir](../skills/decidir/SKILL.md) | As opções no mesmo caso, a recomendada e "Responda no chat": boards no canvas de Design, HTML com uma aba por decisão sem canvas, maquete quando a pergunta é de layout | [Decisão](decisao.md) |
| "Como isso se monta": árvore, children, slots, props, types | [Montagem](../skills/montagem/SKILL.md) | A composição, do primitivo ao consumidor, com os contratos | [Playbook Montagem](playbooks/montagem.md) |
| "Funciona mesmo?": evidências, resultados, pack, proof, slots de verificação futura | [Prova](../skills/prova/SKILL.md) | A evidência pelo renderer do projeto; sem renderer confirmado, verificação planejada e preenchida com dados reais | [Playbook Prova](playbooks/prova.md) |
| "Me explica", sem pedir para ver | [Explicar](../skills/explicar/SKILL.md) | Texto no chat, sem arquivo | [Reconstruir significado](clareza.md) |

O tamanho separa Cartão de Aula: conte as perguntas que o leitor faria e as telas que a explicação cita, como em [Conteúdo](conteudo.md#2-leitor-e-pergunta). Até três telas do mesmo caso cabem num cartão.

## O ciclo

Um cartão que virou assunto pede uma aula. Uma aula que abriu uma escolha pede uma decisão. A resposta vira lei e volta para a aula.

## Fronteiras

- "Me mostra isso", "desenha esse bug" ou "não entendi, quero ver", no meio de uma conversa, usam Cartão, mesmo sem a palavra HTML.
- "Explique este sistema", sem pedido visual, começa em texto, com Explicar; "explique em HTML" usa Aula.
- "Faça uma aula de X" usa Aula. Dúvidas de produto dentro dela viram a tab Dúvidas, na gramática de [Decisão](decisao.md), e não um documento à parte.
- "Um board por decisão", "como está em dev e como ficaria" ou uma fila de códigos de decisão (C-03, R-01) de uma spec usam Decidir: boards no canvas de Design do Claude; sem canvas (Codex, Cursor), o HTML com uma aba por decisão.
- "Wireframe da tela" e "maquete" usam Decidir. Uma maquete sem alternativa também: a decisão é aprovar ou ajustar a proposta. Uma escolha visual pontual (dois ícones, duas palavras) cabe numa maquete, com as duas lado a lado.
- "Blueprint do layout" usa Decidir se a pergunta é onde ficam as regiões; Montagem se é como as peças se compõem. "Compare as APIs destes componentes" usa Montagem quando o eixo é contrato; "compare duas formas de organizar a tela" usa Decidir.
- "Wireframe de prova" pertence a Prova. Uma explicação que cita um pack continua explicação; o link não a torna prova.

Em pedido misto, use um documento principal e carregue só os trechos auxiliares necessários. Se nenhuma pista resolver uma diferença que muda a entrega, faça uma pergunta curta sobre o resultado esperado. Não pergunte pelo formato nem por técnica interna.
