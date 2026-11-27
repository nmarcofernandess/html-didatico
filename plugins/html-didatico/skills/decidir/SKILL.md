---
name: decidir
description: "Entrada direta, para quando pedem pelo nome decisões, boards, maquete, wireframe de tela ou alternativas de layout, ou invocam esta skill: 'um board por decisão', 'como está em dev e como ficaria', 'decisões didáticas', uma fila de perguntas abertas de spec, canvas ou revisão (C-03, R-01). Põe cada decisão na mesa para responder vendo o caso: a pergunta com as saídas, as opções lado a lado, a recomendada e 'Responda no chat'. No canvas de Design do Claude sai um board por decisão; fora dele, um HTML com uma aba por decisão; os dois com os componentes do kit. É a forma do 'estou entre A e B'; o pedido que não nomeia a forma entra por html-didatico."
---

# Decidir

Quem decide olha o caso e responde no chat. A entrega pergunta; nada é aplicado
antes da resposta.

1. **Núcleo.** Siga o [Núcleo](../../references/nucleo.md): entenda o assunto na
   fonte, recolha o que já foi decidido e ache o nó, que aqui é a pergunta com o
   caso e as saídas.
2. **Gramática.** Siga [Decisão](../../references/decisao.md): levante as
   decisões, apure o estado atual na fonte e escreva cada uma com a pergunta, o
   que acontece, as opções comparadas no mesmo caso e a resposta com a
   recomendada. A resposta é um `<d-answer>`, e o texto copiado leva a pergunta
   junto, como manda [Padrões](../../references/padroes.md).
3. **Saída.** A [tabela de saídas](../../references/decisao.md#a-saída) escolhe
   pelo host e pela pergunta: no canvas de Design do Claude, os
   [boards](../../references/decisoes/boards.md); sem canvas, o HTML com uma aba por decisão, de
   `node scripts/montar.mjs --novo decidir <destino.html>`; pergunta de layout,
   a [maquete](../../references/playbooks/maquete.md).
4. **Entrega.** O que [Decisão](../../references/decisao.md#na-resposta-do-chat)
   pede na resposta do chat.

Maquete aprovada expressa intenção de produto; não comprova implementação.
Dúvida dentro de um assunto que também precisa ser ensinado é a tab Dúvidas de
uma Aula. Veja o [roteamento](../../references/roteamento.md).

Toda entrega cumpre os [Padrões](../../references/padroes.md): a forma segue o
conteúdo, a abertura situa quem não viu a conversa e a página em HTML só sai
depois de vista, com o [check](../../scripts/check.mjs) rodado. Entregue, avalie
o [Acervo](../../references/acervo.md).
