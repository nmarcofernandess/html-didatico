---
name: html-didatico
description: "Entrada automática do plugin, para todo pedido que não nomeia a forma: 'faz um HTML didático disso', 'me mostra', 'desenha isso', 'não entendi, quero ver', 'me ensina', 'organiza isso pra mim', 'decide comigo'. Lê o pedido e a conversa, inclusive o que já foi decidido nela, escolhe sozinha entre cartão, aula, decisão, montagem, prova ou explicação em texto, e monta. Quem pede não precisa nomear o tipo."
---

# HTML Didático

Quem pede diz o que precisa; a forma é escolha desta entrada. Leia a conversa,
escolha e monte, sem devolver a pergunta "cartão ou aula?".

1. **Núcleo.** Siga o [Núcleo](../../references/nucleo.md): entenda o assunto na
   fonte, ache o nó e releia cada fato. Vale para qualquer forma.
2. **A conversa.** Recolha dela o que o pedido não repete: a pergunta em pauta,
   com o caso real; o que quem pede já decidiu, com a frase dele e a data; o que
   ficou aberto, com as opções; e a explicação que ele mesmo deu, que é a fonte
   principal. O destino de cada decisão já tomada está em
   [Entender](../../references/nucleo.md#entender-antes-de-tudo).
3. **A forma.** O que está na mesa escolhe, pela tabela do
   [roteamento](../../references/roteamento.md): uma dúvida vira cartão; um
   assunto inteiro, aula; uma escolha aberta, decisão; a composição de peças,
   montagem; a evidência de que funciona, prova; entender sem pedir para ver,
   explicação em texto. Em pedido misto, um documento principal. Só pergunte
   quando duas leituras mudam a entrega e nenhuma pista da conversa resolve: uma
   pergunta curta sobre o resultado, nunca sobre o formato.
4. **Montar.** Siga, do começo ao fim, o playbook que a tabela aponta para a
   forma escolhida e o que ele mandar somar. Cartão, Aula e o HTML de Decidir
   nascem de uma cópia do kit, feita pelo [montar](../../scripts/montar.mjs); as
   outras formas usam a base que o playbook indica.
5. **Entrega.** Em uma linha, a forma escolhida e o que na conversa levou a ela.
   Depois, o que o playbook pede, com o que foi visto rodando, o que foi lido e a
   objeção mais forte.

Quem nomeia a forma usa as entradas diretas: Cartão, Aula, Decidir, Montagem,
Prova e Explicar. Aí a escolha dele governa.
