---
name: cartao
description: "Entrada direta, para quando pedem um cartão pelo nome ou invocam esta skill. Responde a uma dúvida da conversa em uma página de HTML: a pergunta, o caso em uma linha e até três telas do produto em que a resposta se vê. É a forma do 'me mostra' e do 'não entendi, quero ver'; o pedido que não nomeia a forma entra por html-didatico."
---

# Cartão

Uma dúvida, uma página. O cartão é curto porque o entendimento está pronto.

1. **Núcleo.** Siga o [Núcleo](../../references/nucleo.md): entenda o assunto na
   fonte, ache o nó e releia cada fato.
2. **Playbook.** Siga o [playbook Cartão](../../references/playbooks/cartao.md):
   conte a explicação em poucas frases, marque as telas que elas citam e desenhe
   essas telas no mesmo caso.
3. **Base.** O arquivo nasce de `node scripts/montar.mjs --novo cartao <destino.html>`,
   a partir da raiz do plugin. Só o `<main>` muda, conforme o
   [contrato HTML](../../references/html-portatil.md).
4. **Revisão e entrega.** Faça as duas leituras do playbook, com a
   [leitura pela figura](../../references/visual/design.md#leitura-pela-figura).
   Entregue o arquivo e, em duas ou três linhas, as telas, a objeção mais forte
   e o que não foi conferido; o visto e o lido ficam no estado do cartão.

Chamado pelo nome, o cartão governa. Se o conteúdo pede mais de três telas ou
dois casos, diga isso na entrega e proponha a Aula; uma escolha aberta é de
Decidir. Veja o [roteamento](../../references/roteamento.md).
